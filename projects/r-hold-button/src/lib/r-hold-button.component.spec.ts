import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RHoldButtonComponent } from './r-hold-button.component';

describe('RHoldButtonComponent', () => {
  let component: RHoldButtonComponent;
  let fixture: ComponentFixture<RHoldButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RHoldButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RHoldButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
