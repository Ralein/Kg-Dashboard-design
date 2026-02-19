import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ChevronLeft, Calendar, User, ShieldCheck, Mail, Phone, Lock } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [CommonModule, FormsModule, LucideAngularModule, RouterLink],
    template: `
    <div class="flex flex-col gap-6 animate-fade-in-up">
      <!-- Header Area -->
      <div class="flex justify-between items-center px-0">
        <h1 class="text-2xl font-bold text-[#2B3674] tracking-tight">Edit User</h1>
      </div>

      <!-- Profile Content -->
      <div class="chart-shell bg-white/70 backdrop-blur-xl border border-white/40 shadow-glass min-h-[600px] p-8">
        <div class="flex flex-col lg:flex-row gap-12">
          <!-- Left Panel: Large Profile Display -->
          <div class="lg:w-1/3 flex flex-col items-center pt-8 border-r border-gray-100 lg:pr-12">
            <div class="relative group cursor-pointer">
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
               <h2 class="text-3xl font-extrabold text-[#1B2559]">John Doe</h2>
               <p class="text-sm font-bold text-[#A3AED0] uppercase tracking-[0.15em]">Admin</p>
            </div>
          </div>

          <!-- Right Panel: Form Fields -->
          <div class="lg:w-2/3 space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <!-- Username -->
              <div class="flex flex-col gap-1.5 relative group">
                <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Username<span class="text-red-500">*</span></label>
                <input type="text" value="usertestName" class="glass-input px-4 py-3 w-full font-bold text-[#2B3674] border-gray-100 placeholder:text-gray-300">
              </div>

              <!-- Password -->
              <div class="flex flex-col gap-1.5 relative group">
                <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Password<span class="text-red-500">*</span></label>
                <div class="relative">
                  <input type="password" value="password123" class="glass-input px-4 py-3 w-full font-bold text-[#2B3674] border-gray-100">
                  <button class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#4318FF] transition-colors p-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
              </div>

              <!-- Active Status -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Active<span class="text-red-500">*</span></label>
                <div class="relative">
                  <select class="glass-input px-4 py-3 w-full appearance-none font-bold text-[#2B3674] border-gray-100 cursor-pointer">
                    <option>Inactive</option>
                    <option selected>Active</option>
                  </select>
                  <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>

              <!-- First Name -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">First Name<span class="text-red-500">*</span></label>
                <input type="text" value="Test" class="glass-input px-4 py-3 w-full font-bold text-[#2B3674] border-gray-100">
              </div>

              <!-- Mobile Number -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Mobile Number<span class="text-red-500">*</span></label>
                <input type="text" value="7894561210" class="glass-input px-4 py-3 w-full font-bold text-[#2B3674] border-gray-100">
              </div>

              <!-- Last Name -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Last Name<span class="text-red-500">*</span></label>
                <input type="text" value="Name" class="glass-input px-4 py-3 w-full font-bold text-[#2B3674] border-gray-100">
              </div>

              <!-- Gender -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Gender</label>
                <div class="relative">
                  <select class="glass-input px-4 py-3 w-full appearance-none font-bold text-[#2B3674] border-gray-100 cursor-pointer">
                    <option selected>Male</option>
                    <option>Female</option>
                    <option>Other</option>
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
                  <select class="glass-input px-4 py-3 w-full appearance-none font-bold text-[#2B3674] border-gray-100 cursor-pointer">
                    <option selected>User</option>
                    <option>Admin</option>
                  </select>
                  <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>

              <!-- Email -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Email<span class="text-red-500">*</span></label>
                <input type="email" value="username@gmail.com" class="glass-input px-4 py-3 w-full font-bold text-[#2B3674] border-gray-100">
              </div>

              <!-- Date of Birth -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Date of Birth</label>
                <div class="relative">
                  <input type="text" value="1/31/2026" class="glass-input px-4 py-3 w-full font-bold text-[#2B3674] border-gray-100 focus:border-[#4318FF] transition-all bg-white">
                  <lucide-icon [img]="Calendar" class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0] pointer-events-none"></lucide-icon>
                </div>
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="flex justify-end gap-3 pt-4">
              <button routerLink="/dashboard" class="px-8 py-2.5 rounded-xl border border-gray-200 text-[#2B3674] font-bold text-sm hover:bg-gray-50 transition-all flex items-center justify-center min-w-[120px]">
                Cancel
              </button>
              <button class="px-8 py-2.5 rounded-xl bg-[#2B3674] text-white font-bold text-sm hover:bg-[#1B2559] transition-all shadow-lg shadow-[#2B3674]/20 flex items-center justify-center min-w-[120px]">
                Update
              </button>
            </div>
          </div>
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
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class UserProfileComponent implements OnInit {
    readonly Calendar = Calendar;

    constructor() { }

    ngOnInit(): void { }
}
