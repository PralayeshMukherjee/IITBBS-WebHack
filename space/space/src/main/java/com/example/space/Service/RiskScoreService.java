package com.example.space.Service;

import com.example.space.Entity.ObjectEntity;
import org.springframework.stereotype.Service;

@Service
public class RiskScoreService {
    private static final double AU_IN_KM = 149_597_870.7;
    public static double kmToAU(double kilometers) {
        return kilometers / AU_IN_KM;
    }
    public double calculateRisk(ObjectEntity asteroid) {
        double distanceScore = Math.exp(-4*kmToAU(asteroid.getMissDistance()))*50;
        double sizeScore = Math.log10(((asteroid.getEstimatedDiameterMin()+asteroid.getEstimatedDiameterMin())/2)+1)*15;
        double hazaredScore = asteroid.isPotentialHazard() ? 5:0;
        double sentryScore = asteroid.isSentry() ? 5:0;
        double riskScore = Math.min((distanceScore+sizeScore
        +hazaredScore+sentryScore),100);
        return riskScore;
    }

    public String riskLevel(double score) {
        if (score > 0.7) return "HIGH";
        if (score > 0.3) return "MEDIUM";
        return "LOW";
    }
}

