import { TestBed } from '@angular/core/testing';

import { VersementVehiculeService } from './versement-vehicule.service';

describe('VersementVehiculeService', () => {
  let service: VersementVehiculeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VersementVehiculeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
