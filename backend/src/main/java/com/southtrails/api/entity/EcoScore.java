package com.southtrails.api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "packageId"))
public class EcoScore {
    @Id private String id;
    private String packageId;
    private Integer sustainabilityScore;
    private Integer communityImpactScore;
    private String greenIndicators;
    private Instant createdAt;

    @PrePersist void beforeCreate() {
        if (id == null || id.isBlank()) id = "eco-" + UUID.randomUUID();
        if (createdAt == null) createdAt = Instant.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getPackageId() { return packageId; }
    public void setPackageId(String packageId) { this.packageId = packageId; }
    public Integer getSustainabilityScore() { return sustainabilityScore; }
    public void setSustainabilityScore(Integer sustainabilityScore) { this.sustainabilityScore = sustainabilityScore; }
    public Integer getCommunityImpactScore() { return communityImpactScore; }
    public void setCommunityImpactScore(Integer communityImpactScore) { this.communityImpactScore = communityImpactScore; }
    public String getGreenIndicators() { return greenIndicators; }
    public void setGreenIndicators(String greenIndicators) { this.greenIndicators = greenIndicators; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
