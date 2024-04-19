import { TestBed } from '@angular/core/testing';

import { UserBudgetsService } from './user-budgets.service';

describe('UserBudgetsService', () => {
  let service: UserBudgetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserBudgetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
