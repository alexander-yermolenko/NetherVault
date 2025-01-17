package com.yermolenko.minecraftserver.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;
import java.util.Map;

@RestController
public class MinecraftLoginController {

    @CrossOrigin(origins = "http://localhost:3000") // Add CORS support for frontend
    @GetMapping("/api/minecraft-login")
    public ResponseEntity<Map<String, String>> getMinecraftUserData(@RequestParam String username) {
        try {
            // Call Mojang API to get user data
            String mojangUrl = "https://api.mojang.com/users/profiles/minecraft/" + username;
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Map> response = restTemplate.getForEntity(mojangUrl, Map.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                Map<String, String> userData = response.getBody();
                assert userData != null;
                String uuid = (String) userData.get("id");

                // Get skin URL using UUID
                String skinUrl = "https://crafatar.com/avatars/" + uuid;

                Map<String, String> result = new HashMap<>();
                result.put("username", username);
                result.put("skinUrl", skinUrl);

                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "Minecraft user not found"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error fetching user data"));
        }
    }
}
