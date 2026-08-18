package com.southtrails.api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.PrePersist;
import java.time.Instant;
import java.util.UUID;

@Entity
public class LocalEvent {
    @Id private String id;
    private String title;
    private String state;
    private String location;
    private String season;
    private String category;
    @Lob private String impact;
    private String packageId;
    private Instant createdAt;

    @PrePersist void beforeCreate() {
        if (id == null || id.isBlank()) id = "event-" + UUID.randomUUID();
        if (createdAt == null) createdAt = Instant.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getSeason() { return season; }
    public void setSeason(String season) { this.season = season; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getImpact() { return impact; }
    public void setImpact(String impact) { this.impact = impact; }
    public String getPackageId() { return packageId; }
    public void setPackageId(String packageId) { this.packageId = packageId; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
