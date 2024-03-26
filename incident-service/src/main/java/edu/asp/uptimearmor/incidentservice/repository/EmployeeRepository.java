package edu.asp.uptimearmor.incidentservice.repository;

import edu.asp.uptimearmor.incidentservice.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {



    List<Employee> findByBusinessUnitId(String businessUnitId);


}
