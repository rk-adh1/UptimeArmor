package edu.asp.uptimearmor.incidentservice.dto;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor


public class Report {

    String businessUnitId;
    String businessUnitName;
    int openCount;
    int inProgressCount;
    int readyToCloseCount;
    int closedCount;

}
