package edu.asp.uptimearmor.businessunit.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class BusinessUnitDTO {
    String businessUnitName;
    String description;
    String missionAndVision;
    String industrySector;
}
