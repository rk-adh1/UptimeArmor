package edu.asp.uptimearmor.businessunit.entity;

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
@Table(name="business_unit", schema="uptime_armor")
public class BusinessUnit {
    @Id
    @Column(name="business_unit_id")
    String businessUnitId;
    @Column(name="business_unit_name")
    String businessUnitName;
    @Column(name="description")
    String description;
    @Column(name="mission_and_vision")
    String missionAndVision;
    @Column(name="industry_section")
    String industrySector;
}
