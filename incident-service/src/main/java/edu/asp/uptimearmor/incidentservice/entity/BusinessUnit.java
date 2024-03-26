package edu.asp.uptimearmor.incidentservice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="business_unit", schema = "uptime_armor")
public class BusinessUnit {
    @Id
    @Column(name = "business_unit_id")
    String businessUnitId;
    @Column(name = "business_unit_name" )
    String businessUnitName;
}
