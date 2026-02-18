import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  template: `
    <div class="min-h-screen bg-bg">
      <!-- Header (Fixed Top) -->
      <app-header />

      <!-- Sidebar (Fixed Left, Below Header) -->
      <app-sidebar 
        class="fixed left-0 top-16 bottom-0 z-40"
        (sidebarToggle)="onSidebarToggle($event)" 
      />

      <!-- Main Content -->
      <div
        class="flex flex-col min-h-screen transition-all duration-300 pt-16"
        [class.pl-60]="!sidebarCollapsed()"
        [class.pl-16]="sidebarCollapsed()"
      >
        <main class="flex-1 p-6 overflow-x-hidden">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class App {
  sidebarCollapsed = signal(false);

  onSidebarToggle(collapsed: boolean) {
    this.sidebarCollapsed.set(collapsed);
  }
}
