import { BusinessUnitID } from "./business-unit-id.model";
import { EmployeeEntity } from "./employee.entity";

export class EmployeeModel {
         password: string;
         firstName: string;
         lastName: string;
         dateOfBirth: Date;
         gender: string;
         address: string;
         phoneNumber: string;
         jobTitle: string;
         managerId: string;
         employmentStatus: string;
         role: string;
         businessUnit: BusinessUnitID = {businessUnitId: '', businessUnitName: ''};
}



export class Employee extends EmployeeEntity{
    showDetails?: boolean;
}