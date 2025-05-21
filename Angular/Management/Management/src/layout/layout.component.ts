import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminSidenavComponent } from '../sidenav/sidenav.component';
import { AdminToolbarComponent } from '../toolbar/toolbar.component';


@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterModule,
    AdminToolbarComponent,
    AdminSidenavComponent
  ],
  template: `
    <div class="admin-container">
      <app-toolbar (toggleSidenav)="sidenav.toggle()"></app-toolbar>
      
      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #sidenav mode="side" opened class="sidenav" [fixedInViewport]="true" [fixedTopGap]="64">
          <app-sidenav></app-sidenav>
        </mat-sidenav>
        
        <mat-sidenav-content class="sidenav-content">
          <div class="content-wrapper">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .admin-container {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    
    .sidenav-container {
      flex: 1;
      margin-top: 64px;
    }
    
    .sidenav {
      width: 250px;
      box-shadow: 1px 0 10px rgba(0, 0, 0, 0.1);
    }
    
    .sidenav-content {
      background-color: #f8fafc;
    }
    
    .content-wrapper {
      padding: 24px;
      max-width: 1600px;
      margin: 0 auto;
    }
  `]
})
export class AdminLayoutComponent {}
