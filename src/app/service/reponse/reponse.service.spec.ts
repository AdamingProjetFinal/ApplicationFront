/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReponseService } from './reponse.service';

describe('Service: Reponse', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReponseService]
    });
  });

  it('should ...', inject([ReponseService], (service: ReponseService) => {
    expect(service).toBeTruthy();
  }));
});
