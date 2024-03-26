package edu.asp.uptimearmor.identityservice.dto;

import edu.asp.uptimearmor.identityservice.entity.EmployeeCredential;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {

    private  String username;
    private String password;

    @Getter
    private String role;

    public CustomUserDetails(EmployeeCredential employeeCredential) {
        this.username = employeeCredential.getEmployeeId();
        this.password = employeeCredential.getPassword();
        this.role = "ROLE_"+employeeCredential.getRole();
    }


    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        GrantedAuthority authority = new SimpleGrantedAuthority(role);
        return Collections.singletonList(authority);
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
