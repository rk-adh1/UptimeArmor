package edu.asp.uptimearmor.employeeservice.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import edu.asp.uptimearmor.employeeservice.entity.BusinessUnit;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDTO {

    private String password;
    private String firstName;
    private String lastName;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateOfBirth;
    private String gender;
    private String address;
    private String phoneNumber;
    private String jobTitle;
    private String managerId;
    private String employmentStatus;
    private String role;
    private BusinessUnit businessUnit;
}
