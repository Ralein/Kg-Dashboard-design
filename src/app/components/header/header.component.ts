import { Component, signal, HostListener, Input } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header
      class="fixed top-4 left-4 right-4 z-50 flex h-20 items-center justify-between px-6 transition-all duration-300"
      [ngClass]="{
        'glass-card': isScrolled || true,
        'bg-white/80': isScrolled,
        'bg-white/30': !isScrolled
      }"
    >

      <!-- ── Brand Logo ── -->
      <div class="flex items-center gap-3">
        <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-accent text-white shadow-lg shadow-accent/40">
          <span class="text-xl font-bold leading-none">N</span>
        </div>
        <div class="flex flex-col">
            <span class="text-primary font-bold text-lg tracking-tight leading-none">n-sure</span>
            <span class="text-[10px] font-bold tracking-[0.2em] text-secondary uppercase">OFI Platform</span>
        </div>
      </div>

      <!-- ── Right Actions ── -->
      <div class="flex items-center gap-4">

        <!-- Fullscreen toggle -->
        <button
          (click)="toggleFullscreen()"
          class="p-2.5 rounded-xl text-secondary hover:text-accent hover:bg-white/50 transition-all duration-300 hover:scale-110 active:scale-95"
          [attr.aria-label]="isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            @if (!isFullscreen) {
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            } @else {
              <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
            }
          </svg>
        </button>

        <!-- Divider -->
        <div class="w-px h-8 bg-gradient-to-b from-transparent via-secondary/30 to-transparent"></div>

        <!-- User Section -->
        <div class="group flex items-center gap-3 pl-2 cursor-pointer p-1.5 pr-3 rounded-full hover:bg-white/40 transition-colors">
          
          <!-- Avatar -->
          <div class="relative">
             <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-light text-white shadow-lg shadow-accent/30 ring-2 ring-white">
                <span class="text-sm font-bold">JD</span>
             </div>
             <div class="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
          </div>

          <!-- Name + role -->
          <div class="hidden md:flex flex-col mr-2">
            <span class="text-sm font-bold text-primary leading-tight group-hover:text-accent transition-colors">John Doe</span>
            <span class="text-[10px] font-medium text-secondary">Administrator</span>
          </div>
          
           <svg class="text-secondary group-hover:text-accent transition-transform duration-300 group-hover:rotate-180" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5z"/>
           </svg>
        </div>

      </div>
    </header>
  `,
  styles: [`:host { display: block; }`]
})
export class HeaderComponent {
  isFullscreen = false;
  isScrolled = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 8;
  }

  toggleFullscreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        this.isFullscreen = true;
      }).catch(() => { });
    } else {
      document.exitFullscreen().then(() => {
        this.isFullscreen = false;
      }).catch(() => { });
    }
  }
}