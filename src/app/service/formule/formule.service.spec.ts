/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormuleService } from './formule.service';

describe('Service: Formule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormuleService]
    });
  });

  it('should ...', inject([FormuleService], (service: FormuleService) => {
    expect(service).toBeTruthy();
  }));
});
