package edu.asp.uptimearmor.employeeservice.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="employee", schema="uptime_armor")
public class Employee {
    @Id
    @Column(name="employee_id", nullable = false)
    private String employeeId;
    @Column(name="password")
    private String password;
    @Column(name="first_name")
    private String firstName;
    @Column(name="last_name")
    private String lastName;
    @Column(name="date_of_birth")
    @JsonFormat(pattern= "yyyy-MM-dd")
    private Date dateOfBirth;
    @Column(name="gender")
    private String gender;
    @Column(name="address")
    private String address;
    @Column(name="phone_number")
    private String phoneNumber;
    @Column(name="email")
    private String email;
    @Column(name="job_title")
    private String jobTitle;
    @Column(name="employment_status")
    private String employmentStatus;
    @Column(name="role")
    private String role;
    @Column(name="manager_id")
    private String managerId;
//
//    @ManyToOne
//    @JoinColumn(name="manager_id", referencedColumnName="employee_id", insertable=false, updatable=false)
//    private Employee manager;

    @ManyToOne
    @JoinColumn(name="business_unit_id", referencedColumnName="business_unit_id")
    private BusinessUnit businessUnit;

}
