package edu.asp.uptimearmor.businessunit.controller;
import edu.asp.uptimearmor.businessunit.Repository.BusinessUnitRepository;
import edu.asp.uptimearmor.businessunit.dto.BusinessUnitDTO;
import edu.asp.uptimearmor.businessunit.entity.BusinessUnit;
import edu.asp.uptimearmor.businessunit.service.BusinessUnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/businessUnit")
public class BusinessUnitController {

    @Autowired
    BusinessUnitService businessUnitService;

    @Autowired
    BusinessUnitRepository businessUnitRepository;



    @GetMapping("/businessUnitList")
    public ResponseEntity<?> listAllBusinessUnits(){
        return new ResponseEntity<>(businessUnitService.getBusinessUnitList(), HttpStatus.OK);
    }

    @GetMapping("/businessUnitDetails/{businessUnitId}")
    public ResponseEntity<?> getBusinessUnitDetails(@PathVariable String businessUnitId){

        try{
            BusinessUnit businessUnit= businessUnitRepository.findByBusinessUnitId(businessUnitId);
            if (businessUnit != null){
                return new ResponseEntity<>(businessUnit, HttpStatus.OK);
            }
            else {
                return  new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }


    @PostMapping("/register")
    public ResponseEntity<?> registerBusinessUnit(@RequestBody BusinessUnitDTO businessUnitDTO){
        try {
            System.out.println("Request came to register");
            BusinessUnit businessUnit = businessUnitService.registerBusinessUnit(businessUnitDTO);
            System.out.println("Request completed "+businessUnit);
            return new ResponseEntity<>(businessUnit, HttpStatus.CREATED);
        }
        catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }


    @PostMapping("/update/{businessUnitId}")
    public ResponseEntity<?> updateBusinessUnit(@PathVariable String businessUnitId,  @RequestBody BusinessUnitDTO businessUnitDTO){

        if(!businessUnitRepository.existsById(businessUnitId)){
            return new ResponseEntity<>("BusinessUnitId Does not exists",HttpStatus.BAD_REQUEST);
        }
        else{
            return new ResponseEntity<>(businessUnitService.updateBusinessUnit(businessUnitId, businessUnitDTO), HttpStatus.OK);
        }
    }


    @DeleteMapping("/delete/{businessUnitId}")
    public ResponseEntity<?> deleteBusinessUnit(@PathVariable String businessUnitId){
        if(!businessUnitRepository.existsById(businessUnitId)){
            return new ResponseEntity<>("BusinessUnitIdNotExists", HttpStatus.BAD_REQUEST);
        } else if (businessUnitService.deleteBusinessUnit(businessUnitId) !=-1) {
            return new ResponseEntity<>("Deleted", HttpStatus.OK);

        }
        else {
            return new ResponseEntity<>("Unable to Delete - Foreign Key constraint", HttpStatus.CONFLICT);
        }
    }

}
