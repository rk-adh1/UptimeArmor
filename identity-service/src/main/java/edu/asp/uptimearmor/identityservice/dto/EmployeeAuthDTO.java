package edu.asp.uptimearmor.identityservice.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class EmployeeAuthDTO {

    String employeeId;
    String password;

}
