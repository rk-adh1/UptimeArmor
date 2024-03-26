package edu.asp.uptimearmor.incidentservice.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import edu.asp.uptimearmor.incidentservice.entity.Employee;
import edu.asp.uptimearmor.incidentservice.entity.Incident;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDTO {

    Date creationDate;
    Incident incident;
    String note;
    Employee employee;

}
