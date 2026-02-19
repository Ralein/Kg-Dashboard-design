import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, Calendar, RotateCcw, Send, FileSpreadsheet, ChevronRight } from 'lucide-angular';

@Component({
    selector: 'app-reports',
    standalone: true,
    imports: [CommonModule, FormsModule, LucideAngularModule],
    template: `
    <div class="flex flex-col gap-6 animate-fade-in-up">
      <!-- Header Area -->
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-[#2B3674] tracking-tight">Reports</h1>
      </div>

      <!-- Search Criteria Banner -->
      <div class="chart-shell bg-white shadow-glass border border-gray-100 overflow-visible">
        <div class="p-6 border-b border-gray-50 flex justify-between items-center bg-[#1B2559] rounded-t-[20px]">
          <h3 class="text-sm font-bold text-white uppercase tracking-wider">Search Criteria</h3>
        </div>
        
        <div class="p-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
            <!-- Reports Dropdown -->
            <div class="flex flex-col gap-2 relative group">
              <label class="text-[11px] font-bold text-[#4318FF] uppercase tracking-wide">Reports*</label>
              <div class="relative">
                <select class="glass-input pl-4 pr-10 py-3 w-full appearance-none cursor-pointer font-bold text-[#2B3674] border-[#4318FF]/20 focus:border-[#4318FF] transition-all bg-white">
                  <option>Consent Expiry Forecast Report</option>
                  <option>Top TPP Usage Report</option>
                  <option>User Consent Activity Report</option>
                  <option>Audit Trail Summary Report</option>
                  <option>Consent Policy Mapping Report</option>
                  <option>API Endpoint Usage Report</option>
                  <option>Failed Audit Log Report</option>
                  <option>iAgent Lead Report</option>
                  <option>Quote Transaction Report</option>
                  <option>LFI quote id search</option>
                </select>
                <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#4318FF]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            <!-- Period Start -->
            <div class="flex flex-col gap-2">
              <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide">Period Start *</label>
              <div class="relative">
                <input type="text" value="1/19/2026" class="glass-input pl-4 pr-10 py-3 w-full font-bold text-[#2B3674] border-gray-100 focus:border-[#4318FF] transition-all bg-white">
                <lucide-icon [img]="Calendar" class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0]"></lucide-icon>
              </div>
            </div>

            <!-- Period End -->
            <div class="flex flex-col gap-2">
              <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide">Period End *</label>
              <div class="relative">
                <input type="text" value="2/19/2026" class="glass-input pl-4 pr-10 py-3 w-full font-bold text-[#2B3674] border-gray-100 focus:border-[#4318FF] transition-all bg-white">
                <lucide-icon [img]="Calendar" class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0]"></lucide-icon>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3 mt-8">
            <button class="flex items-center gap-2 px-6 py-2 rounded-lg border border-[#F4F7FE] text-[#FF8F0C] font-bold text-xs hover:bg-[#FFF8F1] transition-all">
              <lucide-icon [img]="RotateCcw" class="w-3.5 h-3.5"></lucide-icon>
              Reset
            </button>
            <button class="flex items-center gap-2 px-8 py-2 rounded-lg bg-[#707EAE] text-white font-bold text-xs hover:bg-[#2B3674] transition-all shadow-lg shadow-[#707EAE]/20">
              Submit
            </button>
          </div>
        </div>
      </div>

      <!-- Result Area -->
      <div class="chart-shell bg-white/50 border border-gray-50/50 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
        <div class="absolute top-6 right-6">
           <button class="p-2.5 bg-white rounded-lg shadow-glass border border-gray-100 text-[#05CD99] hover:bg-[#05CD99] hover:text-white transition-all transform hover:scale-110 active:scale-95">
              <lucide-icon [img]="FileSpreadsheet" class="w-5 h-5"></lucide-icon>
           </button>
        </div>
        
        <div class="flex flex-col items-center opacity-20">
           <div class="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <lucide-icon [img]="Search" class="w-8 h-8 text-[#2B3674]"></lucide-icon>
           </div>
           <p class="text-sm font-bold text-[#2B3674]">No data to display</p>
           <p class="text-xs font-medium text-[#A3AED0] mt-1">Submit your criteria to generate a report</p>
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
export class ReportsComponent {
    readonly Calendar = Calendar;
    readonly RotateCcw = RotateCcw;
    readonly Send = Send;
    readonly Search = Search;
    readonly FileSpreadsheet = FileSpreadsheet;
    readonly ChevronRight = ChevronRight;
}
