import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ChevronDown, CheckCircle2, Search, Filter, Download, Plus, Settings2, Globe, FileJson, Maximize2 } from 'lucide-angular';

@Component({
  selector: 'app-api-versioning',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="flex flex-col gap-6 animate-fade-in-up">
      <!-- Header Area -->
      <div>
        <h1 class="text-2xl font-bold text-[#2B3674] tracking-tight">API Versioning</h1>
        <p class="text-[#A3AED0] text-sm font-medium">Configure and manage API endpoints across different processes</p>
      </div>

      <!-- Selectors Card -->
      <div class="chart-shell p-6 bg-white/70 backdrop-blur-xl border border-white/40 shadow-glass">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <!-- LOB Selector -->
          <div class="flex flex-col gap-2">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-wider px-1">Select LOB</span>
            <div class="relative">
              <select class="glass-input pl-3 pr-10 py-2.5 w-full appearance-none cursor-pointer font-bold text-[#2B3674]">
                <option>Select LOB</option>
                <option>MOTOR</option>
                <option>TRAVEL</option>
                <option>HOME</option>
              </select>
              <lucide-icon [img]="ChevronDown" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0] pointer-events-none"></lucide-icon>
            </div>
          </div>

          <!-- Process Flow -->
          <div class="flex flex-col gap-2">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-wider px-1">Select Process Flow</span>
            <div class="relative">
              <select class="glass-input pl-3 pr-10 py-2.5 w-full appearance-none cursor-pointer font-bold text-[#2B3674]">
                <option>Select Process Flow</option>
                <option>Instant Quote</option>
                <option>Policy Issuance</option>
              </select>
              <lucide-icon [img]="ChevronDown" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0] pointer-events-none"></lucide-icon>
            </div>
          </div>

          <!-- Documentation Version -->
          <div class="flex flex-col gap-2">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-wider px-1">Documentation Version</span>
            <div class="relative">
              <select class="glass-input pl-3 pr-10 py-2.5 w-full appearance-none cursor-pointer font-bold text-[#2B3674]">
                <option>Documentation Version</option>
                <option>v1.0</option>
                <option>v2.0</option>
              </select>
              <lucide-icon [img]="ChevronDown" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0] pointer-events-none"></lucide-icon>
            </div>
          </div>

          <!-- Select API -->
          <div class="flex flex-col gap-2">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-wider px-1">Select API</span>
            <div class="relative">
              <select class="glass-input pl-3 pr-10 py-2.5 w-full appearance-none cursor-pointer font-bold text-[#2B3674]">
                <option>Select API</option>
                <option>Quotation API</option>
                <option>Customer Sync</option>
              </select>
              <lucide-icon [img]="ChevronDown" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0] pointer-events-none"></lucide-icon>
            </div>
          </div>
        </div>

        <!-- Action Row -->
        <div class="flex justify-end gap-3 pt-4 border-t border-gray-100/50">
           <button class="bg-[#05CD99]/10 text-[#05CD99] px-6 py-2.5 rounded-xl font-bold text-sm tracking-tight hover:bg-[#05CD99] hover:text-white transition-all shadow-sm flex items-center gap-2">
              <lucide-icon [img]="Plus" class="w-4 h-4"></lucide-icon>
              Create API Endpoint
           </button>
           <button class="bg-[#4318FF] text-white px-8 py-2.5 rounded-xl font-bold text-sm tracking-tight hover:bg-[#3311DB] transition-all shadow-lg shadow-[#4318FF]/20 flex items-center gap-2">
              <lucide-icon [img]="CheckCircle2" class="w-4 h-4"></lucide-icon>
              Submit
           </button>
        </div>
      </div>

      <!-- Result Table Card (Empty State Scenario) -->
      <div class="chart-shell overflow-hidden bg-white/70 backdrop-blur-xl border border-white/40 shadow-glass flex flex-col min-h-[400px]">
        <!-- Toolbar -->
        <div class="p-6 border-b border-gray-100/50 flex flex-col md:flex-row justify-between items-center gap-4">
           <div class="flex items-center gap-3">
              <button class="p-2 text-[#A3AED0] hover:text-[#4318FF] transition-colors"><lucide-icon [img]="Settings2" class="w-4 h-4"></lucide-icon></button>
              <div class="relative w-full md:w-80">
                <lucide-icon [img]="Search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0]"></lucide-icon>
                <input type="text" placeholder="Search..." class="glass-input pl-10 pr-4 py-2 w-full text-xs">
              </div>
           </div>
           <div class="flex items-center gap-2">
              <button class="p-2 bg-white rounded-lg border border-gray-100/80 text-[#A3AED0] hover:text-[#4318FF] transition-all shadow-sm"><lucide-icon [img]="Filter" class="w-4 h-4"></lucide-icon></button>
              <button class="p-2 bg-white rounded-lg border border-gray-100/80 text-[#A3AED0] hover:text-[#4318FF] transition-all shadow-sm"><lucide-icon [img]="Download" class="w-4 h-4"></lucide-icon></button>
              <button class="p-2 bg-white rounded-lg border border-gray-100/80 text-[#A3AED0] hover:text-[#4318FF] transition-all shadow-sm"><lucide-icon [img]="Globe" class="w-4 h-4"></lucide-icon></button>
              <button class="p-2 bg-white rounded-lg border border-gray-100/80 text-[#A3AED0] hover:text-[#4318FF] transition-all shadow-sm"><lucide-icon [img]="FileJson" class="w-4 h-4"></lucide-icon></button>
              <button class="p-2 bg-white rounded-lg border border-gray-100/80 text-[#A3AED0] hover:text-[#4318FF] transition-all shadow-sm"><lucide-icon [img]="Maximize2" class="w-4 h-4"></lucide-icon></button>
           </div>
        </div>

        <!-- Empty Table Body -->
        <div class="flex-1 flex flex-col items-center justify-center p-20 text-center opacity-30 select-none">
           <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <lucide-icon [img]="ChevronDown" class="w-10 h-10"></lucide-icon>
           </div>
           <h3 class="text-xl font-bold text-[#2B3674]">No API mappings found</h3>
           <p class="text-sm font-medium text-[#A3AED0] mt-1">Please select LOB and Process Flow to view documentation version mapping.</p>
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
export class ApiVersioningComponent {
  readonly ChevronDown = ChevronDown;
  readonly CheckCircle2 = CheckCircle2;
  readonly Search = Search;
  readonly Filter = Filter;
  readonly Download = Download;
  readonly Plus = Plus;
  readonly Settings2 = Settings2;
  readonly Globe = Globe;
  readonly FileJson = FileJson;
  readonly Maximize2 = Maximize2;
}
