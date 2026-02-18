import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  template: `
    <div class="flex min-h-screen">
      <!-- Sidebar -->
      <app-sidebar (sidebarToggle)="onSidebarToggle($event)" />

      <!-- Main content area -->
      <div
        class="flex-1 flex flex-col transition-all duration-300"
        [class.ml-60]="!sidebarCollapsed()"
        [class.ml-16]="sidebarCollapsed()"
      >
        <app-header />
        <main class="flex-1 p-6 bg-bg overflow-auto">
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
