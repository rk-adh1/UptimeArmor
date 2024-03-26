package edu.asp.uptimearmor.identityservice.service;

import edu.asp.uptimearmor.identityservice.entity.EmployeeCredential;
import edu.asp.uptimearmor.identityservice.dto.CustomUserDetails;
import edu.asp.uptimearmor.identityservice.repository.EmployeeCredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private EmployeeCredentialRepository repository;

    @Override
    public UserDetails loadUserByUsername(String employeeId) throws UsernameNotFoundException {
        Optional<EmployeeCredential> credential = repository.findByEmployeeId(employeeId);
        return credential.map(CustomUserDetails::new).orElseThrow(() -> new UsernameNotFoundException("user not found with EmployeeId :" + employeeId));
    }
}