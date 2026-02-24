import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ChevronDown, CheckCircle2, Search, Filter, Download, Plus, Settings2, Globe, FileJson, Maximize2 } from 'lucide-angular';

@Component({
  selector: 'app-api-versioning',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="flex flex-col gap-0 animate-page-in">
      
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <!-- PREMIUM HERO BANNER                                            -->
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <div class="hero-banner relative overflow-hidden mb-8">
        <div class="hero-bg absolute inset-0"></div>
        <div class="hero-grid absolute inset-0"></div>
        <div class="hero-orb hero-orb--blue"></div>
        <div class="hero-orb hero-orb--teal"></div>
        
        <div class="relative z-10 px-8 py-8">
          <div class="flex items-center justify-between mb-8">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4318FF] to-[#8B5CF6] flex items-center justify-center border border-white/20 shadow-lg shadow-[#4318FF]/20">
                <lucide-icon [img]="Settings2" class="w-6 h-6 text-white"></lucide-icon>
              </div>
              <div class="flex flex-col">
                <div class="flex items-center gap-2">
                  <h1 class="text-2xl font-black text-white tracking-tight">API Versioning</h1>
                  <span class="px-2 py-0.5 rounded-md bg-[#05CD99]/20 border border-[#05CD99]/30 text-[#05CD99] text-[9px] font-black uppercase tracking-widest">Configuration</span>
                </div>
                <p class="text-white/40 text-xs font-medium mt-0.5">Manage and map API endpoints across system versions</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="hero-stats-strip flex items-center gap-6 px-6 py-3 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm">
                <div class="flex flex-col">
                  <span class="text-[9px] font-bold text-white/30 uppercase tracking-widest">Active Mappings</span>
                  <span class="text-white font-black">24</span>
                </div>
                <div class="w-px h-6 bg-white/10"></div>
                <div class="flex flex-col">
                  <span class="text-[9px] font-bold text-white/30 uppercase tracking-widest">Base Version</span>
                  <span class="text-white font-black">v8.2.0</span>
                </div>
              </div>
              <button class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-all border border-white/10">
                <lucide-icon [img]="Plus" class="w-4 h-4"></lucide-icon>
                <span>Create Endpoint</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════════════════════════ -->
      <!-- CONFIGURATION PANEL                                            -->
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <div class="px-4">
        <div class="premium-glass p-0 overflow-hidden mb-8">
          <div class="p-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <!-- LOB Selector -->
              <div class="flex flex-col gap-2 group">
                <label class="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest ml-1">Line of Business</label>
                <div class="relative">
                  <select class="premium-select">
                    <option>MOTOR</option>
                    <option>MEDICAL</option>
                    <option>TRAVEL</option>
                    <option>HOME</option>
                  </select>
                  <lucide-icon [img]="ChevronDown" class="select-chevron"></lucide-icon>
                </div>
              </div>

              <!-- Process Flow -->
              <div class="flex flex-col gap-2 group">
                <label class="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest ml-1">Process Flow</label>
                <div class="relative">
                  <select class="premium-select">
                    <option>Insurance Data Sharing</option>
                    <option>Insurance Quotation</option>
                  </select>
                  <lucide-icon [img]="ChevronDown" class="select-chevron"></lucide-icon>
                </div>
              </div>

              <!-- Version -->
              <div class="flex flex-col gap-2 group">
                <label class="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest ml-1">API Version</label>
                <div class="relative">
                  <select class="premium-select">
                    <option>v7 (Legacy)</option>
                    <option selected>v8 (Current)</option>
                  </select>
                  <lucide-icon [img]="ChevronDown" class="select-chevron"></lucide-icon>
                </div>
              </div>

              <!-- Select API -->
              <div class="flex flex-col gap-2 group">
                <label class="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest ml-1">Target Endpoint</label>
                <div class="relative">
                  <select class="premium-select">
                    <option>/home-insurance-policies</option>
                    <option>/home-insurance-policies/{{ '{' }}InsurancePolicyId{{ '}' }}</option>
                  </select>
                  <lucide-icon [img]="ChevronDown" class="select-chevron"></lucide-icon>
                </div>
              </div>
            </div>

            <div class="flex justify-end mt-8">
              <button class="premium-submit-btn">
                <lucide-icon [img]="CheckCircle2" class="w-4 h-4"></lucide-icon>
                <span>Submit Mappings</span>
              </button>
            </div>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════════════════════════ -->
        <!-- RESULTS EXPLORER                                               -->
        <!-- ═══════════════════════════════════════════════════════════════ -->
        <div class="premium-glass p-0 overflow-hidden min-h-[400px] flex flex-col">
          <div class="p-6 border-b border-gray-100/50 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/30">
             <div class="flex items-center gap-4">
                <div class="relative w-full md:w-80">
                  <lucide-icon [img]="Search" class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0]"></lucide-icon>
                  <input type="text" placeholder="Filter version mappings..." class="search-input">
                </div>
                <div class="h-6 w-px bg-gray-200"></div>
                <span class="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">0 results matched</span>
             </div>
             <div class="flex items-center gap-2">
                <button (click)="toggleFilter()" class="toolbar-btn" title="Filter"><lucide-icon [img]="Filter" class="w-4 h-4"></lucide-icon></button>
                <button (click)="exportData()" class="toolbar-btn" title="Export CSV"><lucide-icon [img]="Download" class="w-4 h-4"></lucide-icon></button>
                <button class="toolbar-btn" title="Documentation"><lucide-icon [img]="Globe" class="w-4 h-4"></lucide-icon></button>
                <button class="toolbar-btn" title="Export JSON"><lucide-icon [img]="FileJson" class="w-4 h-4"></lucide-icon></button>
             </div>
          </div>

          <div class="flex-1 flex flex-col items-center justify-center p-16">
             <div class="empty-3d-icon mb-6">
                <div class="icon-inner">
                   <lucide-icon [img]="Settings2" class="w-10 h-10 text-[#A3AED0]"></lucide-icon>
                </div>
                <div class="icon-orbit icon-orbit--1"></div>
                <div class="icon-orbit icon-orbit--2"></div>
             </div>
             <h4 class="text-lg font-black text-[#2B3674] tracking-tight">Ready to Configure</h4>
             <p class="text-sm font-medium text-[#A3AED0] mt-2 max-w-[340px] text-center leading-relaxed">
               Select your Line of Business and Process Flow above to begin auditing or updating version mappings.
             </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    /* ── Premium Hero Banner ── */
    .hero-banner {
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    }
    .hero-bg { background: linear-gradient(135deg, #0C0F2E 0%, #171C40 100%); }
    .hero-grid {
      background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
      background-size: 24px 24px;
      opacity: 0.5;
    }
    .hero-orb {
      position: absolute; width: 300px; height: 300px;
      border-radius: 50%; filter: blur(70px);
      pointer-events: none; opacity: 0.35;
    }
    .hero-orb--blue { background: #4318FF; top: -100px; right: -50px; }
    .hero-orb--teal { background: #05CD99; bottom: -100px; left: 10%; }

    .hero-stats-strip {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      backdrop-filter: blur(10px);
    }
    
    /* ── Common Premium Styles ── */
    .premium-glass {
      background: white; border: 1px solid rgba(163,174,208,0.2);
      border-radius: 20px; box-shadow: 0 10px 25px rgba(112,144,176,0.08);
    }

    /* ── Selects & Inputs ── */
    .premium-select {
      width: 100%; padding: 12px 16px; border-radius: 14px;
      border: 1px solid #E2E8F0; background: #F8FAFF;
      font-size: 13px; font-weight: 800; color: #2B3674;
      appearance: none; cursor: pointer; transition: all 0.2s;
    }
    .premium-select:focus { border-color: #4318FF; background: white; outline: none; box-shadow: 0 0 0 4px rgba(67,24,255,0.08); }
    .select-chevron { position: absolute; right: 14px; top: 12px; width: 14px; height: 14px; color: #A3AED0; pointer-events: none; }

    .search-input {
      width: 100%; padding: 10px 16px 10px 42px; border-radius: 12px;
      border: 1.5px solid #E2E8F0; background: white;
      font-size: 13px; font-weight: 700; color: #2B3674;
      transition: all 0.2s;
    }
    .search-input:focus { border-color: #4318FF; outline: none; box-shadow: 0 4px 12px rgba(67,24,255,0.06); }

    /* ── Buttons ── */
    .premium-submit-btn {
      padding: 12px 32px; border-radius: 14px;
      background: #2B3674; color: white;
      font-size: 13px; font-weight: 900;
      display: flex; align-items: center; gap: 8px;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      box-shadow: 0 8px 16px rgba(43,54,116,0.2);
    }
    .premium-submit-btn:hover { background: #1B2559; transform: translateY(-2px); box-shadow: 0 12px 20px rgba(43,54,116,0.25); }
    .premium-submit-btn:active { transform: translateY(0); }

    .toolbar-btn {
      width: 38px; height: 38px; border-radius: 12px;
      border: 1px solid #E2E8F0; background: white;
      color: #A3AED0; display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
    }
    .toolbar-btn:hover { background: #F8FAFF; color: #4318FF; border-color: rgba(67,24,255,0.2); transform: scale(1.05); }

    /* ── Empty State ── */
    .empty-3d-icon { position: relative; width: 80px; height: 80px; }
    .icon-inner {
      position: relative; z-index: 2; width: 100%; height: 100%;
      background: white; border-radius: 20px; border: 1px solid #E2E8F0;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 10px 20px rgba(0,0,0,0.05);
    }
    .icon-orbit {
       position: absolute; border: 1.5px dashed #A3AED030; border-radius: 50%;
       animation: rotate 20s linear infinite;
    }
    .icon-orbit--1 { inset: -15px; animation-duration: 15s; }
    .icon-orbit--2 { inset: -30px; animation-duration: 25s; reverse: true; }
    @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    /* ── Page Entrance ── */
    .animate-page-in { animation: pageIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    @keyframes pageIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
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

  toggleFilter(): void {
    console.log('Filter toggled');
  }

  exportData(): void {
    alert('Exporting API mapping data...');
    console.log('Exporting data...');
  }
}
