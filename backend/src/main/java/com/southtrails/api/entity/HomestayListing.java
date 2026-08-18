package com.southtrails.api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import java.time.Instant;
import java.util.UUID;

@Entity
public class HomestayListing {
    @Id private String id;
    private String name;
    private String state;
    private String location;
    private String host;
    private Integer capacity;
    private Integer pricePerNight;
    private Integer communityScore;
    private String amenities;
    private String packageId;
    private Instant createdAt;

    @PrePersist void beforeCreate() {
        if (id == null || id.isBlank()) id = "stay-" + UUID.randomUUID();
        if (createdAt == null) createdAt = Instant.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getHost() { return host; }
    public void setHost(String host) { this.host = host; }
    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }
    public Integer getPricePerNight() { return pricePerNight; }
    public void setPricePerNight(Integer pricePerNight) { this.pricePerNight = pricePerNight; }
    public Integer getCommunityScore() { return communityScore; }
    public void setCommunityScore(Integer communityScore) { this.communityScore = communityScore; }
    public String getAmenities() { return amenities; }
    public void setAmenities(String amenities) { this.amenities = amenities; }
    public String getPackageId() { return packageId; }
    public void setPackageId(String packageId) { this.packageId = packageId; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
