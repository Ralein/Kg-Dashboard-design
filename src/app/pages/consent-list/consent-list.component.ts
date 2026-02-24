import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, FileCheck, ClipboardList, Filter, Download, Eye, RotateCcw, ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft } from 'lucide-angular';

type ConsentStatus = 'Authorized' | 'AwaitingAuthorization' | 'Revoked' | 'Expired' | 'Suspended';

interface Consent {
  id: string;
  consentId: string;
  customerName: string;
  tppName: string;
  createdOn: string;
  expiresOn: string;
  status: ConsentStatus;
}

@Component({
  selector: 'app-consent-list',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, NgClass, LucideAngularModule],
  template: `
    <div class="flex flex-col gap-6 animate-fade-in-up">
      <!-- Header Area -->
      <div>
        <h1 class="text-3xl font-black text-[#2B3674] tracking-tight">Consent Management</h1>
        <p class="text-[#A3AED0] text-sm font-bold uppercase tracking-widest mt-1">Manage and monitor all active and historical consents</p>
      </div>

      <!-- Main Content Card -->
      <div class="premium-glass p-0 overflow-hidden min-h-[600px] flex flex-col animate-fade-in-up" style="animation-delay: 100ms;">
        
        <!-- Tabs & Filters Row -->
        <div class="p-6 pb-0 border-b border-white/10">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <!-- Tabs -->
            <div class="flex border-b border-white/10">
              <button 
                (click)="switchTab('current')"
                class="px-8 py-3 text-sm font-bold transition-all relative"
                [class.text-[#4318FF]]="activeTab === 'current'"
                [class.text-[#A3AED0]]="activeTab !== 'current'"
              >
                <span class="flex items-center gap-2">
                   <lucide-icon [img]="FileCheck" class="w-4 h-4"></lucide-icon>
                   CURRENT
                </span>
                <div *ngIf="activeTab === 'current'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4318FF] rounded-full shadow-[0_0_8px_#4318FF]"></div>
              </button>
              <button 
                (click)="switchTab('history')"
                class="px-8 py-3 text-sm font-bold transition-all relative hover:text-[#4318FF]/70"
                [class.text-[#4318FF]]="activeTab === 'history'"
                [class.text-[#A3AED0]]="activeTab !== 'history'"
              >
                <span class="flex items-center gap-2">
                   <lucide-icon [img]="ClipboardList" class="w-4 h-4"></lucide-icon>
                   HISTORY
                </span>
                <div *ngIf="activeTab === 'history'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4318FF] rounded-full shadow-[0_0_8px_#4318FF]"></div>
              </button>
            </div>

            <!-- Toolbar -->
            <div class="flex items-center gap-3 w-full md:w-auto">
              <div class="relative flex-1 md:w-64 group">
                <lucide-icon [img]="Search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0] group-hover:text-[#4318FF] transition-colors"></lucide-icon>
                <input 
                  type="text" 
                  [(ngModel)]="searchQuery"
                  placeholder="Search Consents..." 
                  class="glass-input pl-10 pr-4 py-2 w-full text-xs transition-all duration-300 focus:w-full focus:shadow-[0_0_0_2px_rgba(67,24,255,0.1)]"
                >
              </div>
              <div class="flex items-center gap-2 bg-white/40 p-1 rounded-2xl border border-white/20">
                <span class="text-[10px] font-bold text-[#A3AED0] px-2 uppercase tracking-wide">Show:</span>
                <select [(ngModel)]="itemsPerPage" class="bg-transparent border-none text-xs font-bold text-[#2B3674] outline-none cursor-pointer pr-4 focus:ring-0">
                  <option [value]="10">10</option>
                  <option [value]="25">25</option>
                  <option [value]="50">50</option>
                </select>
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
                <th class="px-6 py-4 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider">Consent ID</th>
                <th class="px-6 py-4 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider">Customer Name</th>
                <th class="px-6 py-4 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider">TPP Name</th>
                <th class="px-6 py-4 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider">Created On</th>
                <th class="px-6 py-4 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider">Expires On</th>
                <th class="px-6 py-4 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider">Status</th>
                <th class="px-6 py-4 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              <tr *ngFor="let consent of pagedConsents; let i = index" class="hover:bg-white/40 transition-all duration-200 group relative">
                <td class="px-6 py-4">
                  <span [routerLink]="['/consents', consent.id]" class="text-xs font-bold text-[#4318FF] hover:text-[#2B3674] cursor-pointer transition-colors relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#2B3674] hover:after:w-full after:transition-all">{{consent.consentId.substring(0, 12)}}...</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-xs font-medium text-[#2B3674]">{{consent.customerName === '-' ? '—' : consent.customerName}}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-xs font-medium text-[#2B3674]">{{consent.tppName}}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-xs text-[#A3AED0]">{{formatDate(consent.createdOn)}}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-xs text-[#A3AED0]">{{formatDate(consent.expiresOn)}}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-[10px] font-bold px-2.5 py-1 rounded-lg border border-transparent" [ngClass]="getStatusClass(consent.status)">
                    {{getStatusLabel(consent.status)}}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button class="p-2 rounded-xl bg-white/50 text-[#A3AED0] hover:bg-[#4318FF] hover:text-white transition-all transform hover:scale-110 active:scale-95 shadow-sm">
                      <lucide-icon [img]="RotateCcw" class="w-3.5 h-3.5"></lucide-icon>
                    </button>
                    <button [routerLink]="['/consents', consent.id]" class="p-2 rounded-xl bg-[#05CD99]/10 text-[#05CD99] hover:bg-[#05CD99] hover:text-white transition-all transform hover:scale-110 active:scale-95 shadow-sm">
                      <lucide-icon [img]="Eye" class="w-3.5 h-3.5"></lucide-icon>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- Empty State -->
          <div *ngIf="!loading && filteredConsents.length === 0" class="flex flex-col items-center justify-center py-20 opacity-50">
            <div class="p-4 bg-white/20 rounded-full mb-4">
                <lucide-icon [img]="Search" class="w-8 h-8 text-[#A3AED0]"></lucide-icon>
            </div>
            <p class="text-sm font-bold text-[#2B3674]">No consents found</p>
            <p class="text-xs text-[#A3AED0] mt-1">Try adjusting your filters</p>
          </div>
        </div>

        <!-- Pagination -->
        <div class="p-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 bg-white/5">
          <span class="text-xs font-bold text-[#A3AED0]">
            Showing <span class="text-[#2B3674]">{{ (currentPage - 1) * itemsPerPage + 1 }} – {{ Math.min(currentPage * itemsPerPage, filteredConsents.length) }}</span> of <span class="text-[#2B3674]">{{filteredConsents.length}}</span>
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
  styles: [`:host { display: block; }`]
})
export class ConsentListComponent implements OnInit {

  private route = inject(ActivatedRoute);

  activeTab = 'current';
  searchQuery = '';
  currentPage = 1;
  itemsPerPage = 10;
  loading = false;
  hoveredRow: string | null = null;

  readonly Math = Math;

  readonly columns = ['Consent ID', 'Customer', 'TPP', 'Created', 'Expires', 'Status', 'Action'];

  readonly Search = Search;
  readonly Filter = Filter;
  readonly Download = Download;
  readonly Eye = Eye;
  readonly RotateCcw = RotateCcw;
  readonly ChevronRight = ChevronRight;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronsRight = ChevronsRight;
  readonly ChevronsLeft = ChevronsLeft;
  readonly FileCheck = FileCheck;
  readonly ClipboardList = ClipboardList;

  readonly paginationBtns = [
    { label: 'First', p1: '11 17 6 12 11 7', p2: '18 17 13 12 18 7' },
    { label: 'Previous', p1: '15 18 9 12 15 6', p2: '' },
    { label: 'Next', p1: '9 18 15 12 9 6', p2: '' },
    { label: 'Last', p1: '13 17 18 12 13 7', p2: '6 17 11 12 6 7' },
  ];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.searchQuery = params['q'];
      }
    });
  }

  consents: Consent[] = [
    { id: '1', consentId: 'b127-8842-9912-8b04', customerName: '-', tppName: 'TPP Client Test', createdOn: '2026-02-18T06:53:01.901', expiresOn: '2026-12-29T23:00:00', status: 'AwaitingAuthorization' },
    { id: '2', consentId: '7b64-1234-5678-1277', customerName: 'AZIZ ELGOUZOULI', tppName: 'TPP Client Test', createdOn: '2026-02-18T06:22:05.23', expiresOn: '2026-12-29T23:00:00', status: 'Authorized' },
    { id: '3', consentId: 's99c-2231-4412-a351', customerName: '-', tppName: 'TPP Client Test', createdOn: '2026-02-18T06:48:49.781', expiresOn: '2026-12-28T23:00:00', status: 'AwaitingAuthorization' },
    { id: '4', consentId: '9fe8-9912-1123-4291', customerName: 'MAJED SAIF MAJED RAS...', tppName: 'TPP Client Test', createdOn: '2026-02-18T06:45:02.181', expiresOn: '2026-12-28T23:00:00', status: 'AwaitingAuthorization' },
    { id: '5', consentId: 'c16e-5512-3312-8b31', customerName: 'Martino Giovanni Picotti', tppName: 'TPP Client Test', createdOn: '2026-02-18T06:17:09.971', expiresOn: '2026-12-28T23:00:00', status: 'Authorized' },
    { id: '6', consentId: '6797-1241-1123-a01e', customerName: 'Martino Giovanni Picotti', tppName: 'TPP Client Test', createdOn: '2026-02-18T06:15:45.672', expiresOn: '2026-12-28T23:00:00', status: 'Authorized' },
    { id: '7', consentId: '3f12-8812-7712-cc91', customerName: 'JOHN DOE', tppName: 'TPP Client Test', createdOn: '2026-02-17T14:30:00.000', expiresOn: '2026-11-30T23:00:00', status: 'Revoked' },
    { id: '8', consentId: '8a44-1123-5512-dd02', customerName: 'SARA ALI', tppName: 'TPP Client Test', createdOn: '2026-02-17T11:00:00.000', expiresOn: '2026-10-15T23:00:00', status: 'Expired' },
  ];

  get filteredConsents(): Consent[] {
    const q = this.searchQuery.toLowerCase().trim();
    if (!q) return this.consents;
    return this.consents.filter(c =>
      c.consentId.toLowerCase().includes(q) ||
      c.customerName.toLowerCase().includes(q) ||
      c.tppName.toLowerCase().includes(q) ||
      c.status.toLowerCase().includes(q)
    );
  }

  get pagedConsents(): Consent[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredConsents.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredConsents.length / this.itemsPerPage);
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
    // Basic status toggle for now
    const statuses: ConsentStatus[] = ['Authorized', 'AwaitingAuthorization', 'Revoked', 'Expired', 'Suspended'];
    const currentIdx = statuses.indexOf(this.consents[0].status);
    const nextStatus = statuses[(currentIdx + 1) % statuses.length];
    // This is just a UI demo of filter working
    console.log('Filter toggled');
  }

  exportToCSV(): void {
    const headers = ['Consent ID', 'Customer', 'TPP', 'Created', 'Expires', 'Status'];
    const rows = this.filteredConsents.map(c => [
      c.consentId,
      c.customerName,
      c.tppName,
      c.createdOn,
      c.expiresOn,
      c.status
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `consents_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  switchTab(tab: string): void {
    if (tab === this.activeTab) return;
    this.loading = true;
    this.activeTab = tab;
    setTimeout(() => { this.loading = false; }, 500);
  }

  formatDate(iso: string): string {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch { return iso; }
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      Authorized: 'bg-[#05CD99]/10 text-[#05CD99]',
      AwaitingAuthorization: 'bg-[#FF8F0C]/10 text-[#FF8F0C]',
      Revoked: 'bg-[#FF5252]/10 text-[#FF5252]',
      Expired: 'bg-[#A3AED0]/10 text-[#A3AED0]',
      Suspended: 'bg-gray-100 text-[#2B3674]',
    };
    return map[status] ?? 'bg-secondary/10 text-secondary ring-1 ring-secondary/20';
  }

  getStatusDot(status: string): string {
    const map: Record<string, string> = {
      Authorized: 'bg-success',
      AwaitingAuthorization: 'bg-warning',
      Revoked: 'bg-danger',
      Expired: 'bg-orange-500',
      Suspended: 'bg-secondary',
    };
    return map[status] ?? 'bg-secondary';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      Authorized: 'Authorized',
      AwaitingAuthorization: 'Awaiting Auth',
      Revoked: 'Revoked',
      Expired: 'Expired',
      Suspended: 'Suspended',
    };
    return map[status] ?? status;
  }
}