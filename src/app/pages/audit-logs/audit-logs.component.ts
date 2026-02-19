import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Search, Filter, Download, Eye, ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft } from 'lucide-angular';

interface AuditLog {
  id: string;
  timestamp: string;
  service: string;
  action: string;
  method: string;
  groupName: string;
  status: number;
  duration: number;
}

@Component({
  selector: 'app-audit-logs',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, RouterLink],
  template: `
    <div class="flex flex-col gap-6 animate-fade-in-up">
      <!-- Header Area -->
      <div class="px-4">
        <h1 class="text-2xl font-bold text-[#2B3674] tracking-tight">Audit Logs</h1>
        <p class="text-[#A3AED0] text-sm font-medium">Track all system activities and API transactions</p>
      </div>

      <!-- Main Content Card -->
      <div class="chart-shell p-0 overflow-hidden bg-white/70 backdrop-blur-xl border border-white/40 shadow-glass min-h-[600px] flex flex-col mx-4">
        
        <!-- Toolbar Row -->
        <div class="p-6 border-b border-gray-100/50">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="relative w-full md:w-96">
                <lucide-icon [img]="Search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0]"></lucide-icon>
                <input 
                  type="text" 
                  placeholder="Search timestamp, service, action..." 
                  class="glass-input pl-10 pr-4 py-2 w-full text-xs"
                >
            </div>
            <div class="flex items-center gap-3 w-full md:w-auto">
              <div class="flex items-center gap-2 bg-gray-50/50 p-1 rounded-lg">
                <span class="text-[10px] font-bold text-[#A3AED0] px-2">Items per page:</span>
                <select class="bg-transparent border-none text-xs font-bold text-[#2B3674] outline-none cursor-pointer pr-4">
                  <option>10</option><option>25</option><option>50</option>
                </select>
              </div>
              <span class="text-xs font-semibold text-[#A3AED0]">1 – 10 of 166459</span>
              <div class="flex gap-2">
                 <button class="p-2 bg-white rounded-lg border border-gray-100 text-[#4318FF] hover:bg-[#4318FF] hover:text-white transition-all shadow-sm">
                   <lucide-icon [img]="Filter" class="w-4 h-4"></lucide-icon>
                 </button>
                 <button class="p-2 bg-white rounded-lg border border-gray-100 text-[#4318FF] hover:bg-[#4318FF] hover:text-white transition-all shadow-sm">
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
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">Timestamp</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">Service</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">Action</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">Method</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">Group Name</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">Status</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">Duration (ms)</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50/50">
              <tr *ngFor="let log of logs" class="hover:bg-gray-50/40 transition-colors group">
                <td class="px-6 py-4 whitespace-nowrap"><span class="text-xs text-[#2B3674]">{{log.timestamp}}</span></td>
                <td class="px-6 py-4 whitespace-nowrap"><span class="text-xs text-[#2B3674]">{{log.service}}</span></td>
                <td class="px-6 py-4 whitespace-nowrap"><span class="text-xs text-[#2B3674]">{{log.action}}</span></td>
                <td class="px-6 py-4 whitespace-nowrap"><span class="text-xs font-bold text-[#A3AED0]">{{log.method}}</span></td>
                <td class="px-6 py-4 whitespace-nowrap"><span class="text-xs text-[#2B3674]">{{log.groupName}}</span></td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#05CD99] text-white">{{log.status}}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap"><span class="text-xs text-[#2B3674]">{{log.duration}}</span></td>
                <td class="px-6 py-4 text-right">
                  <button [routerLink]="['/audit-logs', log.id]" class="p-2 rounded-lg bg-[#05CD99]/10 text-[#05CD99] hover:bg-[#05CD99] hover:text-white transition-all transform group-hover:scale-110 shadow-sm">
                    <lucide-icon [img]="Eye" class="w-4 h-4"></lucide-icon>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="p-6 border-t border-gray-100/50 flex justify-end">
          <div class="flex items-center gap-1">
             <button class="p-2 text-[#A3AED0] hover:text-[#4318FF] transition-colors"><lucide-icon [img]="ChevronsLeft" class="w-4 h-4"></lucide-icon></button>
             <button class="p-2 text-[#A3AED0] hover:text-[#4318FF] transition-colors"><lucide-icon [img]="ChevronLeft" class="w-4 h-4"></lucide-icon></button>
             <div class="flex items-center mx-2 overflow-hidden rounded-lg border border-gray-100">
               <button class="w-8 h-8 flex items-center justify-center text-xs font-bold bg-[#4318FF] text-white">1</button>
               <button class="w-8 h-8 flex items-center justify-center text-xs font-bold hover:bg-gray-50">2</button>
             </div>
             <button class="p-2 text-[#A3AED0] hover:text-[#4318FF] transition-colors"><lucide-icon [img]="ChevronRight" class="w-4 h-4"></lucide-icon></button>
             <button class="p-2 text-[#A3AED0] hover:text-[#4318FF] transition-colors"><lucide-icon [img]="ChevronsRight" class="w-4 h-4"></lucide-icon></button>
          </div>
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
export class AuditLogsComponent {
  readonly Search = Search;
  readonly Filter = Filter;
  readonly Download = Download;
  readonly Eye = Eye;
  readonly ChevronRight = ChevronRight;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronsRight = ChevronsRight;
  readonly ChevronsLeft = ChevronsLeft;

  logs: AuditLog[] = [
    { id: '1', timestamp: 'Feb 19, 2026, 10:27:33 AM', service: 'Adnic service', action: 'Quotation', method: '', groupName: 'Create Insurance Quote', status: 200, duration: 18562 },
    { id: '2', timestamp: 'Feb 19, 2026, 10:27:33 AM', service: 'Ozone Service', action: 'Quotation', method: 'POST', groupName: 'Create Insurance Quote', status: 200, duration: 18559 },
    { id: '3', timestamp: 'Feb 19, 2026, 10:27:32 AM', service: 'Adnic service', action: 'External API', method: 'POST', groupName: 'Home Quotation', status: 200, duration: 1059 },
    { id: '4', timestamp: 'Feb 19, 2026, 10:26:55 AM', service: 'Adnic service', action: 'Quotation', method: '', groupName: 'Create Insurance Quote', status: 200, duration: 3350 },
    { id: '5', timestamp: 'Feb 19, 2026, 10:26:55 AM', service: 'Ozone Service', action: 'Quotation', method: 'POST', groupName: 'Create Insurance Quote', status: 200, duration: 3332 },
    { id: '6', timestamp: 'Feb 19, 2026, 10:26:54 AM', service: 'Adnic service', action: 'External API', method: 'POST', groupName: 'Home Quotation', status: 200, duration: 1580 },
    { id: '7', timestamp: 'Feb 19, 2026, 10:25:48 AM', service: 'Adnic service', action: 'Quotation', method: '', groupName: 'Create Insurance Quote', status: 200, duration: 2377 },
    { id: '8', timestamp: 'Feb 19, 2026, 10:25:48 AM', service: 'Ozone Service', action: 'Quotation', method: 'POST', groupName: 'Create Insurance Quote', status: 200, duration: 2374 },
    { id: '9', timestamp: 'Feb 19, 2026, 10:25:47 AM', service: 'Adnic service', action: 'External API', method: 'POST', groupName: 'Home Quotation', status: 200, duration: 1131 },
    { id: '10', timestamp: 'Feb 19, 2026, 10:25:38 AM', service: 'Adnic service', action: 'Quotation', method: '', groupName: 'Create Insurance Quote', status: 200, duration: 2168 },
  ];
}
