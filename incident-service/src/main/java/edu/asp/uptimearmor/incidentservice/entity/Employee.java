package edu.asp.uptimearmor.incidentservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="employee", schema="uptime_armor")
public class Employee {
    @Id
    @Column(name="employee_id")
    String employeeId;

    @Column(name="first_name")
    String firstName;

    @Column(name="last_name")
    String lastName;

    @JsonIgnore
    @Column(name="business_unit_id")
    String businessUnitId;

}
