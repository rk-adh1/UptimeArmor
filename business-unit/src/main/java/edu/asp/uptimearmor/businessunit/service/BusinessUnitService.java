package edu.asp.uptimearmor.businessunit.service;

import edu.asp.uptimearmor.businessunit.Repository.BusinessUnitRepository;
import edu.asp.uptimearmor.businessunit.dto.BusinessUnitDTO;
import edu.asp.uptimearmor.businessunit.entity.BusinessUnit;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class BusinessUnitService {
    @Autowired
    BusinessUnitRepository businessUnitRepository;

    public BusinessUnit registerBusinessUnit(BusinessUnitDTO businessUnitDTO){

        String businessUnitId ="0";
        do {
            businessUnitId   = generateBusinessUnitId(businessUnitDTO.getBusinessUnitName());
        }
        while(businessUnitRepository.existsById(businessUnitId));

        ModelMapper modelMapper = new ModelMapper();
        String finalBUId = businessUnitId;
        modelMapper.addMappings(new PropertyMap<BusinessUnitDTO, BusinessUnit>(){
                                    @Override
                                    protected void configure() {
                                        map().setBusinessUnitId(finalBUId);
                                    }
                                }
        );
        BusinessUnit businessUnit = modelMapper.map(businessUnitDTO, BusinessUnit.class);
        return businessUnitRepository.save(businessUnit);

    }
    private String generateBusinessUnitId(String buName)
    {
        Random random = new Random();
        StringBuilder builder = new StringBuilder();
        int randomNumber = random.nextInt(10000,99999);
        builder.append(buName, 0, 3);
        builder.append(randomNumber);
        return builder.toString();

    }

    public List<BusinessUnit> getBusinessUnitList(){
        return businessUnitRepository.findAll();
    }

    public Optional<BusinessUnit> getBusinessUnitDetails(String businessUnitId){
        return businessUnitRepository.findById(businessUnitId);
    }

    public int deleteBusinessUnit(String businessUnitId){
        try {
             businessUnitRepository.deleteById(businessUnitId);
             return 0;
        }
        catch (Exception ex)
        {
            return -1;
        }
    }

    public BusinessUnit updateBusinessUnit(String businessUnitId, BusinessUnitDTO businessUnitDTO){

        BusinessUnit businessUnit = businessUnitRepository.findByBusinessUnitId(businessUnitId);
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.addMappings(new PropertyMap<BusinessUnitDTO, BusinessUnit>(){
                                    @Override
                                    protected void configure() {
                                        map().setBusinessUnitId(businessUnitId);
                                    }
                                }
        );
         businessUnit = modelMapper.map(businessUnitDTO, BusinessUnit.class);
        return businessUnitRepository.save(businessUnit);
    }

}
