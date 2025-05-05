import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReportChartComponent } from './user-report-chart.component';

describe('UserReportChartComponent', () => {
  let component: UserReportChartComponent;
  let fixture: ComponentFixture<UserReportChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserReportChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReportChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
