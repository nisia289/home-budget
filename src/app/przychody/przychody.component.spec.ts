import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrzychodyComponent } from './przychody.component';

describe('PrzychodyComponent', () => {
  let component: PrzychodyComponent;
  let fixture: ComponentFixture<PrzychodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrzychodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrzychodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
