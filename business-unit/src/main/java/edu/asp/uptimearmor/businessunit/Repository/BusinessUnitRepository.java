package edu.asp.uptimearmor.businessunit.Repository;

import edu.asp.uptimearmor.businessunit.entity.BusinessUnit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessUnitRepository extends JpaRepository<BusinessUnit, String> {

    BusinessUnit findByBusinessUnitId(String businessUnitId);

}
