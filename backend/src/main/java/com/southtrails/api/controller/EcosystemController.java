package com.southtrails.api.controller;

import com.southtrails.api.entity.TravelPackage;
import com.southtrails.api.repository.EcoScoreRepository;
import com.southtrails.api.repository.GuideProfileRepository;
import com.southtrails.api.repository.HandicraftProductRepository;
import com.southtrails.api.repository.HomestayListingRepository;
import com.southtrails.api.repository.LocalEventRepository;
import com.southtrails.api.repository.TravelPackageRepository;
import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ecosystem")
public class EcosystemController {

    private final TravelPackageRepository packages;
    private final GuideProfileRepository guides;
    private final HomestayListingRepository homestays;
    private final LocalEventRepository events;
    private final HandicraftProductRepository handicrafts;
    private final EcoScoreRepository ecoScores;

    public EcosystemController(
            TravelPackageRepository packages,
            GuideProfileRepository guides,
            HomestayListingRepository homestays,
            LocalEventRepository events,
            HandicraftProductRepository handicrafts,
            EcoScoreRepository ecoScores
    ) {
        this.packages = packages;
        this.guides = guides;
        this.homestays = homestays;
        this.events = events;
        this.handicrafts = handicrafts;
        this.ecoScores = ecoScores;
    }

    @GetMapping("/guides")
    List<Map<String, Object>> guides() {
        if (guides.count() > 0) {
            return guides.findAll().stream()
                    .map(guide -> Map.<String, Object>of(
                            "id", guide.getId(),
                            "name", guide.getName(),
                            "state", fallback(guide.getState(), "South India"),
                            "baseLocation", fallback(guide.getBaseLocation(), "Local destination"),
                            "speciality", fallback(guide.getSpeciality(), "Local culture"),
                            "languages", split(guide.getLanguages()),
                            "rating", guide.getRating() == null ? 4.7 : guide.getRating(),
                            "verified", guide.isVerified(),
                            "pricePerDay", guide.getPricePerDay() == null ? 1800 : guide.getPricePerDay(),
                            "packageId", fallback(guide.getPackageId(), "")
                    ))
                    .toList();
        }
        return topPackages().stream()
                .map(pkg -> Map.<String, Object>of(
                        "id", "guide-" + pkg.getId(),
                        "name", guideName(pkg),
                        "state", fallback(pkg.getState(), "South India"),
                        "baseLocation", fallback(pkg.getDestination(), fallback(pkg.getState(), "South India")),
                        "speciality", fallback(pkg.getCategory(), "Local culture"),
                        "languages", List.of("English", localLanguage(pkg.getState()), "Hindi"),
                        "rating", pkg.getRating() == null ? 4.6 : pkg.getRating(),
                        "verified", true,
                        "pricePerDay", 1800 + ((Math.abs(pkg.getId().hashCode()) % 8) * 250),
                        "packageId", pkg.getId()
                ))
                .toList();
    }

    @GetMapping("/homestays")
    List<Map<String, Object>> homestays() {
        if (homestays.count() > 0) {
            return homestays.findAll().stream()
                    .map(stay -> Map.<String, Object>of(
                            "id", stay.getId(),
                            "name", stay.getName(),
                            "state", fallback(stay.getState(), "South India"),
                            "location", fallback(stay.getLocation(), "Local village cluster"),
                            "host", fallback(stay.getHost(), "Local host"),
                            "capacity", stay.getCapacity() == null ? 2 : stay.getCapacity(),
                            "pricePerNight", stay.getPricePerNight() == null ? 1600 : stay.getPricePerNight(),
                            "communityScore", stay.getCommunityScore() == null ? 82 : stay.getCommunityScore(),
                            "amenities", split(stay.getAmenities()),
                            "packageId", fallback(stay.getPackageId(), "")
                    ))
                    .toList();
        }
        return topPackages().stream()
                .map(pkg -> Map.<String, Object>of(
                        "id", "stay-" + pkg.getId(),
                        "name", fallback(pkg.getDestination(), pkg.getTitle()) + " Community Homestay",
                        "state", fallback(pkg.getState(), "South India"),
                        "location", fallback(pkg.getDestination(), "Local village cluster"),
                        "host", hostName(pkg),
                        "capacity", 2 + Math.abs(pkg.getId().hashCode()) % 5,
                        "pricePerNight", 1600 + ((Math.abs(pkg.getId().hashCode()) % 7) * 300),
                        "communityScore", 82 + Math.abs(pkg.getId().hashCode()) % 15,
                        "amenities", List.of("Local breakfast", "Verified host", "Cultural walk"),
                        "packageId", pkg.getId()
                ))
                .toList();
    }

    @GetMapping("/events")
    List<Map<String, Object>> events() {
        if (events.count() > 0) {
            return events.findAll().stream()
                    .map(event -> Map.<String, Object>of(
                            "id", event.getId(),
                            "title", event.getTitle(),
                            "state", fallback(event.getState(), "South India"),
                            "location", fallback(event.getLocation(), "Regional cultural venue"),
                            "season", fallback(event.getSeason(), "Year-round"),
                            "category", fallback(event.getCategory(), "Culture"),
                            "impact", fallback(event.getImpact(), "Connects travelers with local culture."),
                            "packageId", fallback(event.getPackageId(), "")
                    ))
                    .toList();
        }
        return topPackages().stream()
                .map(pkg -> Map.<String, Object>of(
                        "id", "event-" + pkg.getId(),
                        "title", eventTitle(pkg),
                        "state", fallback(pkg.getState(), "South India"),
                        "location", fallback(pkg.getDestination(), "Regional cultural venue"),
                        "season", season(pkg),
                        "category", fallback(pkg.getCategory(), "Culture"),
                        "impact", "Connects travelers with local festivals, food, craft, and seasonal attractions.",
                        "packageId", pkg.getId()
                ))
                .toList();
    }

    @GetMapping("/handicrafts")
    List<Map<String, Object>> handicrafts() {
        if (handicrafts.count() > 0) {
            return handicrafts.findAll().stream()
                    .map(product -> Map.<String, Object>of(
                            "id", product.getId(),
                            "product", product.getProduct(),
                            "artisan", fallback(product.getArtisan(), "Local artisan"),
                            "state", fallback(product.getState(), "South India"),
                            "origin", fallback(product.getOrigin(), "Local artisan cluster"),
                            "price", product.getPrice() == null ? 499 : product.getPrice(),
                            "experience", fallback(product.getExperience(), "Can be bundled as a cultural stop."),
                            "packageId", fallback(product.getPackageId(), "")
                    ))
                    .toList();
        }
        return topPackages().stream()
                .map(pkg -> Map.<String, Object>of(
                        "id", "craft-" + pkg.getId(),
                        "product", craftProduct(pkg),
                        "artisan", artisanName(pkg),
                        "state", fallback(pkg.getState(), "South India"),
                        "origin", fallback(pkg.getDestination(), "Local artisan cluster"),
                        "price", 499 + ((Math.abs(pkg.getId().hashCode()) % 15) * 120),
                        "experience", "Can be bundled as a cultural stop in custom itineraries.",
                        "packageId", pkg.getId()
                ))
                .toList();
    }

    @GetMapping("/eco-scores")
    List<Map<String, Object>> ecoScores() {
        Map<String, TravelPackage> packagesById = packages.findAll().stream()
                .collect(java.util.stream.Collectors.toMap(TravelPackage::getId, pkg -> pkg, (left, right) -> left));
        if (ecoScores.count() > 0) {
            return ecoScores.findAll().stream()
                    .map(score -> {
                        TravelPackage pkg = packagesById.get(score.getPackageId());
                        int sustainability = score.getSustainabilityScore() == null ? 75 : score.getSustainabilityScore();
                        int community = score.getCommunityImpactScore() == null ? 75 : score.getCommunityImpactScore();
                        return Map.<String, Object>of(
                                "packageId", score.getPackageId(),
                                "title", pkg == null ? score.getPackageId() : fallback(pkg.getTitle(), "South Trails package"),
                                "state", pkg == null ? "South India" : fallback(pkg.getState(), "South India"),
                                "destination", pkg == null ? "Curated route" : fallback(pkg.getDestination(), "Curated route"),
                                "sustainabilityScore", sustainability,
                                "communityImpactScore", community,
                                "greenIndicators", split(score.getGreenIndicators()),
                                "overall", Math.round((sustainability + community) / 2.0)
                        );
                    })
                    .toList();
        }
        return packages.findAll().stream()
                .sorted(Comparator.comparing(TravelPackage::getRating, Comparator.nullsLast(Comparator.reverseOrder())))
                .limit(24)
                .map(pkg -> {
                    int seed = Math.abs(pkg.getId().hashCode());
                    int sustainability = 70 + seed % 26;
                    int community = 68 + seed % 28;
                    return Map.<String, Object>of(
                            "packageId", pkg.getId(),
                            "title", fallback(pkg.getTitle(), "South Trails package"),
                            "state", fallback(pkg.getState(), "South India"),
                            "destination", fallback(pkg.getDestination(), "Curated route"),
                            "sustainabilityScore", sustainability,
                            "communityImpactScore", community,
                            "greenIndicators", List.of("Local partner potential", "Low-waste itinerary guidance", "Community commerce ready"),
                            "overall", Math.round((sustainability + community) / 2.0)
                    );
                })
                .toList();
    }

    @GetMapping("/ar-vr")
    List<Map<String, Object>> arVrPreviews() {
        return topPackages().stream()
                .map(pkg -> Map.<String, Object>of(
                        "id", "preview-" + pkg.getId(),
                        "title", fallback(pkg.getTitle(), "Destination preview"),
                        "state", fallback(pkg.getState(), "South India"),
                        "destination", fallback(pkg.getDestination(), "Curated route"),
                        "previewType", "360 destination storyboard",
                        "status", "MVP preview ready",
                        "media", List.of(nonBlank(pkg.getImage1()), nonBlank(pkg.getImage2()), nonBlank(pkg.getImage3())).stream().filter(item -> !item.isBlank()).toList(),
                        "packageId", pkg.getId()
                ))
                .toList();
    }

    @GetMapping("/startup-features")
    Map<String, Object> startupFeatures() {
        return Map.of(
                "loyalty", Map.of("status", "MVP-ready", "pointsPerBooking", 100, "pointsPerReview", 25),
                "referrals", Map.of("status", "MVP-ready", "reward", "Rs. 500 coupon after first referred booking"),
                "wishlist", Map.of("status", "Already integrated", "source", "/api/wishlist"),
                "communities", Map.of("status", "Planned", "firstCommunities", List.of("Backwater Lovers", "Temple Trails", "Hill Escapes")),
                "socialSharing", Map.of("status", "MVP-ready", "shareTargets", List.of("WhatsApp", "Instagram", "Copy link"))
        );
    }

    private List<TravelPackage> topPackages() {
        return packages.findAll().stream()
                .sorted(Comparator.comparing(TravelPackage::getRating, Comparator.nullsLast(Comparator.reverseOrder())))
                .limit(12)
                .toList();
    }

    private String fallback(String value, String fallback) {
        return value == null || value.isBlank() ? fallback : value;
    }

    private String nonBlank(String value) {
        return value == null ? "" : value;
    }

    private List<String> split(String value) {
        if (value == null || value.isBlank()) return List.of();
        return List.of(value.split(",")).stream().map(String::trim).filter(item -> !item.isBlank()).toList();
    }

    private String localLanguage(String state) {
        if ("Tamil Nadu".equalsIgnoreCase(state)) return "Tamil";
        if ("Kerala".equalsIgnoreCase(state)) return "Malayalam";
        if ("Karnataka".equalsIgnoreCase(state)) return "Kannada";
        if ("Andhra Pradesh".equalsIgnoreCase(state)) return "Telugu";
        return "Regional language";
    }

    private String guideName(TravelPackage pkg) {
        return switch (fallback(pkg.getState(), "")) {
            case "Tamil Nadu" -> "Arun Heritage Guide";
            case "Kerala" -> "Meera Backwater Guide";
            case "Karnataka" -> "Nikhil Trail Guide";
            case "Andhra Pradesh" -> "Sai Coastal Guide";
            default -> "Verified South Trails Guide";
        };
    }

    private String hostName(TravelPackage pkg) {
        return switch (fallback(pkg.getState(), "")) {
            case "Tamil Nadu" -> "Lakshmi";
            case "Kerala" -> "Anitha";
            case "Karnataka" -> "Kavya";
            case "Andhra Pradesh" -> "Deepthi";
            default -> "Local Host";
        };
    }

    private String artisanName(TravelPackage pkg) {
        return switch (fallback(pkg.getState(), "")) {
            case "Tamil Nadu" -> "Chettinad Craft Collective";
            case "Kerala" -> "Alleppey Coir Studio";
            case "Karnataka" -> "Mysore Artisan House";
            case "Andhra Pradesh" -> "Kalamkari Makers Guild";
            default -> "South Trails Artisan Collective";
        };
    }

    private String craftProduct(TravelPackage pkg) {
        return switch (fallback(pkg.getState(), "")) {
            case "Tamil Nadu" -> "Temple brass keepsake";
            case "Kerala" -> "Handwoven coir craft";
            case "Karnataka" -> "Sandalwood-inspired souvenir";
            case "Andhra Pradesh" -> "Kalamkari textile art";
            default -> "Traditional local craft";
        };
    }

    private String eventTitle(TravelPackage pkg) {
        return fallback(pkg.getDestination(), fallback(pkg.getState(), "South India")) + " Seasonal Culture Week";
    }

    private String season(TravelPackage pkg) {
        BigDecimal price = pkg.getPrice() == null ? BigDecimal.ZERO : pkg.getPrice();
        if (price.intValue() > 18000) return "Winter";
        if (fallback(pkg.getCategory(), "").toLowerCase().contains("spiritual")) return "Festival season";
        if (fallback(pkg.getState(), "").equalsIgnoreCase("Kerala")) return "Monsoon";
        return "Year-round";
    }
}
