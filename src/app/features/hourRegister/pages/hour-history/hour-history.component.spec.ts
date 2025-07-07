import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourHistoryComponent } from './hour-history.component';

describe('HourHistoryComponent', () => {
  let component: HourHistoryComponent;
  let fixture: ComponentFixture<HourHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
