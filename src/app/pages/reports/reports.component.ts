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
      <div class="flex justify-between items-center px-0">
        <div>
          <h1 class="text-3xl font-black text-[#2B3674] tracking-tight">Reports</h1>
          <p class="text-[#A3AED0] text-sm font-bold uppercase tracking-widest mt-1">Generate and export system performance reports</p>
        </div>
      </div>

      <!-- Main Reports Container -->
      <div class="premium-glass p-0 overflow-hidden min-h-[600px] flex flex-col animate-fade-in-up" style="animation-delay: 100ms;">
        
        <!-- Search Criteria Header -->
        <div class="p-6 border-b border-gray-100/50 bg-[#2B3674]/[0.02]">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-xl bg-[#4318FF]/10 flex items-center justify-center">
              <lucide-icon [img]="FileSpreadsheet" class="w-4 h-4 text-[#4318FF]"></lucide-icon>
            </div>
            <h3 class="text-sm font-bold text-[#2B3674] uppercase tracking-wider">Report Selection & Criteria</h3>
          </div>
        </div>

        <!-- Inputs Grid -->
        <div class="p-8 border-b border-gray-100/50">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Reports Dropdown -->
            <div class="flex flex-col gap-1.5 relative group">
              <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Select Report Type<span class="text-red-500">*</span></label>
              <div class="relative">
                <select class="glass-input pl-4 pr-10 py-3 w-full appearance-none cursor-pointer font-bold text-[#2B3674] border-gray-100 focus:border-[#4318FF] transition-all bg-white">
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
                <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#A3AED0]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            <!-- Period Start -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Period Start<span class="text-red-500">*</span></label>
              <div class="relative">
                <input type="text" value="01/01/2026" class="glass-input pl-4 pr-10 py-3 w-full font-bold text-[#2B3674] border-gray-100 focus:border-[#4318FF] transition-all bg-white">
                <lucide-icon [img]="Calendar" class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0] pointer-events-none"></lucide-icon>
              </div>
            </div>

            <!-- Period End -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Period End<span class="text-red-500">*</span></label>
              <div class="relative">
                <input type="text" value="02/19/2026" class="glass-input pl-4 pr-10 py-3 w-full font-bold text-[#2B3674] border-gray-100 focus:border-[#4318FF] transition-all bg-white">
                <lucide-icon [img]="Calendar" class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0] pointer-events-none"></lucide-icon>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3 mt-8">
            <button class="px-6 py-2.5 rounded-2xl border border-gray-200 text-[#2B3674] font-bold text-sm hover:bg-gray-50 transition-all flex items-center gap-2 transform hover:scale-105 active:scale-95">
              <lucide-icon [img]="RotateCcw" class="w-3.5 h-3.5"></lucide-icon>
              Reset
            </button>
            <button class="px-10 py-2.5 rounded-2xl bg-[#2B3674] text-white font-bold text-sm hover:bg-[#1B2559] transition-all shadow-lg shadow-[#2B3674]/20 flex items-center gap-2 transform hover:scale-105 active:scale-95">
              Submit
            </button>
          </div>
        </div>

        <!-- Result Display Area -->
        <div class="flex-1 flex flex-col relative min-h-[400px]">
          
          <!-- Result Toolbar (Transparent) -->
          <div class="px-8 py-4 flex justify-between items-center">
             <span class="text-xs font-bold text-[#A3AED0] uppercase tracking-widest">Report Preview</span>
             <button (click)="exportToExcel()" class="p-2.5 bg-white/40 rounded-2xl border border-white/20 text-[#05CD99] hover:bg-[#05CD99] hover:text-white transition-all transform hover:scale-110 active:scale-95 flex items-center gap-2 px-4 shadow-sm">
                <lucide-icon [img]="FileSpreadsheet" class="w-4 h-4"></lucide-icon>
                <span class="text-[10px] font-extrabold uppercase">Export Excel</span>
             </button>
          </div>

          <!-- Empty State -->
          <div class="flex-1 flex flex-col items-center justify-center">
             <div class="relative mb-6">
                <div class="absolute inset-0 bg-[#4318FF]/5 blur-2xl rounded-full"></div>
                <div class="relative w-20 h-20 rounded-3xl bg-white/50 backdrop-blur-sm border border-white/80 shadow-glass flex items-center justify-center">
                   <lucide-icon [img]="Search" class="w-8 h-8 text-[#A3AED0]"></lucide-icon>
                </div>
                <div class="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-[#2B3674] text-white flex items-center justify-center shadow-lg">
                   <lucide-icon [img]="ChevronRight" class="w-5 h-5"></lucide-icon>
                </div>
             </div>
             
             <h4 class="text-lg font-bold text-[#2B3674]">Ready to Generate</h4>
             <p class="text-sm font-medium text-[#A3AED0] mt-1 max-w-[280px] text-center">Customize your criteria above and click submit to view the report preview.</p>
          </div>
          
          <!-- Subtle Grid Pattern for Results Area -->
          <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-50/50 to-transparent pointer-events-none"></div>
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

  exportToExcel(): void {
    // Demo implementation since there's no data yet
    alert('Exporting report to Excel...');
    console.log('Exporting report...');
  }
}
