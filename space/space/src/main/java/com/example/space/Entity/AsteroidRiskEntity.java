package com.example.space.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Table(name = "asteroid_risk")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AsteroidRiskEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String asteroidId;

    private double riskScore;

    private String riskLevel;

    private Date calculatedAt;
}
