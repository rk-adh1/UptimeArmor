package edu.asp.uptimearmor.employeeservice.repository;

import edu.asp.uptimearmor.employeeservice.entity.Employee;
import edu.asp.uptimearmor.employeeservice.entity.ManagerModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface EmployeeRepository extends JpaRepository<Employee,String>{

    Employee findByEmployeeId(String employeeId);

    @Query("SELECT new ManagerModel(e.employeeId, e.firstName, e.lastName) FROM Employee e WHERE e.role = 'MANAGER'")
    List<ManagerModel> findManagers();



}
