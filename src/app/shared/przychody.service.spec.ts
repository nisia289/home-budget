import { TestBed } from '@angular/core/testing';

import { PrzychodyService } from './przychody.service';

describe('PrzychodyService', () => {
  let service: PrzychodyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrzychodyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
