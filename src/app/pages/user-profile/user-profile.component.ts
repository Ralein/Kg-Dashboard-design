import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ChevronLeft, Calendar, User, ShieldCheck, Mail, Phone, Lock, CheckCircle2 } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { UserService, UserProfile } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, RouterLink],
  template: `
    <div class="flex flex-col gap-6 animate-fade-in-up">
      <!-- Header Area -->
      <div class="flex justify-between items-center px-0">
        <h1 class="text-3xl font-black text-[#2B3674] tracking-tight">Edit User</h1>
        
        <!-- Success Notification -->
        <div *ngIf="showSuccess()" class="flex items-center gap-2 bg-[#05CD99]/10 text-[#05CD99] px-4 py-2 rounded-xl animate-fade-in">
          <lucide-icon [img]="CheckCircle2" class="w-4 h-4"></lucide-icon>
          <span class="text-xs font-bold">Profile updated successfully!</span>
        </div>
      </div>

      <!-- Profile Content -->
      <div class="premium-glass min-h-[600px] p-8 animate-fade-in-up" style="animation-delay: 100ms;">
        <div class="flex flex-col lg:flex-row gap-12">
          <!-- Left Panel: Large Profile Display -->
          <div class="lg:w-1/3 flex flex-col items-center pt-8 border-r border-gray-100 lg:pr-12">
            <div class="relative group cursor-pointer" (click)="triggerAvatarUpload()">
              <div class="w-48 h-48 rounded-full bg-gray-50 border-8 border-white shadow-xl flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105">
                 <div class="w-full h-full bg-[#1B2559]/5 flex items-center justify-center">
                    <svg class="w-24 h-24 text-[#1B2559]/20" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                 </div>
              </div>
              <div class="absolute bottom-2 right-2 w-10 h-10 bg-[#4318FF] rounded-full border-4 border-white flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 active:scale-95">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              </div>
            </div>
            
            <div class="text-center mt-8 space-y-2">
               <!-- Displaying signals from service -->
               <h2 class="text-3xl font-extrabold text-[#1B2559] uppercase">{{ userService.currentUser().firstName }}</h2>
               <p class="text-sm font-bold text-[#A3AED0] uppercase tracking-[0.15em]">{{ userService.currentUser().role }}</p>
            </div>
          </div>

          <!-- Right Panel: Form Fields -->
          <form (ngSubmit)="updateProfile()" class="lg:w-2/3 space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <!-- Username -->
              <div class="flex flex-col gap-1.5 relative group">
                <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Username<span class="text-red-500">*</span></label>
                <input type="text" name="username" [(ngModel)]="formData.username" class="glass-input px-4 py-3 w-full font-bold text-[#2B3674] border-gray-100 placeholder:text-gray-300">
              </div>

              <!-- Password -->
              <div class="flex flex-col gap-1.5 relative group">
                <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Password<span class="text-red-500">*</span></label>
                <div class="relative">
                  <input type="password" name="password" value="password123" class="glass-input px-4 py-3 w-full font-bold text-[#2B3674] border-gray-100">
                  <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#4318FF] transition-colors p-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
              </div>

              <!-- Active Status -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Active<span class="text-red-500">*</span></label>
                <div class="relative">
                  <select name="active" [(ngModel)]="formData.active" class="glass-input px-4 py-3 w-full appearance-none font-bold text-[#2B3674] border-gray-100 cursor-pointer">
                    <option [ngValue]="false">Inactive</option>
                    <option [ngValue]="true">Active</option>
                  </select>
                  <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>

              <!-- First Name -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">First Name<span class="text-red-500">*</span></label>
                <input type="text" name="firstName" [(ngModel)]="formData.firstName" class="glass-input px-4 py-3 w-full font-bold text-[#2B3674] border-gray-100">
              </div>

              <!-- Mobile Number -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Mobile Number<span class="text-red-500">*</span></label>
                <input type="text" name="mobile" [(ngModel)]="formData.mobile" class="glass-input px-4 py-3 w-full font-bold text-[#2B3674] border-gray-100">
              </div>

              <!-- Last Name -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Last Name<span class="text-red-500">*</span></label>
                <input type="text" name="lastName" [(ngModel)]="formData.lastName" class="glass-input px-4 py-3 w-full font-bold text-[#2B3674] border-gray-100">
              </div>

              <!-- Gender -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Gender</label>
                <div class="relative">
                  <select name="gender" [(ngModel)]="formData.gender" class="glass-input px-4 py-3 w-full appearance-none font-bold text-[#2B3674] border-gray-100 cursor-pointer">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>

              <!-- Role (Dropdown) -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Role<span class="text-red-500">*</span></label>
                <div class="relative">
                  <select name="role" [(ngModel)]="formData.role" class="glass-input px-4 py-3 w-full appearance-none font-bold text-[#2B3674] border-gray-100 cursor-pointer">
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>

              <!-- Email -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Email<span class="text-red-500">*</span></label>
                <input type="email" name="email" [(ngModel)]="formData.email" class="glass-input px-4 py-3 w-full font-bold text-[#2B3674] border-gray-100">
              </div>

              <!-- Date of Birth -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Date of Birth</label>
                <div class="relative">
                  <input type="text" name="dob" [(ngModel)]="formData.dob" class="glass-input px-4 py-3 w-full font-bold text-[#2B3674] border-gray-100 focus:border-[#4318FF] transition-all bg-white">
                  <lucide-icon [img]="Calendar" class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0] pointer-events-none"></lucide-icon>
                </div>
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="flex justify-end gap-3 pt-4">
              <button type="button" routerLink="/dashboard" class="px-8 py-2.5 rounded-2xl border border-gray-200 text-[#2B3674] font-bold text-sm hover:bg-gray-50 transition-all flex items-center justify-center min-w-[120px] transform hover:scale-105 active:scale-95">
                Cancel
              </button>
              <button type="submit" [disabled]="isUpdating()" class="px-8 py-2.5 rounded-2xl bg-[#2B3674] text-white font-bold text-sm hover:bg-[#1B2559] transition-all shadow-lg shadow-[#2B3674]/20 flex items-center justify-center min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95">
                <span *ngIf="!isUpdating()">Update Profile</span>
                <span *ngIf="isUpdating()" class="flex items-center gap-2">
                   <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                   Saving...
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.5s ease-out forwards;
    }
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out;
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class UserProfileComponent implements OnInit {
  readonly Calendar = Calendar;
  readonly CheckCircle2 = CheckCircle2;

  userService = inject(UserService);

  formData: UserProfile = { ...this.userService.currentUser() };
  isUpdating = signal(false);
  showSuccess = signal(false);

  ngOnInit(): void {
    // Sync formData with current user on init
    this.formData = { ...this.userService.currentUser() };
  }

  updateProfile(): void {
    this.isUpdating.set(true);

    // Simulate API delay
    setTimeout(() => {
      this.userService.updateProfile(this.formData);
      this.isUpdating.set(false);
      this.showSuccess.set(true);

      // Hide success message after 3 seconds
      setTimeout(() => this.showSuccess.set(false), 3000);
    }, 1000);
  }

  triggerAvatarUpload(): void {
    // Placeholder for avatar upload
    console.log('Avatar upload triggered');
  }
}

