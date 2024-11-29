import { TestBed } from '@angular/core/testing';

import { Rapport2Service } from './rapport2.service';

describe('Rapport2Service', () => {
  let service: Rapport2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Rapport2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
