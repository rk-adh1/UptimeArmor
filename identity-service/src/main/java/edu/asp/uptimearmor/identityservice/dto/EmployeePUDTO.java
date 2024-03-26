package edu.asp.uptimearmor.identityservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeePUDTO {

    String oldPassword;
    String newPassword;
}
