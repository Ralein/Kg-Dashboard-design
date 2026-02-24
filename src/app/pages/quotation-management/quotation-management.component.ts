import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, Filter, Download, Eye, ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft, ClipboardList } from 'lucide-angular';

interface Quote {
  id: string;
  tppName: string;
  lob: string;
  createdOn: string;
  expiresOn: string;
  status: string;
}

@Component({
  selector: 'app-quotation-management',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="flex flex-col gap-6 animate-fade-in-up">
      <!-- Header Area -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-black text-[#2B3674] tracking-tight">Quotation Management</h1>
          <p class="text-[#A3AED0] text-sm font-bold uppercase tracking-widest mt-1">Manage and track all generated quotations</p>
        </div>
      </div>

      <!-- Main Content Card -->
      <div class="premium-glass p-0 overflow-hidden min-h-[600px] flex flex-col animate-fade-in-up" style="animation-delay: 100ms;">
        
        <!-- Tabs & Filters Row -->
        <div class="p-6 pb-0 border-b border-white/10">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <!-- Tabs -->
            <div class="flex border-b border-white/10">
              <button 
                (click)="activeTab.set('current')"
                class="px-8 py-3 text-sm font-bold transition-all relative"
                [class.text-[#4318FF]]="activeTab() === 'current'"
                [class.text-[#A3AED0]]="activeTab() !== 'current'"
              >
                <span class="flex items-center gap-2">
                   <lucide-icon [img]="Search" class="w-4 h-4"></lucide-icon>
                   CURRENT
                </span>
                <div *ngIf="activeTab() === 'current'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4318FF] rounded-full shadow-[0_0_8px_#4318FF]"></div>
              </button>
              <button 
                (click)="activeTab.set('history')"
                class="px-8 py-3 text-sm font-bold transition-all relative hover:text-[#4318FF]/70"
                [class.text-[#4318FF]]="activeTab() === 'history'"
                [class.text-[#A3AED0]]="activeTab() !== 'history'"
              >
                <span class="flex items-center gap-2">
                   <lucide-icon [img]="ClipboardList" class="w-4 h-4"></lucide-icon>
                   HISTORY
                </span>
                <div *ngIf="activeTab() === 'history'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4318FF] rounded-full shadow-[0_0_8px_#4318FF]"></div>
              </button>
            </div>

            <!-- Toolbar -->
            <div class="flex items-center gap-3 w-full md:w-auto">
              <div class="relative flex-1 md:w-64 group">
                <lucide-icon [img]="Search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0] group-hover:text-[#4318FF] transition-colors"></lucide-icon>
                <input 
                  type="text" 
                  [(ngModel)]="searchQuery"
                  (ngModelChange)="currentPage = 1"
                  placeholder="Search Quote ID, TPP Name..." 
                  class="glass-input pl-10 pr-4 py-2 w-full text-xs transition-all duration-300 focus:w-full focus:shadow-[0_0_0_2px_rgba(67,24,255,0.1)]"
                >
              </div>
              <div class="flex items-center gap-2 bg-white/40 p-1 rounded-2xl border border-white/20">
                <span class="text-[10px] font-bold text-[#A3AED0] px-2 uppercase tracking-wide">Show:</span>
                <select [(ngModel)]="itemsPerPage" (ngModelChange)="currentPage = 1" class="bg-transparent border-none text-xs font-bold text-[#2B3674] outline-none cursor-pointer pr-4 focus:ring-0">
                  <option [value]="10">10</option>
                  <option [value]="20">20</option>
                  <option [value]="50">50</option>
                </select>
              </div>
              <div class="relative group">
                <select class="glass-input pl-3 pr-8 py-2 cursor-pointer hover:bg-white/80 text-[10px] font-bold text-[#2B3674] appearance-none min-w-[120px]">
                  <option>Available</option>
                  <option>ApplicationPending</option>
                  <option>Policy Issued</option>
                  <option>Clear Filter</option>
                </select>
                <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-[#4318FF] transition-colors">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
                </div>
              </div>
              <button (click)="toggleFilter()" class="p-2 bg-white/40 rounded-2xl border border-white/20 text-[#4318FF] hover:bg-white/80 hover:scale-105 active:scale-95 transition-all shadow-sm">
                <lucide-icon [img]="Filter" class="w-4 h-4"></lucide-icon>
              </button>
              <button (click)="exportToCSV()" class="p-2 bg-white/40 rounded-2xl border border-white/20 text-[#4318FF] hover:bg-white/80 hover:scale-105 active:scale-95 transition-all shadow-sm">
                <lucide-icon [img]="Download" class="w-4 h-4"></lucide-icon>
              </button>
            </div>
          </div>
        </div>

        <!-- Table Area -->
        <div class="flex-1 overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-white/10 bg-white/5">
                <th class="px-6 py-4 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider">Quote Id</th>
                <th class="px-6 py-4 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider">TPP Name</th>
                <th class="px-6 py-4 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider">LOB</th>
                <th class="px-6 py-4 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider">Created On</th>
                <th class="px-6 py-4 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider">Expires On</th>
                <th class="px-6 py-4 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider">Status</th>
                <th class="px-6 py-4 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              <tr *ngFor="let quote of pagedQuotes" class="hover:bg-white/40 transition-all duration-200 group relative">
                <td class="px-6 py-4">
                  <span class="text-xs font-bold text-[#4318FF] hover:text-[#2B3674] cursor-pointer transition-colors relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#2B3674] hover:after:w-full after:transition-all">{{quote.id}}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-xs font-medium text-[#2B3674]">{{quote.tppName}}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="px-2.5 py-1 rounded-lg bg-[#F4F7FE] text-[10px] font-extrabold text-[#2B3674] border border-white/40 shadow-sm">{{quote.lob}}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-xs text-[#A3AED0]">{{quote.createdOn}}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-xs text-[#A3AED0]">{{quote.expiresOn}}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-[10px] font-bold text-[#A3AED0] bg-white/30 px-2 py-0.5 rounded-md border border-white/20">Available</span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="p-2 rounded-xl bg-[#05CD99]/10 text-[#05CD99] hover:bg-[#05CD99] hover:text-white transition-all transform hover:scale-110 active:scale-95 shadow-sm opacity-80 group-hover:opacity-100">
                    <lucide-icon [img]="Eye" class="w-4 h-4"></lucide-icon>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- Empty State -->
          <div *ngIf="filteredQuotes.length === 0" class="flex flex-col items-center justify-center py-20 opacity-50">
            <div class="p-4 bg-white/20 rounded-full mb-4">
                <lucide-icon [img]="Search" class="w-8 h-8 text-[#A3AED0]"></lucide-icon>
            </div>
            <p class="text-sm font-bold text-[#2B3674]">No quotations found</p>
            <p class="text-xs text-[#A3AED0] mt-1">Try adjusting your filters</p>
          </div>
        </div>

        <!-- Pagination -->
        <div class="p-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 bg-white/5">
          <span class="text-xs font-bold text-[#A3AED0]">
            Showing <span class="text-[#2B3674]">{{ (currentPage - 1) * itemsPerPage + 1 }} – {{ Math.min(currentPage * itemsPerPage, filteredQuotes.length) }}</span> of <span class="text-[#2B3674]">{{filteredQuotes.length}}</span>
          </span>
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
    .shadow-glass {
      box-shadow: 0 4px 24px rgba(67, 24, 255, 0.05);
    }
    th {
      font-family: 'DM Sans', sans-serif;
    }
  `]
})
export class QuotationManagementComponent {
  readonly Search = Search;
  readonly Filter = Filter;
  readonly Download = Download;
  readonly Eye = Eye;
  readonly ChevronRight = ChevronRight;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronsRight = ChevronsRight;
  readonly ChevronsLeft = ChevronsLeft;
  readonly ClipboardList = ClipboardList;

  activeTab = signal('current');
  searchQuery = '';
  currentPage = 1;
  itemsPerPage = 10;
  readonly Math = Math;

  quotes: Quote[] = [
    { id: '90050000009730', tppName: 'ADNIC', lob: 'TRAVEL', createdOn: '2026-02-19 05:07:20', expiresOn: '2026-03-05 23:59:59', status: 'Available' },
    { id: '90050000009729', tppName: 'ADNIC', lob: 'TRAVEL', createdOn: '2026-02-19 05:05:50', expiresOn: '2026-03-05 23:59:59', status: 'Available' },
    { id: '90050000009727', tppName: 'ADNIC', lob: 'TRAVEL', createdOn: '2026-02-19 05:04:56', expiresOn: '2026-03-05 23:59:59', status: 'Available' },
    { id: '90050000009726', tppName: 'ADNIC', lob: 'TRAVEL', createdOn: '2026-02-19 05:02:47', expiresOn: '2026-03-05 23:59:59', status: 'Available' },
    { id: '90050000009725', tppName: 'ADNIC', lob: 'TRAVEL', createdOn: '2026-02-19 05:02:13', expiresOn: '2026-03-05 23:59:59', status: 'Available' },
    { id: '90030000002521', tppName: '–', lob: 'HOME', createdOn: '2026-02-19 04:57:32', expiresOn: '2026-03-05 23:59:59', status: 'Available' },
    { id: '90030000002519', tppName: '–', lob: 'HOME', createdOn: '2026-02-19 04:56:54', expiresOn: '2026-03-05 23:59:59', status: 'Available' },
    { id: '90030000002518', tppName: '–', lob: 'HOME', createdOn: '2026-02-19 04:55:47', expiresOn: '2026-03-05 23:59:59', status: 'Available' },
    { id: '90030000002517', tppName: '–', lob: 'HOME', createdOn: '2026-02-19 04:55:37', expiresOn: '2026-03-05 23:59:59', status: 'Available' },
    { id: '90030000002516', tppName: '–', lob: 'HOME', createdOn: '2026-02-19 04:55:27', expiresOn: '2026-03-05 23:59:59', status: 'Available' },
  ];

  get filteredQuotes(): Quote[] {
    const q = this.searchQuery.toLowerCase().trim();
    if (!q) return this.quotes;
    return this.quotes.filter(quote =>
      quote.id.toLowerCase().includes(q) ||
      quote.tppName.toLowerCase().includes(q) ||
      quote.lob.toLowerCase().includes(q) ||
      quote.status.toLowerCase().includes(q)
    );
  }

  get pagedQuotes(): Quote[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredQuotes.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredQuotes.length / this.itemsPerPage);
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
    const headers = ['Quote ID', 'TPP Name', 'LOB', 'Created On', 'Expires On', 'Status'];
    const rows = this.filteredQuotes.map(q => [
      q.id,
      q.tppName,
      q.lob,
      q.createdOn,
      q.expiresOn,
      q.status
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `quotes_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
