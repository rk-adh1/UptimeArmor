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
@Table(name = "comment", schema = "uptime_armor")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id", nullable = false)
    private Long commentId;

    @ManyToOne
    @JoinColumn(name = "incident_id", referencedColumnName = "incident_id")
    private Incident incident;

    @Column(name = "note")
    private String note;

    //@JsonFormat(pattern ="yyyy-MM-dd'T'HH:mm")
    @Column(name = "creation_date")
    private Date creationDate;


    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "employee_id")
    private Employee employee;

    @Transient
    private String name;
    public String getName() {
        if (employee != null) {
            return employee.getFirstName()+ " " + employee.getLastName();
        }
        return null;
    }

    public void setName(String name) {

        this.name = name;
    }

}