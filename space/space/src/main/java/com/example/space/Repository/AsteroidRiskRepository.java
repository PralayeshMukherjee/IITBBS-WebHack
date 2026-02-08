package com.example.space.Repository;

import com.example.space.Entity.AsteroidRiskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AsteroidRiskRepository
        extends JpaRepository<AsteroidRiskEntity, Long> {

    Optional<AsteroidRiskEntity> findByAsteroidId(String asteroidId);
    List<AsteroidRiskEntity> findByRiskLevel(String riskLevel);
}
