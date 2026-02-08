package com.example.space.Service;


import com.example.space.Entity.UserEntity;
import com.example.space.Repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class OtpServiceForgotPassword {
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    private static final int otpLenght = 6;
    private Map<String,String > otpMapping = new HashMap<>();
    public boolean generateOTP(String emailId){
        String generatedOTP = "";
        for(int i=1;i<=otpLenght;i++){
            generatedOTP += String.valueOf((int)(Math.random()*9)+1);
        }
        otpMapping.put(emailId,generatedOTP);
        ScheduledExecutorService scheduledExecutorService = Executors.newScheduledThreadPool(1);
        scheduledExecutorService.schedule(()->otpMapping.remove(emailId),2, TimeUnit.MINUTES);
//       the ScheduledExecutorService is a java utility that used to schedule the task. It basically schedule any task execute after a define time stamp you can decide the time stamp here I decide minutes. It is better than Treade.sleep() method because it doesnot block the main tread. Executors.newScheduledThreadPool(1) means it create a thread pool with 1 background thread to handle the schedule task.
        return true;
    }
    public boolean sendOTPToEmail(String email){
        try{
            String otp = otpMapping.get(email); // OTP already generated and mapped
            System.out.println("OTP sent to email: " + email + " => " + otp);

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);

            messageHelper.setFrom("rajmukherjeegcp@gmail.com");
            messageHelper.setTo(email);
            messageHelper.setSubject("🔐 DeepThreat - OTP for Password Reset");
            String emailBody =
                    "<!DOCTYPE html>" +
                            "<html>" +
                            "<head>" +
                            "<meta charset='UTF-8'>" +
                            "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
                            "<title>OTP for Password Reset</title>" +
                            "</head>" +
                            "<body style='margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #0f172a;'>" +

                            "<div style='max-width: 600px; margin: auto; padding: 30px; background-color: #1e293b; border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); color: #e2e8f0;'>"
                            +

                            // Logo and Title
                            "<div style='text-align: center; margin-bottom: 20px;'>" +
                            "  <img src='cid:deepThreatLogo' alt='DeepThreat Logo' style='height: 60px; margin-bottom: 15px; display: block;' />" +
                            "  <div style=\"color: white; font-size: 14px;\">DeepThreat Logo</div>" +
                            "  <h2 style='color: #38bdf8;'>Reset Your Password</h2>" +
                            "</div>"+

                            // Message
                            "<p style='font-size: 16px; color: #cbd5e1;'>We received a request to reset your password associated with this email. Please use the One-Time Password (OTP) below to proceed with resetting your password:</p>" +

                            // OTP Box
                            "<div style='text-align: center; margin: 30px 0;'>" +
                            "<div style='display: inline-block; padding: 12px 24px; font-size: 24px; font-weight: bold; color: #22d3ee; background-color: #0f172a; border: 2px dashed #22d3ee; border-radius: 8px;'>" +
                            otp +
                            "</div>" +
                            "</div>" +

                            // Additional Instructions
                            "<p style='font-size: 14px; color: #94a3b8;'>Please enter this OTP in the DeepThreat app/website to continue resetting your password. The OTP is valid for <strong>10 minutes</strong>.</p>" +

                            // Security Notice
                            "<hr style='margin: 30px 0; border-color: #334155;'/>" +
                            "<p style='font-size: 16px; color: #f87171; font-weight: bold;'>Important Security Notice:</p>" +
                            "<ul style='font-size: 14px; color: #94a3b8; padding-left: 20px;'>" +
                            "<li>This OTP is strictly confidential. Never share it with anyone — not even DeepThreat staff.</li>" +
                            "<li>If you did not request this OTP, please ignore this email or contact our support team immediately.</li>" +
                            "<li>This OTP will expire after one use or 10 minutes.</li>" +
                            "</ul>" +

                            // Help & Footer
                            "<p style='font-size: 14px; color: #94a3b8;'>Need help? Reach us at <a href='mailto:support@deepthreat.com' style='color: #60a5fa;'>support@deepthreat.com</a></p>" +

                            "<p style='font-size: 13px; color: #64748b; text-align: center; margin-top: 40px;'>© 2025 DeepThreat Security. All rights reserved.</p>" +
                            "</div>" +

                            "</body>" +
                            "</html>";
            messageHelper.setText(emailBody, true);
            javaMailSender.send(mimeMessage);
            return true;
        } catch (MessagingException e) {
            System.out.println(e.getMessage());
            return false;
        }
    }
    public String verifyOTP(String emailId, String otp,String newPassword){
        if(otpMapping.containsKey(emailId)){
            if(otpMapping.get(emailId).equals(otp)){
                otpMapping.remove(emailId);
                if(updatePassword(emailId,newPassword)){
                    return "0";
                }else{
                    return "-1";
                }
            }else{
                return "1";
            }
        }else{
            return "2";
        }
    }
    public boolean updatePassword(String email, String newPassword){
        try{
            Optional<UserEntity> userEntity = userRepository.findById(email);
            if(userEntity.isPresent()){
                UserEntity user = userEntity.get();
                user.setPassword(passwordEncoder.encode(newPassword));
                userRepository.save(user);
                return true;
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return false;
    }
}
