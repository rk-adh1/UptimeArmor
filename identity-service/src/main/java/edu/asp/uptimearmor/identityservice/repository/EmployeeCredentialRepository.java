package edu.asp.uptimearmor.identityservice.repository;


import edu.asp.uptimearmor.identityservice.entity.EmployeeCredential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeCredentialRepository extends JpaRepository <EmployeeCredential,String>{

    Optional<EmployeeCredential> findByEmployeeId(String employeeId);


}
