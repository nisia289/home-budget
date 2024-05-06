import { TestBed } from '@angular/core/testing';

import { WydatkiService } from './wydatki.service';

describe('WydatkiService', () => {
  let service: WydatkiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WydatkiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
