import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugnupComponent } from './sugnup.component';

describe('SugnupComponent', () => {
  let component: SugnupComponent;
  let fixture: ComponentFixture<SugnupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SugnupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SugnupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
