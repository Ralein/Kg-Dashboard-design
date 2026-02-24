import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { LucideAngularModule, ChevronLeft, LayoutGrid, FileJson, FileCode, Printer, Share2, FileSpreadsheet, Plus, Minus } from 'lucide-angular';

@Component({
   selector: 'app-quote-details',
   standalone: true,
   imports: [CommonModule, LucideAngularModule, RouterLink],
   template: `
    <div class="flex flex-col gap-6 animate-fade-in-up pb-8">
      
      <!-- Blue Header Banner -->
      <div class="bg-[#2B3674] h-10 w-full flex items-center px-6 rounded-t-xl overflow-hidden -mb-6">
        <h2 class="text-sm font-bold text-white tracking-wide">Quote Details</h2>
      </div>

      <!-- Top Action Bar & Metadata Section -->
      <div class="premium-glass p-0 overflow-hidden">
        <!-- Metadata Header -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-0 border-b border-gray-100">
          <div class="p-4 border-r border-gray-100">
            <p class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-wider mb-1">Quote Id:</p>
            <p class="text-xs font-bold text-[#2B3674]">9003XXXXXXXX2611</p>
          </div>
          <div class="p-4 border-r border-gray-100">
            <p class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-wider mb-1">Quote Reference:</p>
            <p class="text-xs font-bold text-[#2B3674]">cbuse-home-2.1-02</p>
          </div>
          <div class="p-4 border-r border-gray-100">
            <p class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-wider mb-1">LOB:</p>
            <p class="text-xs font-bold text-[#2B3674]">HOME</p>
          </div>
          <div class="p-4 border-r border-gray-100">
            <p class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-wider mb-1">Created Date:</p>
            <p class="text-xs font-bold text-[#2B3674]">24 Feb 2026</p>
          </div>
          <div class="p-4 flex justify-between items-start">
            <div>
              <p class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-wider mb-1">Expiration Date:</p>
              <p class="text-xs font-bold text-[#2B3674]">10 Mar 2026</p>
            </div>
            <button routerLink="/quotation-management" class="px-4 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-[#2B3674] hover:bg-gray-50 transition-all shadow-sm">Back</button>
          </div>
        </div>

        <!-- Row 2 Metadata -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-0 bg-[#F4F7FE]/30">
          <div class="p-4 border-r border-gray-100">
            <p class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-wider mb-1">Tpp Name:</p>
            <p class="text-xs font-bold text-[#2B3674]">N/A</p>
          </div>
          <div class="p-4 border-r border-gray-100">
            <p class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-wider mb-1">Status:</p>
            <p class="text-xs font-bold text-[#2B3674]">Available</p>
          </div>
          <div class="p-4 md:col-span-3">
            <p class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-wider mb-1">Authorization Channel:</p>
            <p class="text-xs font-bold text-[#2B3674]">Web</p>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- Sidebar Navigation -->
        <div class="lg:col-span-4 flex flex-col gap-4">
          <div class="premium-glass p-0 h-full">
            <div class="p-6 border-b border-gray-100/50">
              <h3 class="text-base font-bold text-[#2B3674]">Quote Name</h3>
            </div>
            <div class="p-4 flex flex-col gap-2">
              <button *ngFor="let part of quoteParts"
                      (click)="selectedPart = part.id"
                      class="nav-btn w-full flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-200 text-left border border-transparent"
                      [class.nav-btn--active]="selectedPart === part.id">
                <lucide-icon [img]="part.icon" class="w-4 h-4"></lucide-icon>
                <span class="text-xs font-bold tracking-wide">{{part.label}}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Main Data Panel -->
        <div class="lg:col-span-8 flex flex-col gap-4">
          <div class="premium-glass p-0 h-full overflow-hidden flex flex-col">
            <div class="p-6 border-b border-gray-100/50 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-10">
              <h3 class="text-base font-bold text-[#1B2559]">Review the info of quote</h3>
              <button class="export-btn p-2 rounded-lg border border-emerald-100 bg-emerald-50/50 text-emerald-600 hover:bg-emerald-100 transition-colors">
                 <lucide-icon [img]="FileSpreadsheet" class="w-5 h-5"></lucide-icon>
              </button>
            </div>

            <div class="flex-1 overflow-auto custom-scrollbar">
              <table class="w-full text-sm">
                <thead>
                  <tr class="bg-[#F4F7FE]/50 text-left">
                    <th class="px-8 py-4 text-[10px] font-bold text-[#A3AED0] uppercase tracking-widest border-b border-gray-100">Field</th>
                    <th class="px-8 py-4 text-[10px] font-bold text-[#A3AED0] uppercase tracking-widest border-b border-gray-100">Value / Type</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100/60 font-medium">
                  <tr *ngFor="let row of tableData" class="group hover:bg-[#F4F7FE]/40 transition-colors duration-150">
                    <td class="px-8 py-4 min-w-[200px]">
                      <div class="flex items-center gap-2">
                        <button *ngIf="row.isObject" 
                                (click)="toggleRow(row.key)"
                                class="w-5 h-5 flex items-center justify-center rounded border border-[#4318FF] text-[#4318FF] hover:bg-[#4318FF] hover:text-white transition-all text-[10px]">
                          {{ expandedRows.has(row.key) ? '-' : '+' }}
                        </button>
                        <span [class.text-[#4318FF]]="row.isObject" 
                              [class.font-bold]="row.isObject"
                              [class.text-[#A3AED0]]="!row.isObject"
                              [class.ml-7]="!row.isObject && !row.isChild"
                              [class.ml-12]="row.isChild">
                          {{row.key}}
                        </span>
                      </div>
                    </td>
                    <td class="px-8 py-4 text-[#2B3674] font-semibold">
                      {{row.value}}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
   styles: [`
    :host { display: block; }

    .premium-glass {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(226, 232, 240, 0.8);
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(27, 37, 89, 0.05);
    }

    .nav-btn {
      color: #A3AED0;
    }
    .nav-btn:hover:not(.nav-btn--active) {
      background: #F4F7FE;
      color: #2B3674;
    }
    .nav-btn--active {
      background: #4318FF;
      color: white;
      box-shadow: 0 12px 24px rgba(67, 24, 255, 0.25);
    }

    .animate-fade-in-up {
      animation: fadeInUp 0.5s ease-out forwards;
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(163, 174, 208, 0.3);
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(163, 174, 208, 0.5);
    }
  `]
})
export class QuoteDetailsComponent implements OnInit {
   readonly ChevronLeft = ChevronLeft;
   readonly LayoutGrid = LayoutGrid;
   readonly FileJson = FileJson;
   readonly FileCode = FileCode;
   readonly FileSpreadsheet = FileSpreadsheet;

   selectedPart = 'createQuoteJson';
   expandedRows = new Set<string>();

   quoteParts = [
      { id: 'createQuoteJson', label: 'createQuoteJson', icon: FileJson },
      { id: 'requestTransformerJson', label: 'requestTransformerJson', icon: FileCode },
      { id: 'responseTransformerJson', label: 'responseTransformerJson', icon: FileCode },
      { id: 'nebrasResponseJson', label: 'nebrasResponseJson', icon: FileCode }
   ];

   tableData = [
      { key: 'CustomerId', value: 'string', isObject: false, isChild: false },
      { key: 'QuoteReference', value: 'cbuae-home-2.1-02', isObject: false, isChild: false },
      { key: 'QuoteType', value: 'Renewal', isObject: false, isChild: false },
      { key: 'PolicyIssuanceRequest', value: '{}', isObject: true, isChild: false },
      { key: 'Policy', value: '{}', isObject: true, isChild: false },
      { key: 'PolicyHolder', value: '{}', isObject: true, isChild: false },
      { key: 'PropertyDetails', value: '{}', isObject: true, isChild: false },
      { key: 'BuildingsCover', value: '{}', isObject: true, isChild: false },
      { key: 'ContentsCoverDetails', value: '{}', isObject: true, isChild: false },
      { key: 'PersonalBelongings', value: '{}', isObject: true, isChild: false },
      { key: 'Mortgage', value: '{}', isObject: true, isChild: false },
      { key: 'DomesticHelpers', value: '{}', isObject: true, isChild: false },
      { key: 'PropertyClaims', value: '[1]', isObject: true, isChild: false },
      { key: 'ExistingHomeInsurance', value: '{}', isObject: true, isChild: false },
      { key: 'PreviousApplications', value: '{}', isObject: true, isChild: false },
      { key: 'ImportantQuestions', value: '{}', isObject: true, isChild: false }
   ];

   ngOnInit() {
      // Load quote by id
   }

   toggleRow(key: string) {
      if (this.expandedRows.has(key)) {
         this.expandedRows.delete(key);
      } else {
         this.expandedRows.add(key);
      }
   }
}
