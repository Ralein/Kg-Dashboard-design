import { Component, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, CommonModule],
  template: `
    <div class="min-h-screen bg-bg-app font-sans">
      
      <!-- Shell (Sidebar & Header) -->
      <ng-container *ngIf="!isLoginPage()">
        <!-- Sidebar (Fixed Left) -->
        <app-sidebar (sidebarToggle)="onSidebarToggle($event)" />

        <!-- Header (Fixed Top, right of sidebar) -->
        <app-header [sidebarCollapsed]="sidebarCollapsed()" />
      </ng-container>

      <!-- Main Content -->
      <div
        class="flex flex-col min-h-screen transition-all duration-300"
        [ngClass]="{
          'pt-24': !isLoginPage(),
          'px-6 pb-6': !isLoginPage(),
          'p-0': isLoginPage()
        }"
        [style.marginLeft]="!isLoginPage() ? (sidebarCollapsed() ? '5rem' : '17.5rem') : '0'"
      >
        <main class="flex-1 animate-fade-in-up h-full w-full">
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
export class App implements OnInit, OnDestroy {
  sidebarCollapsed = signal(false);
  isLoginPage = signal(false);

  private router = inject(Router);
  private routerSub!: Subscription;

  ngOnInit() {
    // Check initial route
    this.checkIfLogin(this.router.url);

    // Listen for route changes
    this.routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.checkIfLogin(event.urlAfterRedirects);
    });
  }

  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  private checkIfLogin(url: string) {
    this.isLoginPage.set(url === '/' || url === '/login');
  }

  onSidebarToggle(collapsed: boolean) {
    this.sidebarCollapsed.set(collapsed);
  }
}

