package com.example.space.Controller;


import com.example.space.Authentication.JwtUtil;
import com.example.space.DTO.AddUser;
import com.example.space.Entity.UserEntity;
import com.example.space.Entity.UserObjectHistory;
import com.example.space.Service.UserSearchService;
import com.example.space.Service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserAuthenticationController {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;
    @PostMapping("/signup")
    public Map<String,Boolean> addNewUser(@RequestBody AddUser addUser){
        String emailId = addUser.getEmailId().trim();
        String password = addUser.getPassword().trim();
        boolean isGenerated = userService.generateOTP(emailId);
        boolean isSend = false;
        if(isGenerated){
            isSend = userService.sendOTPToEmail(emailId);
        }
        return Map.of("isSend",isSend);
    }
    @PostMapping("/verifyOtp")
    public Map<String,Boolean> verifyTheOTP(@RequestParam String otp, String emailId, String name){
        boolean isVerified = userService.verifyOTP(emailId,otp);
        return Map.of("isVerified",isVerified);
    }
    @PostMapping("/success")
    public Map<String,String> successFullyRegister(@RequestBody AddUser addUser){
        String emailId = addUser.getEmailId();
        String password = addUser.getPassword();
        boolean isSuccessfullyRegister = userService.successRegister(emailId,password);
        if (!isSuccessfullyRegister) {
            return Map.of("isSuccessfullyRegister", "false");
        }
        String token = jwtUtil.generateTokenManually(emailId,password);
        return Map.of("isSuccessfullyRegister","true",
                "token", token
        );
    }
    @PostMapping("/login")
    public Map<String,String> LoginUser(@RequestParam String emailId, String password){
        String result = userService.SuccessfullyLogin(emailId,password);
        String token = jwtUtil.generateTokenManually(emailId,password);
        return Map.of("result",result,
                "token",token
        );
    }
    @Autowired
    public UserSearchService searchService;

    @GetMapping("/search-history")
    public List<UserObjectHistory> getSearchHistory(@RequestParam String email) {
        return searchService.getUserSearchHistory(email);
    }
}