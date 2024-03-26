package edu.asp.uptimearmor.employeeservice.service;

import edu.asp.uptimearmor.employeeservice.dto.EmployeeDTO;
import edu.asp.uptimearmor.employeeservice.entity.Employee;
import edu.asp.uptimearmor.employeeservice.repository.EmployeeRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;

    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Optional<Employee> getEmployeeDetails(String employeeId){
        return employeeRepository.findById(employeeId);
    }

    public List<Employee> listAllEmployees(){

        return employeeRepository.findAll();
    }

    public Employee registerEmployee(EmployeeDTO employeeDTO) {
        //Code to generate the new employee ID and map to the entity class.

        String empId ="0";
        do {
          empId   = generateEmployeeID(employeeDTO);
        }
        while(employeeRepository.existsById(empId));


        ModelMapper modelMapper = new ModelMapper();
        String finalEmpId = empId;
        modelMapper.addMappings(new PropertyMap<EmployeeDTO, Employee>(){
                                    @Override
                                    protected void configure() {
                                        map().setEmployeeId(finalEmpId);
                                        map().setEmail(finalEmpId+"@uptimearmor.edu");

                                    }
                                }
        );
        Employee employee = modelMapper.map(employeeDTO, Employee.class);
        //mapping ends here.
        //Below line for the password hashing to store in DB.
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        return employeeRepository.save(employee);
    }

    public int deleteEmployee(String employeeId){
        try {
            employeeRepository.deleteById(employeeId);
            return 0;
        }
        catch (Exception ex)
        {
            return -1;
        }

    }

    public Employee updateEmployee (EmployeeDTO employeeDTO, String empId){

       Employee empRepo = employeeRepository.findByEmployeeId(empId);
       String emplId = empRepo.getEmployeeId();
       String email = empRepo.getEmail();
       String pass = empRepo.getPassword();

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.addMappings(new PropertyMap<EmployeeDTO, Employee>(){
                                    @Override
                                    protected void configure() {
                                        map().setEmployeeId(emplId);
                                        map().setEmail(email);
                                        map().setPassword(pass);

                                    }
                                }
        );
        Employee employee = modelMapper.map(employeeDTO, Employee.class);

        return employeeRepository.save(employee);

    }

    public boolean isRestrictedDataModified(EmployeeDTO employeeDTO, Employee existingEmployee){

        return ! (employeeDTO.getBusinessUnit().getBusinessUnitId().equals(existingEmployee.getBusinessUnit().getBusinessUnitId())
                && employeeDTO.getManagerId().equals(existingEmployee.getManagerId())
                && employeeDTO.getRole().equals(existingEmployee.getRole())
                && employeeDTO.getEmploymentStatus().equals(existingEmployee.getEmploymentStatus())
                && employeeDTO.getJobTitle().equals(existingEmployee.getJobTitle()));
    }
    public String generateEmployeeID(EmployeeDTO employeeDTO) {

        Random random = new Random();
        StringBuilder builder = new StringBuilder();
        int randomNumber = random.nextInt(1000,9999);
        builder.append(employeeDTO.getFirstName().charAt(0));
        builder.append(employeeDTO.getLastName().charAt(0));
        builder.append(randomNumber);
        return builder.toString();
    }



}
