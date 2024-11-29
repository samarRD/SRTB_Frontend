import { TestBed } from '@angular/core/testing';

import { Rapport3Service } from './rapport3.service';

describe('Rapport3Service', () => {
  let service: Rapport3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Rapport3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
