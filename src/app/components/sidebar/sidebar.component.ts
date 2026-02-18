import { Component, signal, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  route: string;
  label: string;
  exact?: boolean;
  iconPath: string;
  iconPath2?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <style>
      @keyframes slideIn {
        from { opacity: 0; transform: translateX(-16px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes labelFade {
        from { opacity: 0; transform: translateX(-6px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes pulse-active {
        0%,100% { box-shadow: 0 0 0 0 rgba(30,42,90,0); }
        50%      { box-shadow: 0 0 0 4px rgba(30,42,90,0.12); }
      }

      .sidebar-enter { animation: slideIn 0.4s cubic-bezier(.22,1,.36,1) both; }

      .nav-label {
        animation: labelFade 0.22s cubic-bezier(.22,1,.36,1) both;
      }

      .nav-link {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.6rem 0.75rem;
        border-radius: 0.6rem;
        color: #8a92a6;
        transition: background 0.18s, color 0.18s, transform 0.15s, box-shadow 0.18s;
        position: relative;
        overflow: hidden;
      }

      /* ripple layer */
      .nav-link::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: rgba(30,42,90,0.06);
        opacity: 0;
        transform: scaleX(0.85);
        transition: opacity 0.18s, transform 0.18s;
      }
      .nav-link:hover::before  { opacity: 1; transform: scaleX(1); }
      .nav-link:hover          { color: #1e2a5a; transform: translateX(2px); }
      .nav-link:active         { transform: translateX(1px) scale(0.98); }

      .nav-link.active-link {
        background: linear-gradient(135deg, #1e2a5a 0%, #2a3c7d 100%);
        color: white;
        box-shadow: 0 2px 10px rgba(30,42,90,0.28), inset 0 1px 0 rgba(255,255,255,0.08);
      }
      .nav-link.active-link::before { display: none; }
      .nav-link.active-link:hover   { transform: translateX(2px); }

      /* active indicator bar */
      .nav-link.active-link::after {
        content: '';
        position: absolute;
        left: 0; top: 20%; bottom: 20%;
        width: 3px;
        border-radius: 0 3px 3px 0;
        background: rgba(255,255,255,0.55);
      }

      .nav-icon {
        width: 18px;
        height: 18px;
        flex-shrink: 0;
        stroke-linecap: round;
        stroke-linejoin: round;
        transition: transform 0.18s;
      }
      .nav-link:hover .nav-icon        { transform: scale(1.1); }
      .nav-link.active-link .nav-icon  { stroke: white; transform: scale(1.05); }

      /* tooltip for collapsed mode */
      .nav-link[data-tip]:not(.expanded) .tip {
        pointer-events: none;
        position: absolute;
        left: calc(100% + 10px);
        top: 50%;
        transform: translateY(-50%) scale(0.9);
        transform-origin: left center;
        background: #1e2a5a;
        color: white;
        font-size: 12px;
        font-weight: 500;
        white-space: nowrap;
        padding: 5px 10px;
        border-radius: 6px;
        opacity: 0;
        transition: opacity 0.15s, transform 0.15s;
        box-shadow: 0 4px 12px rgba(0,0,0,0.18);
        z-index: 100;
      }
      .nav-link[data-tip]:not(.expanded) .tip::before {
        content: '';
        position: absolute;
        right: 100%; top: 50%;
        transform: translateY(-50%);
        border: 5px solid transparent;
        border-right-color: #1e2a5a;
      }
      .nav-link[data-tip]:not(.expanded):hover .tip {
        opacity: 1;
        transform: translateY(-50%) scale(1);
      }

      .toggle-btn {
        transition: background 0.18s, border-color 0.18s, transform 0.2s, box-shadow 0.18s;
      }
      .toggle-btn:hover {
        background: #1e2a5a;
        border-color: #1e2a5a;
        box-shadow: 0 2px 8px rgba(30,42,90,0.25);
      }
      .toggle-btn:hover svg { stroke: white; }
      .toggle-btn:active    { transform: translateX(-50%) scale(0.9); }

      .toggle-icon { transition: transform 0.28s cubic-bezier(.22,1,.36,1); }

      .nav-section-label {
        font-size: 9px;
        font-weight: 700;
        letter-spacing: .12em;
        text-transform: uppercase;
        color: #c0c6d4;
        padding: 0.5rem 0.75rem 0.25rem;
        transition: opacity 0.2s;
      }

      /* scrollbar */
      nav::-webkit-scrollbar       { width: 3px; }
      nav::-webkit-scrollbar-track { background: transparent; }
      nav::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 99px; }
    </style>

    <aside
      class="sidebar-enter fixed left-0 top-0 h-screen bg-white border-r border-border z-50 flex flex-col transition-all duration-300"
      [class.w-60]="!collapsed()"
      [class.w-16]="collapsed()"
      style="box-shadow: 2px 0 16px rgba(30,42,90,0.06)"
    >

      <!-- ── Logo area ── -->
      <div class="flex items-center px-4 h-16 border-b border-border overflow-hidden flex-shrink-0">
        <div class="flex items-center gap-2">
          <!-- Icon mark always visible -->
          <div
            class="flex items-center justify-center rounded-lg flex-shrink-0 transition-all duration-300"
            [style.width]="collapsed() ? '32px' : '30px'"
            [style.height]="collapsed() ? '32px' : '30px'"
            style="background:linear-gradient(135deg,#1e2a5a,#2a3c7d)"
          >
            <span class="text-white font-bold text-sm leading-none">n</span>
          </div>
          <!-- Word mark -->
          @if (!collapsed()) {
            <div class="nav-label flex items-baseline gap-1">
              <span class="text-lg font-bold text-gray-800 tracking-tight">n-sure</span>
              <span
                class="text-[9px] font-semibold tracking-widest uppercase px-1.5 py-0.5 rounded"
                style="background:rgba(30,42,90,0.08);color:#1e2a5a"
              >OFI</span>
            </div>
          }
        </div>
      </div>

      <!-- ── Navigation ── -->
      <nav class="flex-1 py-3 flex flex-col overflow-y-auto px-2 gap-0.5">

        <!-- Main group -->
        @if (!collapsed()) {
          <p class="nav-section-label nav-label">Main</p>
        }

        @for (item of mainNav; track item.route) {
          <a
            [routerLink]="item.route"
            routerLinkActive="active-link"
            [routerLinkActiveOptions]="{ exact: !!item.exact }"
            class="nav-link"
            [class.expanded]="!collapsed()"
            [attr.data-tip]="item.label"
            [title]="collapsed() ? item.label : ''"
          >
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
              [innerHTML]="item.iconPath">
            </svg>
            @if (!collapsed()) {
              <span class="nav-label text-sm font-medium whitespace-nowrap">{{ item.label }}</span>
            }
            @if (collapsed()) { <span class="tip">{{ item.label }}</span> }
          </a>
        }

        <!-- Management group -->
        @if (!collapsed()) {
          <p class="nav-section-label nav-label mt-3">Management</p>
        } @else {
          <div class="my-2 border-t border-gray-100 mx-1"></div>
        }

        @for (item of managementNav; track item.route) {
          <a
            [routerLink]="item.route"
            routerLinkActive="active-link"
            [routerLinkActiveOptions]="{ exact: false }"
            class="nav-link"
            [class.expanded]="!collapsed()"
            [attr.data-tip]="item.label"
            [title]="collapsed() ? item.label : ''"
          >
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
              [innerHTML]="item.iconPath">
            </svg>
            @if (!collapsed()) {
              <span class="nav-label text-sm font-medium whitespace-nowrap">{{ item.label }}</span>
            }
            @if (collapsed()) { <span class="tip">{{ item.label }}</span> }
          </a>
        }

      </nav>

      <!-- ── Collapse toggle ── -->
      <button
        (click)="toggleCollapse()"
        class="toggle-btn absolute -right-3 top-20 w-6 h-6 bg-white border border-border rounded-full flex items-center justify-center shadow-sm cursor-pointer z-10"
        style="transform: translateX(0)"
        aria-label="Toggle sidebar"
      >
        <svg
          class="toggle-icon"
          width="11" height="11" viewBox="0 0 24 24"
          fill="none" stroke="currentColor"
          stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
          [style.transform]="collapsed() ? 'rotate(0deg)' : 'rotate(180deg)'"
        >
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>

    </aside>
  `,
  styles: [`:host { display: block; }`]
})
export class SidebarComponent {
  collapsed = signal(false);
  sidebarToggle = output<boolean>();

  readonly mainNav: NavItem[] = [
    {
      route: '/dashboard',
      label: 'Dashboard',
      exact: true,
      iconPath: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>'
    },
    {
      route: '/customers',
      label: 'Customers',
      iconPath: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'
    },
    {
      route: '/users',
      label: 'Users',
      iconPath: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
    },
    {
      route: '/security',
      label: 'Security',
      iconPath: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'
    },
  ];

  readonly managementNav: NavItem[] = [
    {
      route: '/consents',
      label: 'Consent Management',
      iconPath: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>'
    },
    {
      route: '/reports',
      label: 'Reports',
      iconPath: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'
    },
    {
      route: '/tpp',
      label: 'TPP Management',
      iconPath: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>'
    },
    {
      route: '/audit',
      label: 'Audit Log',
      iconPath: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>'
    },
  ];

  toggleCollapse(): void {
    this.collapsed.update(v => !v);
    this.sidebarToggle.emit(this.collapsed());
  }
}