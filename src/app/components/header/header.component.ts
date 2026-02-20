import { Component, signal, HostListener, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header
      class="fixed top-0 right-0 z-40 h-24 flex items-center justify-between px-8 transition-all duration-300 ease-in-out"
      [style.left]="sidebarCollapsed ? '5rem' : '17.5rem'"
    >

      <!-- ── Left: Breadcrumbs / Page Title ── -->
      <div class="flex items-center gap-3">

      </div>

      <!-- Right Actions -->
      <div class="premium-glass px-2 py-1.5 rounded-3xl flex items-center gap-2 shadow-lg shadow-blue-500/5">

        <!-- Fullscreen toggle -->
        <button
          (click)="toggleFullscreen()"
          class="p-2 rounded-xl text-[#A3AED0] hover:text-[#4318FF] hover:bg-white/40 transition-all duration-200"
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
        <div class="w-px h-6 bg-[#A3AED0]/20"></div>

        <!-- User Section -->
        <div class="relative">
          <div 
            (click)="toggleUserDropdown($event)"
            class="group flex items-center gap-3 cursor-pointer pl-1 pr-1"
          >
            <!-- Avatar -->
            <div class="relative">
               <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#4318FF] to-[#868CFF] text-white shadow-lg shadow-blue-500/20 ring-2 ring-white transition-transform duration-300 group-hover:scale-105">
                  <span class="text-sm font-bold">{{ getUserInitials() }}</span>
               </div>
               <div class="absolute bottom-0 right-0 w-3 h-3 bg-[#05CD99] rounded-full border-2 border-white animate-pulse"></div>
            </div>

            <!-- Name + role -->
            <div class="hidden md:flex flex-col mr-1">
              <span class="text-sm font-bold text-[#2B3674] group-hover:text-[#4318FF] transition-colors">{{ userService.currentUser().firstName }} {{ userService.currentUser().lastName }}</span>
              <span class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-wide">{{ userService.currentUser().role }}</span>
            </div>
            
             <svg 
               class="text-[#A3AED0] transition-transform duration-300 group-hover:text-[#4318FF]" 
               [class.rotate-180]="userDropdownOpen()"
               width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
             >
                  <path d="M7 10l5 5 5-5z"/>
             </svg>
          </div>

          <!-- Dropdown Menu -->
          <div 
            *ngIf="userDropdownOpen()"
            class="absolute right-0 mt-4 w-56 premium-glass rounded-2xl overflow-hidden animate-fade-in py-1 z-50 transform origin-top-right"
          >
            <div class="px-4 py-3 border-b border-gray-100/50">
               <p class="text-xs font-bold text-[#A3AED0] uppercase">Signed in as</p>
               <p class="text-sm font-bold text-[#2B3674] truncate">{{ userService.currentUser().email }}</p>
            </div>
            
            <button 
              (click)="navigateToProfile()"
              class="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#2B3674] hover:bg-[#4318FF]/5 hover:text-[#4318FF] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Profile Settings
            </button>
            <button 
              class="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#EE5D50] hover:bg-[#EE5D50]/5 transition-colors border-t border-gray-100/50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
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
  userService = inject(UserService);

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

  getUserInitials(): string {
    const user = this.userService.currentUser();
    const first = user.firstName?.charAt(0) || '';
    const last = user.lastName?.charAt(0) || '';
    return (first + last).toUpperCase() || 'JD';
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