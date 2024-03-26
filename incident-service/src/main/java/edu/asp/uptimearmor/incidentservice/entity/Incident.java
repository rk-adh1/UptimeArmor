package edu.asp.uptimearmor.incidentservice.entity;

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
@Table(name="incident", schema="uptime_armor")
public class Incident {

    @Id
    @Column(name="incident_id", nullable = false)
    private String incidentId;
    @Column(name="description")
    private String description;
    @Column(name="category")
    private String category;
    @Column(name="creation_date")
    @JsonFormat(pattern ="yyyy-MM-dd'T'HH:mm")
    private Date creationDate;
    @JsonFormat(pattern ="yyyy-MM-dd'T'HH:mm")
    @Column(name="closed_date")
    private Date closedDate;
    @Column(name="severity")
    private int severity;
    @Column(name="priority")
    private int priority;
    @ManyToOne
    @JoinColumn(name="business_unit_id", referencedColumnName = "business_unit_id")
    private BusinessUnit businessUnit;
    @ManyToOne
    @JoinColumn(name="reporter", referencedColumnName="employee_id")
    private Employee reporter;
    @ManyToOne
    @JoinColumn(name="assignee", referencedColumnName="employee_id")
    private Employee assignee;
    @Column(name="status")
    private String status;
    @Column(name="resolution")
    private String resolution;
}
