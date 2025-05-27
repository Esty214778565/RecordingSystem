import { Component, EventEmitter } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatMenuModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary" class="admin-toolbar">
      <button mat-icon-button class="menu-button" (click)="toggleSidenav.emit()">
        <mat-icon>menu</mat-icon>
      </button>
      
      <span class="logo">
        <img src="assets/logo.png" alt="Recording System" height="32">
        RECORDING SYSTEM
      </span>
      
      <span class="spacer"></span>
      
      <button mat-icon-button aria-label="Search">
        <mat-icon>search</mat-icon>
      </button>
      
      <button mat-icon-button aria-label="Notifications">
        <mat-icon>notifications</mat-icon>
      </button>
      
      <button mat-icon-button [matMenuTriggerFor]="userMenu" aria-label="User menu">
        <div class="user-avatar">
          <span>JD</span>
        </div>
      </button>
      
      <mat-menu #userMenu="matMenu" xPosition="before">
        <button mat-menu-item>
          <mat-icon>person</mat-icon>
          <span>Profile</span>
        </button>
        <button mat-menu-item>
          <mat-icon>settings</mat-icon>
          <span>Settings</span>
        </button>
        <mat-divider></mat-divider>
        <button mat-menu-item>
          <mat-icon>exit_to_app</mat-icon>
          <span>Logout</span>
        </button>
      </mat-menu>
    </mat-toolbar>
  `,
  styles: [`
    .admin-toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      padding: 0 16px;
      height: 64px;
    }
    
    .menu-button {
      margin-right: 16px;
    }
    
    .logo {
      display: flex;
      align-items: center;
      font-weight: 600;
      letter-spacing: 0.5px;
      
      img {
        margin-right: 12px;
      }
    }
    
    .spacer {
      flex: 1 1 auto;
    }
    
    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-size: 14px;
    }
  `],
  outputs: ['toggleSidenav']
})
export class AdminToolbarComponent {
  toggleSidenav = new EventEmitter<void>();
}
