import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WydatkiComponent } from './wydatki.component';

describe('WydatkiComponent', () => {
  let component: WydatkiComponent;
  let fixture: ComponentFixture<WydatkiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WydatkiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WydatkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
