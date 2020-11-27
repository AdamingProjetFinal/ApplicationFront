/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MedecinGuardService } from './medecin-guard.service';

describe('Service: Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedecinGuardService]
    });
  });

  it('should ...', inject([MedecinGuardService], (service: MedecinGuardService) => {
    expect(service).toBeTruthy();
  }));
});
