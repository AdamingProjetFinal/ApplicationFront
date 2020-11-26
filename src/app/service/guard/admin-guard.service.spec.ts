/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminGuardService } from './admin-guard.service';

describe('Service: Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuardService]
    });
  });

  it('should ...', inject([AdminGuardService], (service: AdminGuardService) => {
    expect(service).toBeTruthy();
  }));
});
