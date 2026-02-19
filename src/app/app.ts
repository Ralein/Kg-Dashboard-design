import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  template: `
    <div class="min-h-screen bg-bg-app font-sans">
      
      <!-- Sidebar (Fixed Left) -->
      <app-sidebar (sidebarToggle)="onSidebarToggle($event)" />

      <!-- Header (Fixed Top, right of sidebar) -->
      <app-header [sidebarCollapsed]="sidebarCollapsed()" />

      <!-- Main Content -->
      <div
        class="flex flex-col min-h-screen transition-all duration-300 pt-24"
        [style.marginLeft]="sidebarCollapsed() ? '5rem' : '17.5rem'"
      >
        <main class="flex-1 px-6 pb-6 animate-fade-in-up">
          <router-outlet />
        </main>
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; }
    .animate-fade-in-up {
      animation: fadeInUp 0.5s ease-out forwards;
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class App {
  sidebarCollapsed = signal(false);

  onSidebarToggle(collapsed: boolean) {
    this.sidebarCollapsed.set(collapsed);
  }
}
