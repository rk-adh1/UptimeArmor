package edu.asp.uptimearmor.incidentservice.service;

import edu.asp.uptimearmor.incidentservice.dto.IncidentDTO;
import edu.asp.uptimearmor.incidentservice.entity.BusinessUnit;
import edu.asp.uptimearmor.incidentservice.entity.Employee;
import edu.asp.uptimearmor.incidentservice.entity.Incident;
import edu.asp.uptimearmor.incidentservice.repository.BusinessUnitRepository;
import edu.asp.uptimearmor.incidentservice.repository.EmployeeRepository;
import edu.asp.uptimearmor.incidentservice.repository.IncidentRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class IncidentService {

    @Autowired
    IncidentRepository incidentRepository;

    @Autowired
    BusinessUnitRepository businessUnitRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    EmailService emailService;

public List<Incident> listAllIncidents(){
    return   incidentRepository.findAll();
}

public Incident registerIncident(IncidentDTO incidentDTO){

    String incidentId ="0";
    do {
        incidentId   = generateIncidentId();
    }
    while(incidentRepository.existsById(incidentId));

    ModelMapper modelMapper = new ModelMapper();
    String finalIncId = incidentId;
    modelMapper.addMappings(new PropertyMap<IncidentDTO, Incident>(){
                                @Override
                                protected void configure() {
                                    map().setIncidentId(finalIncId);
                                }
                            }
    );
    Incident incident = modelMapper.map(incidentDTO, Incident.class);
    //mapping ends here.

    return incidentRepository.save(incident);
}


    public Optional<Incident> getIncidentDetails(String incidentId){
    return incidentRepository.findById(incidentId);
    }


    public Incident updateIncident(String incId, IncidentDTO incidentDTO){


            Incident incRepo = incidentRepository.findByIncidentId(incId);
            ModelMapper modelMapper = new ModelMapper();
            modelMapper.addMappings(new PropertyMap<IncidentDTO, Incident>(){
                                        @Override
                                        protected void configure() {
                                            map().setIncidentId(incId);
                                        }
                                    }
            );
             incRepo = modelMapper.map(incidentDTO, Incident.class);
             try{
            return incidentRepository.save(incRepo);}
             catch (Exception ex){
                 System.out.println(ex);
                 return null;
             }

    }

    @Async
    public void isOutage(Incident i) {
        if ((i.getPriority() <= 1 && i.getSeverity() >= 2) || i.getSeverity() == 3) {
            sendOutageEmailNotification(i);
        }
    }

    private void sendOutageEmailNotification(Incident i) {
        String subject = "Outage Ticket Notification :"+ i.getIncidentId();
        String body = "An incident meeting the outage criteria has been detected.\nTicket is Assigned to you/your team\n" +
                "Name " +i.getAssignee().getFirstName()+" "+i.getAssignee().getLastName()+"\n"
                +"ID: "+i.getAssignee().getEmployeeId();
        //String from = "rahulkumaradhimulam@gmail.com";
        //String to = "rahulkumaradhimulam@gmail.com";

        emailService.sendEmail(subject, body);
    }

    private String generateIncidentId()
    {
        Random random = new Random();
        StringBuilder builder = new StringBuilder();
        int randomNumber = random.nextInt(10000,99999);
        builder.append("INC");
        builder.append(randomNumber);
        return builder.toString();
    }

    public int deleteIncident(String businessUnitId){
        try {
            incidentRepository.deleteById(businessUnitId);
            return 0;
        }
        catch (Exception ex)
        {
            return -1;
        }
    }

    public List<BusinessUnit> getBusinessUnits(){
        return businessUnitRepository.findAll();
    }

    public List<Employee> getEmployeesByBUId(String businessUnitId){
        return employeeRepository.findByBusinessUnitId(businessUnitId);
    }


}
