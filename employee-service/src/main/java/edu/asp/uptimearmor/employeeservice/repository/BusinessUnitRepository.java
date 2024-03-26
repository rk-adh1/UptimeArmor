package edu.asp.uptimearmor.employeeservice.repository;

import edu.asp.uptimearmor.employeeservice.entity.BusinessUnit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessUnitRepository extends JpaRepository<BusinessUnit, String> {
}
