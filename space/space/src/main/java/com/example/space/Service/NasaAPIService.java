package com.example.space.Service;


import com.example.space.Entity.AsteroidRiskEntity;
import com.example.space.Entity.ObjectEntity;
import com.example.space.Repository.AsteroidRiskRepository;
import com.example.space.Repository.ObjectRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RequiredArgsConstructor
@Service
public class NasaAPIService {

    private final ObjectRepository objectRepository;
    private final AsteroidRiskRepository riskRepository;
    private final RiskScoreService riskScoreService;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();


//    private static final String NASA_URL ="https://api.nasa.gov/neo/rest/v1/feed?start_date=2026-02-01&end_date=2026-02-02&api_key=KPv3uZNJZ55JdL1E9dcZS8lh2cRpaHPEB7Li89PW";
    private static final String API_Key = "KPv3uZNJZ55JdL1E9dcZS8lh2cRpaHPEB7Li89PW";
    public List<ObjectEntity> fetchAndSaveData(Date start,Date end) throws Exception {
        List<ObjectEntity> asteroiedList = new ArrayList<>();
        String startDate = String.valueOf(start);
        String endDate = String.valueOf(end);
        String NASA_URL = "https://api.nasa.gov/neo/rest/v1/feed?start_date="+startDate+"&end_date="+endDate+"&api_key="+API_KEY;

        String response = restTemplate.getForObject(NASA_URL, String.class);
        JsonNode root = objectMapper.readTree(response);

        JsonNode neoData = root.get("near_earth_objects");

        neoData.fieldNames().forEachRemaining(date -> {
            for (JsonNode asteroid : neoData.get(date)) {

                ObjectEntity entity = mapToEntity(asteroid, date);
                objectRepository.save(entity);
                asteroiedList.add(entity);
                saveRiskScore(entity);
            }
        });
        return asteroiedList;
    }
    private void saveRiskScore(ObjectEntity asteroid) {
        if (riskRepository.findByAsteroidId(asteroid.getId()).isPresent()) {
            return;
        }
        double score = riskScoreService.calculateRisk(asteroid);
        String level = riskScoreService.riskLevel(score);

        AsteroidRiskEntity risk = new AsteroidRiskEntity();
        risk.setAsteroidId(asteroid.getId());
        risk.setRiskScore(score);
        risk.setRiskLevel(level);
        risk.setCalculatedAt(new Date(System.currentTimeMillis()));

        riskRepository.save(risk);
    }



    private ObjectEntity mapToEntity(JsonNode asteroid, String date) {

        JsonNode diameter =
                asteroid.get("estimated_diameter").get("kilometers");

        JsonNode approach =
                asteroid.get("close_approach_data").get(0);

        ObjectEntity entity = new ObjectEntity();

        entity.setId(asteroid.get("id").asText());
        entity.setName(asteroid.get("name").asText());
        entity.setAbsoluteMagnitude(
                asteroid.get("absolute_magnitude_h").asDouble()
        );

        entity.setEstimatedDiameterMin(
                diameter.get("estimated_diameter_min").asDouble()
        );
        entity.setEstimatedDiameterMax(
                diameter.get("estimated_diameter_max").asDouble()
        );

        entity.setVelocity(
                approach.get("relative_velocity")
                        .get("kilometers_per_hour").asDouble()
        );

        entity.setMissDistance(
                approach.get("miss_distance")
                        .get("kilometers").asDouble()
        );

        entity.setPotentialHazard(
                asteroid.get("is_potentially_hazardous_asteroid").asBoolean()
        );

        entity.setSentry(
                asteroid.get("is_sentry_object").asBoolean()
        );

        entity.setDate(Date.valueOf(date));

        return entity;
    }
    private final RestTemplate rest = new RestTemplate();

    private static final String API_KEY = "KPv3uZNJZ55JdL1E9dcZS8lh2cRpaHPEB7Li89PW";
    public String getAsteroidById(String id) {
        String url = "https://api.nasa.gov/neo/rest/v1/neo/"
                + id
                + "?api_key="
                + API_KEY;

        return rest.getForObject(url, String.class);
    }

}
