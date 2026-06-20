package com.southtrails.api.entity;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
public class TravelPackage {

    @Id
    private String id;

    @NotBlank
    private String title;

    private String destination;
    private String state;
    @NotBlank
    private String category;
    @Min(1)
    @Max(30)
    private Integer days;
    @Min(0)
    @Max(29)
    private Integer nights;
    @DecimalMin(value = "1.0", message = "Price must be positive")
    private BigDecimal price;
    private String description;
    @Min(1)
    @Max(5)
    private Double rating;
    private String imageFolder;
    private String image1;
    private String image2;
    private String image3;
    private String status;
    private Instant createdAt;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> places = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> included = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> highlights = new ArrayList<>();

    @PrePersist
    void beforeCreate() {
        if (id == null || id.isBlank()) id = UUID.randomUUID().toString();
        if (status == null || status.isBlank()) status = "Active";
        if (createdAt == null) createdAt = Instant.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public Integer getDays() { return days; }
    public void setDays(Integer days) { this.days = days; }
    public Integer getNights() { return nights; }
    public void setNights(Integer nights) { this.nights = nights; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public String getImageFolder() { return imageFolder; }
    public void setImageFolder(String imageFolder) { this.imageFolder = imageFolder; }
    public String getImage1() { return image1; }
    public void setImage1(String image1) { this.image1 = image1; }
    public String getImage2() { return image2; }
    public void setImage2(String image2) { this.image2 = image2; }
    public String getImage3() { return image3; }
    public void setImage3(String image3) { this.image3 = image3; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public List<String> getPlaces() { return places; }
    public void setPlaces(List<String> places) { this.places = places == null ? new ArrayList<>() : places; }
    public List<String> getIncluded() { return included; }
    public void setIncluded(List<String> included) { this.included = included == null ? new ArrayList<>() : included; }
    public List<String> getHighlights() { return highlights; }
    public void setHighlights(List<String> highlights) { this.highlights = highlights == null ? new ArrayList<>() : highlights; }
}
