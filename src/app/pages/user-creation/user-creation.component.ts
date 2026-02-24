import { Component, signal, OnDestroy, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, UserPlus, Edit2, Ban, Filter, Download, X, CheckCircle2, Calendar } from 'lucide-angular';

interface User {
  username: string;
  role: string;
  active: boolean;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  createdOn: string;
}

@Component({
  selector: 'app-user-creation',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="flex flex-col gap-6 animate-fade-in-up">
      <!-- Header Area -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-black text-[#2B3674] tracking-tight">User Creation</h1>
          <p class="text-[#A3AED0] text-sm font-bold uppercase tracking-widest mt-1">Manage platform users and permissions</p>
        </div>
        <button class="px-8 py-2.5 rounded-2xl bg-[#2B3674] text-white font-bold text-sm hover:bg-[#1B2559] transition-all shadow-lg shadow-[#2B3674]/20 flex items-center gap-2 transform hover:scale-105 active:scale-95">
           <lucide-icon [img]="UserPlus" class="w-4 h-4"></lucide-icon>
           <span>Create User</span>
        </button>
      </div>

      <!-- Main Content Card -->
      <div class="premium-glass p-0 overflow-hidden min-h-[600px] flex flex-col animate-fade-in-up" style="animation-delay: 100ms;">

        <ng-container *ngIf="!isEditing()">

        <!-- Search & Filter Row -->
        <div class="p-6 border-b border-gray-100/50">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
             <div class="relative w-full md:w-96">
                <lucide-icon [img]="Search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0]"></lucide-icon>
                <input
                  type="text"
                  [(ngModel)]="searchQuery"
                  placeholder="Search username, email, role..."
                  class="glass-input pl-10 pr-4 py-2 w-full text-xs font-medium"
                >
             </div>
              <div class="flex items-center gap-3 w-full md:w-auto text-xs font-semibold text-[#A3AED0]">
                <div class="relative">
                  <select [(ngModel)]="filterStatus" class="glass-input cursor-pointer pr-6 py-1.5 bg-white/40 border-white/20 rounded-xl text-[#2B3674] font-bold text-xs appearance-none focus:ring-2 focus:ring-[#4318FF]/20">
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <div class="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#2B3674]/60">
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
                <button *ngIf="filterStatus !== 'All' || searchQuery !== ''" (click)="clearFilters()" class="text-[10px] uppercase font-bold text-[#FF5252] hover:bg-[#FF5252]/10 px-2 py-1.5 rounded-lg transition-colors">
                  Clear
                </button>
                <div class="h-4 w-px bg-gray-200 mx-1"></div>
                <div class="flex items-center gap-2 bg-white/40 px-3 py-1.5 rounded-xl border border-white/20">
                  <span class="text-[10px] font-bold">Items:</span>
                  <select class="bg-transparent border-none text-xs font-bold text-[#2B3674] outline-none cursor-pointer">
                    <option>10</option>
                    <option>20</option>
                  </select>
                </div>
                   <span class="text-xs font-semibold text-[#A3AED0]">1 – 10 of 13</span>
                <div class="flex gap-2">
                   <button class="p-2 bg-white/40 rounded-2xl border border-white/20 text-[#4318FF] hover:bg-white/80 hover:scale-105 active:scale-95 transition-all shadow-sm">
                      <lucide-icon [img]="Filter" class="w-4 h-4"></lucide-icon>
                   </button>
                   <button class="p-2 bg-white/40 rounded-2xl border border-white/20 text-[#4318FF] hover:bg-white/80 hover:scale-105 active:scale-95 transition-all shadow-sm">
                      <lucide-icon [img]="Download" class="w-4 h-4"></lucide-icon>
                   </button>
                </div>
              </div>
          </div>
        </div>

        <!-- Table -->
        <div class="flex-1 overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-gray-50 bg-gray-50/30">
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">Username</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">Role</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">Active</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">First Name</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">Last Name</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">Mobile</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">Email</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">Created On</th>
                <th class="px-6 py-4 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50/50">
              <tr *ngFor="let user of filteredUsers" class="hover:bg-gray-50/40 transition-colors group">
                <td class="px-6 py-4 whitespace-nowrap"><span class="text-xs font-bold text-[#2B3674]">{{user.username}}</span></td>
                <td class="px-6 py-4 whitespace-nowrap"><span class="text-xs font-medium text-[#2B3674]">{{user.role}}</span></td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-[9px] font-extrabold px-2.5 py-1 rounded-lg shadow-sm"
                    [class.bg-[#05CD99]/10]="user.active" [class.text-[#05CD99]]="user.active"
                    [class.bg-[#FF5252]/10]="!user.active" [class.text-[#FF5252]]="!user.active">
                    {{user.active ? 'ACTIVE' : 'INACTIVE'}}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap"><span class="text-xs text-[#2B3674]">{{user.firstName}}</span></td>
                <td class="px-6 py-4 whitespace-nowrap"><span class="text-xs text-[#2B3674]">{{user.lastName}}</span></td>
                <td class="px-6 py-4 whitespace-nowrap"><span class="text-xs text-[#2B3674]">{{user.mobile}}</span></td>
                <td class="px-6 py-4 whitespace-nowrap"><span class="text-xs text-[#2B3674]">{{user.email}}</span></td>
                <td class="px-6 py-4 whitespace-nowrap"><span class="text-xs text-[#A3AED0]">{{user.createdOn}}</span></td>
                <td class="px-6 py-4 text-right whitespace-nowrap">
                  <div class="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button (click)="openEditMode(user)" class="p-1.5 rounded-xl bg-[#05CD99]/10 text-[#05CD99] hover:bg-[#05CD99] hover:text-white transition-all transform hover:scale-110 active:scale-95 shadow-sm">
                      <lucide-icon [img]="Edit2" class="w-3.5 h-3.5"></lucide-icon>
                    </button>
                    <button (click)="confirmBlock(user)" class="p-1.5 rounded-xl bg-[#FF5252]/10 text-[#FF5252] hover:bg-[#FF5252] hover:text-white transition-all transform hover:scale-110 active:scale-95 shadow-sm">
                      <lucide-icon [img]="Ban" class="w-3.5 h-3.5"></lucide-icon>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </ng-container>

        <!-- EDIT USER FORM -->
        <div *ngIf="isEditing()" class="p-8 animate-fade-in">
          <div class="flex flex-col lg:flex-row gap-12">
            <div class="lg:w-1/3 flex flex-col items-center pt-8 border-r border-gray-100 lg:pr-12">
              <div class="relative group cursor-pointer">
                <div class="w-48 h-48 rounded-full bg-gray-50 border-8 border-white shadow-xl flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105">
                   <div class="w-full h-full bg-[#1B2559]/5 flex items-center justify-center">
                      <svg class="w-24 h-24 text-[#1B2559]/20" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                   </div>
                </div>
              </div>
              <div class="text-center mt-8 space-y-2">
                 <h2 class="text-3xl font-extrabold text-[#1B2559] uppercase">{{ editFormData.firstName || 'User' }}</h2>
                 <p class="text-sm font-bold text-[#A3AED0] uppercase tracking-[0.15em]">{{ editFormData.role }}</p>
              </div>
            </div>

            <form (ngSubmit)="saveEdit()" class="lg:w-2/3 space-y-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div class="flex flex-col gap-1.5">
                  <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Username<span class="text-red-500">*</span></label>
                  <input type="text" name="username" [(ngModel)]="editFormData.username" class="glass-input px-4 py-3 w-full font-bold text-[#2B3674] border-gray-100">
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">First Name<span class="text-red-500">*</span></label>
                  <input type="text" name="firstName" [(ngModel)]="editFormData.firstName" class="glass-input px-4 py-3 w-full font-bold text-[#2B3674] border-gray-100">
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Last Name<span class="text-red-500">*</span></label>
                  <input type="text" name="lastName" [(ngModel)]="editFormData.lastName" class="glass-input px-4 py-3 w-full font-bold text-[#2B3674] border-gray-100">
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Mobile Number<span class="text-red-500">*</span></label>
                  <input type="text" name="mobile" [(ngModel)]="editFormData.mobile" class="glass-input px-4 py-3 w-full font-bold text-[#2B3674] border-gray-100">
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Email<span class="text-red-500">*</span></label>
                  <input type="email" name="email" [(ngModel)]="editFormData.email" class="glass-input px-4 py-3 w-full font-bold text-[#2B3674] border-gray-100">
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Role<span class="text-red-500">*</span></label>
                  <div class="relative">
                    <select name="role" [(ngModel)]="editFormData.role" class="glass-input px-4 py-3 w-full appearance-none font-bold text-[#2B3674] border-gray-100 cursor-pointer">
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                    <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Active<span class="text-red-500">*</span></label>
                  <div class="relative">
                    <select name="active" [(ngModel)]="editFormData.active" class="glass-input px-4 py-3 w-full appearance-none font-bold text-[#2B3674] border-gray-100 cursor-pointer">
                      <option [ngValue]="false">Inactive</option>
                      <option [ngValue]="true">Active</option>
                    </select>
                    <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-end gap-3 pt-4">
                <button type="button" (click)="cancelEdit()" class="px-8 py-2.5 rounded-2xl border border-gray-200 text-[#2B3674] font-bold text-sm hover:bg-gray-50 transition-all flex items-center justify-center min-w-[120px] transform hover:scale-105 active:scale-95">
                  Cancel
                </button>
                <button type="submit" [disabled]="isUpdating()" class="px-8 py-2.5 rounded-2xl bg-[#2B3674] text-white font-bold text-sm hover:bg-[#1B2559] transition-all shadow-lg shadow-[#2B3674]/20 flex items-center justify-center min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95">
                  <span *ngIf="!isUpdating()">Update User</span>
                  <span *ngIf="isUpdating()" class="flex items-center gap-2">
                     <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke-width="4"></circle>
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
    </div>
  `,
  styles: [`
    :host { display: block; }
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
  `]
})
export class UserCreationComponent implements OnDestroy {
  readonly Search = Search;
  readonly UserPlus = UserPlus;
  readonly Edit2 = Edit2;
  readonly Ban = Ban;
  readonly Filter = Filter;
  readonly Download = Download;
  readonly X = X;
  readonly CheckCircle2 = CheckCircle2;
  readonly Calendar = Calendar;

  private renderer = inject(Renderer2);

  filterStatus: 'All' | 'Active' | 'Inactive' = 'All';
  searchQuery = '';

  isEditing = signal(false);
  editFormData: Partial<User> = {};
  isUpdating = signal(false);
  showSuccess = signal(false);

  isConfirmingBlock = signal(false);
  userToToggle: User | null = null;

  // Tracks the body-appended modal element & its listener cleanup
  private modalEl: HTMLElement | null = null;
  private backdropListener: (() => void) | null = null;

  users: User[] = [
    { username: 'usertestName',      role: 'User',  active: false, firstName: 'Test',       lastName: 'Name',    mobile: '7894561210', email: 'username@gmail.com',       createdOn: '2026-02-12' },
    { username: 'userNameFirst',     role: 'User',  active: true,  firstName: 'Test',       lastName: 'Name',    mobile: '7894561213', email: 'userNameFirst@gmail.com',   createdOn: '2026-02-12' },
    { username: 'usertestNameFirst', role: 'User',  active: true,  firstName: 'Test',       lastName: 'Name',    mobile: '7894561212', email: 'username2@gmail.com',       createdOn: '2026-02-12' },
    { username: 'usertestName1',     role: 'User',  active: true,  firstName: 'Test',       lastName: 'Name',    mobile: '7894561211', email: 'username1@gmail.com',       createdOn: '2026-02-12' },
    { username: 'testName',          role: 'Admin', active: true,  firstName: 'Test',       lastName: 'Name',    mobile: '7894561230', email: 'name@gmail.com',            createdOn: '2026-02-12' },
    { username: 'TestUser',          role: 'Admin', active: true,  firstName: 'Test',       lastName: 'User',    mobile: '8899887766', email: 'Testuser@ggmail.com',       createdOn: '2026-02-04' },
    { username: 'TestAdmin',         role: 'User',  active: true,  firstName: 'Test',       lastName: 'Admin',   mobile: '9988776655', email: 'TestAdmin@ggmail.com',      createdOn: '2026-02-04' },
    { username: 'Jay',               role: 'Admin', active: true,  firstName: 'Jayaramani', lastName: 'Ashokraj',mobile: '1234567890', email: 'jayaraman.a@kgisl.com',    createdOn: '2025-11-04' },
    { username: 'Nithyaa',           role: 'User',  active: true,  firstName: 'Nithyaai',   lastName: 'M',       mobile: '8765432311', email: 'nithyaa@kgisl.com',         createdOn: '2025-08-01' },
    { username: 'Suvitha',           role: 'Admin', active: true,  firstName: 'Suvitha',    lastName: 'R',       mobile: '8765676456', email: 'suvitha@kgisl.com',         createdOn: '2025-07-10' },
  ];

  get filteredUsers(): User[] {
    let filtered = this.users;
    if (this.filterStatus === 'Active') filtered = filtered.filter(u => u.active);
    else if (this.filterStatus === 'Inactive') filtered = filtered.filter(u => !u.active);
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(u =>
        u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) || u.firstName.toLowerCase().includes(q) ||
        u.lastName.toLowerCase().includes(q)
      );
    }
    return filtered;
  }

  clearFilters(): void { this.filterStatus = 'All'; this.searchQuery = ''; }

  openEditMode(user: User): void { this.isEditing.set(true); this.editFormData = { ...user }; }
  cancelEdit(): void { this.isEditing.set(false); this.editFormData = {}; }

  saveEdit(): void {
    this.isUpdating.set(true);
    setTimeout(() => {
      const index = this.users.findIndex(u => u.username === this.editFormData.username);
      if (index !== -1) this.users[index] = { ...this.users[index], ...this.editFormData } as User;
      this.isUpdating.set(false);
      this.isEditing.set(false);
      this.showSuccess.set(true);
      setTimeout(() => this.showSuccess.set(false), 3000);
    }, 1000);
  }

  confirmBlock(user: User): void {
    this.userToToggle = user;
    this.isConfirmingBlock.set(true);
    this.mountModalOnBody();
  }

  cancelBlock(): void {
    this.isConfirmingBlock.set(false);
    this.userToToggle = null;
    this.unmountModal();
  }

  toggleUserStatus(): void {
    if (this.userToToggle) {
      const index = this.users.findIndex(u => u.username === this.userToToggle?.username);
      if (index !== -1) this.users[index].active = !this.users[index].active;
    }
    this.cancelBlock();
  }

  // ─── Body-portal modal ──────────────────────────────────────────────────────
  // Appending the modal directly to <body> guarantees it sits above every
  // stacking context in the app (sidebar transforms, glass-card overflow, etc.)

  private mountModalOnBody(): void {
    this.unmountModal();

    const isActivate  = !this.userToToggle?.active;
    const username    = this.userToToggle?.username ?? '';
    const accent      = isActivate ? '#05CD99' : '#FF5252';
    const accentLight = isActivate ? 'rgba(5,205,153,0.12)' : 'rgba(255,82,82,0.12)';
    const accentShadow= isActivate ? 'rgba(5,205,153,0.35)' : 'rgba(255,82,82,0.35)';
    const actionLabel = isActivate ? 'activate' : 'inactivate';

    const overlay = document.createElement('div');
    overlay.setAttribute('id', 'uc-portal-overlay');
    overlay.innerHTML = `
      <style>
        #uc-portal-overlay {
          position: fixed; inset: 0; z-index: 99999;
          display: flex; align-items: center; justify-content: center; padding: 1rem;
          background: rgba(11, 14, 40, 0.68);
          animation: ucFade .2s ease-out;
        }
        #uc-portal-box {
          background: #fff; border-radius: 24px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08);
          width: 100%; max-width: 420px; overflow: hidden;
          animation: ucSlide .3s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes ucFade  { from{opacity:0} to{opacity:1} }
        @keyframes ucSlide { from{opacity:0;transform:translateY(18px) scale(.96)} to{opacity:1;transform:none} }

        #uc-ph { padding:20px 24px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center; }
        #uc-ph h3 { margin:0; font-size:15px; font-weight:900; color:#2B3674; letter-spacing:-.3px; }
        #uc-xbtn { background:none; border:none; cursor:pointer; padding:6px; border-radius:50%; color:#94a3b8; line-height:0; transition:background .15s,color .15s; }
        #uc-xbtn:hover { background:#f1f5f9; color:#475569; }

        #uc-pb { padding:32px 24px; display:flex; flex-direction:column; align-items:center; gap:14px; text-align:center; }
        #uc-icon { width:64px; height:64px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:${accentLight}; }
        #uc-pb p { margin:0; font-size:15px; font-weight:500; color:#2B3674; }
        #uc-pb strong { color:${accent}; }
        #uc-uname { font-size:11px; font-weight:700; color:#A3AED0; }

        #uc-pf { padding:20px 24px; background:#f8fafc; display:flex; justify-content:center; gap:12px; }
        .uc-btn { padding:10px 28px; border-radius:16px; font-weight:700; font-size:13px; cursor:pointer; transition:all .15s; }
        #uc-cbtn { border:1.5px solid #e2e8f0; background:#fff; color:#2B3674; }
        #uc-cbtn:hover { background:#f8fafc; }
        #uc-okbtn { border:none; background:${accent}; color:#fff; box-shadow:0 4px 14px ${accentShadow}; }
        #uc-okbtn:hover { filter:brightness(.91); transform:translateY(-1px); }
      </style>

      <div id="uc-portal-box">
        <div id="uc-ph">
          <h3>Confirm Status Change</h3>
          <button id="uc-xbtn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div id="uc-pb">
          <div id="uc-icon">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="${accent}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
            </svg>
          </div>
          <p>Do you want to <strong>${actionLabel}</strong> this user?</p>
          <span id="uc-uname">${username}</span>
        </div>
        <div id="uc-pf">
          <button class="uc-btn" id="uc-cbtn">Cancel</button>
          <button class="uc-btn" id="uc-okbtn">Confirm</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    this.modalEl = overlay;

    overlay.querySelector('#uc-xbtn')!.addEventListener('click',  () => this.cancelBlock());
    overlay.querySelector('#uc-cbtn')!.addEventListener('click',  () => this.cancelBlock());
    overlay.querySelector('#uc-okbtn')!.addEventListener('click', () => this.toggleUserStatus());

    // Close on backdrop click
    this.backdropListener = this.renderer.listen(overlay, 'click', (e: MouseEvent) => {
      if (e.target === overlay) this.cancelBlock();
    });
  }

  private unmountModal(): void {
    this.modalEl?.remove();
    this.modalEl = null;
    this.backdropListener?.();
    this.backdropListener = null;
  }

  ngOnDestroy(): void { this.unmountModal(); }
}