/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FicheMedicalPatientComponent } from './ficheMedical-patient.component';

describe('FicheMedicalPatientComponent', () => {
  let component: FicheMedicalPatientComponent;
  let fixture: ComponentFixture<FicheMedicalPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheMedicalPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheMedicalPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
