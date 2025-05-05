import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseChartDirective, NG_CHARTS_CONFIGURATION } from 'ng2-charts';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';


@Component({
  selector: 'app-user-report-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './user-report-chart.component.html',
  styleUrls: ['./user-report-chart.component.css']
})

export class UserReportChartComponent {
  public lineChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Users Active' }
  ];
  public lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions = {
    responsive: true,
  };
  public lineChartLegend = true;
  public lineChartType = 'line';
}
