/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PatientGuardService } from './patient-guard.service';

describe('Service: Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientGuardService]
    });
  });

  it('should ...', inject([PatientGuardService], (service: PatientGuardService) => {
    expect(service).toBeTruthy();
  }));
});
