import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontedComponent } from './fronted.component';

describe('FrontedComponent', () => {
  let component: FrontedComponent;
  let fixture: ComponentFixture<FrontedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
