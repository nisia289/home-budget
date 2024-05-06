import { TestBed } from '@angular/core/testing';

import { OplatyService } from './oplaty.service';

describe('OplatyService', () => {
  let service: OplatyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OplatyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
