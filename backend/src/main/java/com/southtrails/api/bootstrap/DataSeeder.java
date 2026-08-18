package com.southtrails.api.bootstrap;

import com.southtrails.api.entity.AdminAccount;
import com.southtrails.api.entity.EcoScore;
import com.southtrails.api.entity.GuideProfile;
import com.southtrails.api.entity.HandicraftProduct;
import com.southtrails.api.entity.HomestayListing;
import com.southtrails.api.entity.LocalEvent;
import com.southtrails.api.entity.TravelPackage;
import com.southtrails.api.repository.AdminAccountRepository;
import com.southtrails.api.repository.EcoScoreRepository;
import com.southtrails.api.repository.GuideProfileRepository;
import com.southtrails.api.repository.HandicraftProductRepository;
import com.southtrails.api.repository.HomestayListingRepository;
import com.southtrails.api.repository.LocalEventRepository;
import com.southtrails.api.repository.TravelPackageRepository;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final TravelPackageRepository packages;
    private final AdminAccountRepository admins;
    private final GuideProfileRepository guides;
    private final HomestayListingRepository homestays;
    private final LocalEventRepository events;
    private final HandicraftProductRepository handicrafts;
    private final EcoScoreRepository ecoScores;
    private final PasswordEncoder passwordEncoder;
    private final String adminEmail;
    private final String adminPassword;

    public DataSeeder(
            TravelPackageRepository packages,
            AdminAccountRepository admins,
            GuideProfileRepository guides,
            HomestayListingRepository homestays,
            LocalEventRepository events,
            HandicraftProductRepository handicrafts,
            EcoScoreRepository ecoScores,
            PasswordEncoder passwordEncoder,
            @Value("${app.admin.email:admin@tamiltrails.com}") @org.springframework.lang.NonNull String adminEmail,
            @Value("${app.admin.password:admin123}") @org.springframework.lang.NonNull String adminPassword
    ) {
        this.packages = packages;
        this.admins = admins;
        this.guides = guides;
        this.homestays = homestays;
        this.events = events;
        this.handicrafts = handicrafts;
        this.ecoScores = ecoScores;
        this.passwordEncoder = passwordEncoder;
        this.adminEmail = adminEmail;
        this.adminPassword = adminPassword;
    }

    @Override
    public void run(String... args) {
        seedAdmin();

        packages.findAll().stream()
                .filter(this::isPlaceholderPackage)
                .forEach(pkg -> packages.deleteById(pkg.getId()));

        for (TravelPackage seedPackage : seedPackages()) {
            if (!packages.existsById(seedPackage.getId())) {
                packages.save(seedPackage);
            }
        }

        seedEcosystem();
    }

    private void seedEcosystem() {
        List<TravelPackage> topPackages = packages.findAll().stream()
                .sorted((left, right) -> Double.compare(right.getRating() == null ? 0 : right.getRating(), left.getRating() == null ? 0 : left.getRating()))
                .limit(12)
                .toList();

        if (guides.count() == 0) {
            topPackages.forEach(pkg -> {
                GuideProfile guide = new GuideProfile();
                guide.setId("guide-" + pkg.getId());
                guide.setName(guideName(pkg));
                guide.setState(pkg.getState());
                guide.setBaseLocation(fallback(pkg.getDestination(), pkg.getState()));
                guide.setSpeciality(pkg.getCategory());
                guide.setLanguages("English, " + localLanguage(pkg.getState()) + ", Hindi");
                guide.setRating(pkg.getRating() == null ? 4.7 : pkg.getRating());
                guide.setVerified(true);
                guide.setPricePerDay(1800 + ((Math.abs(pkg.getId().hashCode()) % 8) * 250));
                guide.setPackageId(pkg.getId());
                guides.save(guide);
            });
        }

        if (homestays.count() == 0) {
            topPackages.forEach(pkg -> {
                HomestayListing stay = new HomestayListing();
                stay.setId("stay-" + pkg.getId());
                stay.setName(fallback(pkg.getDestination(), pkg.getTitle()) + " Community Homestay");
                stay.setState(pkg.getState());
                stay.setLocation(fallback(pkg.getDestination(), "Local village cluster"));
                stay.setHost(hostName(pkg));
                stay.setCapacity(2 + Math.abs(pkg.getId().hashCode()) % 5);
                stay.setPricePerNight(1600 + ((Math.abs(pkg.getId().hashCode()) % 7) * 300));
                stay.setCommunityScore(82 + Math.abs(pkg.getId().hashCode()) % 15);
                stay.setAmenities("Local breakfast, Verified host, Cultural walk");
                stay.setPackageId(pkg.getId());
                homestays.save(stay);
            });
        }

        if (events.count() == 0) {
            topPackages.forEach(pkg -> {
                LocalEvent event = new LocalEvent();
                event.setId("event-" + pkg.getId());
                event.setTitle(fallback(pkg.getDestination(), pkg.getState()) + " Seasonal Culture Week");
                event.setState(pkg.getState());
                event.setLocation(fallback(pkg.getDestination(), "Regional cultural venue"));
                event.setSeason("Kerala".equalsIgnoreCase(pkg.getState()) ? "Monsoon" : "Year-round");
                event.setCategory(pkg.getCategory());
                event.setImpact("Connects travelers with local festivals, food, craft, and seasonal attractions.");
                event.setPackageId(pkg.getId());
                events.save(event);
            });
        }

        if (handicrafts.count() == 0) {
            topPackages.forEach(pkg -> {
                HandicraftProduct product = new HandicraftProduct();
                product.setId("craft-" + pkg.getId());
                product.setProduct(craftProduct(pkg));
                product.setArtisan(artisanName(pkg));
                product.setState(pkg.getState());
                product.setOrigin(fallback(pkg.getDestination(), "Local artisan cluster"));
                product.setPrice(499 + ((Math.abs(pkg.getId().hashCode()) % 15) * 120));
                product.setExperience("Can be bundled as a cultural stop in custom itineraries.");
                product.setPackageId(pkg.getId());
                handicrafts.save(product);
            });
        }

        packages.findAll().stream().limit(24).forEach(pkg -> {
            if (ecoScores.findByPackageId(pkg.getId()).isEmpty()) {
                int seed = Math.abs(pkg.getId().hashCode());
                EcoScore score = new EcoScore();
                score.setId("eco-" + pkg.getId());
                score.setPackageId(pkg.getId());
                score.setSustainabilityScore(70 + seed % 26);
                score.setCommunityImpactScore(68 + seed % 28);
                score.setGreenIndicators("Local partner potential, Low-waste itinerary guidance, Community commerce ready");
                ecoScores.save(score);
            }
        });
    }

    private void seedAdmin() {
        if (adminEmail != null && !adminEmail.isBlank()) {
            admins.findByEmailIgnoreCase(adminEmail).orElseGet(() -> {
                AdminAccount admin = new AdminAccount();
                admin.setEmail(adminEmail);
                admin.setName("Admin User");
                admin.setRole("ADMIN");
                admin.setActive(true);
                admin.setPasswordHash(passwordEncoder.encode(adminPassword));
                return admins.save(admin);
            });
        }
    }

    private List<TravelPackage> seedPackages() {
        List<TravelPackage> items = new ArrayList<>();
        var stream = getClass().getResourceAsStream("/package-seed.psv");
        if (stream == null) return items;

        try (var reader = new BufferedReader(new InputStreamReader(stream, StandardCharsets.UTF_8))) {
            reader.lines()
                    .map((String line) -> line.trim())
                    .filter(line -> !line.isBlank() && !line.startsWith("#"))
                    .map(line -> line.split("\\|", -1))
                    .filter(parts -> parts.length >= 10)
                    .map(parts -> pkg(
                            parts[0],
                            parts[1],
                            parts[2],
                            parts[3],
                            parts[4],
                            parseInt(parts[5]),
                            parseInt(parts[6]),
                            parseInt(parts[7]),
                            parseDouble(parts[8]),
                            parts[9]
                    ))
                    .forEach(items::add);
        } catch (Exception ignored) {
            return items;
        }

        return items;
    }

    private TravelPackage pkg(String id, String title, String destination, String state, String category, int days, int nights, int price, double rating, String imageFolder) {
        TravelPackage pkg = new TravelPackage();
        pkg.setId(id);
        pkg.setTitle(title);
        pkg.setDestination(destination);
        pkg.setState(state);
        pkg.setCategory(category);
        pkg.setDays(days);
        pkg.setNights(nights);
        pkg.setPrice(BigDecimal.valueOf(price));
        pkg.setRating(rating);
        pkg.setImageFolder(imageFolder);
        pkg.setDescription("Curated Tamil Nadu itinerary with premium stays, guided routes, and flexible booking support.");
        pkg.setPlaces(List.of(destination.split(", ")));
        pkg.setIncluded(List.of("Hotel stay", "Private transport", "Local guide", "Breakfast"));
        pkg.setHighlights(List.of("Premium route planning", "Verified stays", "Local cultural experiences"));
        return pkg;
    }

    private int parseInt(String value) {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException ignored) {
            return 0;
        }
    }

    private double parseDouble(String value) {
        try {
            return Double.parseDouble(value);
        } catch (NumberFormatException ignored) {
            return 4.7;
        }
    }

    private boolean isPlaceholderPackage(TravelPackage pkg) {
        return "string".equalsIgnoreCase(pkg.getDescription())
                || "string".equalsIgnoreCase(pkg.getStatus())
                || "string".equalsIgnoreCase(pkg.getDestination());
    }

    private String fallback(String value, String fallback) {
        return value == null || value.isBlank() ? fallback : value;
    }

    private String localLanguage(String state) {
        if ("Tamil Nadu".equalsIgnoreCase(state)) return "Tamil";
        return "Tamil";
    }

    private String guideName(TravelPackage pkg) {
        if ("Tamil Nadu".equalsIgnoreCase(pkg.getState())) return "Arun Heritage Guide";
        return "Verified Tamil Trails Guide";
    }

    private String hostName(TravelPackage pkg) {
        if ("Tamil Nadu".equalsIgnoreCase(pkg.getState())) return "Lakshmi";
        return "Local Host";
    }

    private String artisanName(TravelPackage pkg) {
        if ("Tamil Nadu".equalsIgnoreCase(pkg.getState())) return "Chettinad Craft Collective";
        return "Tamil Trails Artisan Collective";
    }

    private String craftProduct(TravelPackage pkg) {
        if ("Tamil Nadu".equalsIgnoreCase(pkg.getState())) return "Temple brass keepsake";
        return "Traditional local craft";
    }
}
