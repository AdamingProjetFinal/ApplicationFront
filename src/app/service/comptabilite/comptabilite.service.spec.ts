/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ComptabiliteService } from './comptabilite.service';

describe('Service: Comptabilite', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComptabiliteService]
    });
  });

  it('should ...', inject([ComptabiliteService], (service: ComptabiliteService) => {
    expect(service).toBeTruthy();
  }));
});
