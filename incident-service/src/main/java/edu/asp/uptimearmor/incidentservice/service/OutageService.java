package edu.asp.uptimearmor.incidentservice.service;

import edu.asp.uptimearmor.incidentservice.entity.Incident;
import edu.asp.uptimearmor.incidentservice.repository.IncidentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OutageService {

    @Autowired
    IncidentRepository incidentRepository;

    public List<Incident> getOutageTickets()
    {
        return incidentRepository.findOutageIncidents();
    }

}
