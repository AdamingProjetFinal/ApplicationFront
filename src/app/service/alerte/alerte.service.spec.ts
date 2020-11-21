/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlerteService } from './alerte.service';

describe('Service: Alerte', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlerteService]
    });
  });

  it('should ...', inject([AlerteService], (service: AlerteService) => {
    expect(service).toBeTruthy();
  }));
});
