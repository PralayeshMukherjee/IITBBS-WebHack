package com.example.space.Controller;

import com.example.space.Service.NasaAPIService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class NasaController {

    private final NasaAPIService nasaService;

    @GetMapping("/fetch-nasa-data")
    public String fetchData() throws Exception {
//        nasaService.fetchAndSaveData();
        return "NASA data saved successfully 🚀";
    }
}
