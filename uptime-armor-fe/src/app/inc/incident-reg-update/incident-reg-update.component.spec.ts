import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentRegUpdateComponent } from './incident-reg-update.component';

describe('IncidentRegUpdateComponent', () => {
  let component: IncidentRegUpdateComponent;
  let fixture: ComponentFixture<IncidentRegUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncidentRegUpdateComponent]
    });
    fixture = TestBed.createComponent(IncidentRegUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
