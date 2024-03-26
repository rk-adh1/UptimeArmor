package edu.asp.uptimearmor.identityservice.service;

import edu.asp.uptimearmor.identityservice.dto.EmployeePUDTO;
import edu.asp.uptimearmor.identityservice.entity.EmployeeCredential;
import edu.asp.uptimearmor.identityservice.repository.EmployeeCredentialRepository;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@Service
public class EmployeeAuthService {

    @Autowired
    private JwtService jwtService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    EmployeeCredentialRepository employeeCredentialRepository;

    public String generateToken(Authentication authentication) {

        return jwtService.generateToken(authentication);
    }

    public boolean validateToken(String token) {

        return jwtService.validateToken(token);
    }

    public String renewToken(String token){
        return jwtService.renewToken(token);
    }

    public String updatePassword(String employeeId, EmployeePUDTO empPassUpdateDTO)
        {
            String status;
            int sts;

            Optional<EmployeeCredential> employeeCredentialOptional = employeeCredentialRepository.findById(employeeId);

            if (employeeCredentialOptional.isPresent()) {
                EmployeeCredential employeeCredential = employeeCredentialOptional.get();

                if (passwordEncoder.matches(empPassUpdateDTO.getOldPassword(), employeeCredential.getPassword())) {

                    employeeCredential.setPassword(passwordEncoder.encode(empPassUpdateDTO.getNewPassword()));
                    try {

                        employeeCredentialRepository.save(employeeCredential);
                        sts = 1;
                    } catch (Exception ex) {
                        sts = 0;
                    }
                    System.out.println(sts);
                    if (sts == 1) {
                        status = "Updated";
                    } else {
                        status = "Failed";
                    }
                }
                else {
                    status = " Old Password does not match Entered password: ";
                }
            }
            else
            {
                status = "Employee with Id not found";
            }
            System.out.println(status);
            return status;
        }
    }

