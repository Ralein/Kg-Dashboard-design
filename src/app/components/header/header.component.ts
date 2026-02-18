import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    template: `
    <header class="h-16 bg-primary flex items-center justify-between px-6 shadow-md">
      <!-- Left spacer / breadcrumb area -->
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" fill="#f5a623"/>
            <text x="16" y="21" text-anchor="middle" font-size="14" font-weight="bold" fill="white">?</text>
          </svg>
          <span class="text-white font-bold text-xl tracking-wide">
            n-sure <span class="text-xs text-gray-300 font-normal ml-0.5">OFI</span>
          </span>
        </div>
      </div>

      <!-- Right side -->
      <div class="flex items-center gap-6">
        <!-- Fullscreen -->
        <button class="text-white/70 hover:text-white transition-colors cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        </button>

        <!-- User profile -->
        <div class="flex items-center gap-3 cursor-pointer">
          <div class="w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div class="text-right">
            <p class="text-white text-sm font-medium leading-tight">Test-name&#64;gmail.com</p>
            <p class="text-gray-300 text-xs flex items-center gap-1 justify-end">
              Admin
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </p>
          </div>
        </div>
      </div>
    </header>
  `,
    styles: [`
    :host {
      display: block;
    }
  `]
})
export class HeaderComponent { }
