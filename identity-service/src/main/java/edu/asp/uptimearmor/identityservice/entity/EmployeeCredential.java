package edu.asp.uptimearmor.identityservice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="employee", schema="uptime_armor")
public class EmployeeCredential
{
    @Id
    @Column(name = "employee_id", nullable = false)
    String employeeId;

    @Column(name = "password")
    String password;

    @Column(name = "role")
    String role;

}
