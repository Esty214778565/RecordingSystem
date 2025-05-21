import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterModule
  ],
  template: `
    <div class="sidenav-container">
      <div class="sidenav-header">
        <div class="user-info">
          <div class="user-avatar">
            <span>JD</span>
          </div>
          <div class="user-details">
            <div class="user-name">John Doe</div>
            <div class="user-role">Administrator</div>
          </div>
        </div>
      </div>
      
      <mat-nav-list>
        <a mat-list-item routerLink="/admin/dashboard" routerLinkActive="active-link">
          <mat-icon matListItemIcon>dashboard</mat-icon>
          <span matListItemTitle>Dashboard</span>
        </a>
        
        <a mat-list-item routerLink="/admin/users" routerLinkActive="active-link">
          <mat-icon matListItemIcon>people</mat-icon>
          <span matListItemTitle>Users</span>
        </a>
        
        <a mat-list-item routerLink="/admin/courses" routerLinkActive="active-link">
          <mat-icon matListItemIcon>school</mat-icon>
          <span matListItemTitle>Courses</span>
        </a>
        
        <a mat-list-item routerLink="/admin/recordings" routerLinkActive="active-link">
          <mat-icon matListItemIcon>videocam</mat-icon>
          <span matListItemTitle>Recordings</span>
        </a>
        
        <a mat-list-item routerLink="/admin/analytics" routerLinkActive="active-link">
          <mat-icon matListItemIcon>insights</mat-icon>
          <span matListItemTitle>Analytics</span>
        </a>
        
        <mat-divider></mat-divider>
        
        <a mat-list-item routerLink="/admin/settings" routerLinkActive="active-link">
          <mat-icon matListItemIcon>settings</mat-icon>
          <span matListItemTitle>Settings</span>
        </a>
      </mat-nav-list>
    </div>
  `,
  styles: [`
    .sidenav-container {
      height: 100%;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
    }
    
    .sidenav-header {
      padding: 24px 16px;
      border-bottom: 1px solid #e4e4e7;
    }
    
    .user-info {
      display: flex;
      align-items: center;
    }
    
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #8b5cf6;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      margin-right: 12px;
    }
    
    .user-details {
      display: flex;
      flex-direction: column;
    }
    
    .user-name {
      font-weight: 500;
      color: #18181b;
    }
    
    .user-role {
      font-size: 12px;
      color: #71717a;
    }
    
    mat-nav-list {
      padding-top: 8px;
    }
    
    .active-link {
      background-color: #f5f3ff !important;
      color: #8b5cf6 !important;
      border-left: 4px solid #8b5cf6;
      
      mat-icon {
        color: #8b5cf6 !important;
      }
    }
    
    mat-list-item {
      height: 48px;
      margin: 4px 8px;
      border-radius: 6px;
      
      &:hover {
        background-color: #f8fafc;
      }
    }
  `]
})
export class AdminSidenavComponent {}
