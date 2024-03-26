package edu.asp.uptimearmor.incidentservice.controller;

import edu.asp.uptimearmor.incidentservice.dto.ErrorMessage;
import edu.asp.uptimearmor.incidentservice.dto.IncidentDTO;
import edu.asp.uptimearmor.incidentservice.entity.Incident;
import edu.asp.uptimearmor.incidentservice.repository.IncidentRepository;
import edu.asp.uptimearmor.incidentservice.service.EmailService;
import edu.asp.uptimearmor.incidentservice.service.IncidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.lang.model.util.Elements;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "**")
@RequestMapping("/api/incident")
public class IncidentController {

    @Autowired
    IncidentService incidentService;


    @Autowired
    IncidentRepository incidentRepository;

    @Autowired
    EmailService emailService;


    @GetMapping("/incidentList")
    public ResponseEntity<?> listAllIncidents(){
        return new ResponseEntity<>(incidentService.listAllIncidents(), HttpStatus.OK);
    }

    @GetMapping("/incidentDetails/{incidentId}")
    public ResponseEntity<?> getIncidentDetails(@PathVariable String incidentId){
        return new ResponseEntity<>(incidentService.getIncidentDetails(incidentId), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerIncident(@RequestBody IncidentDTO incidentDTO){
        Incident inc = incidentService.registerIncident(incidentDTO);
        if (inc != null )
        {
        incidentService.isOutage(inc);
        return new ResponseEntity<>(inc, HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity<>("Failed to Register", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/update/{incidentId}")
    public ResponseEntity<?> updateIncident(@PathVariable String incidentId, @RequestBody IncidentDTO incidentDTO){
        if (!incidentRepository.existsById(incidentId))
        {
            return new ResponseEntity<>(new ErrorMessage("Incident id does not exist"), HttpStatus.NOT_FOUND);
        }
        try{
            Incident inc = incidentService.updateIncident(incidentId, incidentDTO);
            if (inc != null) {
                return new ResponseEntity<>(inc, HttpStatus.OK);
                            }
            else {
                return  new ResponseEntity<>(new ErrorMessage("Please retry update again"), HttpStatus.BAD_REQUEST);

            }
        }
        catch (Exception ex){
            return  new ResponseEntity<>(new ErrorMessage("Possible conflict error, please check Server logs"), HttpStatus.CONFLICT);
        }

    }

    @DeleteMapping("/delete/{incidentId}")
    public ResponseEntity<?> deleteIncident(@PathVariable String incidentId){
        if(!incidentRepository.existsById(incidentId)){
            return new ResponseEntity<>("IncidentIdNotExists", HttpStatus.NOT_FOUND);
        } else if (incidentService.deleteIncident(incidentId) !=-1) {
            return new ResponseEntity<>("Deleted", HttpStatus.OK);

        }
        else {
            return new ResponseEntity<>("Unable to Delete - Foreign Key constraint", HttpStatus.CONFLICT);
        }

    }

    @GetMapping("/listEmployeesByBUId/{businessUnitId}")
    public ResponseEntity<?> getEmployeesByBUId(@PathVariable String businessUnitId)
    {

        try
        {
            return new ResponseEntity<>(incidentService.getEmployeesByBUId(businessUnitId), HttpStatus.OK);
        }
        catch (Exception ex)
        {
            System.out.println(ex.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/listBusinessUnits")
    public ResponseEntity<?> getBusinessUnits()
    {
        try
        {
            return new ResponseEntity<>(incidentService.getBusinessUnits(), HttpStatus.OK);
        }
        catch (Exception ex)
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/sendMail")
    public ResponseEntity<?> sendMail(){
        try
        {
            emailService.sendEmail("TestMail", "Test");
            return new ResponseEntity<>( "success", HttpStatus.OK);
        }
        catch (Exception ex)
        {
            return new ResponseEntity<>("failed",HttpStatus.BAD_REQUEST);
        }
    }


}

