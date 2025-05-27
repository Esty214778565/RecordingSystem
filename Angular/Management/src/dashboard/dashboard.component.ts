import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule
  ],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p class="subtitle">Manage users, courses, and view analytics for your recording system.</p>
      </div>
      
      <div class="metrics-grid">
        <mat-card class="metric-card">
          <div class="metric-icon" style="background-color: rgba(139, 92, 246, 0.1);">
            <mat-icon style="color: #8b5cf6;">people</mat-icon>
          </div>
          <div class="metric-content">
            <div class="metric-label">Total Users</div>
            <div class="metric-value">2,853</div>
            <div class="metric-change positive">
              <mat-icon>trending_up</mat-icon> 12.5% from last month
            </div>
          </div>
        </mat-card>
        
        <mat-card class="metric-card">
          <div class="metric-icon" style="background-color: rgba(6, 182, 212, 0.1);">
            <mat-icon style="color: #06b6d4;">school</mat-icon>
          </div>
          <div class="metric-content">
            <div class="metric-label">Active Courses</div>
            <div class="metric-value">127</div>
            <div class="metric-change positive">
              <mat-icon>trending_up</mat-icon> 4.3% from last month
            </div>
          </div>
        </mat-card>
        
        <mat-card class="metric-card">
          <div class="metric-icon" style="background-color: rgba(245, 158, 11, 0.1);">
            <mat-icon style="color: #f59e0b;">videocam</mat-icon>
          </div>
          <div class="metric-content">
            <div class="metric-label">Total Recordings</div>
            <div class="metric-value">3,456</div>
            <div class="metric-change positive">
              <mat-icon>trending_up</mat-icon> 19.2% from last month
            </div>
          </div>
        </mat-card>
        
        <mat-card class="metric-card">
          <div class="metric-icon" style="background-color: rgba(239, 68, 68, 0.1);">
            <mat-icon style="color: #ef4444;">storage</mat-icon>
          </div>
          <div class="metric-content">
            <div class="metric-label">Storage Used</div>
            <div class="metric-value">768 GB</div>
            <div class="metric-change positive">
              <mat-icon>trending_up</mat-icon> 7.5% from last month
            </div>
          </div>
        </mat-card>
      </div>
      
      <div class="dashboard-content">
        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>User Analytics</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-placeholder">
              <!-- Chart will be rendered here using ngx-charts or Chart.js -->
              <div class="placeholder-text">User growth chart will be displayed here</div>
            </div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="activity-card">
          <mat-card-header>
            <mat-card-title>Recent Activity</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="activity-list">
              <div class="activity-item">
                <div class="activity-icon" style="background-color: rgba(6, 182, 212, 0.1);">
                  <mat-icon style="color: #06b6d4;">person_add</mat-icon>
                </div>
                <div class="activity-content">
                  <div class="activity-title">New user registered</div>
                  <div class="activity-description">John Doe joined as a student</div>
                  <div class="activity-time">2 hours ago</div>
                </div>
              </div>
              
              <div class="activity-item">
                <div class="activity-icon" style="background-color: rgba(245, 158, 11, 0.1);">
                  <mat-icon style="color: #f59e0b;">videocam</mat-icon>
                </div>
                <div class="activity-content">
                  <div class="activity-title">New recording uploaded</div>
                  <div class="activity-description">Advanced Web Development - Lesson 5</div>
                  <div class="activity-time">4 hours ago</div>
                </div>
              </div>
              
              <div class="activity-item">
                <div class="activity-icon" style="background-color: rgba(139, 92, 246, 0.1);">
                  <mat-icon style="color: #8b5cf6;">school</mat-icon>
                </div>
                <div class="activity-content">
                  <div class="activity-title">New course created</div>
                  <div class="activity-description">Introduction to Machine Learning</div>
                  <div class="activity-time">Yesterday</div>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    
    .dashboard-header {
      margin-bottom: 8px;
      
      h1 {
        font-size: 28px;
        font-weight: 600;
        color: #18181b;
        margin: 0 0 8px 0;
      }
      
      .subtitle {
        color: #71717a;
        font-size: 16px;
        margin: 0;
      }
    }
    
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 24px;
    }
    
    .metric-card {
      display: flex;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      }
    }
    
    .metric-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 12px;
      margin-right: 16px;
      
      mat-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
      }
    }
    
    .metric-content {
      display: flex;
      flex-direction: column;
    }
    
    .metric-label {
      font-size: 14px;
      font-weight: 500;
      color: #71717a;
      margin-bottom: 4px;
    }
    
    .metric-value {
      font-size: 28px;
      font-weight: 700;
      color: #18181b;
      line-height: 1.2;
      margin-bottom: 8px;
    }
    
    .metric-change {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      
      mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
        margin-right: 4px;
      }
      
      &.positive {
        color: #10b981;
      }
      
      &.negative {
        color: #ef4444;
      }
    }
    
    .dashboard-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
      
      @media (max-width: 1024px) {
        grid-template-columns: 1fr;
      }
    }
    
    .chart-card, .activity-card {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
      
      mat-card-header {
        padding: 16px 24px;
        border-bottom: 1px solid #e4e4e7;
        
        mat-card-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          color: #18181b;
        }
      }
      
      mat-card-content {
        padding: 24px;
      }
    }
    
    .chart-placeholder {
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f8fafc;
      border-radius: 8px;
      
      .placeholder-text {
        color: #71717a;
        font-style: italic;
      }
    }
    
    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .activity-item {
      display: flex;
      padding: 16px;
      border-radius: 8px;
      background-color: #f8fafc;
      transition: background-color 0.3s ease;
      
      &:hover {
        background-color: #f1f5f9;
      }
    }
    
    .activity-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 8px;
      margin-right: 16px;
      
      mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }
    }
    
    .activity-content {
      display: flex;
      flex-direction: column;
    }
    
    .activity-title {
      font-size: 16px;
      font-weight: 500;
      color: #18181b;
      margin-bottom: 4px;
    }
    
    .activity-description {
      font-size: 14px;
      color: #71717a;
      margin-bottom: 8px;
    }
    
    .activity-time {
      font-size: 12px;
      color: #a1a1aa;
    }
  `]
})
export class AdminDashboardComponent { }
