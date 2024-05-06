import { TestBed } from '@angular/core/testing';

import { TransakcjeService } from './transakcje.service';

describe('TransakcjeService', () => {
  let service: TransakcjeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransakcjeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
