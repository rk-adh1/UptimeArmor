package edu.asp.uptimearmor.employeeservice.service;

import edu.asp.uptimearmor.employeeservice.entity.ManagerModel;
import edu.asp.uptimearmor.employeeservice.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManagerService {
    @Autowired
    EmployeeRepository employeeRepository;

    public List<ManagerModel> getManagers(){
        return employeeRepository.findManagers();
    }

}
