package com.southtrails.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.southtrails.api.entity.Booking;
import com.southtrails.api.entity.ItineraryPlan;
import com.southtrails.api.entity.Review;
import com.southtrails.api.entity.TravelPackage;
import com.southtrails.api.entity.WishlistItem;
import com.southtrails.api.repository.BookingRepository;
import com.southtrails.api.repository.ItineraryPlanRepository;
import com.southtrails.api.repository.NotificationItemRepository;
import com.southtrails.api.repository.ReviewRepository;
import com.southtrails.api.repository.TravelPackageRepository;
import com.southtrails.api.repository.WishlistRepository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
public class AiTourismController {

    private final TravelPackageRepository packages;
    private final BookingRepository bookings;
    private final WishlistRepository wishlist;
    private final ReviewRepository reviews;
    private final ItineraryPlanRepository itineraryPlans;
    private final NotificationItemRepository notifications;
    private final ObjectMapper mapper;

    public AiTourismController(
            TravelPackageRepository packages,
            BookingRepository bookings,
            WishlistRepository wishlist,
            ReviewRepository reviews,
            ItineraryPlanRepository itineraryPlans,
            NotificationItemRepository notifications,
            ObjectMapper mapper
    ) {
        this.packages = packages;
        this.bookings = bookings;
        this.wishlist = wishlist;
        this.reviews = reviews;
        this.itineraryPlans = itineraryPlans;
        this.notifications = notifications;
        this.mapper = mapper;
    }

    @PostMapping("/itinerary")
    Map<String, Object> itinerary(@RequestBody Map<String, Object> payload) {
        String state = fallback(text(payload.get("state")), "");
        String travelStyle = fallback(text(payload.get("travelStyle")), "Balanced");
        String season = fallback(text(payload.get("season")), "Current season");
        int duration = Math.max(1, number(payload.get("duration"), number(payload.get("days"), 3)));
        int familySize = Math.max(1, number(payload.get("familySize"), number(payload.get("travelers"), 2)));
        BigDecimal budget = decimal(payload.get("budget"), BigDecimal.valueOf(25000));
        List<String> interests = textList(payload.get("interests"));

        List<TravelPackage> ranked = packages.findAll().stream()
                .filter(pkg -> state.isBlank() || equalsIgnoreCase(pkg.getState(), state))
                .map(pkg -> Map.entry(pkg, itineraryScore(pkg, interests, budget, duration, travelStyle)))
                .sorted(Map.Entry.<TravelPackage, Integer>comparingByValue().reversed())
                .limit(6)
                .map(Map.Entry::getKey)
                .toList();

        List<Map<String, Object>> dayPlan = new ArrayList<>();
        List<TravelPackage> sourcePackages = ranked.isEmpty()
                ? packages.findAll().stream()
                        .filter(pkg -> state.isBlank() || equalsIgnoreCase(pkg.getState(), state))
                        .limit(3).toList()
                : ranked;
        if (sourcePackages.isEmpty()) {
            Map<String, Object> emptyResponse = new LinkedHashMap<>();
            String regionLabel = state.isBlank() ? "South India" : state;
            emptyResponse.put("title", travelStyle + " " + regionLabel + " plan");
            emptyResponse.put("summary", "No package catalog data is available yet. Add packages from the existing admin workspace first.");
            emptyResponse.put("season", season);
            emptyResponse.put("travelStyle", travelStyle);
            emptyResponse.put("familySize", familySize);
            emptyResponse.put("budget", budget);
            emptyResponse.put("estimatedBudget", BigDecimal.ZERO);
            emptyResponse.put("confidence", "Low");
            emptyResponse.put("matchedPackages", List.of());
            emptyResponse.put("dayPlan", List.of());
            emptyResponse.put("nextActions", List.of("Add packages", "Seed backend packages", "Try again"));
            return emptyResponse;
        }
        for (int day = 1; day <= duration; day++) {
            TravelPackage pkg = sourcePackages.get((day - 1) % sourcePackages.size());
            List<String> places = safeList(pkg.getPlaces());
            String place = places.isEmpty() ? fallback(pkg.getDestination(), pkg.getTitle()) : places.get((day - 1) % places.size());
            dayPlan.add(Map.of(
                    "day", day,
                    "destination", place,
                    "focus", focusForDay(day, travelStyle, interests),
                    "morning", "Arrive around " + place + " and start with a low-friction local orientation.",
                    "afternoon", "Use the " + fallback(pkg.getCategory(), "curated") + " package signals to choose the best nearby experience.",
                    "evening", "Keep the evening flexible for food, culture, rest, and weather-safe alternatives.",
                    "packageId", pkg.getId(),
                    "packageTitle", pkg.getTitle()
            ));
        }

        BigDecimal estimatedBudget = ranked.stream()
                .map(TravelPackage::getPrice)
                .filter(Objects::nonNull)
                .limit(Math.max(1, Math.min(2, ranked.size())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        if (estimatedBudget.compareTo(BigDecimal.ZERO) == 0) {
            estimatedBudget = budget.min(BigDecimal.valueOf(8000L * duration * familySize));
        }

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("title", travelStyle + " Tamil Nadu plan");
        response.put("summary", "Generated from live package, destination, price, rating, and highlight data without changing the booking flow.");
        response.put("season", season);
        response.put("travelStyle", travelStyle);
        response.put("familySize", familySize);
        response.put("budget", budget);
        response.put("estimatedBudget", estimatedBudget);
        response.put("confidence", ranked.isEmpty() ? "Medium" : "High");
        response.put("matchedPackages", ranked.stream().map(this::packageCard).toList());
        response.put("dayPlan", dayPlan);
        response.put("nextActions", List.of("Review package details", "Save shortlisted packages", "Continue to the existing booking form"));
        persistPlanIfRequested(payload, response, state, travelStyle, budget, duration, familySize, interests);
        return response;
    }

    @PostMapping("/oracle/chat")
    Map<String, Object> oracleChat(@RequestBody Map<String, Object> payload) {
        String message = text(payload.get("message")).toLowerCase(Locale.ROOT);
        String language = fallback(text(payload.get("language")), "English");
        int budget = number(payload.get("budget"), extractBudget(message));

        List<TravelPackage> ranked = packages.findAll().stream()
                .map(pkg -> Map.entry(pkg, oracleScore(pkg, message, budget)))
                .sorted(Map.Entry.<TravelPackage, Integer>comparingByValue().reversed())
                .limit(4)
                .map(Map.Entry::getKey)
                .toList();

        String answer = ranked.isEmpty()
                ? "I could not find a strong Tamil Nadu catalog match yet. Try sharing your budget, duration, and travel mood."
                : "I found " + ranked.get(0).getTitle() + " as the strongest match because it aligns with your travel intent, budget signals, and Tamil Trails catalog data.";

        return Map.of(
                "answer", answer,
                "language", language,
                "suggestedPackages", ranked.stream().map(this::packageCard).toList(),
                "quickActions", List.of("Open best package", "Generate itinerary", "Compare similar packages"),
                "dataSources", List.of("packages", "destinations", "ratings", "highlights")
        );
    }

    @GetMapping("/recommendations")
    Map<String, Object> recommendations(@RequestParam(required = false) String customerId) {
        Set<String> preferredStates = new HashSet<>();
        Set<String> preferredCategories = new HashSet<>();
        Set<String> ownedPackageIds = new HashSet<>();
        Map<String, TravelPackage> byId = packages.findAll().stream()
                .collect(Collectors.toMap(TravelPackage::getId, pkg -> pkg, (left, right) -> left));

        if (customerId != null && !customerId.isBlank()) {
            bookings.findByCustomerIdOrderByCreatedAtDesc(customerId).stream()
                    .map(Booking::getPackageId)
                    .forEach(ownedPackageIds::add);
            wishlist.findByCustomerIdOrderByCreatedAtDesc(customerId).stream()
                    .map(WishlistItem::getPackageId)
                    .forEach(ownedPackageIds::add);

            ownedPackageIds.stream()
                    .map(byId::get)
                    .filter(Objects::nonNull)
                    .forEach(pkg -> {
                        if (pkg.getState() != null) preferredStates.add(pkg.getState());
                        if (pkg.getCategory() != null) preferredCategories.add(pkg.getCategory());
                    });
        }

        List<TravelPackage> recommended = byId.values().stream()
                .filter(pkg -> !ownedPackageIds.contains(pkg.getId()))
                .map(pkg -> Map.entry(pkg, recommendationScore(pkg, preferredStates, preferredCategories)))
                .sorted(Map.Entry.<TravelPackage, Integer>comparingByValue().reversed())
                .limit(8)
                .map(Map.Entry::getKey)
                .toList();

        return Map.of(
                "customerId", customerId == null ? "" : customerId,
                "strategy", preferredStates.isEmpty() && preferredCategories.isEmpty() ? "popular-high-rating" : "history-wishlist-preference",
                "recommendedPackages", recommended.stream().map(this::packageCard).toList(),
                "signals", Map.of(
                        "states", preferredStates,
                        "categories", preferredCategories,
                        "previousInteractions", ownedPackageIds.size()
                )
        );
    }

    @GetMapping("/sentiment/reviews")
    Map<String, Object> reviewSentiment(@RequestParam(required = false) String packageId) {
        List<Review> reviewList = packageId == null || packageId.isBlank()
                ? reviews.findAll()
                : reviews.findByPackageIdOrderByCreatedAtDesc(packageId);

        List<Map<String, Object>> signals = reviewList.stream()
                .sorted(Comparator.comparing(Review::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder())))
                .map(review -> {
                    String sentiment = classifySentiment(review.getText(), review.getRating());
                    return Map.<String, Object>of(
                            "reviewId", review.getId(),
                            "packageId", review.getPackageId(),
                            "rating", review.getRating(),
                            "sentiment", sentiment,
                            "complaintRisk", "Negative".equals(sentiment) ? "High" : "Low",
                            "keywords", sentimentKeywords(review.getText())
                    );
                })
                .toList();

        Map<String, Long> summary = signals.stream()
                .collect(Collectors.groupingBy(signal -> String.valueOf(signal.get("sentiment")), LinkedHashMap::new, Collectors.counting()));

        return Map.of(
                "totalReviews", reviewList.size(),
                "summary", summary,
                "signals", signals
        );
    }

    @GetMapping("/notifications/{customerId}")
    List<Map<String, Object>> notifications(@PathVariable String customerId) {
        List<Map<String, Object>> items = new ArrayList<>();
        notifications.findByCustomerIdOrderByCreatedAtDesc(customerId).stream()
                .limit(8)
                .forEach(notification -> items.add(Map.of(
                        "id", notification.getId(),
                        "type", fallback(notification.getType(), "INFO"),
                        "title", fallback(notification.getTitle(), "Tamil Trails update"),
                        "message", fallback(notification.getMessage(), ""),
                        "createdAt", notification.getCreatedAt() == null ? "" : notification.getCreatedAt().toString()
                )));

        bookings.findByCustomerIdOrderByCreatedAtDesc(customerId).stream()
                .limit(4)
                .forEach(booking -> items.add(Map.of(
                        "id", "booking-" + booking.getId(),
                        "type", "BOOKING_STATUS",
                        "title", "Booking " + fallback(booking.getStatus(), "Pending"),
                        "message", "Your booking " + booking.getId() + " for " + safeDate(booking.getTravelDate()) + " is currently " + fallback(booking.getStatus(), "Pending") + ".",
                        "createdAt", booking.getCreatedAt() == null ? "" : booking.getCreatedAt().toString()
                )));

        items.add(Map.of(
                "id", "recommendation-" + LocalDate.now(),
                "type", "RECOMMENDATION",
                "title", "Fresh Tamil Trails picks",
                "message", "New recommendations are ready from your booking, wishlist, and rating signals.",
                "createdAt", LocalDate.now().toString()
        ));

        return items;
    }

    private Map<String, Object> packageCard(TravelPackage pkg) {
        return Map.of(
                "id", pkg.getId(),
                "title", fallback(pkg.getTitle(), "South India package"),
                "state", fallback(pkg.getState(), "South India"),
                "destination", fallback(pkg.getDestination(), "Curated route"),
                "category", fallback(pkg.getCategory(), "Experience"),
                "days", pkg.getDays() == null ? 0 : pkg.getDays(),
                "nights", pkg.getNights() == null ? 0 : pkg.getNights(),
                "price", pkg.getPrice() == null ? BigDecimal.ZERO : pkg.getPrice(),
                "rating", pkg.getRating() == null ? 0 : pkg.getRating(),
                "image1", pkg.getImage1() == null ? "" : pkg.getImage1()
        );
    }

    private int itineraryScore(TravelPackage pkg, List<String> interests, BigDecimal budget, int duration, String travelStyle) {
        int score = (int) Math.round((pkg.getRating() == null ? 3.5 : pkg.getRating()) * 10);
        if (pkg.getPrice() != null && pkg.getPrice().compareTo(budget) <= 0) score += 25;
        if (pkg.getDays() != null && pkg.getDays() <= duration + 1) score += 15;
        String haystack = searchable(pkg) + " " + travelStyle.toLowerCase(Locale.ROOT);
        for (String interest : interests) {
            if (!interest.isBlank() && haystack.contains(interest.toLowerCase(Locale.ROOT))) score += 18;
        }
        return score;
    }

    private int oracleScore(TravelPackage pkg, String message, int budget) {
        int score = (int) Math.round((pkg.getRating() == null ? 3.5 : pkg.getRating()) * 10);
        String haystack = searchable(pkg);
        for (String token : message.split("\\s+")) {
            if (token.length() > 3 && haystack.contains(token)) score += 7;
        }
        if (budget > 0 && pkg.getPrice() != null && pkg.getPrice().intValue() <= budget) score += 20;
        return score;
    }

    private int recommendationScore(TravelPackage pkg, Set<String> states, Set<String> categories) {
        int score = (int) Math.round((pkg.getRating() == null ? 3.5 : pkg.getRating()) * 10);
        if (states.contains(pkg.getState())) score += 24;
        if (categories.contains(pkg.getCategory())) score += 24;
        if ("Active".equalsIgnoreCase(pkg.getStatus())) score += 8;
        return score;
    }

    private String searchable(TravelPackage pkg) {
        return String.join(" ",
                fallback(pkg.getTitle(), ""),
                fallback(pkg.getDestination(), ""),
                fallback(pkg.getState(), ""),
                fallback(pkg.getCategory(), ""),
                fallback(pkg.getDescription(), ""),
                String.join(" ", safeList(pkg.getHighlights())),
                String.join(" ", safeList(pkg.getPlaces()))
        ).toLowerCase(Locale.ROOT);
    }

    private String classifySentiment(String text, Integer rating) {
        String body = text == null ? "" : text.toLowerCase(Locale.ROOT);
        if ((rating != null && rating <= 2) || body.matches(".*(bad|poor|late|delay|dirty|refund|complaint|worst|issue).*")) {
            return "Negative";
        }
        if ((rating != null && rating >= 4) || body.matches(".*(great|excellent|amazing|good|memorable|beautiful|smooth).*")) {
            return "Positive";
        }
        return "Neutral";
    }

    private List<String> sentimentKeywords(String text) {
        if (text == null || text.isBlank()) return List.of();
        return List.of("delay", "refund", "hotel", "guide", "transport", "food", "clean")
                .stream()
                .filter(keyword -> text.toLowerCase(Locale.ROOT).contains(keyword))
                .toList();
    }

    private String focusForDay(int day, String travelStyle, List<String> interests) {
        if (!interests.isEmpty()) return interests.get((day - 1) % interests.size());
        if ("Relaxed".equalsIgnoreCase(travelStyle)) return "Slow travel and local culture";
        if ("Premium".equalsIgnoreCase(travelStyle)) return "Comfort-led premium experience";
        if ("Fast-paced".equalsIgnoreCase(travelStyle)) return "High-coverage sightseeing";
        return "Balanced sightseeing";
    }

    private String safeDate(LocalDate date) {
        return date == null ? "your selected travel date" : date.toString();
    }

    private boolean equalsIgnoreCase(String left, String right) {
        return left != null && right != null && left.equalsIgnoreCase(right);
    }

    private List<String> safeList(List<String> values) {
        return values == null ? List.of() : values;
    }

    private String text(Object value) {
        return value == null ? "" : String.valueOf(value).trim();
    }

    private String fallback(String value, String fallback) {
        return value == null || value.isBlank() ? fallback : value;
    }

    private int number(Object value, int fallback) {
        if (value instanceof Number number) return number.intValue();
        try {
            return value == null ? fallback : Integer.parseInt(String.valueOf(value).replaceAll("[^0-9]", ""));
        } catch (RuntimeException ignored) {
            return fallback;
        }
    }

    private BigDecimal decimal(Object value, BigDecimal fallback) {
        if (value instanceof Number number) return BigDecimal.valueOf(number.doubleValue());
        try {
            return value == null ? fallback : new BigDecimal(String.valueOf(value).replaceAll("[^0-9.]", ""));
        } catch (RuntimeException ignored) {
            return fallback;
        }
    }

    private List<String> textList(Object value) {
        if (value instanceof List<?> list) {
            return list.stream().map(this::text).filter(item -> !item.isBlank()).toList();
        }
        String raw = text(value);
        if (raw.isBlank()) return List.of();
        return List.of(raw.split(",")).stream().map(String::trim).filter(item -> !item.isBlank()).toList();
    }

    private int extractBudget(String message) {
        String digits = message.replaceAll("[^0-9]", "");
        if (digits.isBlank()) return 0;
        try {
            return Integer.parseInt(digits);
        } catch (RuntimeException ignored) {
            return 0;
        }
    }

    private void persistPlanIfRequested(
            Map<String, Object> payload,
            Map<String, Object> response,
            String state,
            String travelStyle,
            BigDecimal budget,
            int duration,
            int travelers,
            List<String> interests
    ) {
        String customerId = text(payload.get("customerId"));
        if (customerId.isBlank()) return;
        try {
            ItineraryPlan plan = new ItineraryPlan();
            plan.setCustomerId(customerId);
            plan.setTitle(String.valueOf(response.get("title")));
            plan.setState(state);
            plan.setTravelStyle(travelStyle);
            plan.setBudget(budget);
            plan.setDuration(duration);
            plan.setTravelers(travelers);
            plan.setInterests(String.join(", ", interests));
            plan.setPlanJson(mapper.writeValueAsString(response));
            itineraryPlans.save(plan);
        } catch (Exception ignored) {
            // Itinerary generation should not fail just because saving the optional plan failed.
        }
    }
}
