import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessUnitModel } from '../models/business-unit.model';
import { BusinessUnitService } from '../service/business-unit.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-business-unit-reg-update',
  templateUrl: './business-unit-reg-update.component.html',
  styleUrls: ['./business-unit-reg-update.component.css']
})
export class BusinessUnitRegUpdateComponent {
  businessUnit: BusinessUnitModel = new BusinessUnitModel();
  isUpdating: boolean = false;

  businessUnitId : string ="";
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private businessUnitService: BusinessUnitService, 
    private router: Router, private route: ActivatedRoute, private location: Location){
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['businessUnitId']) {
          this.isUpdating = true;
           this.businessUnitId = params['businessUnitId'];
          this.loadBusinessUnit(this.businessUnitId);
      }
  });
  }

  loadBusinessUnit(businessUnitId: string): void {
    this.businessUnitService.getBusinessUnitById(businessUnitId).subscribe(businessUnit => {
        this.businessUnit = businessUnit;
    });
}
  
  saveBusinessUnit(){
    this.businessUnitService.createBusinessUnit(this.businessUnit).subscribe(data => 
      console.log(data));
      this.goToBusinessUnitList();
  }

  goToBusinessUnitList(){

    this.router.navigate(['/business']);
  }

  updateBusinessUnit(): void {
    this.businessUnitService.updateBusinessUnit(this.businessUnitId, this.businessUnit).subscribe(response => {
    });
    this.goToBusinessUnitList();
}
  
  onSubmit(){
    if (this.isUpdating) {
      this.updateBusinessUnit();
    } 
    else {
    this.saveBusinessUnit();
    }
  }

  cancel(){
    this.location.back();
  }


}
