package edu.asp.uptimearmor.employeeservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "business_unit", schema = "uptime_armor")
public class BusinessUnit {

    @Id
    @Column(name = "business_unit_id")
    private String businessUnitId;
    @Column(name = "business_unit_name")
    private  String businessUnitName;

}
