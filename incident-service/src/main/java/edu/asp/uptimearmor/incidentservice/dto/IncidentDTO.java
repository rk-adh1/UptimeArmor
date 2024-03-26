package edu.asp.uptimearmor.incidentservice.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import edu.asp.uptimearmor.incidentservice.entity.BusinessUnit;
import edu.asp.uptimearmor.incidentservice.entity.Employee;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class IncidentDTO {



    private String description;

    private String category;

    @JsonFormat(pattern ="yyyy-MM-dd'T'HH:mm")
    private Date creationDate;

    @JsonFormat(pattern ="yyyy-MM-dd'T'HH:mm")
    private Date closedDate;

    private int severity;

    private int priority;

    private BusinessUnit businessUnit;

    private Employee reporter;

    private Employee assignee;

    private String status;

    private String resolution;

}
