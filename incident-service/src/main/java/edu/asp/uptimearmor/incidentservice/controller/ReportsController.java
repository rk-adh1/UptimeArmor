package edu.asp.uptimearmor.incidentservice.controller;
import edu.asp.uptimearmor.incidentservice.dto.ErrorMessage;
import edu.asp.uptimearmor.incidentservice.dto.Report;
import edu.asp.uptimearmor.incidentservice.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/reports")
public class ReportsController {

    @Autowired
    ReportService reportService;

    @GetMapping ("/incidentReports")
    public ResponseEntity<?> getIncidentReports(){
        try{
            List<Report> reports = reportService.getIncidentReports();
            System.out.println(reports);
            if(reports != null)

                return new ResponseEntity<>(reports, HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }catch (Exception ex)
        {
            return new ResponseEntity<>(new ErrorMessage("Error finding incident reports, please try again later"), HttpStatus.BAD_REQUEST);
        }
        }

    @GetMapping("/outageReports")
    public ResponseEntity<?> getOutageReports(){
        try{
            List<Report> reports = reportService.getOutageReports();
            if(reports != null)
                return new ResponseEntity<>(reports, HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }catch (Exception ex)
        {
            System.out.println(ex.getMessage());
            return new ResponseEntity<>(new ErrorMessage("Error finding outage reports, please try again later"), HttpStatus.BAD_REQUEST);
        }
    }

}
