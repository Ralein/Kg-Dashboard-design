import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ChevronDown, CheckCircle2, Search, Filter, Download, Plus, Settings2, Globe, FileJson, Maximize2, Eye, PlusCircle, StopCircle, Edit3, Trash2, Zap, LayoutGrid, ClipboardList } from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-api-versioning',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="flex flex-col gap-0 animate-page-in relative">
      
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <!-- CREATE ENDPOINT MODAL                                          -->
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <div *ngIf="isModalOpen()" class="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div class="absolute inset-0 bg-[#0C0F2E]/60 backdrop-blur-sm" (click)="closeModal()"></div>
        
        <div class="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl shadow-black/20 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
          <!-- Modal Header -->
          <div class="px-8 py-6 bg-[#f8faff] border-b border-gray-100/50 flex items-center justify-between">
            <h2 class="text-xl font-black text-[#2B3674] tracking-tight">Create API Endpoint</h2>
            <button (click)="closeModal()" class="w-8 h-8 rounded-full hover:bg-gray-200/50 flex items-center justify-center text-[#A3AED0] transition-colors">
              <lucide-icon [img]="Plus" class="w-5 h-5 rotate-45"></lucide-icon>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-8 flex flex-col gap-6">
            <div class="flex flex-col gap-2">
              <label class="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest ml-1">Process Flow</label>
              <div class="relative">
                <select class="premium-select">
                  <option>Insurance Data Sharing</option>
                  <option>Insurance Quotation</option>
                </select>
                <lucide-icon [img]="ChevronDown" class="select-chevron"></lucide-icon>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest ml-1">API Endpoint Name</label>
              <input type="text" placeholder="e.g. /home-insurance-policies" class="premium-input-field">
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest ml-1">Documentation Version</label>
              <input type="text" placeholder="e.g. v8" class="premium-input-field">
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="px-8 py-6 bg-gray-50/50 flex justify-end gap-3 border-t border-gray-100/50">
            <button (click)="closeModal()" class="px-6 py-2.5 rounded-xl border border-gray-200 text-[#2B3674] text-xs font-black uppercase tracking-widest hover:bg-white hover:border-[#2B3674]/20 transition-all">
              Cancel
            </button>
            <button (click)="createEndpoint()" class="px-8 py-2.5 rounded-xl bg-[#2B3674] text-white text-xs font-black uppercase tracking-widest hover:bg-[#4318FF] transition-all shadow-lg shadow-[#2B3674]/20">
              OK
            </button>
          </div>
        </div>
      </div>

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
              <button (click)="openModal()" class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-all border border-white/10">
                <lucide-icon [img]="Plus" class="w-4 h-4"></lucide-icon>
                <span>Create Endpoint</span>
              </button>
            </div>
          </div>

          <!-- Hero Bottom Tabs -->
          <div class="flex items-center gap-8 px-8 border-b border-white/10">
            <button 
              (click)="activeTab.set('endpoints')"
              class="relative py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300"
              [class.text-white]="activeTab() === 'endpoints'"
              [class.text-white/40]="activeTab() !== 'endpoints'"
            >
              <span class="flex items-center gap-2">
                <lucide-icon [img]="LayoutGrid" class="w-4 h-4"></lucide-icon>
                Endpoints Management
              </span>
              <div 
                *ngIf="activeTab() === 'endpoints'" 
                class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4318FF] to-[#8B5CF6] rounded-t-full"
              ></div>
            </button>
            
            <button 
              (click)="activeTab.set('drafts')"
              class="relative py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300"
              [class.text-white]="activeTab() === 'drafts'"
              [class.text-white/40]="activeTab() !== 'drafts'"
            >
              <span class="flex items-center gap-2">
                <lucide-icon [img]="ClipboardList" class="w-4 h-4"></lucide-icon>
                Draft Mappings
              </span>
              <div 
                *ngIf="activeTab() === 'drafts'" 
                class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4318FF] to-[#8B5CF6] rounded-t-full"
              ></div>
            </button>
          </div>
        </div>
      </div>

      <div *ngIf="activeTab() === 'endpoints'" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
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
              <button (click)="submitMappings()" class="premium-submit-btn">
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
                <span class="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">{{ showResults() ? '2 results matched' : '0 results matched' }}</span>
             </div>
             <div class="flex items-center gap-2">
                <button (click)="toggleFilter()" class="toolbar-btn" title="Filter"><lucide-icon [img]="Filter" class="w-4 h-4"></lucide-icon></button>
                <button (click)="exportData()" class="toolbar-btn" title="Export CSV"><lucide-icon [img]="Download" class="w-4 h-4"></lucide-icon></button>
                <button class="toolbar-btn" title="Documentation"><lucide-icon [img]="Globe" class="w-4 h-4"></lucide-icon></button>
                <button class="toolbar-btn" title="Export JSON"><lucide-icon [img]="FileJson" class="w-4 h-4"></lucide-icon></button>
             </div>
          </div>

          <!-- Results List -->
          <div *ngIf="showResults()" class="flex-1 overflow-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
             <table class="w-full text-left border-collapse">
                <thead>
                   <tr class="bg-gray-50/50 border-b border-gray-100">
                      <th class="px-6 py-4 text-[10px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">API Name</th>
                      <th class="px-6 py-4 text-[10px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">Doc Version</th>
                      <th class="px-6 py-4 text-[10px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">API Version</th>
                      <th class="px-6 py-4 text-[10px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">Release Date</th>
                      <th class="px-6 py-4 text-[10px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">Status</th>
                      <th class="px-6 py-4 text-[10px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">Actions</th>
                   </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                   <tr *ngFor="let api of apiEndpoints" class="hover:bg-[#4318FF]/[0.02] transition-all group">
                      <td class="px-6 py-5">
                         <div class="flex flex-col">
                            <span class="text-sm font-black text-[#2B3674] tracking-tight">{{ api.name }}</span>
                            <span class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-widest mt-0.5">{{ api.lob }} / {{ api.process }}</span>
                         </div>
                      </td>
                      <td class="px-6 py-5">
                         <span class="px-2 py-1 rounded-md bg-gray-100 text-[#2B3674] text-[10px] font-black uppercase tracking-widest">{{ api.docVersion }}</span>
                      </td>
                      <td class="px-6 py-5 text-xs font-bold text-[#2B3674]">{{ api.apiVersion }}</td>
                      <td class="px-6 py-5 text-xs font-bold text-[#A3AED0]">{{ api.releaseDate }}</td>
                      <td class="px-6 py-5">
                         <span [class]="'px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ' + api.statusClass">
                            {{ api.status }}
                         </span>
                      </td>
                      <td class="px-6 py-5">
                         <div class="flex items-center gap-2">
                            <button (click)="viewTransformation(api.id)" class="action-btn action-btn--view" title="View Transformation">
                               <lucide-icon [img]="Eye" class="w-3.5 h-3.5"></lucide-icon>
                               <span>View</span>
                            </button>
                            <button class="action-btn action-btn--secondary" title="Create Version">
                               <lucide-icon [img]="PlusCircle" class="w-3.5 h-3.5"></lucide-icon>
                            </button>
                            <button class="action-btn action-btn--danger" title="Deprecate">
                               <lucide-icon [img]="StopCircle" class="w-3.5 h-3.5"></lucide-icon>
                            </button>
                         </div>
                      </td>
                   </tr>
                </tbody>
             </table>
          </div>

          <!-- Empty State -->
          <div *ngIf="!showResults()" class="flex-1 flex flex-col items-center justify-center p-16">
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

      <!-- ── DRAFTS TAB content ── -->
      <div *ngIf="activeTab() === 'drafts'" class="px-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div class="premium-glass p-12 text-center">
          <div class="w-20 h-20 rounded-full bg-[#4318FF]/5 flex items-center justify-center mx-auto mb-6">
            <lucide-icon [img]="ClipboardList" class="w-8 h-8 text-[#4318FF]"></lucide-icon>
          </div>
          <h3 class="text-xl font-black text-[#2B3674] tracking-tight mb-2">Draft Mappings Explorer</h3>
          <p class="text-sm font-medium text-[#A3AED0] max-w-sm mx-auto">
            You currently have no draft mappings. Any unsaved transformation logic will appear here for later review and deployment.
          </p>
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

    .premium-input-field {
      width: 100%; padding: 12px 16px; border-radius: 14px;
      border: 1px solid #E2E8F0; background: #F8FAFF;
      font-size: 13px; font-weight: 700; color: #2B3674;
      transition: all 0.2s;
    }
    .premium-input-field:focus { border-color: #4318FF; background: white; outline: none; box-shadow: 0 0 0 4px rgba(67,24,255,0.08); }

    /* ── Action Buttons ── */
    .action-btn {
       padding: 6px 12px; border-radius: 10px; font-size: 11px; font-weight: 800;
       display: flex; align-items: center; gap: 6px; transition: all 0.2s;
       border: 1px solid transparent;
    }
    .action-btn--view { background: #f0f7ff; color: #4318FF; border-color: rgba(67,24,255,0.1); }
    .action-btn--view:hover { background: #4318FF; color: white; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(67,24,255,0.2); }
    
    .action-btn--secondary { background: #f8faff; color: #A3AED0; border-color: #E2E8F0; }
    .action-btn--secondary:hover { background: white; color: #2B3674; border-color: #2B3674; }
    
    .action-btn--danger { background: #fff5f5; color: #E31A1A; border-color: rgba(227,26,26,0.1); }
    .action-btn--danger:hover { background: #E31A1A; color: white; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(227,26,26,0.2); }

    /* ── Page Entrance ── */
    .animate-page-in { animation: pageIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    @keyframes pageIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ApiVersioningComponent {
  private router = inject(Router);

  activeTab = signal('endpoints');
  showResults = signal(false);
  isModalOpen = signal(false);

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
  readonly Eye = Eye;
  readonly PlusCircle = PlusCircle;
  readonly StopCircle = StopCircle;
  readonly Edit3 = Edit3;
  readonly Trash2 = Trash2;
  readonly Zap = Zap;
  readonly LayoutGrid = LayoutGrid;
  readonly ClipboardList = ClipboardList;

  apiEndpoints = [
    {
      id: 'ep-1', name: '/home-insurance-policies/{InsurancePolicyId}',
      lob: 'HOME', process: 'Insurance Data Sharing',
      docVersion: 'v8', apiVersion: 'v2.0', releaseDate: '04/02/2026',
      status: 'Configured', statusClass: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      id: 'ep-2', name: '/home-insurance-policies',
      lob: 'HOME', process: 'Insurance Quotation',
      docVersion: 'v8', apiVersion: 'v1.0', releaseDate: '02/12/2025',
      status: 'In Progress', statusClass: 'bg-amber-50 text-amber-600 border-amber-100',
    }
  ];

  submitMappings(): void {
    this.showResults.set(true);
  }

  viewTransformation(id: string): void {
    this.router.navigate(['/api-versioning', id, 'transformation']);
  }

  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  createEndpoint(): void {
    this.isModalOpen.set(false);
    this.showResults.set(true);
  }

  toggleFilter(): void {
    console.log('Filter toggled');
  }

  exportData(): void {
    alert('Exporting API mapping data...');
    console.log('Exporting data...');
  }
}
