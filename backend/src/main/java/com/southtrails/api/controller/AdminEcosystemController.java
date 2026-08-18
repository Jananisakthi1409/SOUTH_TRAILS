package com.southtrails.api.controller;

import com.southtrails.api.entity.EcoScore;
import com.southtrails.api.entity.GuideProfile;
import com.southtrails.api.entity.HandicraftProduct;
import com.southtrails.api.entity.HomestayListing;
import com.southtrails.api.entity.ItineraryPlan;
import com.southtrails.api.entity.LocalEvent;
import com.southtrails.api.entity.NotificationItem;
import com.southtrails.api.repository.EcoScoreRepository;
import com.southtrails.api.repository.GuideProfileRepository;
import com.southtrails.api.repository.HandicraftProductRepository;
import com.southtrails.api.repository.HomestayListingRepository;
import com.southtrails.api.repository.ItineraryPlanRepository;
import com.southtrails.api.repository.LocalEventRepository;
import com.southtrails.api.repository.NotificationItemRepository;
import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/ecosystem")
public class AdminEcosystemController {

    private final GuideProfileRepository guides;
    private final HomestayListingRepository homestays;
    private final LocalEventRepository events;
    private final HandicraftProductRepository handicrafts;
    private final EcoScoreRepository ecoScores;
    private final NotificationItemRepository notifications;
    private final ItineraryPlanRepository itineraries;

    public AdminEcosystemController(
            GuideProfileRepository guides,
            HomestayListingRepository homestays,
            LocalEventRepository events,
            HandicraftProductRepository handicrafts,
            EcoScoreRepository ecoScores,
            NotificationItemRepository notifications,
            ItineraryPlanRepository itineraries
    ) {
        this.guides = guides;
        this.homestays = homestays;
        this.events = events;
        this.handicrafts = handicrafts;
        this.ecoScores = ecoScores;
        this.notifications = notifications;
        this.itineraries = itineraries;
    }

    @GetMapping("/guides")
    List<GuideProfile> guides() {
        return guides.findAll().stream()
                .sorted(Comparator.comparing(GuideProfile::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder())))
                .toList();
    }

    @PostMapping("/guides")
    GuideProfile createGuide(@RequestBody GuideProfile payload) {
        payload.setId(blankToNull(payload.getId()));
        return guides.save(payload);
    }

    @PutMapping("/guides/{id}")
    ResponseEntity<GuideProfile> updateGuide(@PathVariable String id, @RequestBody GuideProfile payload) {
        return guides.findById(id)
                .map(existing -> {
                    payload.setId(existing.getId());
                    payload.setCreatedAt(existing.getCreatedAt());
                    return ResponseEntity.ok(guides.save(payload));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/guides/{id}")
    ResponseEntity<Void> deleteGuide(@PathVariable String id) {
        if (!guides.existsById(id)) return ResponseEntity.notFound().build();
        guides.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/homestays")
    List<HomestayListing> homestays() {
        return homestays.findAll().stream()
                .sorted(Comparator.comparing(HomestayListing::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder())))
                .toList();
    }

    @PostMapping("/homestays")
    HomestayListing createHomestay(@RequestBody HomestayListing payload) {
        payload.setId(blankToNull(payload.getId()));
        return homestays.save(payload);
    }

    @PutMapping("/homestays/{id}")
    ResponseEntity<HomestayListing> updateHomestay(@PathVariable String id, @RequestBody HomestayListing payload) {
        return homestays.findById(id)
                .map(existing -> {
                    payload.setId(existing.getId());
                    payload.setCreatedAt(existing.getCreatedAt());
                    return ResponseEntity.ok(homestays.save(payload));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/homestays/{id}")
    ResponseEntity<Void> deleteHomestay(@PathVariable String id) {
        if (!homestays.existsById(id)) return ResponseEntity.notFound().build();
        homestays.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/events")
    List<LocalEvent> events() {
        return events.findAll().stream()
                .sorted(Comparator.comparing(LocalEvent::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder())))
                .toList();
    }

    @PostMapping("/events")
    LocalEvent createEvent(@RequestBody LocalEvent payload) {
        payload.setId(blankToNull(payload.getId()));
        return events.save(payload);
    }

    @PutMapping("/events/{id}")
    ResponseEntity<LocalEvent> updateEvent(@PathVariable String id, @RequestBody LocalEvent payload) {
        return events.findById(id)
                .map(existing -> {
                    payload.setId(existing.getId());
                    payload.setCreatedAt(existing.getCreatedAt());
                    return ResponseEntity.ok(events.save(payload));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/events/{id}")
    ResponseEntity<Void> deleteEvent(@PathVariable String id) {
        if (!events.existsById(id)) return ResponseEntity.notFound().build();
        events.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/handicrafts")
    List<HandicraftProduct> handicrafts() {
        return handicrafts.findAll().stream()
                .sorted(Comparator.comparing(HandicraftProduct::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder())))
                .toList();
    }

    @PostMapping("/handicrafts")
    HandicraftProduct createHandicraft(@RequestBody HandicraftProduct payload) {
        payload.setId(blankToNull(payload.getId()));
        return handicrafts.save(payload);
    }

    @PutMapping("/handicrafts/{id}")
    ResponseEntity<HandicraftProduct> updateHandicraft(@PathVariable String id, @RequestBody HandicraftProduct payload) {
        return handicrafts.findById(id)
                .map(existing -> {
                    payload.setId(existing.getId());
                    payload.setCreatedAt(existing.getCreatedAt());
                    return ResponseEntity.ok(handicrafts.save(payload));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/handicrafts/{id}")
    ResponseEntity<Void> deleteHandicraft(@PathVariable String id) {
        if (!handicrafts.existsById(id)) return ResponseEntity.notFound().build();
        handicrafts.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/eco-scores")
    List<EcoScore> ecoScores() {
        return ecoScores.findAll().stream()
                .sorted(Comparator.comparing(EcoScore::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder())))
                .toList();
    }

    @PostMapping("/eco-scores")
    EcoScore createEcoScore(@RequestBody EcoScore payload) {
        payload.setId(blankToNull(payload.getId()));
        return ecoScores.save(payload);
    }

    @PutMapping("/eco-scores/{id}")
    ResponseEntity<EcoScore> updateEcoScore(@PathVariable String id, @RequestBody EcoScore payload) {
        return ecoScores.findById(id)
                .map(existing -> {
                    payload.setId(existing.getId());
                    payload.setCreatedAt(existing.getCreatedAt());
                    return ResponseEntity.ok(ecoScores.save(payload));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/eco-scores/{id}")
    ResponseEntity<Void> deleteEcoScore(@PathVariable String id) {
        if (!ecoScores.existsById(id)) return ResponseEntity.notFound().build();
        ecoScores.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/notifications")
    List<NotificationItem> notifications() {
        return notifications.findAll().stream()
                .sorted(Comparator.comparing(NotificationItem::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder())))
                .toList();
    }

    @PostMapping("/notifications")
    NotificationItem createNotification(@RequestBody NotificationItem payload) {
        payload.setId(blankToNull(payload.getId()));
        return notifications.save(payload);
    }

    @PutMapping("/notifications/{id}")
    ResponseEntity<NotificationItem> updateNotification(@PathVariable String id, @RequestBody NotificationItem payload) {
        return notifications.findById(id)
                .map(existing -> {
                    payload.setId(existing.getId());
                    payload.setCreatedAt(existing.getCreatedAt());
                    return ResponseEntity.ok(notifications.save(payload));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/notifications/{id}")
    ResponseEntity<Void> deleteNotification(@PathVariable String id) {
        if (!notifications.existsById(id)) return ResponseEntity.notFound().build();
        notifications.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/itineraries")
    List<ItineraryPlan> itineraries() {
        return itineraries.findAll().stream()
                .sorted(Comparator.comparing(ItineraryPlan::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder())))
                .toList();
    }

    @PostMapping("/itineraries")
    ItineraryPlan createItinerary(@RequestBody ItineraryPlan payload) {
        payload.setId(blankToNull(payload.getId()));
        if (payload.getCreatedAt() == null) payload.setCreatedAt(Instant.now());
        return itineraries.save(payload);
    }

    @PutMapping("/itineraries/{id}")
    ResponseEntity<ItineraryPlan> updateItinerary(@PathVariable String id, @RequestBody ItineraryPlan payload) {
        return itineraries.findById(id)
                .map(existing -> {
                    payload.setId(existing.getId());
                    payload.setCreatedAt(existing.getCreatedAt());
                    return ResponseEntity.ok(itineraries.save(payload));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/itineraries/{id}")
    ResponseEntity<Void> deleteItinerary(@PathVariable String id) {
        if (!itineraries.existsById(id)) return ResponseEntity.notFound().build();
        itineraries.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value;
    }
}
