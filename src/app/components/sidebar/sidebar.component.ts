import { Component, signal, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside
      class="fixed left-0 top-0 h-screen bg-white border-r border-border z-50 flex flex-col transition-all duration-300"
      [class.w-60]="!collapsed()"
      [class.w-16]="collapsed()"
    >
      <!-- Logo -->
      <div class="flex items-center px-4 h-16 border-b border-border">
        <div class="flex items-center gap-2 overflow-hidden">
          <div class="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm shrink-0">?</div>
          @if (!collapsed()) {
            
          }
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 py-4 flex flex-col gap-1 px-2 overflow-y-auto">
        <!-- Dashboard -->
        <a routerLink="/dashboard" routerLinkActive="active-link" [routerLinkActiveOptions]="{ exact: true }"
          class="nav-link" title="Dashboard">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          @if (!collapsed()) { <span class="text-sm font-medium whitespace-nowrap">Dashboard</span> }
        </a>

        <!-- Customers -->
        <a routerLink="/customers" routerLinkActive="active-link"
          class="nav-link" title="Customers">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          @if (!collapsed()) { <span class="text-sm font-medium whitespace-nowrap">Customers</span> }
        </a>

        <!-- Users -->
        <a routerLink="/users" routerLinkActive="active-link"
          class="nav-link" title="Users">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          @if (!collapsed()) { <span class="text-sm font-medium whitespace-nowrap">Users</span> }
        </a>

        <!-- Security -->
        <a routerLink="/security" routerLinkActive="active-link"
          class="nav-link" title="Security">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          @if (!collapsed()) { <span class="text-sm font-medium whitespace-nowrap">Security</span> }
        </a>

        <!-- Consent Management -->
        <a routerLink="/consents" routerLinkActive="active-link"
          class="nav-link" title="Consent Management">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          @if (!collapsed()) { <span class="text-sm font-medium whitespace-nowrap">Consent Management</span> }
        </a>

        <!-- Reports -->
        <a routerLink="/reports" routerLinkActive="active-link"
          class="nav-link" title="Reports">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
          @if (!collapsed()) { <span class="text-sm font-medium whitespace-nowrap">Reports</span> }
        </a>

        <!-- TPP Management -->
        <a routerLink="/tpp" routerLinkActive="active-link"
          class="nav-link" title="TPP Management">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
          @if (!collapsed()) { <span class="text-sm font-medium whitespace-nowrap">TPP Management</span> }
        </a>

        <!-- Audit Log -->
        <a routerLink="/audit" routerLinkActive="active-link"
          class="nav-link" title="Audit Log">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          @if (!collapsed()) { <span class="text-sm font-medium whitespace-nowrap">Audit Log</span> }
        </a>
      </nav>

      <!-- Collapse toggle -->
      <button
        (click)="toggleCollapse()"
        class="absolute -right-3 top-20 w-6 h-6 bg-white border border-border rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors cursor-pointer z-10"
      >
        @if (collapsed()) {
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        } @else {
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        }
      </button>
    </aside>
  `,
  styles: [`
    :host {
      display: block;
    }
    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.625rem 0.75rem;
      border-radius: 0.5rem;
      color: #777;
      transition: all 0.2s;
    }
    .nav-link:hover {
      background-color: #f3f4f6;
    }
    .nav-link.active-link {
      background-color: #1e2a5a;
      color: white;
    }
    .nav-link.active-link .nav-icon {
      stroke: white;
    }
    .nav-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `]
})
export class SidebarComponent {
  collapsed = signal(false);
  sidebarToggle = output<boolean>();

  toggleCollapse() {
    this.collapsed.update(v => !v);
    this.sidebarToggle.emit(this.collapsed());
  }
}
