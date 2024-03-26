package edu.asp.uptimearmor.employeeservice.service;

import edu.asp.uptimearmor.employeeservice.entity.BusinessUnit;
import edu.asp.uptimearmor.employeeservice.repository.BusinessUnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusinessUnitService {
    @Autowired
    BusinessUnitRepository businessUnitRepository;

   public List<BusinessUnit> getBusinessUnits(){
       return businessUnitRepository.findAll();
    }


}
