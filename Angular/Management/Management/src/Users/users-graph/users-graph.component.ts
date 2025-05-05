// import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
// import { ChartConfiguration, ChartType } from 'chart.js';
// import { BaseChartDirective } from 'ng2-charts';
// import {  ChartOptions } from 'chart.js';
// @Component({
//   selector: 'app-user-graph',
//   imports: [],
//   templateUrl: './users-graph.component.html',
//   styleUrls: ['./users-graph.component.css'],
//   template: `<div style="display: block; width: 100%; height: 400px;">
//   <canvas baseChart
//           [data]="barChartData"
//           [options]="barChartOptions"
//           [type]="barChartType">
//   </canvas>
// </div>`,
// })
// export class UserGraphComponent implements OnChanges {
//   @Input() users: any[] = []; // Input to receive user data from parent component

//   public barChartData: ChartConfiguration<'bar'>['data'] = {
//     labels: [],
//     datasets: [
//       { data: [], label: 'Number of Users' }
//     ]
//   };
//   public barChartOptions: ChartConfiguration<'bar'>['options'] = {
//     responsive: true,
//   };
//   public barChartType: ChartType = 'bar';

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['users'] && this.users) {
//       this.updateChartData();
//     }
//   }

//   private updateChartData(): void {
//     const roleCounts: { [key: string]: number } = {};
//     this.users.forEach(user => {
//       roleCounts[user.role] = (roleCounts[user.role] || 0) + 1;
//     });

//     this.barChartData.labels = Object.keys(roleCounts);
//     this.barChartData.datasets[0].data = Object.values(roleCounts);
//   }
// }

//b-gemini
// import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
// import { ChartConfiguration, ChartType, ChartOptions } from 'chart.js';
// import { BaseChartDirective } from 'ng2-charts';

// @Component({
//   selector: 'app-user-graph',
//   standalone: true, // Make sure this is true for standalone components
//   imports: [BaseChartDirective], // Add BaseChartDirective to the imports array
//   templateUrl: './users-graph.component.html',
//   styleUrls: ['./users-graph.component.css'],
//   template: `<div style="display: block; width: 100%; height: 400px;">
//     <canvas baseChart
//             [data]="barChartData"
//             [options]="barChartOptions"
//             [type]="barChartType">
//     </canvas>
//   </div>`,
// })
// export class UserGraphComponent implements OnChanges {
//   @Input() users: any[] = []; // Input to receive user data from parent component

//   public barChartData: ChartConfiguration<'bar'>['data'] = {
//     labels: [],
//     datasets: [
//       { data: [], label: 'Number of Users' }
//     ]
//   };
//   public barChartOptions: ChartOptions<'bar'> = { // Corrected type
//     responsive: true,
//   };
//   public barChartType: ChartType = 'bar';

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['users'] && this.users) {
//       this.updateChartData();
//     }
//   }

//   private updateChartData(): void {
//     const roleCounts: { [key: string]: number } = {};
//     this.users.forEach(user => {
//       roleCounts[user.role] = (roleCounts[user.role] || 0) + 1;
//     });

//     this.barChartData.labels = Object.keys(roleCounts);
//     this.barChartData.datasets[0].data = Object.values(roleCounts);
//   }
// }

//c-copilot

import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-user-graph',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <div style="display: block; width: 100%; height: 400px;">
      <canvas baseChart
              [data]="barChartData"
              [options]="barChartOptions"
              [type]="barChartType">
      </canvas>
    </div>
  `,
  styleUrls: ['./users-graph.component.css']
})
export class UserGraphComponent implements OnChanges {
  @Input() users: any[] = []; // Input to receive user data from parent component

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Number of Users' }
    ]
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
  };

  public barChartType: 'bar' = 'bar';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['users'] && this.users) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    const roleCounts: { [key: string]: number } = {};
    this.users.forEach(user => {
      roleCounts[user.role] = (roleCounts[user.role] || 0) + 1;
    });

    this.barChartData.labels = Object.keys(roleCounts);
    this.barChartData.datasets[0].data = Object.values(roleCounts);

    // Notify Angular of the chart update
    this.chart?.update();
  }
}