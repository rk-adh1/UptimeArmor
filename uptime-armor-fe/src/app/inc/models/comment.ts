export class CommentModel {
    incident: IncidentComment =
    {
      incidentId:''
    };
    note: string;
    creationDate: Date;
    employee: EmployeeComment ={
      employeeId:'',
      firstName:'',
      lastName:''
    };
    name: string;
}

export class IncidentComment {
    incidentId: string;
    
  }
  
  export class EmployeeComment {
    employeeId: string;
    firstName: string;
    lastName: string;
  }

  export class Comment extends CommentModel { 
    commentId: string;
  }