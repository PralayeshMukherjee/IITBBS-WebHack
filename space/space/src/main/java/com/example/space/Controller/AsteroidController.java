package com.example.space.Controller;


import com.example.space.Entity.AsteroidRiskEntity;
import com.example.space.Entity.ObjectEntity;
import com.example.space.Repository.AsteroidRiskRepository;
import com.example.space.Service.ListOfObjectService;
import com.example.space.Service.NasaAPIService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/asteroids")
@RequiredArgsConstructor
public class AsteroidController {

//    private final ListOfObjectService listOfObjectService;
    @Autowired
    public NasaAPIService nasaAPIService;
    @GetMapping("/between-dates")
    public List<ObjectEntity> getAsteroidsBetweenDates(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end
    ) throws Exception {
        return nasaAPIService.fetchAndSaveData(
                Date.valueOf(start),
                Date.valueOf(end)
        );
    }
    @GetMapping("/searchViaId")
    public String getAsteroidDetails(@RequestParam String id) throws JsonProcessingException {
        return nasaAPIService.getAsteroidById(id);
    }
    private final AsteroidRiskRepository riskRepository;

    @GetMapping("/high-risk")
    public List<AsteroidRiskEntity> getHighRiskAsteroids() {
        return riskRepository.findByRiskLevel("HIGH");
    }
}
