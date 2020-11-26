/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AutorisationService } from './autorisation.service';

describe('Service: Autorisation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutorisationService]
    });
  });

  it('should ...', inject([AutorisationService], (service: AutorisationService) => {
    expect(service).toBeTruthy();
  }));
});
