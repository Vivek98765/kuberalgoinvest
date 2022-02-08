import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontedheaderComponent } from './frontedheader.component';

describe('FrontedheaderComponent', () => {
  let component: FrontedheaderComponent;
  let fixture: ComponentFixture<FrontedheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontedheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontedheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
