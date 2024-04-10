import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransakcjeComponent } from './transakcje.component';

describe('TransakcjeComponent', () => {
  let component: TransakcjeComponent;
  let fixture: ComponentFixture<TransakcjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransakcjeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransakcjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
