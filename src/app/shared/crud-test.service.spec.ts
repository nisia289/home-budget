import { TestBed } from '@angular/core/testing';

import { CrudTestService } from './crud-test.service';

describe('CrudTestService', () => {
  let service: CrudTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
