import { Component, signal, HostListener, Input, inject } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgClass, FormsModule], // Added FormsModule
  template: `
    <header
      class="fixed top-0 right-0 z-40 h-24 flex items-center justify-between px-8 transition-all duration-300"
      [style.left]="sidebarCollapsed ? '5rem' : '18rem'"
      [ngClass]="{
        'bg-white/80 backdrop-blur-xl border-b border-white/20': isScrolled,
        'bg-transparent': !isScrolled
      }"
    >

      <!-- ── Left: Breadcrumbs / Page Title (Optional) ── -->
      <div class="flex items-center gap-3">
         <!-- Placeholder if needed -->
      </div>

      <!-- ── Right Actions ── -->
      <div class="glass-input px-2 py-1.5 flex items-center gap-2">

        <!-- Search (Functional) -->
        <div class="relative hidden lg:block mr-2">
           <input 
             type="text" 
             [(ngModel)]="searchQuery" 
             (keyup.enter)="onSearch()"
             placeholder="Search..." 
             class="bg-transparent border-none outline-none text-sm text-primary font-medium w-40 placeholder:text-secondary/70"
           >
           <button (click)="onSearch()" class="absolute right-0 top-1/2 -translate-y-1/2 text-secondary hover:text-accent transition-colors cursor-pointer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
           </button>
        </div>

        <!-- Fullscreen toggle -->
        <button
          (click)="toggleFullscreen()"
          class="p-2 rounded-lg text-secondary hover:text-primary hover:bg-white/50 transition-all duration-200"
          [attr.aria-label]="isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            @if (!isFullscreen) {
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            } @else {
              <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
            }
          </svg>
        </button>

        <!-- Divider -->
        <div class="w-px h-6 bg-secondary/20"></div>

        <!-- User Section -->
        <div class="relative">
          <div 
            (click)="toggleUserDropdown($event)"
            class="group flex items-center gap-3 cursor-pointer pl-1"
          >
            <!-- Avatar -->
            <div class="relative">
               <div class="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-white shadow-md ring-2 ring-white">
                  <span class="text-xs font-bold">JD</span>
               </div>
               <div class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-white"></div>
            </div>

            <!-- Name + role -->
            <div class="hidden md:flex flex-col mr-1">
              <span class="text-xs font-bold text-primary group-hover:text-accent transition-colors">John Doe</span>
              <span class="text-[9px] font-bold text-secondary uppercase">Admin</span>
            </div>
            
             <svg 
               class="text-secondary/70 transition-transform duration-300" 
               [class.rotate-180]="userDropdownOpen()"
               width="14" height="14" viewBox="0 0 24 24" fill="currentColor"
             >
                  <path d="M7 10l5 5 5-5z"/>
             </svg>
          </div>

          <!-- Dropdown Menu -->
          <div 
            *ngIf="userDropdownOpen()"
            class="absolute right-0 mt-3 w-48 bg-white/70 backdrop-blur-xl border border-white/20 rounded-xl shadow-glass overflow-hidden animate-fade-in py-1 z-50"
          >
            <button 
              (click)="navigateToProfile()"
              class="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-[#2B3674] hover:bg-white/50 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              User Account
            </button>
            <button 
              class="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-[#FF5252] hover:bg-white/50 transition-colors border-t border-white/10"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Sign Out
            </button>
          </div>
        </div>

      </div>
    </header>
  `,
  styles: [`:host { display: block; }`]
})
export class HeaderComponent {
  @Input() sidebarCollapsed = false;

  private router = inject(Router);

  searchQuery = '';
  isFullscreen = false;
  isScrolled = false;
  userDropdownOpen = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 10;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.userDropdownOpen.set(false);
    }
  }

  toggleUserDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.userDropdownOpen.update(v => !v);
  }

  navigateToProfile(): void {
    this.userDropdownOpen.set(false);
    this.router.navigate(['/user-profile']);
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/consents'], { queryParams: { q: this.searchQuery } });
    }
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