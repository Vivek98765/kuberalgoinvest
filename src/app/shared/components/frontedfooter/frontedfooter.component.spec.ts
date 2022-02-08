import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontedfooterComponent } from './frontedfooter.component';

describe('FrontedfooterComponent', () => {
  let component: FrontedfooterComponent;
  let fixture: ComponentFixture<FrontedfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontedfooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontedfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
