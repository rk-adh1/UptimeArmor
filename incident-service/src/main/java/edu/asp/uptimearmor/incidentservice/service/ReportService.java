package edu.asp.uptimearmor.incidentservice.service;

import edu.asp.uptimearmor.incidentservice.dto.Report;
import edu.asp.uptimearmor.incidentservice.repository.IncidentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportService {

    @Autowired
    IncidentRepository incidentRepository;

    private ModelMapper modelMapper = new ModelMapper();
    public List<Report> getIncidentReports (){

        List<Object[]>  results = incidentRepository.findIncidentCountsByBusinessUnitId();
            System.out.println("Results =" +results);

        return results.stream()
                .map(result -> new Report(
                        (String) result[0], // businessUnitId
                        (String) result[1], // businessUnitName
                        ((Number) result[2]).intValue(), // openCount
                        ((Number) result[3]).intValue(), // inProgressCount
                        ((Number) result[4]).intValue(), // readyToCloseCount
                        ((Number) result[5]).intValue()  // closedCount
                ))
                .collect(Collectors.toList());
    }

    public List<Report> getOutageReports (){
        List<Object[]>  results = incidentRepository.findOutageIncidentsCountsByBusinessUnitId();

        return results.stream()
                .map(result -> new Report(
                        (String) result[0], // businessUnitId
                        (String) result[1], // businessUnitName
                        ((Number) result[2]).intValue(), // openCount
                        ((Number) result[3]).intValue(), // inProgressCount
                        ((Number) result[4]).intValue(), // readyToCloseCount
                        ((Number) result[5]).intValue()  // closedCount
                ))
                .collect(Collectors.toList());
    }

}
