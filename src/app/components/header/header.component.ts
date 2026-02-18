import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <style>
      @keyframes slideDown {
        from { opacity: 0; transform: translateY(-12px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes pulse-ring {
        0%   { box-shadow: 0 0 0 0 rgba(255,255,255,0.35); }
        70%  { box-shadow: 0 0 0 7px rgba(255,255,255,0); }
        100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
      }

      .header-enter   { animation: slideDown 0.4s cubic-bezier(.22,1,.36,1) both; }
      .brand-fade     { animation: fadeIn   0.5s ease 0.15s both; }

      .icon-btn {
        transition: background 0.18s, transform 0.18s, color 0.18s;
        position: relative;
        overflow: hidden;
      }
      .icon-btn::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: rgba(255,255,255,0.12);
        opacity: 0;
        transform: scale(0.6);
        transition: opacity 0.2s, transform 0.2s;
      }
      .icon-btn:hover::after  { opacity: 1; transform: scale(1); }
      .icon-btn:active        { transform: scale(0.9); }

      .avatar-wrap {
        transition: box-shadow 0.2s;
        border-radius: 50%;
      }
      .avatar-wrap:hover { animation: pulse-ring 0.7s ease-out; }

      .user-section {
        cursor: pointer;
        transition: opacity 0.15s;
      }
      .user-section:hover { opacity: 0.88; }

      .brand-logo {
        transition: opacity 0.15s;
        cursor: default;
        user-select: none;
      }
      .brand-logo:hover { opacity: 0.9; }

      .fullscreen-icon {
        transition: transform 0.25s cubic-bezier(.22,1,.36,1);
      }
      .icon-btn:hover .fullscreen-icon {
        transform: scale(1.15);
      }

      .separator {
        width: 1px;
        align-self: stretch;
        background: rgba(255,255,255,0.15);
        margin: 4px 0;
      }

      .role-tag {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        transition: color 0.15s;
      }
      .role-tag svg {
        transition: transform 0.2s cubic-bezier(.22,1,.36,1);
      }
      .user-section:hover .role-tag svg {
        transform: rotate(180deg);
      }

      .logo-icon {
        background: rgba(255,255,255,0.15);
        border: 1px solid rgba(255,255,255,0.2);
        transition: background 0.2s, border-color 0.2s;
      }
      .brand-logo:hover .logo-icon {
        background: rgba(255,255,255,0.22);
        border-color: rgba(255,255,255,0.35);
      }

      .scrolled-shadow {
        transition: box-shadow 0.3s ease;
      }
    </style>

    <header
      class="header-enter scrolled-shadow fixed top-0 left-0 right-0 z-50 flex h-15 items-center justify-between bg-primary px-6 py-4 text-white"
      [style.box-shadow]="isScrolled
        ? '0 4px 24px rgba(0,0,0,0.22), 0 1px 0 rgba(255,255,255,0.06)'
        : '0 2px 8px rgba(0,0,0,0.12)'"
    >

      <!-- ── Brand Logo ── -->
      <div class="brand-fade brand-logo flex items-center gap-2">
        <div class="flex items-baseline text-2xl font-bold tracking-tight">
          <div class="logo-icon flex items-center justify-center w-8 h-8 rounded-full mr-2">
            <span class="text-white text-lg font-bold leading-none">n</span>
          </div>
          <span class="text-white">n-sure</span>
          <span
            class="ml-1.5 text-[10px] font-semibold tracking-widest uppercase px-1.5 py-0.5 rounded"
            style="background:rgba(255,255,255,0.12); color:rgba(255,255,255,0.7); letter-spacing:.12em"
          >OFI</span>
        </div>
      </div>

      <!-- ── Right Actions ── -->
      <div class="brand-fade flex items-center gap-3" style="animation-delay:0.05s">

        <!-- Fullscreen toggle -->
        <button
          (click)="toggleFullscreen()"
          class="icon-btn rounded-full p-2 text-gray-300 hover:text-white"
          [attr.aria-label]="isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'"
          [title]="isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'"
        >
          <svg
            class="fullscreen-icon"
            width="22" height="22" viewBox="0 0 24 24" fill="currentColor"
          >
            @if (!isFullscreen) {
              <!-- Expand -->
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            } @else {
              <!-- Compress -->
              <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
            }
          </svg>
        </button>

        <!-- Divider -->
        <div class="separator"></div>

        <!-- User Section -->
        <div class="user-section flex items-center gap-3 pl-2">

          <!-- Avatar -->
          <div class="avatar-wrap flex h-9 w-9 items-center justify-center rounded-full overflow-hidden"
            style="background:rgba(255,255,255,0.15); border:1.5px solid rgba(255,255,255,0.25)">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" class="text-gray-200">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>

          <!-- Name + role -->
          <div class="hidden md:flex flex-col text-sm leading-tight">
            <span class="font-semibold text-white tracking-tight">test-name&#64;gmail.com</span>
            <span class="role-tag text-xs mt-0.5" style="color:rgba(255,255,255,0.55)">
              Admin
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </span>
          </div>
        </div>

      </div>
    </header>
  `,
  styles: [`:host { display: block; }`]
})
export class HeaderComponent {
  isFullscreen = false;
  isScrolled   = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 8;
  }

  toggleFullscreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        this.isFullscreen = true;
      }).catch(() => {});
    } else {
      document.exitFullscreen().then(() => {
        this.isFullscreen = false;
      }).catch(() => {});
    }
  }
}