import { BusinessUnitID } from "./business-unit-id.model";

export class EmployeeEntity {
         employeeId: string;
         password: string;
         firstName: string;
         lastName: string;
         dateOfBirth: Date;
         gender: string;
         address: string;
         phoneNumber: string;
         email: string;
         jobTitle: string;
         managerId: string;
         employmentStatus: string;
         role: string;
         businessUnit: BusinessUnitID = {businessUnitId: '', businessUnitName:''};
}