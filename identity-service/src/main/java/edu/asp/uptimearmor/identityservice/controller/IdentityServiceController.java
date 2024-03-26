package edu.asp.uptimearmor.identityservice.controller;

import edu.asp.uptimearmor.identityservice.dto.EmployeeAuthDTO;
import edu.asp.uptimearmor.identityservice.dto.EmployeePUDTO;
import edu.asp.uptimearmor.identityservice.service.EmployeeAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/auth")
public class IdentityServiceController {

    @Autowired
    private EmployeeAuthService employeeAuthService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/getToken")
    public String getToken(@RequestBody EmployeeAuthDTO employeeAuthDTO) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(employeeAuthDTO.getEmployeeId(), employeeAuthDTO.getPassword()));
        if (authentication.isAuthenticated()) {

            String jwtToken = employeeAuthService.generateToken(authentication);
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
            String formattedDateTime = now.format(formatter);
            System.out.println(formattedDateTime + "  INFO --- [IDENTITY-SERVICE] [getToken] "+jwtToken);
            //System.out.println(" getToken: "+ jwtToken);
            return jwtToken;
        } else {
            throw new RuntimeException("invalid access");
        }
    }

    @GetMapping("/validateJWTToken")
    public String validateToken(@RequestHeader("Authorization") String authorizationHeader) {
        String token = extractToken(authorizationHeader);
        if(employeeAuthService.validateToken(token))
            return "Token is valid, inside IdentityService";
        else
            return "Token is invalid, insideIdentityService";
    }
    @GetMapping("/validateToken")
    public String validateToken() {
        return "Token is valid, inside IdentityService";
    }

    @PostMapping("/updatePassword/{employeeId}")
    public ResponseEntity<?> updatePassword(@PathVariable String employeeId,
                                            @RequestBody EmployeePUDTO empPassUpdateDTO){


        String status = employeeAuthService.updatePassword(employeeId, empPassUpdateDTO);
        if (status.equals("Updated")) {
            return new ResponseEntity<>(status, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(status, HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/renewToken")
    public String renewToken(@RequestHeader("Authorization") String authorizationHeader) {
        String token = extractToken(authorizationHeader);
        System.out.println("call came to renewToken: " + token);
        if(employeeAuthService.validateToken(token)) {
            String renewedToken = employeeAuthService.renewToken(token);
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
            String formattedDateTime = now.format(formatter);
            System.out.println(formattedDateTime + "  INFO --- [IDENTITY-SERVICE] [renewToken] "+renewedToken);
            return renewedToken;
        }
        else {
            return null;
        }
    }

    private String extractToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        } else {
            throw new IllegalArgumentException("Invalid authorization header");
        }
    }

}


