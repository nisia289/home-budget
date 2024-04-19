import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCreationComponent } from './budget-creation.component';

describe('BudgetCreationComponent', () => {
  let component: BudgetCreationComponent;
  let fixture: ComponentFixture<BudgetCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
