package edu.asp.uptimearmor.incidentservice.controller;


import edu.asp.uptimearmor.incidentservice.service.OutageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "**")
@RequestMapping("/api/outage")
public class OutageController {

    @Autowired
    OutageService outageService;

    @GetMapping("/incidentList")
    public ResponseEntity<?> getOutageIncidents(){

        return new ResponseEntity<>(outageService.getOutageTickets(), HttpStatus.OK);
    }

}
