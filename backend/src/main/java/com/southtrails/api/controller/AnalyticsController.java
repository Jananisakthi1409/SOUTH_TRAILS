package com.southtrails.api.controller;

import com.southtrails.api.entity.Booking;
import com.southtrails.api.entity.TravelPackage;
import com.southtrails.api.repository.BookingRepository;
import com.southtrails.api.repository.CustomerRepository;
import com.southtrails.api.repository.ReviewRepository;
import com.southtrails.api.repository.TravelPackageRepository;
import java.math.BigDecimal;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final BookingRepository bookings;
    private final TravelPackageRepository packages;
    private final CustomerRepository customers;
    private final ReviewRepository reviews;

    public AnalyticsController(
            BookingRepository bookings,
            TravelPackageRepository packages,
            CustomerRepository customers,
            ReviewRepository reviews
    ) {
        this.bookings = bookings;
        this.packages = packages;
        this.customers = customers;
        this.reviews = reviews;
    }

    @GetMapping
    Map<String, Object> overview() {
        List<Booking> allBookings = bookings.findAll();
        List<TravelPackage> allPackages = packages.findAll();
        Map<String, TravelPackage> packagesById = allPackages.stream()
                .collect(Collectors.toMap(TravelPackage::getId, Function.identity(), (left, right) -> left));

        BigDecimal revenue = allBookings.stream()
                .map(Booking::getTotalAmount)
                .filter(amount -> amount != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Long> bookingsByStatus = allBookings.stream()
                .collect(Collectors.groupingBy(
                        booking -> blankDefault(booking.getStatus(), "Pending"),
                        LinkedHashMap::new,
                        Collectors.counting()
                ));

        Map<String, Long> bookingsByState = allBookings.stream()
                .map(booking -> packagesById.get(booking.getPackageId()))
                .filter(pkg -> pkg != null)
                .collect(Collectors.groupingBy(
                        pkg -> blankDefault(pkg.getState(), "South India"),
                        LinkedHashMap::new,
                        Collectors.counting()
                ));

        Map<String, BigDecimal> revenueByState = allBookings.stream()
                .filter(booking -> booking.getTotalAmount() != null)
                .collect(Collectors.groupingBy(
                        booking -> {
                            TravelPackage pkg = packagesById.get(booking.getPackageId());
                            return pkg == null ? "South India" : blankDefault(pkg.getState(), "South India");
                        },
                        LinkedHashMap::new,
                        Collectors.reducing(BigDecimal.ZERO, Booking::getTotalAmount, BigDecimal::add)
                ));

        Map<String, Long> bookingsByMonth = allBookings.stream()
                .filter(booking -> booking.getCreatedAt() != null)
                .collect(Collectors.groupingBy(
                        booking -> booking.getCreatedAt().toString().substring(0, 7),
                        LinkedHashMap::new,
                        Collectors.counting()
                ));

        Map<String, Long> sentimentSummary = reviews.findAll().stream()
                .collect(Collectors.groupingBy(
                        review -> classifySentiment(review.getText(), review.getRating()),
                        LinkedHashMap::new,
                        Collectors.counting()
                ));

        List<Map<String, Object>> topPackages = allBookings.stream()
                .collect(Collectors.groupingBy(Booking::getPackageId, Collectors.counting()))
                .entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(5)
                .map(entry -> {
                    TravelPackage pkg = packagesById.get(entry.getKey());
                    return Map.<String, Object>of(
                            "id", entry.getKey(),
                            "title", pkg == null ? entry.getKey() : pkg.getTitle(),
                            "state", pkg == null ? "South India" : blankDefault(pkg.getState(), "South India"),
                            "bookings", entry.getValue()
                    );
                })
                .toList();

        List<Booking> recentBookings = allBookings.stream()
                .sorted(Comparator.comparing(Booking::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder())))
                .limit(8)
                .toList();

        return Map.of(
                "totals", Map.of(
                        "packages", allPackages.size(),
                        "bookings", allBookings.size(),
                        "customers", customers.count(),
                        "reviews", reviews.count(),
                        "revenue", revenue
                ),
                "bookingsByStatus", bookingsByStatus,
                "bookingsByState", bookingsByState,
                "bookingsByMonth", bookingsByMonth,
                "revenueByState", revenueByState,
                "sentimentSummary", sentimentSummary,
                "topPackages", topPackages,
                "recentBookings", recentBookings,
                "aiInsights", List.of(
                        "Promote the top-booked state with guide and homestay bundles.",
                        "Use sentiment complaints as service recovery tasks in the admin workspace.",
                        "Push seasonal event alerts to travelers before high-demand months.",
                        "Show eco-score badges on package cards to strengthen responsible tourism positioning."
                )
        );
    }

    private String blankDefault(String value, String fallback) {
        return value == null || value.isBlank() ? fallback : value;
    }

    private String classifySentiment(String text, Integer rating) {
        String body = text == null ? "" : text.toLowerCase();
        if ((rating != null && rating <= 2) || body.matches(".*(bad|poor|late|delay|dirty|refund|complaint|worst|issue).*")) {
            return "Negative";
        }
        if ((rating != null && rating >= 4) || body.matches(".*(great|excellent|amazing|good|memorable|beautiful|smooth).*")) {
            return "Positive";
        }
        return "Neutral";
    }
}
