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
      <div>
        <h1 class="text-3xl font-black text-[#2B3674] tracking-tight">Audit Logs</h1>
        <p class="text-[#A3AED0] text-sm font-bold uppercase tracking-widest mt-1">Track all system activities and API transactions</p>
      </div>

      <!-- Main Content Card -->
      <div class="premium-glass p-0 overflow-hidden min-h-[600px] flex flex-col animate-fade-in-up" style="animation-delay: 100ms;">
        
        <!-- Toolbar Row -->
        <div class="p-6 border-b border-gray-100/50">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="relative w-full md:w-96">
                <lucide-icon [img]="Search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0]"></lucide-icon>
                <input 
                  type="text" 
                  [(ngModel)]="searchQuery"
                  (ngModelChange)="currentPage = 1"
                  placeholder="Search timestamp, service, action..." 
                  class="glass-input pl-10 pr-4 py-2 w-full text-xs"
                >
            </div>
            <div class="flex items-center gap-3 w-full md:w-auto">
              <div class="flex items-center gap-2 bg-white/40 p-1 rounded-2xl border border-white/20">
                <span class="text-[10px] font-bold text-[#A3AED0] px-2">Items per page:</span>
                <select [(ngModel)]="itemsPerPage" (ngModelChange)="currentPage = 1" class="bg-transparent border-none text-xs font-bold text-[#2B3674] outline-none cursor-pointer pr-4 focus:ring-0">
                  <option [value]="5">5</option>
                  <option [value]="10">10</option>
                  <option [value]="25">25</option>
                  <option [value]="50">50</option>
                </select>
              </div>
              <span class="text-xs font-semibold text-[#A3AED0]">
                {{ (currentPage - 1) * itemsPerPage + 1 }} – {{ Math.min(currentPage * itemsPerPage, filteredLogs.length) }} of {{ filteredLogs.length }}
              </span>
              <div class="flex gap-2">
                 <button (click)="toggleFilter()" class="p-2 bg-white/40 rounded-2xl border border-white/20 text-[#4318FF] hover:bg-white/80 hover:scale-105 active:scale-95 transition-all shadow-sm">
                   <lucide-icon [img]="Filter" class="w-4 h-4"></lucide-icon>
                 </button>
                 <button (click)="exportToCSV()" class="p-2 bg-white/40 rounded-2xl border border-white/20 text-[#4318FF] hover:bg-white/80 hover:scale-105 active:scale-95 transition-all shadow-sm">
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
                <th class="px-6 py-4 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider">Timestamp</th>
                <th class="px-6 py-4 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider">Service</th>
                <th class="px-6 py-4 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider">Action</th>
                <th class="px-6 py-4 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider">Method</th>
                <th class="px-6 py-4 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider">Group Name</th>
                <th class="px-6 py-4 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider">Status</th>
                <th class="px-6 py-4 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider">Duration (ms)</th>
                <th class="px-6 py-4 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50/50">
              <tr *ngFor="let log of pagedLogs" class="hover:bg-gray-50/40 transition-colors group">
                <td class="px-6 py-4 whitespace-nowrap"><span class="text-xs text-[#2B3674]">{{log.timestamp}}</span></td>
                <td class="px-6 py-4 whitespace-nowrap"><span class="text-xs text-[#2B3674]">{{log.service}}</span></td>
                <td class="px-6 py-4 whitespace-nowrap"><span class="text-xs text-[#2B3674]">{{log.action}}</span></td>
                <td class="px-6 py-4 whitespace-nowrap"><span class="text-xs font-bold text-[#A3AED0]">{{log.method}}</span></td>
                <td class="px-6 py-4 whitespace-nowrap"><span class="text-xs text-[#2B3674]">{{log.groupName}}</span></td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#05CD99] text-white shadow-sm">{{log.status}}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap"><span class="text-xs text-[#2B3674]">{{log.duration}}</span></td>
                <td class="px-6 py-4 text-right">
                  <button [routerLink]="['/audit-logs', log.id]" class="p-2 rounded-xl bg-[#05CD99]/10 text-[#05CD99] hover:bg-[#05CD99] hover:text-white transition-all transform hover:scale-110 active:scale-95 shadow-sm opacity-80 group-hover:opacity-100">
                    <lucide-icon [img]="Eye" class="w-4 h-4"></lucide-icon>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="p-6 border-t border-gray-100/50 flex justify-end">
          <div class="flex items-center gap-2">
             <button (click)="goToPage(1)" [disabled]="currentPage === 1" class="p-2 text-[#A3AED0] hover:text-[#4318FF] hover:bg-white/40 rounded-xl transition-all disabled:opacity-30"><lucide-icon [img]="ChevronsLeft" class="w-4 h-4"></lucide-icon></button>
             <button (click)="prevPage()" [disabled]="currentPage === 1" class="p-2 text-[#A3AED0] hover:text-[#4318FF] hover:bg-white/40 rounded-xl transition-all disabled:opacity-30"><lucide-icon [img]="ChevronLeft" class="w-4 h-4"></lucide-icon></button>
             <div class="flex items-center mx-2 gap-1.5">
               <button *ngFor="let p of getPages()" 
                       (click)="goToPage(p)"
                       class="w-9 h-9 flex items-center justify-center text-xs font-bold rounded-xl transition-all transform hover:scale-110"
                       [class.bg-[#4318FF]]="p === currentPage"
                       [class.text-white]="p === currentPage"
                       [class.shadow-lg]="p === currentPage"
                       [class.shadow-[#4318FF]/20]="p === currentPage"
                       [class.text-[#A3AED0]]="p !== currentPage"
                       [class.hover:bg-white/40]="p !== currentPage">
                 {{p}}
               </button>
             </div>
             <button (click)="nextPage()" [disabled]="currentPage >= totalPages" class="p-2 text-[#A3AED0] hover:text-[#4318FF] hover:bg-white/40 rounded-xl transition-all disabled:opacity-30"><lucide-icon [img]="ChevronRight" class="w-4 h-4"></lucide-icon></button>
             <button (click)="goToPage(totalPages)" [disabled]="currentPage >= totalPages" class="p-2 text-[#A3AED0] hover:text-[#4318FF] hover:bg-white/40 rounded-xl transition-all disabled:opacity-30"><lucide-icon [img]="ChevronsRight" class="w-4 h-4"></lucide-icon></button>
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
  readonly Math = Math;

  searchQuery = '';
  currentPage = 1;
  itemsPerPage = 10;

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

  get filteredLogs(): AuditLog[] {
    const q = this.searchQuery.toLowerCase().trim();
    if (!q) return this.logs;
    return this.logs.filter(l =>
      l.timestamp.toLowerCase().includes(q) ||
      l.service.toLowerCase().includes(q) ||
      l.action.toLowerCase().includes(q) ||
      l.groupName.toLowerCase().includes(q)
    );
  }

  get pagedLogs(): AuditLog[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredLogs.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredLogs.length / this.itemsPerPage);
  }

  getPages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    return pages;
  }

  nextPage(): void { if (this.currentPage < this.totalPages) this.currentPage++; }
  prevPage(): void { if (this.currentPage > 1) this.currentPage--; }
  goToPage(p: number): void { this.currentPage = p; }

  toggleFilter(): void {
    console.log('Filter toggled');
  }

  exportToCSV(): void {
    const headers = ['Timestamp', 'Service', 'Action', 'Method', 'Group Name', 'Status', 'Duration'];
    const rows = this.filteredLogs.map(l => [
      l.timestamp,
      l.service,
      l.action,
      l.method,
      l.groupName,
      l.status,
      l.duration
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `audit_logs_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
