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
          <h1 class="text-2xl font-bold text-[#2B3674] tracking-tight">Quotation Management</h1>
          <p class="text-[#A3AED0] text-sm font-medium">Manage and track all generated quotations</p>
        </div>
      </div>

      <!-- Main Content Card -->
      <div class="chart-shell p-0 overflow-hidden bg-white/70 backdrop-blur-xl border border-white/40 shadow-glass min-h-[600px] flex flex-col">
        
        <!-- Tabs & Filters Row -->
        <div class="p-6 pb-0 border-b border-gray-100/50">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <!-- Tabs -->
            <div class="flex border-b border-gray-100">
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
                <div *ngIf="activeTab() === 'current'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4318FF] rounded-full"></div>
              </button>
              <button 
                (click)="activeTab.set('history')"
                class="px-8 py-3 text-sm font-bold transition-all relative"
                [class.text-[#4318FF]]="activeTab() === 'history'"
                [class.text-[#A3AED0]]="activeTab() !== 'history'"
              >
                <span class="flex items-center gap-2">
                   <lucide-icon [img]="ClipboardList" class="w-4 h-4"></lucide-icon>
                   HISTORY
                </span>
                <div *ngIf="activeTab() === 'history'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4318FF] rounded-full"></div>
              </button>
            </div>

            <!-- Toolbar -->
            <div class="flex items-center gap-3 w-full md:w-auto">
              <div class="relative flex-1 md:w-64">
                <lucide-icon [img]="Search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0]"></lucide-icon>
                <input 
                  type="text" 
                  placeholder="Search Quote ID, TPP Name..." 
                  class="glass-input pl-10 pr-4 py-2 w-full text-xs"
                >
              </div>
              <div class="flex items-center gap-2 bg-gray-50/50 p-1 rounded-lg">
                <span class="text-[10px] font-bold text-[#A3AED0] px-2">Items per page:</span>
                <select class="bg-transparent border-none text-xs font-bold text-[#2B3674] outline-none cursor-pointer pr-4">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
              </div>
              <button class="p-2 bg-white rounded-lg shadow-sm border border-gray-100 text-[#4318FF] hover:bg-gray-50 transition-colors">
                <lucide-icon [img]="Filter" class="w-4 h-4"></lucide-icon>
              </button>
              <button class="p-2 bg-white rounded-lg shadow-sm border border-gray-100 text-[#4318FF] hover:bg-gray-50 transition-colors">
                <lucide-icon [img]="Download" class="w-4 h-4"></lucide-icon>
              </button>
            </div>
          </div>
        </div>

        <!-- Table Area -->
        <div class="flex-1 overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-gray-50 bg-gray-50/30">
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">Quote Id</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">TPP Name</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">LOB</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">Created On</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">Expires On</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider">Status</th>
                <th class="px-6 py-4 text-[10px] font-extrabold text-[#A3AED0] uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50/50">
              <tr *ngFor="let quote of quotes" class="hover:bg-gray-50/40 transition-colors group">
                <td class="px-6 py-4">
                  <span class="text-xs font-bold text-[#4318FF] hover:underline cursor-pointer">{{quote.id}}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-xs font-medium text-[#2B3674]">{{quote.tppName}}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="px-2.5 py-1 rounded-md bg-[#F4F7FE] text-[10px] font-extrabold text-[#2B3674]">{{quote.lob}}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-xs text-[#A3AED0]">{{quote.createdOn}}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-xs text-[#A3AED0]">{{quote.expiresOn}}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-[10px] font-bold text-[#A3AED0]">Available</span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="p-2 rounded-lg bg-[#05CD99]/10 text-[#05CD99] hover:bg-[#05CD99] hover:text-white transition-all transform group-hover:scale-110 active:scale-95 shadow-sm">
                    <lucide-icon [img]="Eye" class="w-4 h-4"></lucide-icon>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- Empty State -->
          <div *ngIf="quotes.length === 0" class="flex flex-col items-center justify-center py-20 opacity-40">
            <lucide-icon [img]="Search" class="w-12 h-12 mb-4"></lucide-icon>
            <p class="text-sm font-bold">No quotations found for the selected criteria</p>
          </div>
        </div>

        <!-- Pagination -->
        <div class="p-6 border-t border-gray-100/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <span class="text-xs font-semibold text-[#A3AED0]">
            Showing <span class="text-[#2B3674]">1 – 10</span> of <span class="text-[#2B3674]">1232</span>
          </span>
          <div class="flex items-center gap-1">
             <button class="p-2 text-[#A3AED0] hover:text-[#4318FF] transition-colors"><lucide-icon [img]="ChevronsLeft" class="w-4 h-4"></lucide-icon></button>
             <button class="p-2 text-[#A3AED0] hover:text-[#4318FF] transition-colors"><lucide-icon [img]="ChevronLeft" class="w-4 h-4"></lucide-icon></button>
             <div class="flex items-center mx-2 overflow-hidden rounded-lg border border-gray-100">
               <button class="w-8 h-8 flex items-center justify-center text-xs font-bold bg-[#4318FF] text-white">1</button>
               <button class="w-8 h-8 flex items-center justify-center text-xs font-bold hover:bg-gray-50">2</button>
               <button class="w-8 h-8 flex items-center justify-center text-xs font-bold hover:bg-gray-50">3</button>
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
}
