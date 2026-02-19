import { Component, signal, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, LayoutDashboard, UserPlus, FileCheck, FileText, Settings2, Activity, ClipboardList, ShieldCheck } from 'lucide-angular';
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
      class="fixed left-0 top-0 h-screen transition-all duration-300 ease-in-out z-50 flex flex-col"
      [ngClass]="{
        'w-[20rem]': !collapsed(),
        'w-20': collapsed()
      }"
    >
      <!-- Glass Background Layer -->
      <div 
        class="absolute inset-0 bg-white/60 backdrop-blur-xl border-r border-white/40 shadow-glass"
      ></div>

      <!-- Toggle Button (Floating outside content) -->
      <button
        (click)="toggleCollapse()"
        class="absolute top-9 -right-3 flex items-center justify-center w-6 h-6 rounded-full bg-white text-[#2B3674] shadow-md border border-[#2B3674]/10 hover:bg-[#F4F7FE] hover:scale-110 active:scale-95 transition-all duration-300 z-[60] cursor-pointer"
        [title]="collapsed() ? 'Expand' : 'Collapse'"
        style="color: #2B3674;"
      >
          <svg 
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
            class="transition-transform duration-500 ease-in-out"
            [class.rotate-180]="collapsed()"
          >
            <path d="M15 18l-6-6 6-6"/>
          </svg>
      </button>

      <!-- Content Container -->
      <div class="relative z-10 flex flex-col h-full overflow-hidden">

        <!-- Logo & Toggle Area -->
        <div class="h-24 flex items-center flex-shrink-0 transition-all duration-300 relative" 
             [class.justify-center]="collapsed()"
             [class.px-6]="!collapsed()">
             
          <!-- Logo Group -->
          <div class="flex items-center gap-3 relative z-10">
            <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-lg shadow-black/5 transition-transform duration-300 hover:scale-105 flex-shrink-0 cursor-pointer overflow-hidden" 
                 (click)="collapsed() ? toggleCollapse() : null">
              <img src="cropped-favicon.png" alt="n-sure logo" class="w-8 h-8 object-cover">
            </div>
            
            <div class="flex flex-col overflow-hidden transition-all duration-300"
                 [style.width]="collapsed() ? '0px' : 'auto'"
                 [style.opacity]="collapsed() ? '0' : '1'">
              <span class="text-xl font-bold text-primary tracking-tight leading-none whitespace-nowrap">n-sure</span>
              <span class="text-[10px] font-bold tracking-[0.2em] text-secondary uppercase mt-0.5 whitespace-nowrap">OFI Platform</span>
            </div>
          </div>

        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar overflow-x-hidden">
          @for (item of navItems; track item.route) {
            <a
              [routerLink]="item.route"
              routerLinkActive="active-glass"
              [routerLinkActiveOptions]="{ exact: !!item.exact }"
              class="nav-item group relative flex items-center px-3 py-3 rounded-xl text-secondary transition-all duration-200 hover:bg-white/50"
              [class.justify-center]="collapsed()"
              [title]="collapsed() ? '' : ''"
            >
              <!-- Active Indicator (Left Border) -->
              <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-accent opacity-0 transition-opacity duration-200 indicator"></div>

              <!-- Icon Container -->
              <div class="flex items-center justify-center w-6 h-6 flex-shrink-0 relative">
                 <lucide-icon 
                   [img]="item.icon" 
                   class="w-5 h-5 transition-colors duration-200 group-hover:text-primary"
                 ></lucide-icon>
              </div>

              <!-- Label Container with Transition -->
              <div class="overflow-hidden transition-all duration-300 ease-in-out"
                   [style.width]="collapsed() ? '0px' : '250px'"
                   [style.opacity]="collapsed() ? '0' : '1'"
                   [style.marginLeft]="collapsed() ? '0px' : '12px'">
                <span class="text-sm font-medium whitespace-nowrap transition-colors duration-200 group-hover:text-primary nav-text block">
                  {{ item.label }}
                </span>
              </div>

              <!-- Floating Tooltip for collapsed state only -->
              @if (collapsed()) {
                 <div class="absolute left-14 px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl whitespace-nowrap z-[60] pointer-events-none transform translate-x-3 group-hover:translate-x-0">
                    {{ item.label }}
                    <div class="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-primary"></div>
                 </div>
              }
            </a>
          }
        </nav>

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
    { route: '/user-creation', label: 'User Creation', icon: UserPlus },
    { route: '/consent-management', label: 'Consent Management', icon: ShieldCheck },
    { route: '/quotation-management', label: 'Quotation Management', icon: FileCheck },
    { route: '/api-versioning', label: 'API Versioning', icon: Settings2 },
    { route: '/api-monitoring', label: 'API Monitoring', icon: Activity },
    { route: '/reports', label: 'Reports', icon: FileText },
    { route: '/audit-logs', label: 'Audit Logs', icon: ClipboardList },
  ];

  toggleCollapse(): void {
    this.collapsed.update(v => !v);
    this.sidebarToggle.emit(this.collapsed());
  }
}