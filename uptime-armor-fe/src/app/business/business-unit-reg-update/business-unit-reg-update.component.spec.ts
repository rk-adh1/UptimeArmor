import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessUnitRegUpdateComponent } from './business-unit-reg-update.component';

describe('BusinessUnitRegUpdateComponent', () => {
  let component: BusinessUnitRegUpdateComponent;
  let fixture: ComponentFixture<BusinessUnitRegUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessUnitRegUpdateComponent]
    });
    fixture = TestBed.createComponent(BusinessUnitRegUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
