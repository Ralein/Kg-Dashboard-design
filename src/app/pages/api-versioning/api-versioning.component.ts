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
      <div class="flex justify-between items-center px-0">
        <div>
          <h1 class="text-2xl font-bold text-[#2B3674] tracking-tight">API Versioning</h1>
          <p class="text-[#A3AED0] text-sm font-medium">Configure and manage API endpoints across different processes</p>
        </div>
        <button class="bg-[#05CD99]/10 text-[#05CD99] px-6 py-2.5 rounded-xl font-bold text-sm tracking-tight hover:bg-[#05CD99] hover:text-white transition-all shadow-sm flex items-center gap-2">
          <lucide-icon [img]="Plus" class="w-4 h-4"></lucide-icon>
          Create API Endpoint
        </button>
      </div>

      <!-- Main Container Card -->
      <div class="chart-shell p-0 overflow-hidden bg-white/70 backdrop-blur-xl border border-white/40 shadow-glass min-h-[600px] flex flex-col">
        
        <!-- Selection Header -->
        <div class="p-6 border-b border-gray-100/50 bg-[#2B3674]/[0.02]">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-[#4318FF]/10 flex items-center justify-center">
              <lucide-icon [img]="Settings2" class="w-4 h-4 text-[#4318FF]"></lucide-icon>
            </div>
            <h3 class="text-sm font-bold text-[#2B3674] uppercase tracking-wider">Configuration & Mappings</h3>
          </div>
        </div>

        <!-- Inputs Grid -->
        <div class="p-8 border-b border-gray-100/50">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- LOB Selector -->
            <div class="flex flex-col gap-1.5 relative group">
              <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Select LOB<span class="text-red-500">*</span></label>
              <div class="relative">
                <select class="glass-input pl-4 pr-10 py-3 w-full appearance-none cursor-pointer font-bold text-[#2B3674] border-gray-100 focus:border-[#4318FF] transition-all bg-white">
                  <option>Select LOB</option>
                  <option>MOTOR</option>
                  <option>TRAVEL</option>
                  <option>HOME</option>
                </select>
                <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#A3AED0]">
                  <lucide-icon [img]="ChevronDown" class="w-4 h-4"></lucide-icon>
                </div>
              </div>
            </div>

            <!-- Process Flow -->
            <div class="flex flex-col gap-1.5 relative group">
              <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Process Flow<span class="text-red-500">*</span></label>
              <div class="relative">
                <select class="glass-input pl-4 pr-10 py-3 w-full appearance-none cursor-pointer font-bold text-[#2B3674] border-gray-100 focus:border-[#4318FF] transition-all bg-white">
                  <option>Select Process Flow</option>
                  <option>Instant Quote</option>
                  <option>Policy Issuance</option>
                </select>
                <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#A3AED0]">
                  <lucide-icon [img]="ChevronDown" class="w-4 h-4"></lucide-icon>
                </div>
              </div>
            </div>

            <!-- Documentation Version -->
            <div class="flex flex-col gap-1.5 relative group">
              <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Version<span class="text-red-500">*</span></label>
              <div class="relative">
                <select class="glass-input pl-4 pr-10 py-3 w-full appearance-none cursor-pointer font-bold text-[#2B3674] border-gray-100 focus:border-[#4318FF] transition-all bg-white">
                  <option>Documentation Version</option>
                  <option>v1.0</option>
                  <option>v2.0</option>
                </select>
                <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#A3AED0]">
                  <lucide-icon [img]="ChevronDown" class="w-4 h-4"></lucide-icon>
                </div>
              </div>
            </div>

            <!-- Select API -->
            <div class="flex flex-col gap-1.5 relative group">
              <label class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-wide ml-1">Select API<span class="text-red-500">*</span></label>
              <div class="relative">
                <select class="glass-input pl-4 pr-10 py-3 w-full appearance-none cursor-pointer font-bold text-[#2B3674] border-gray-100 focus:border-[#4318FF] transition-all bg-white">
                  <option>Select API</option>
                  <option>Quotation API</option>
                  <option>Customer Sync</option>
                </select>
                <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#A3AED0]">
                  <lucide-icon [img]="ChevronDown" class="w-4 h-4"></lucide-icon>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100/50">
            <button class="px-10 py-2.5 rounded-xl bg-[#2B3674] text-white font-bold text-sm hover:bg-[#1B2559] transition-all shadow-lg shadow-[#2B3674]/20 flex items-center gap-2">
              <lucide-icon [img]="CheckCircle2" class="w-4 h-4"></lucide-icon>
              Submit Mappings
            </button>
          </div>
        </div>

        <!-- Result Area with Toolbars -->
        <div class="flex-1 flex flex-col relative min-h-[400px]">
          <!-- Results Toolbar -->
          <div class="p-6 border-b border-gray-100/50 flex flex-col md:flex-row justify-between items-center gap-4">
             <div class="flex items-center gap-3">
                <div class="relative w-full md:w-80">
                  <lucide-icon [img]="Search" class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A3AED0]"></lucide-icon>
                  <input type="text" placeholder="Search version mappings..." class="glass-input pl-9 pr-4 py-2 w-full text-xs font-bold text-[#2B3674]">
                </div>
             </div>
             <div class="flex items-center gap-2">
                <button class="p-2.5 bg-white rounded-xl border border-gray-100 text-[#A3AED0] hover:text-[#4318FF] transition-all shadow-sm transform hover:scale-105" title="Filter"><lucide-icon [img]="Filter" class="w-4 h-4"></lucide-icon></button>
                <button class="p-2.5 bg-white rounded-xl border border-gray-100 text-[#A3AED0] hover:text-[#4318FF] transition-all shadow-sm transform hover:scale-105" title="Download"><lucide-icon [img]="Download" class="w-4 h-4"></lucide-icon></button>
                <button class="p-2.5 bg-white rounded-xl border border-gray-100 text-[#A3AED0] hover:text-[#4318FF] transition-all shadow-sm transform hover:scale-105" title="Documentation"><lucide-icon [img]="Globe" class="w-4 h-4"></lucide-icon></button>
                <button class="p-2.5 bg-white rounded-xl border border-gray-100 text-[#A3AED0] hover:text-[#4318FF] transition-all shadow-sm transform hover:scale-105" title="Export JSON"><lucide-icon [img]="FileJson" class="w-4 h-4"></lucide-icon></button>
             </div>
          </div>

          <!-- Empty State -->
          <div class="flex-1 flex flex-col items-center justify-center p-12">
             <div class="relative mb-6 scale-90">
                <div class="absolute inset-0 bg-[#05CD99]/5 blur-2xl rounded-full"></div>
                <div class="relative w-24 h-24 rounded-[2rem] bg-white/50 backdrop-blur-sm border border-white/80 shadow-glass flex items-center justify-center">
                   <lucide-icon [img]="Settings2" class="w-10 h-10 text-[#A3AED0]"></lucide-icon>
                </div>
                <!-- Small status dots -->
                <div class="absolute -top-1 -right-1 w-4 h-4 bg-[#05CD99] rounded-full border-2 border-white"></div>
                <div class="absolute bottom-2 -left-2 w-3 h-3 bg-[#4318FF] rounded-full border-2 border-white"></div>
             </div>
             
             <h4 class="text-lg font-bold text-[#2B3674]">No API mappings found</h4>
             <p class="text-sm font-medium text-[#A3AED0] mt-1 max-w-[320px] text-center">
               Please select your LOB, Process Flow and Version above to view or update documentation mappings.
             </p>
          </div>
          
          <!-- Subtle Gradient Bottom -->
          <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50/50 to-transparent pointer-events-none"></div>
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
