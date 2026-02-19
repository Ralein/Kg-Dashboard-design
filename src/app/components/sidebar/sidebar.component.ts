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
      <!-- Premium Glass Background -->
      <div class="absolute inset-0 premium-glass border-r border-white/20"></div>

      <!-- Toggle Button (Floating) -->
      <button
        (click)="toggleCollapse()"
        class="absolute top-9 -right-3 flex items-center justify-center w-7 h-7 rounded-full bg-white text-[#4318FF] shadow-lg shadow-[#4318FF]/20 border border-white/40 hover:scale-110 active:scale-95 transition-all duration-300 z-[60] cursor-pointer"
        [title]="collapsed() ? 'Expand' : 'Collapse'"
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

        <!-- Logo Area -->
        <div class="h-24 flex items-center flex-shrink-0 transition-all duration-300 relative" 
             [class.justify-center]="collapsed()"
             [class.px-8]="!collapsed()">
             
          <div class="flex items-center gap-3.5 relative z-10 group cursor-pointer" 
               (click)="collapsed() ? toggleCollapse() : null">
            <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-white to-white/50 shadow-lg shadow-blue-500/10 border border-white/40 transition-transform duration-300 group-hover:scale-105 flex-shrink-0 relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-[#4318FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img src="cropped-favicon.png" alt="n-sure" class="w-6 h-6 object-contain relative z-10">
            </div>
            
            <div class="flex flex-col overflow-hidden transition-all duration-300"
                 [style.width]="collapsed() ? '0px' : 'auto'"
                 [style.opacity]="collapsed() ? '0' : '1'">
              <span class="text-2xl font-black text-[#2B3674] tracking-tight leading-none">n-sure</span>
              <span class="text-[10px] font-bold tracking-[0.2em] text-[#A3AED0] uppercase mt-0.5 whitespace-nowrap">OFI PLATFORM</span>
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
              class="nav-item group relative flex items-center px-4 py-3.5 rounded-xl text-[#A3AED0] transition-all duration-300 hover:bg-white/40 hover:text-[#4318FF]"
              [class.justify-center]="collapsed()"
            >
              <!-- Active Indicator (Glow Bar) -->
              <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-[#4318FF] opacity-0 transition-all duration-300 shadow-[0_0_12px_#4318FF] indicator"></div>

              <!-- Icon -->
              <div class="flex items-center justify-center w-6 h-6 flex-shrink-0 relative z-10">
                 <lucide-icon 
                   [img]="item.icon" 
                   class="w-[22px] h-[22px] transition-all duration-300 group-hover:scale-110"
                 ></lucide-icon>
              </div>

              <!-- Label -->
              <div class="overflow-hidden transition-all duration-300 ease-in-out"
                   [style.width]="collapsed() ? '0px' : '200px'"
                   [style.opacity]="collapsed() ? '0' : '1'"
                   [style.marginLeft]="collapsed() ? '0px' : '14px'">
                <span class="text-[15px] font-medium whitespace-nowrap transition-colors duration-300 block">
                  {{ item.label }}
                </span>
              </div>

              <!-- Hover Tooltip (Collapsed) -->
              @if (collapsed()) {
                 <div class="absolute left-16 px-4 py-2 bg-[#2B3674] text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl whitespace-nowrap z-[60] translate-x-2 group-hover:translate-x-0">
                    {{ item.label }}
                    <div class="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-[#2B3674]"></div>
                 </div>
              }
            </a>
          }
        </nav>

       

  `,
  styles: [`
    .active-glass {
      @apply bg-white/60 shadow-lg shadow-blue-500/5 text-[#2B3674] font-bold;
    }
    .active-glass .indicator {
      @apply opacity-100;
    }
    .active-glass lucide-icon {
      @apply text-[#4318FF];
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(163, 174, 208, 0.2);
      border-radius: 10px;
    }
    .custom-scrollbar:hover::-webkit-scrollbar-thumb {
      background: rgba(67, 24, 255, 0.4);
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