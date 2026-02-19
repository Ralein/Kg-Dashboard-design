import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { LucideAngularModule, ChevronLeft, LayoutGrid, FileJson, FileCode, Printer, Share2 } from 'lucide-angular';

@Component({
    selector: 'app-quote-details',
    standalone: true,
    imports: [CommonModule, LucideAngularModule, RouterLink],
    template: `
    <div class="flex flex-col gap-6 animate-fade-in-up">
      <!-- Top Action Bar -->
      <div class="flex justify-between items-center">
         <div class="flex items-center gap-3">
            <button routerLink="/quotation-management" class="p-2 bg-white rounded-lg shadow-sm border border-gray-100 text-[#4318FF] hover:bg-gray-50 transition-colors">
               <lucide-icon [img]="ChevronLeft" class="w-4 h-4"></lucide-icon>
            </button>
            <h2 class="text-xl font-bold text-[#2B3674] tracking-tight">Quote Details</h2>
         </div>
         <div class="flex items-center gap-2">
            <button routerLink="/quotation-management" class="px-6 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-[#2B3674] hover:bg-gray-50 transition-all shadow-sm">Back</button>
         </div>
      </div>

      <!-- Main Info Banner -->
      <div class="chart-shell bg-white/70 backdrop-blur-xl border border-white/40 shadow-glass p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-6 gap-x-8">
          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-wider">Quote Id:</span>
            <span class="text-xs font-bold text-[#2B3674]">9005XXXXXXXX9734</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-wider">Quote Reference:</span>
            <span class="text-xs font-bold text-[#2B3674]">cbuae-travel-2.1-01</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-wider">LOB:</span>
            <span class="text-xs font-bold text-[#2B3674]">TRAVEL</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-wider">Created Date:</span>
            <span class="text-xs font-bold text-[#2B3674]">19 Feb 2026</span>
          </div>
          <div class="flex flex-col gap-1 text-right">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-wider">Expiration Date:</span>
            <span class="text-xs font-bold text-[#2B3674]">05 Mar 2026</span>
          </div>
          
          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-wider">Tpp Name:</span>
            <span class="text-xs font-bold text-[#2B3674]">ADNIC</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-wider">Status:</span>
            <div class="flex">
               <span class="text-xs font-bold text-[#2B3674]">Available</span>
            </div>
          </div>
          <div class="flex flex-col gap-1 lg:col-span-3">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-wider">Authorization Channel:</span>
            <span class="text-xs font-bold text-[#2B3674]">Web</span>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <!-- Sidebar Navigation for Quote Parts -->
        <div class="lg:col-span-3">
          <div class="chart-shell p-2 bg-white/70 backdrop-blur-xl border border-white/40 shadow-glass">
             <h3 class="p-4 text-sm font-bold text-[#2B3674] border-b border-gray-100">Quote Name</h3>
             <div class="flex flex-col py-2">
                <button class="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#4318FF] text-white text-xs font-bold shadow-lg shadow-[#4318FF]/20 text-left">
                   <lucide-icon [img]="FileJson" class="w-4 h-4"></lucide-icon>
                   createQuoteJson
                </button>
                <button class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-[#A3AED0] hover:text-[#2B3674] text-xs font-bold text-left transition-all">
                   <lucide-icon [img]="FileCode" class="w-4 h-4"></lucide-icon>
                   requestTransformerJson
                </button>
                <button class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-[#A3AED0] hover:text-[#2B3674] text-xs font-bold text-left transition-all">
                   <lucide-icon [img]="FileCode" class="w-4 h-4"></lucide-icon>
                   responseTransformerJson
                </button>
             </div>
          </div>
        </div>

        <!-- Main JSON Viewer -->
        <div class="lg:col-span-9">
          <div class="chart-shell p-0 bg-white/70 backdrop-blur-xl border border-white/40 shadow-glass overflow-hidden flex flex-col min-h-[500px]">
             <div class="p-4 border-b border-gray-100/50 flex justify-between items-center">
                <h3 class="text-sm font-bold text-[#1B2559]">Review the info of quote</h3>
                <div class="flex gap-2">
                   <button class="p-2 text-[#05CD99] hover:bg-[#05CD99]/10 rounded-lg transition-colors"><lucide-icon [img]="LayoutGrid" class="w-4 h-4"></lucide-icon></button>
                </div>
             </div>
             
             <!-- Table JSON View -->
             <div class="flex-1 overflow-auto">
                <table class="w-full text-xs font-medium">
                   <tbody class="divide-y divide-gray-100">
                      <tr class="hover:bg-gray-50/50">
                         <td class="px-6 py-4 text-[#A3AED0] w-1/3">CustomerId</td>
                         <td class="px-6 py-4 text-[#2B3674]">string</td>
                      </tr>
                      <tr class="hover:bg-gray-50/50">
                         <td class="px-6 py-4 text-[#A3AED0]">QuoteReference</td>
                         <td class="px-6 py-4 text-[#2B3674]">cbuae-travel-2.1-01</td>
                      </tr>
                      <tr class="hover:bg-gray-50/50 border-b-2 border-gray-100">
                         <td class="px-6 py-4 text-[#A3AED0]">QuoteType</td>
                         <td class="px-6 py-4 text-[#2B3674]">New</td>
                      </tr>
                      <!-- Nested Objects -->
                      <tr class="hover:bg-gray-50/50">
                         <td class="px-6 py-4 text-[#4318FF] font-bold flex items-center gap-2">
                           <span class="text-[10px] w-4 h-4 flex items-center justify-center border border-[#4318FF] rounded-sm">+</span>
                           PolicyIssuanceRequest
                         </td>
                         <td class="px-6 py-4 text-[#2B3674]">{{ '{ }' }}</td>
                      </tr>
                      <tr class="hover:bg-gray-50/50">
                         <td class="px-6 py-4 text-[#4318FF] font-bold flex items-center gap-2">
                           <span class="text-[10px] w-4 h-4 flex items-center justify-center border border-[#4318FF] rounded-sm">+</span>
                           Policy
                         </td>
                         <td class="px-6 py-4 text-[#2B3674]">{{ '{ }' }}</td>
                      </tr>
                      <tr class="hover:bg-gray-50/50">
                         <td class="px-6 py-4 text-[#4318FF] font-bold flex items-center gap-2">
                           <span class="text-[10px] w-4 h-4 flex items-center justify-center border border-[#4318FF] rounded-sm">+</span>
                           PolicyHolder
                         </td>
                         <td class="px-6 py-4 text-[#2B3674]">{{ '{ }' }}</td>
                      </tr>
                      <tr class="hover:bg-gray-50/50">
                         <td class="px-6 py-4 text-[#4318FF] font-bold flex items-center gap-2">
                           <span class="text-[10px] w-4 h-4 flex items-center justify-center border border-[#4318FF] rounded-sm">+</span>
                           InsuredTravelers
                         </td>
                         <td class="px-6 py-4 text-[#2B3674]">[2]</td>
                      </tr>
                      <tr class="hover:bg-gray-50/50">
                         <td class="px-6 py-4 text-[#4318FF] font-bold flex items-center gap-2">
                           <span class="text-[10px] w-4 h-4 flex items-center justify-center border border-[#4318FF] rounded-sm">+</span>
                           MedicalQuestions
                         </td>
                         <td class="px-6 py-4 text-[#2B3674]">[1]</td>
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
    :host {
      display: block;
    }
  `]
})
export class QuoteDetailsComponent implements OnInit {
    private route = inject(ActivatedRoute);

    readonly ChevronLeft = ChevronLeft;
    readonly LayoutGrid = LayoutGrid;
    readonly FileJson = FileJson;
    readonly FileCode = FileCode;

    ngOnInit() {
        // Load quote by id
    }
}
