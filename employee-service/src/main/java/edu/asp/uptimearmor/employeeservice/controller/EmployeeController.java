package edu.asp.uptimearmor.employeeservice.controller;

import edu.asp.uptimearmor.employeeservice.dto.EmployeeDTO;
import edu.asp.uptimearmor.employeeservice.entity.BusinessUnit;
import edu.asp.uptimearmor.employeeservice.entity.Employee;
import edu.asp.uptimearmor.employeeservice.repository.EmployeeRepository;
import edu.asp.uptimearmor.employeeservice.service.BusinessUnitService;
import edu.asp.uptimearmor.employeeservice.service.EmployeeService;
import edu.asp.uptimearmor.employeeservice.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @Autowired
    ManagerService managerService;

    @Autowired
    BusinessUnitService businessUnitService;

    @Autowired
    EmployeeRepository employeeRepository;

    @GetMapping("/listEmployees")
    public ResponseEntity<?> listAllEmployees() {
        System.out.println("Request came here");
        List<Employee> empList = employeeService.listAllEmployees();

        try {
            if(empList != null) {
                return  new ResponseEntity<>(empList, HttpStatus.OK);
            }
            else {
                return  new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        }
        catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/testAPIEmployee")
    public String testApi() {
        return "This is the result from Employee End point";

    }

    @GetMapping("/employeeDetails/{empId}")
    public ResponseEntity<?> getEmployeeDetails(@PathVariable String empId)
    {
       if(!employeeRepository.existsById(empId)){
           return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
       }
       try {
           Optional<Employee> employee = employeeService.getEmployeeDetails(empId);
           if(employee.isPresent()) {
               return new ResponseEntity<>(employee, HttpStatus.OK);
           }
           else {
               return new ResponseEntity<>(HttpStatus.NOT_FOUND);
           }
       }
       catch (Exception ex){
           return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
       }
    }

    @PreAuthorize("hasRole('ADMIN', 'MANAGER')")
    @PostMapping("/register")
    public ResponseEntity<?> registerEmployee(@RequestBody EmployeeDTO employeeDTO){

        try {
            Employee employee = employeeService.registerEmployee(employeeDTO);
            return new ResponseEntity<>(employee, HttpStatus.CREATED);
        }catch (Exception ex)
        {
            System.out.println(ex.getMessage());
            return  new ResponseEntity<>(ex, HttpStatus.BAD_REQUEST);
        }
        }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @DeleteMapping("/delete/{empId}")
    public ResponseEntity<?> deleteEmployee(@PathVariable String empId)
    {
        if(employeeService.deleteEmployee(empId) != -1){
            return new ResponseEntity<>("Deleted successfully", HttpStatus.OK);
        }
        else {

            return  new ResponseEntity<>("Delete failed", HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('EMPLOYEE') and authentication.principal == #empId or hasAnyRole('ADMIN', 'MANAGER')")
    @PostMapping("/update/{empId}")
    public ResponseEntity<?> updateEmployee(@PathVariable String empId, @RequestBody EmployeeDTO employeeDTO)
    {
        Employee existingEmp =  employeeRepository.findByEmployeeId(empId);
        if( existingEmp != null) {


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try {
            if (authentication.getPrincipal().equals(empId) && authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_EMPLOYEE"))) {
                if(!employeeService.isRestrictedDataModified(employeeDTO, existingEmp)){
                    Employee employee = employeeService.updateEmployee(employeeDTO, empId);
                    return new ResponseEntity<>(employee, HttpStatus.OK);
                }
                else
                {
                    return new ResponseEntity<>("Employees are not allowed to update Restricted Data", HttpStatus.BAD_REQUEST);
                }

            }
            Employee employee = employeeService.updateEmployee(employeeDTO, empId);
            return new ResponseEntity<>(employee, HttpStatus.OK);
        }
        catch (Exception ex){
            return  new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        }
        else {
            return new ResponseEntity<>("employeeId not found", HttpStatus.BAD_REQUEST );
        }
    }

    @GetMapping("/listManagers")
    public ResponseEntity<?> getManagers(){
        try {
            return new ResponseEntity<>(managerService.getManagers(), HttpStatus.OK);
        }
        catch (Exception ex)
        {
            return  new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/businessUnitList")
    public ResponseEntity<?> getBusinessUnits() {

        try {
            List<BusinessUnit> businessUnits = businessUnitService.getBusinessUnits();
            if (businessUnits != null) {
                return new ResponseEntity<>(businessUnits, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
