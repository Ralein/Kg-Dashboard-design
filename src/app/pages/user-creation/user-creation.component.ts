import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, UserPlus, Edit2, Ban, Filter, Download } from 'lucide-angular';

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
          <h1 class="text-2xl font-bold text-[#2B3674] tracking-tight">User Creation</h1>
          <p class="text-[#A3AED0] text-sm font-medium">Manage platform users and permissions</p>
        </div>
        <button class="px-8 py-2.5 rounded-xl bg-[#2B3674] text-white font-bold text-sm hover:bg-[#1B2559] transition-all shadow-lg shadow-[#2B3674]/20 flex items-center gap-2">
           <lucide-icon [img]="UserPlus" class="w-4 h-4"></lucide-icon>
           <span>Create User</span>
        </button>
      </div>

      <!-- Main Content Card -->
      <div class="chart-shell p-0 overflow-hidden bg-white/70 backdrop-blur-xl border border-white/40 shadow-glass min-h-[600px] flex flex-col">
        
        <!-- Search & Filter Row -->
        <div class="p-6 border-b border-gray-100/50">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
             <div class="relative w-full md:w-96">
                <lucide-icon [img]="Search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0]"></lucide-icon>
                <input 
                  type="text" 
                  placeholder="Search username, email, role..." 
                  class="glass-input pl-10 pr-4 py-2 w-full text-xs font-medium"
                >
             </div>
              <div class="flex items-center gap-3 w-full md:w-auto">
                <div class="flex items-center gap-2 bg-gray-50/50 p-1 rounded-lg">
                  <span class="text-[10px] font-bold text-[#A3AED0] px-2">Items per page:</span>
                  <select class="bg-transparent border-none text-xs font-bold text-[#2B3674] outline-none cursor-pointer pr-4">
                    <option>10</option>
                    <option>20</option>
                  </select>
                </div>
                <span class="text-xs font-semibold text-[#A3AED0]">1 – 10 of 13</span>
                <div class="flex gap-2">
                   <button class="p-2 bg-white rounded-lg shadow-sm border border-gray-100 text-[#4318FF] hover:bg-gray-50 transition-colors">
                      <lucide-icon [img]="Filter" class="w-4 h-4"></lucide-icon>
                   </button>
                   <button class="p-2 bg-white rounded-lg shadow-sm border border-gray-100 text-[#4318FF] hover:bg-gray-50 transition-colors">
                      <lucide-icon [img]="Download" class="w-4 h-4"></lucide-icon>
                   </button>
                </div>
              </div>
          </div>
        </div>

        <!-- Table Area -->
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
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50/50">
              <tr *ngFor="let user of users" class="hover:bg-gray-50/40 transition-colors group">
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-xs font-bold text-[#2B3674]">{{user.username}}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-xs font-medium text-[#2B3674]">{{user.role}}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-[9px] font-extrabold px-2 py-0.5 rounded-md"
                    [class.bg-[#05CD99]/10]="user.active"
                    [class.text-[#05CD99]]="user.active"
                    [class.bg-[#FF5252]/10]="!user.active"
                    [class.text-[#FF5252]]="!user.active">
                    {{user.active ? 'Active' : 'Inactive'}}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-xs text-[#2B3674]">{{user.firstName}}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-xs text-[#2B3674]">{{user.lastName}}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-xs text-[#2B3674]">{{user.mobile}}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-xs text-[#2B3674]">{{user.email}}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-xs text-[#A3AED0]">{{user.createdOn}}</span>
                </td>
                <td class="px-6 py-4 text-right whitespace-nowrap">
                  <div class="flex justify-end gap-2">
                    <button class="p-1.5 rounded-lg bg-[#05CD99]/10 text-[#05CD99] hover:bg-[#05CD99] hover:text-white transition-all transform group-hover:scale-105 shadow-sm">
                      <lucide-icon [img]="Edit2" class="w-3.5 h-3.5"></lucide-icon>
                    </button>
                    <button class="p-1.5 rounded-lg bg-[#FF5252]/10 text-[#FF5252] hover:bg-[#FF5252] hover:text-white transition-all transform group-hover:scale-105 shadow-sm">
                      <lucide-icon [img]="Ban" class="w-3.5 h-3.5"></lucide-icon>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class UserCreationComponent {
  readonly Search = Search;
  readonly UserPlus = UserPlus;
  readonly Edit2 = Edit2;
  readonly Ban = Ban;
  readonly Filter = Filter;
  readonly Download = Download;

  users: User[] = [
    { username: 'usertestName', role: 'User', active: false, firstName: 'Test', lastName: 'Name', mobile: '7894561210', email: 'username@gmail.com', createdOn: '2026-02-12' },
    { username: 'userNameFirst', role: 'User', active: true, firstName: 'Test', lastName: 'Name', mobile: '7894561213', email: 'userNameFirst@gmail.com', createdOn: '2026-02-12' },
    { username: 'usertestNameFirst', role: 'User', active: true, firstName: 'Test', lastName: 'Name', mobile: '7894561212', email: 'username2@gmail.com', createdOn: '2026-02-12' },
    { username: 'usertestName1', role: 'User', active: true, firstName: 'Test', lastName: 'Name', mobile: '7894561211', email: 'username1@gmail.com', createdOn: '2026-02-12' },
    { username: 'testName', role: 'Admin', active: true, firstName: 'Test', lastName: 'Name', mobile: '7894561230', email: 'name@gmail.com', createdOn: '2026-02-12' },
    { username: 'TestUser', role: 'Admin', active: true, firstName: 'Test', lastName: 'User', mobile: '8899887766', email: 'Testuser@ggmail.com', createdOn: '2026-02-04' },
    { username: 'TestAdmin', role: 'User', active: true, firstName: 'Test', lastName: 'Admin', mobile: '9988776655', email: 'TestAdmin@ggmail.com', createdOn: '2026-02-04' },
    { username: 'Jay', role: 'Admin', active: true, firstName: 'Jayaramani', lastName: 'Ashokraj', mobile: '1234567890', email: 'jayaraman.a@kgisl.com', createdOn: '2025-11-04' },
    { username: 'Nithyaa', role: 'User', active: true, firstName: 'Nithyaai', lastName: 'M', mobile: '8765432311', email: 'nithyaa@kgisl.com', createdOn: '2025-08-01' },
    { username: 'Suvitha', role: 'Admin', active: true, firstName: 'Suvitha', lastName: 'R', mobile: '8765676456', email: 'suvitha@kgisl.com', createdOn: '2025-07-10' },
  ];
}
