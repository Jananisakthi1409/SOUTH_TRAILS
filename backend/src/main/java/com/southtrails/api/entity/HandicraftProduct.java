package com.southtrails.api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.PrePersist;
import java.time.Instant;
import java.util.UUID;

@Entity
public class HandicraftProduct {
    @Id private String id;
    private String product;
    private String artisan;
    private String state;
    private String origin;
    private Integer price;
    @Lob private String experience;
    private String packageId;
    private Instant createdAt;

    @PrePersist void beforeCreate() {
        if (id == null || id.isBlank()) id = "craft-" + UUID.randomUUID();
        if (createdAt == null) createdAt = Instant.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getProduct() { return product; }
    public void setProduct(String product) { this.product = product; }
    public String getArtisan() { return artisan; }
    public void setArtisan(String artisan) { this.artisan = artisan; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public String getOrigin() { return origin; }
    public void setOrigin(String origin) { this.origin = origin; }
    public Integer getPrice() { return price; }
    public void setPrice(Integer price) { this.price = price; }
    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }
    public String getPackageId() { return packageId; }
    public void setPackageId(String packageId) { this.packageId = packageId; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
