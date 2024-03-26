package edu.asp.uptimearmor.incidentservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;


    @Value("${spring.mail.username}")
    String frommail;
    public void sendEmail(String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(frommail);
        message.setTo("exmaple2@gmail.com");
        message.setSubject(subject);
        message.setText(body);
        try {
            javaMailSender.send(message);
        }
        catch (Exception ex)
        {
            System.out.println(ex);
        }
    }
}