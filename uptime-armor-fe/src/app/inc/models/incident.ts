  export class IncidentModel {
    description: string;
    category: string;
    creationDate: Date;
    closedDate: Date;
    severity: number;
    priority: number;
    businessUnit: BusinessUnitIdModel = {
      businessUnitId: '',
      businessUnitName: ''
    };
    reporter: EmployeeIdModel = {
      employeeId: '',
      firstName: '',
      lastName: ''
    };
    assignee: EmployeeIdModel =  {
      employeeId: '',
      firstName: '',
      lastName: ''
    };
    status: string;
    resolution: string;
  }

  export class IncidentEntity extends IncidentModel{
    incidentId: string;
  }
  
  export class BusinessUnitIdModel {
    businessUnitId: string;
    businessUnitName: string;
  }
  
  export class EmployeeIdModel {
    employeeId: string;
    firstName: string;
    lastName: string;

  }

  export class OutageEntity extends IncidentEntity {

  }

  export class IncidentExportToExcel {
    
    constructor(
      public incidentId: string,
      public description: string,
      public category: string,
      public creationDate: Date,
      public closedDate: Date | null,
      public severity: number,
      public priority: number,
      public businessUnit: string,
      public reporter: string,
      public assignee: string,
      public status: string,
      public resolution: string
    ) {}
     
  }

  export class OutageEportToExcel extends IncidentExportToExcel{

  }

