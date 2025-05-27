import { Component } from '@angular/core';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { UserReportChartComponent } from '../Authentication/Components/user-report-chart/user-report-chart.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Management';
}
