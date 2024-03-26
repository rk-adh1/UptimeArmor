package edu.asp.uptimearmor.employeeservice.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="employee", schema="uptime_armor")
public class ManagerModel {
    @Id
    @Column(name="employee_id")
    String employeeId;
    @Column(name="first_name")
    String firstName;
    @Column(name="last_name")
    String lastName;

}
