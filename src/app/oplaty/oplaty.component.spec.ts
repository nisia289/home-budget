import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OplatyComponent } from './oplaty.component';

describe('OplatyComponent', () => {
  let component: OplatyComponent;
  let fixture: ComponentFixture<OplatyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OplatyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OplatyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
