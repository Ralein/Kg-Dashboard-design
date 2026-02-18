import { Component, signal, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, LayoutDashboard, Users, UserCheck, ShieldCheck, FileCheck, FileText, Server, ClipboardList } from 'lucide-angular';
import { CommonModule } from '@angular/common';

interface NavItem {
  route: string;
  label: string;
  exact?: boolean;
  icon: any;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule, CommonModule],
  template: `
    <aside
      class="fixed left-0 top-0 h-screen transition-all duration-300 z-50 flex flex-col"
      [ngClass]="{
        'w-64': !collapsed(),
        'w-20': collapsed()
      }"
    >
      <!-- Glass Background Layer -->
      <div 
        class="absolute inset-0 bg-white/60 backdrop-blur-xl border-r border-white/40 shadow-glass"
      ></div>

      <!-- Content Container -->
      <div class="relative z-10 flex flex-col h-full">

        <!-- Logo Area -->
        <div class="h-24 flex items-center justify-center flex-shrink-0" [class.px-6]="!collapsed()">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white shadow-lg shadow-primary/30 transition-transform hover:scale-105">
              <span class="text-xl font-bold leading-none">logo</span>
            </div>
            
            @if (!collapsed()) {
              <div class="flex flex-col fade-in">
                <span class="text-xl font-bold text-primary tracking-tight leading-none">n-sure</span>
                <span class="text-[10px] font-bold tracking-[0.2em] text-secondary uppercase mt-0.5">OFI Platform</span>
              </div>
            }
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
          @for (item of navItems; track item.route) {
            <a
              [routerLink]="item.route"
              routerLinkActive="active-glass"
              [routerLinkActiveOptions]="{ exact: !!item.exact }"
              class="nav-item group relative flex items-center gap-3 px-3 py-3 rounded-xl text-secondary transition-all duration-200 hover:bg-white/50"
              [title]="collapsed() ? item.label : ''"
            >
              <!-- Active Indicator (Left Border) -->
              <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-accent opacity-0 transition-opacity duration-200 indicator"></div>

              <!-- Icon -->
              <lucide-icon 
                [img]="item.icon" 
                class="w-5 h-5 flex-shrink-0 transition-colors duration-200 group-hover:text-primary"
              ></lucide-icon>

              <!-- Label -->
              @if (!collapsed()) {
                <span class="text-sm font-medium whitespace-nowrap transition-colors duration-200 group-hover:text-primary nav-text">
                  {{ item.label }}
                </span>
              }

              <!-- Floating Tooltip for collapsed state -->
              @if (collapsed()) {
                 <div class="absolute left-full ml-4 px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl whitespace-nowrap z-50">
                    {{ item.label }}
                    <div class="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-primary"></div>
                 </div>
              }
            </a>
          }
        </nav>

        <!-- Toggle Button -->
        <div class="p-4 border-t border-white/30">
          <button
            (click)="toggleCollapse()"
            class="w-full h-10 flex items-center justify-center rounded-xl bg-white/40 hover:bg-white/70 text-secondary hover:text-primary transition-all duration-200"
          >
             <svg 
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                class="transition-transform duration-300"
                [class.rotate-180]="collapsed()"
             >
                <path d="M15 18l-6-6 6-6"/>
             </svg>
          </button>
        </div>

      </div>
    </aside>
  `,
  styles: [`
    .active-glass {
      @apply bg-white/80 shadow-sm text-primary font-bold;
    }
    .active-glass .indicator {
      @apply opacity-100;
    }
    .active-glass lucide-icon {
      @apply text-accent;
    }
    .fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateX(-5px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(0,0,0,0.05);
      border-radius: 10px;
    }
    .custom-scrollbar:hover::-webkit-scrollbar-thumb {
      background: rgba(0,0,0,0.1);
    }
  `]
})
export class SidebarComponent {
  collapsed = signal(false);
  sidebarToggle = output<boolean>();

  readonly navItems: NavItem[] = [
    { route: '/dashboard', label: 'Dashboard', exact: true, icon: LayoutDashboard },
    { route: '/customers', label: 'Customers', icon: Users },
    { route: '/users', label: 'Users', icon: UserCheck },
    { route: '/security', label: 'Security', icon: ShieldCheck },
    { route: '/consents', label: 'Consent Management', icon: FileCheck },
    { route: '/reports', label: 'Reports', icon: FileText },
    { route: '/tpp', label: 'TPP Management', icon: Server },
    { route: '/audit', label: 'Audit Log', icon: ClipboardList },
  ];

  toggleCollapse(): void {
    this.collapsed.update(v => !v);
    this.sidebarToggle.emit(this.collapsed());
  }
}