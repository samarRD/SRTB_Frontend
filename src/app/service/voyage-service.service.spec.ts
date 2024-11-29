import { TestBed } from '@angular/core/testing';

import { VoyageServiceService } from './voyage-service.service';

describe('VoyageServiceService', () => {
  let service: VoyageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoyageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
