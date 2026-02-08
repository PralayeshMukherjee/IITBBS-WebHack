package com.example.space.DTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ObjectDTO {
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
