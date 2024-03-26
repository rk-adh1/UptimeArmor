import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRegUpdateComponent } from './employee-reg-update.component';

describe('EmployeeRegUpdateComponent', () => {
  let component: EmployeeRegUpdateComponent;
  let fixture: ComponentFixture<EmployeeRegUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeRegUpdateComponent]
    });
    fixture = TestBed.createComponent(EmployeeRegUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
