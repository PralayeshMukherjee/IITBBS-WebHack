package com.example.space.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Entity(name = "Object")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ObjectEntity {
    @Id
    private String id;
    private String name;
    private double absoluteMagnitude;
    private double estimatedDiameterMin;
    private double estimatedDiameterMax;
    private double velocity;
    private double missDistance;
    private boolean potentialHazard;
    private boolean sentry;
    private Date date;
}

