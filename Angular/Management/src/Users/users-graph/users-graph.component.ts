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

// import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
// import { ChartConfiguration, ChartType, ChartOptions } from 'chart.js';
// import { BaseChartDirective } from 'ng2-charts';

// @Component({
//   selector: 'app-user-graph',
//   standalone: true,
//   imports: [BaseChartDirective],
//   template: `
//     <div style="display: block; width: 100%; height: 400px;">
//       <canvas baseChart
//               [data]="barChartData"
//               [options]="barChartOptions"
//               [type]="barChartType">
//       </canvas>
//     </div>
//   `,
//   styleUrls: ['./users-graph.component.css']
// })
// export class UserGraphComponent implements OnChanges {
//   @Input() users: any[] = []; // Input to receive user data from parent component

//   @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

//   public barChartData: ChartConfiguration<'bar'>['data'] = {
//     labels: [],
//     datasets: [
//       { data: [], label: 'Number of Users' }
//     ]
//   };

//   public barChartOptions: ChartOptions<'bar'> = {
//     responsive: true,
//   };

//   public barChartType: 'bar' = 'bar';

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

//     // Notify Angular of the chart update
//     this.chart?.update();
//   }
// }

import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-graph',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, MatCardModule],
  template: `
    <div class="graph-container">
      <div class="chart-wrapper">
        <canvas baseChart
                [data]="barChartData"
                [options]="barChartOptions"
                [type]="barChartType">
        </canvas>
      </div>
      
      <div class="stats-container">
        <div class="stat-card total-users">
          <div class="stat-value">{{ users.length }}</div>
          <div class="stat-label">Total Users</div>
        </div>
        
        <div class="role-distribution">
          <h3>Role Distribution</h3>
          <div class="role-list">
            @for (role of barChartData.labels; track $index) {
              <div class="role-item">
                <div class="role-color" [style.background-color]="getColorForRole($index)"></div>
                <div class="role-name">{{ role }}</div>
                <div class="role-count">{{ barChartData.datasets[0].data[$index] }}</div>
              </div>
            }
          </div>
        </div>
      </div>
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
      {
        data: [],
        label: 'Number of Users',
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: []
      }
    ]
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#334155',
        bodyColor: '#334155',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          labelPointStyle: () => {
            return {
              pointStyle: 'rectRounded',
              rotation: 0
            };
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#94a3b8'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f8fafc'
        },
        ticks: {
          precision: 0,
          color: '#94a3b8'
        }
      }
    }
  };

  public barChartType: 'bar' = 'bar';

  // Lighter color palette for roles
  private colorPalette = [
    { bg: '#fbd5e8', border: '#f9a8d4', hover: '#f472b6' }, // Light Pink
    { bg: '#dbeafe', border: '#bfdbfe', hover: '#93c5fd' }, // Light Blue
    { bg: '#d1fae5', border: '#a7f3d0', hover: '#6ee7b7' }, // Light Green
    { bg: '#e9d5ff', border: '#d8b4fe', hover: '#c4b5fd' }, // Light Purple
    { bg: '#fef3c7', border: '#fde68a', hover: '#fcd34d' }, // Light Amber
    { bg: '#fee2e2', border: '#fecaca', hover: '#fca5a5' }  // Light Red
  ];

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

    // Set colors for each bar based on our color palette
    const backgroundColors: string[] = [];
    const borderColors: string[] = [];
    const hoverColors: string[] = [];

    this.barChartData.labels.forEach((_, index) => {
      const colorIndex = index % this.colorPalette.length;
      backgroundColors.push(this.colorPalette[colorIndex].bg);
      borderColors.push(this.colorPalette[colorIndex].border);
      hoverColors.push(this.colorPalette[colorIndex].hover);
    });

    this.barChartData.datasets[0].backgroundColor = backgroundColors;
    this.barChartData.datasets[0].borderColor = borderColors;
    this.barChartData.datasets[0].hoverBackgroundColor = hoverColors;

    // Notify Angular of the chart update
    this.chart?.update();
  }

  // Helper method to get color for role in the template
  getColorForRole(index: number): string {
    const colorIndex = index % this.colorPalette.length;
    return this.colorPalette[colorIndex].bg;
  }
}