import { Component } from '@angular/core';
import { BusinessUnitModel } from '../models/business-unit.model';
import { BusinessUnitService } from '../service/business-unit.service';
import { Router } from '@angular/router';
import { BusinessUnitEntity } from '../models/business-unit.entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaginationService } from 'src/app/pagination/pagination.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-business-unit',
  templateUrl: './business-unit.component.html',
  styleUrls: ['./business-unit.component.css']
})
export class BusinessUnitComponent {
  businessUnits: BusinessUnitEntity[] = [];
  // filteredBusinessUnits: BusinessUnitEntity[] = [];
  // searchTerm: string = '';
  

  constructor( private businessUnitService: BusinessUnitService, private router: Router, public ps: PaginationService, public authService:AuthService){
      
  }


  async ngOnInit(): Promise<void>{
    await this.getBusinessUnits();
    this.ps.items = this.businessUnits;
  }

  async getBusinessUnits(): Promise<void>{
    try {
      const data: any = await this.businessUnitService.getBusinessUnitList().toPromise();
      this.businessUnits = data;
    } catch (error) {
      alert(error);
     
    }
  }
  
  async deleteBusinessUnit(businessUnitId: string): Promise<void> {
    try {
      const data: any = await this.businessUnitService.deleteBusinessUnit(businessUnitId).toPromise();
      console.log(data);
      await this.getBusinessUnits(); 
    } catch (error) {
      alert(error);
    }
  }

  async reload(){
     await this.getBusinessUnits();
     this.ps.items = this.businessUnits;
  }


  
}
