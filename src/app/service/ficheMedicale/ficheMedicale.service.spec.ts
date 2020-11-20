/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FicheMedicaleService } from './ficheMedicale.service';

describe('Service: FicheMedicale', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FicheMedicaleService]
    });
  });

  it('should ...', inject([FicheMedicaleService], (service: FicheMedicaleService) => {
    expect(service).toBeTruthy();
  }));
});
