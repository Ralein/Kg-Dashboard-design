import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex h-screen w-screen overflow-hidden" style="font-family: 'Outfit', sans-serif;">

      <!-- ── LEFT BRAND PANEL ── -->
      <div class="hidden lg:flex flex-col justify-between w-[52%] relative overflow-hidden px-14 py-12"
           style="background: linear-gradient(145deg, #0d1b3e 0%, #1a2f5a 60%, #0a1628 100%);">

        <!-- Grid texture -->
        <div class="absolute inset-0 opacity-[0.03]"
             style="background-image: linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px);
                    background-size: 48px 48px;"></div>

        <!-- Glows -->
        <div class="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
             style="background: radial-gradient(circle, #fabd00, transparent 65%);"></div>
        <div class="absolute -top-20 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl"
             style="background: radial-gradient(circle, #3b82f6, transparent 65%);"></div>

        <!-- Logo -->
        <div class="relative z-10 flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center"
               style="background: linear-gradient(135deg, #fabd00, #f59e0b); box-shadow: 0 0 20px rgba(250,189,0,0.35);">
            <svg class="w-5 h-5 text-[#0d1b3e]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
            </svg>
          </div>
          <span class="text-xl font-light text-white tracking-tight">n-<strong class="font-bold">sure</strong></span>
          <span class="text-[9px] font-bold tracking-[2px] text-[#fabd00] bg-[#fabd00]/10 border border-[#fabd00]/25 px-2 py-0.5 rounded-full">OFI</span>
        </div>

        <!-- Hero copy -->
        <div class="relative z-10 flex flex-col gap-5">
          <p class="text-[10px] font-semibold tracking-[3px] uppercase text-[#fabd00]/60">Open Finance Infrastructure</p>
          <h1 class="font-extrabold leading-[1.08] text-white/95"
              style="font-size: clamp(36px, 4vw, 52px); letter-spacing: -2px;">
            One gateway.<br/>
            <span style="background: linear-gradient(90deg, #fabd00, #fb923c);
                         -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
              Infinite
            </span><br/>
            possibilities.
          </h1>
          <p class="text-sm font-normal leading-relaxed text-white/35 max-w-xs">
            Manage consents, APIs, and real-time analytics across your entire open finance ecosystem.
          </p>
        </div>

        <!-- Footer -->
        <p class="relative z-10 text-[9px] font-medium tracking-[2.5px] uppercase text-white/15">
          Powering Open Finance · India · 2026
        </p>
      </div>

      <!-- ── RIGHT AUTH PANEL ── -->
      <div class="flex flex-1 items-center justify-center bg-white px-6">

        <div class="w-full max-w-[380px] flex flex-col gap-8">

          <!-- Heading -->
          <div class="flex flex-col gap-1.5">
            <h2 class="text-2xl font-extrabold text-[#0d1b3e] tracking-tight">Welcome back</h2>
            <p class="text-sm text-slate-400 font-medium">Sign in to your n-sure OFI account</p>
          </div>

          <!-- Form -->
          <form class="flex flex-col gap-4" (ngSubmit)="onSubmit()">

            <!-- Username -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-bold uppercase tracking-[2px]"
                     [class.text-[#1a2f5a]]="usernameFocused"
                     [class.text-slate-400]="!usernameFocused">
                User Name
              </label>
              <div class="relative flex items-center">
                <svg class="absolute left-3.5 w-4 h-4 pointer-events-none transition-colors duration-200"
                     [class.text-[#1a2f5a]]="usernameFocused"
                     [class.text-slate-300]="!usernameFocused"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <input
                  type="text"
                  [(ngModel)]="username"
                  name="username"
                  placeholder="Enter your username"
                  (focus)="usernameFocused = true"
                  (blur)="usernameFocused = false"
                  autocomplete="username"
                  required
                  class="w-full pl-10 pr-4 py-3 text-sm font-medium text-[#0d1b3e] placeholder:text-slate-300 bg-slate-50 rounded-xl outline-none transition-all duration-200"
                  [style.border]="usernameFocused ? '1.5px solid #1a2f5a' : '1.5px solid #e2e8f0'"
                  [style.box-shadow]="usernameFocused ? '0 0 0 4px rgba(26,47,90,0.07)' : 'none'"
                />
              </div>
            </div>

            <!-- Password -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-bold uppercase tracking-[2px]"
                     [class.text-[#1a2f5a]]="passwordFocused"
                     [class.text-slate-400]="!passwordFocused">
                Password
              </label>
              <div class="relative flex items-center">
                <svg class="absolute left-3.5 w-4 h-4 pointer-events-none transition-colors duration-200"
                     [class.text-[#1a2f5a]]="passwordFocused"
                     [class.text-slate-300]="!passwordFocused"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  [type]="showPassword ? 'text' : 'password'"
                  [(ngModel)]="password"
                  name="password"
                  placeholder="••••••••"
                  (focus)="passwordFocused = true"
                  (blur)="passwordFocused = false"
                  autocomplete="current-password"
                  required
                  class="w-full pl-10 pr-10 py-3 text-sm font-medium text-[#0d1b3e] placeholder:text-slate-300 bg-slate-50 rounded-xl outline-none transition-all duration-200"
                  [style.border]="passwordFocused ? '1.5px solid #1a2f5a' : '1.5px solid #e2e8f0'"
                  [style.box-shadow]="passwordFocused ? '0 0 0 4px rgba(26,47,90,0.07)' : 'none'"
                />
                <button type="button" tabindex="-1" (click)="showPassword = !showPassword"
                        class="absolute right-3.5 p-0.5 text-slate-300 hover:text-[#1a2f5a] transition-colors duration-200">
                  <svg *ngIf="!showPassword" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg *ngIf="showPassword" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Options -->
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer select-none group">
                <input type="checkbox" [(ngModel)]="rememberMe" name="rememberMe" class="hidden"/>
                <div class="w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all duration-200"
                     [style.background]="rememberMe ? '#1a2f5a' : 'white'"
                     [style.border-color]="rememberMe ? '#1a2f5a' : '#cbd5e1'">
                  <svg *ngIf="rememberMe" class="w-2.5 h-2.5 text-white" viewBox="0 0 10 8" fill="none"
                       stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 4l2.5 2.5L9 1"/>
                  </svg>
                </div>
                <span class="text-xs font-medium text-slate-400 group-hover:text-slate-600 transition-colors">Keep me signed in</span>
              </label>
              <a href="#" class="text-xs font-semibold text-[#fabd00] hover:text-[#e6a800] transition-colors">
                Forgot password?
              </a>
            </div>

            <!-- Sign In -->
            <button
              type="submit"
              [disabled]="isLoading"
              class="relative w-full py-3.5 rounded-xl text-sm font-extrabold text-[#0d1b3e] overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-1"
              style="background: linear-gradient(135deg, #fabd00 0%, #f59e0b 100%);
                     box-shadow: 0 4px 20px rgba(250,189,0,0.3);">
              <span class="absolute inset-0 btn-shimmer pointer-events-none"></span>
              <span *ngIf="!isLoading" class="relative flex items-center justify-center gap-2 tracking-wide">
                Sign In
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
              <span *ngIf="isLoading" class="relative flex items-center justify-center gap-2">
                <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.15)" stroke-width="3"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="#0d1b3e" stroke-width="3" stroke-linecap="round"/>
                </svg>
                Signing in...
              </span>
            </button>

            <!-- Error -->
            @if (errorMessage) {
              <div class="flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold text-red-500"
                   style="background: #fef2f2; border: 1px solid #fecaca;">
                <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {{ errorMessage }}
              </div>
            }

          </form>

        </div>
      </div>

    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
    :host { display: block; }

    .btn-shimmer {
      background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.3) 50%, transparent 65%);
      background-size: 200% 100%;
      background-position: -200% 0;
      animation: shimmer 2.5s linear infinite;
    }
    @keyframes shimmer { to { background-position: 200% 0; } }
  `]
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  isLoading = false;
  errorMessage = '';
  usernameFocused = false;
  passwordFocused = false;

  ngOnInit(): void {
    const saved = localStorage.getItem('nsure_username');
    if (saved) { this.username = saved; this.rememberMe = true; }
  }

  onSubmit(): void {
    this.errorMessage = '';
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password.';
      return;
    }
    this.isLoading = true;
    if (this.rememberMe) {
      localStorage.setItem('nsure_username', this.username);
    } else {
      localStorage.removeItem('nsure_username');
    }

    // 👇 Replace with your AuthService call:
    // this.authService.login(this.username, this.password).subscribe({
    //   next: () => this.router.navigate(['/dashboard']),
    //   error: (err) => { this.isLoading = false; this.errorMessage = err.message; }
    // });
    setTimeout(() => {
      this.isLoading = false;
      this.errorMessage = 'Invalid credentials. Please try again.';
    }, 1800);
  }
}