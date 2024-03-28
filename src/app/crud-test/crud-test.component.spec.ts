import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTestComponent } from './crud-test.component';

describe('CrudTestComponent', () => {
  let component: CrudTestComponent;
  let fixture: ComponentFixture<CrudTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
