/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ActeService } from './acte.service';

describe('Service: Acte', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActeService]
    });
  });

  it('should ...', inject([ActeService], (service: ActeService) => {
    expect(service).toBeTruthy();
  }));
});
