package edu.asp.uptimearmor.incidentservice.repository;

import edu.asp.uptimearmor.incidentservice.entity.BusinessUnit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessUnitRepository extends JpaRepository<BusinessUnit, String> {

}
