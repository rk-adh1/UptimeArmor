package edu.asp.uptimearmor.incidentservice.repository;

import edu.asp.uptimearmor.incidentservice.dto.Report;
import edu.asp.uptimearmor.incidentservice.entity.Incident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncidentRepository extends JpaRepository <Incident, String>{

    Incident findByIncidentId(String incidentId);

    @Query("SELECT i FROM Incident i WHERE (i.priority <= 1 AND i.severity >= 2) OR i.severity = 3")
    List<Incident> findOutageIncidents();

    @Query("SELECT i.businessUnit.businessUnitId AS businessUnitId, " +
            "b.businessUnitName AS businessUnitName, " +
            "COUNT(CASE WHEN i.status = 'Open' THEN 1 END) AS openCount, " +
            "COUNT(CASE WHEN i.status = 'InProgress' THEN 1 END) AS inProgressCount, " +
            "COUNT(CASE WHEN i.status = 'ReadyToClose' THEN 1 END) AS readyToCloseCount, " +
            "COUNT(CASE WHEN i.status = 'Closed' THEN 1 END) AS closedCount " +
            "FROM Incident i " +
            "JOIN i.businessUnit b " + // join query with BusinessUnit entity
            "GROUP BY i.businessUnit.businessUnitId")
    List<Object[]> findIncidentCountsByBusinessUnitId();

    @Query("SELECT i.businessUnit.businessUnitId AS businessUnitId, " +
            "b.businessUnitName AS businessUnitName, " +
            "COUNT(CASE WHEN i.status = 'Open' THEN 1 END) AS openCount, " +
            "COUNT(CASE WHEN i.status = 'InProgress' THEN 1 END) AS inProgressCount, " +
            "COUNT(CASE WHEN i.status = 'ReadyToClose' THEN 1 END) AS readyToCloseCount, " +
            "COUNT(CASE WHEN i.status = 'Closed' THEN 1 END) AS closedCount " +
            "FROM Incident i " +
            "JOIN i.businessUnit b " + // join query with BusinessUnit entity
            "WHERE (i.priority <= 1 AND i.severity >= 2) OR i.severity = 3 " +
            "GROUP BY i.businessUnit.businessUnitId")
    List<Object[]> findOutageIncidentsCountsByBusinessUnitId();

}
