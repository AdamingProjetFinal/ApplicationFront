/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MedecinService } from './medecin.service';

describe('Service: Medecin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedecinService]
    });
  });

  it('should ...', inject([MedecinService], (service: MedecinService) => {
    expect(service).toBeTruthy();
  }));
});
