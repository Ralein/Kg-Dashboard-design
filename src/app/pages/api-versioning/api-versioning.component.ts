import { Component, signal, OnDestroy, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ChevronDown, CheckCircle2, Search, Filter, Download, Plus, Settings2, Globe, FileJson, Maximize2, Eye, PlusCircle, StopCircle, Edit3, Trash2, Zap, LayoutGrid, ChevronRight, Database, Layers, Clock, Info, Printer, Save, ExternalLink, PlayCircle, EyeOff, XCircle } from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-api-versioning',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="flex flex-col gap-0 animate-page-in relative pb-8">
      
      <!-- Modals are now handled via Body-portal (mountModalOnBody) to ensure full-screen coverage -->

      <!-- ═══════════════════════════════════════════════════════════════ -->
      <!-- PREMIUM HERO BANNER                                            -->
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <div class="hero-banner relative overflow-hidden mb-6">
        <div class="hero-bg absolute inset-0"></div>
        <div class="hero-grid absolute inset-0 opacity-10"></div>
        <div class="hero-orb hero-orb--blue absolute top-[-100px] right-[-50px]"></div>
        <div class="hero-orb hero-orb--indigo absolute bottom-[-50px] left-[10%]"></div>
        
        <div class="relative z-10 px-8 py-8">
          <!-- Breadcrumb & Actions -->
          <div class="flex items-center justify-between mb-8">
            <div class="flex items-center gap-3">
              <div class="flex flex-col">
                <div class="flex items-center gap-2 text-white/40 text-[10px] uppercase font-bold tracking-widest">
                  <span>Administrative</span>
                  <span class="opacity-30">/</span>
                  <span>API Management</span>
                </div>
                <h2 class="text-xl font-black text-white tracking-tight">API Versioning</h2>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <button (click)="openModal()" class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm">
                <lucide-icon [img]="Plus" class="w-4 h-4"></lucide-icon>
                <span>Create Endpoint</span>
              </button>
            </div>
          </div>

          <!-- Hero Identity Section -->
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div class="flex items-start gap-5">
              <div class="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4318FF] to-[#B299FF] flex items-center justify-center border border-white/20 shadow-2xl shadow-[#4318FF]/40 group overflow-hidden relative">
                <div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <div class="premium-shine absolute inset-0 pointer-events-none"></div>
                <lucide-icon [img]="Settings2" class="w-8 h-8 text-white relative z-10"></lucide-icon>
              </div>
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-3">
                  <span class="text-2xl font-black text-white leading-none">System Versioning</span>
                  <span class="px-2.5 py-0.5 rounded-lg bg-[#05CD99] text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#05CD99]/20">Configuration</span>
                </div>
                <p class="text-white/40 text-xs font-medium mt-0.5">Manage and map API endpoints across system versions</p>
              </div>
            </div>

            <!-- ID Quick Display -->
            <div class="hero-stats-strip flex items-stretch gap-0">
              <div class="hero-stat-item px-6 py-3">
                <span class="hero-stat-label">Active Mappings</span>
                <span class="hero-stat-value">24</span>
              </div>
              <div class="hero-stat-divider"></div>
              <div class="hero-stat-item px-6 py-3">
                <span class="hero-stat-label">Base Version</span>
                <span class="hero-stat-value">v8.2.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <!-- ═══════════════════════════════════════════════════════════════ -->
      <!-- MAIN LAYOUT GRID                                               -->
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- Sidebar Navigation -->
        <div class="lg:col-span-3 flex flex-col gap-4">
          <div class="premium-glass p-0 overflow-hidden flex flex-col h-full">
            <div class="p-6 border-b border-gray-100/50 bg-[#F8FAFF]/50 backdrop-blur-sm">
              <h3 class="text-xs font-black text-[#2B3674] uppercase tracking-widest">Version Control</h3>
              <p class="text-[10px] text-[#A3AED0] mt-1 font-bold">Manage your API lifecycle</p>
            </div>
            <div class="p-3 flex flex-col gap-1.5">
              <button 
                (click)="activeTab.set('endpoints')"
                class="w-full text-left px-5 py-4 rounded-xl text-xs font-bold transition-all flex items-center justify-between group"
                [class.bg-[#4318FF]]="activeTab() === 'endpoints'"
                [class.text-white]="activeTab() === 'endpoints'"
                [class.shadow-xl]="activeTab() === 'endpoints'"
                [class.shadow-[#4318FF]/20]="activeTab() === 'endpoints'"
                [class.text-[#A3AED0]]="activeTab() !== 'endpoints'"
                [class.hover:bg-[#4318FF]/5]="activeTab() !== 'endpoints'"
                [class.hover:text-[#4318FF]]="activeTab() !== 'endpoints'"
              >
                <div class="flex items-center gap-3">
                   <lucide-icon [img]="LayoutGrid" class="w-4 h-4" [class.text-[#4318FF]]="activeTab() !== 'endpoints'"></lucide-icon>
                   Endpoints List
                </div>
                <lucide-icon [img]="ChevronRight" class="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" [class.opacity-100]="activeTab() === 'endpoints'"></lucide-icon>
              </button>
            </div>
          </div>
        </div>

        <!-- Main Panel: Content Area -->
        <div class="lg:col-span-9">
          <div *ngIf="activeTab() === 'endpoints'" class="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <!-- Configuration Panel -->
            <div class="premium-glass p-0 overflow-hidden">
              <div class="p-8">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

                <div class="flex justify-end mt-8 gap-4">
                  <button (click)="openModal()" class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#05CD99] text-white text-xs font-black uppercase tracking-widest hover:bg-[#04B484] transition-all shadow-lg shadow-[#05CD99]/20">
                    <lucide-icon [img]="Save" class="w-4 h-4"></lucide-icon>
                    <span>Create API Endpoint</span>
                  </button>
                  <button (click)="submitMappings()" class="premium-submit-btn">
                    <lucide-icon [img]="CheckCircle2" class="w-4 h-4"></lucide-icon>
                    <span>Submit</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Results Explorer -->
            <div class="premium-glass p-0 overflow-hidden min-h-[400px] flex flex-col">
              <div class="p-6 border-b border-gray-100/50 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/30">
                 <div class="flex items-center gap-4">
                    <div class="relative w-full md:w-80">
                      <lucide-icon [img]="Search" class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0]"></lucide-icon>
                      <input type="text" placeholder="Filter version mappings..." class="search-input">
                    </div>
                    <div class="h-6 w-px bg-gray-200"></div>
                    <span class="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">{{ showResults() ? (apiEndpoints.length + ' results matched') : '0 results matched' }}</span>
                 </div>
                 <div class="flex items-center gap-2">
                    <button (click)="toggleFilter()" class="toolbar-btn" title="Filter"><lucide-icon [img]="Filter" class="w-4 h-4"></lucide-icon></button>
                    <button class="toolbar-btn" title="Print"><lucide-icon [img]="Printer" class="w-4 h-4"></lucide-icon></button>
                    <button class="toolbar-btn" title="Save"><lucide-icon [img]="Save" class="w-4 h-4"></lucide-icon></button>
                    <button (click)="exportData()" class="toolbar-btn" title="Export CSV"><lucide-icon [img]="Download" class="w-4 h-4"></lucide-icon></button>
                    <button class="toolbar-btn" title="Expand"><lucide-icon [img]="Maximize2" class="w-4 h-4"></lucide-icon></button>
                 </div>
              </div>

              <div *ngIf="showResults()" class="flex-1 overflow-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <table class="w-full text-left">
                    <thead>
                        <tr class="bg-gray-50/50 border-b border-gray-100">
                          <th class="px-6 py-4 text-[10px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">API Name</th>
                          <th class="px-6 py-4 text-[10px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">Doc Version</th>
                          <th class="px-6 py-4 text-[10px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">API Version</th>
                          <th class="px-6 py-4 text-[10px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">Release Date</th>
                          <th class="px-6 py-4 text-[10px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">Deprecation Date</th>
                          <th class="px-6 py-4 text-[10px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">Configuration Status</th>
                          <th class="px-6 py-4 text-[10px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">Status</th>
                          <th class="px-6 py-4 text-[10px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">Actions</th>
                        </tr>
                     </thead>
                     <tbody class="divide-y divide-gray-100">
                        <tr *ngFor="let api of apiEndpoints" class="hover:bg-[#4318FF]/[0.02] transition-all group">
                           <td class="px-6 py-5">
                              <div class="flex flex-col">
                                 <span class="text-sm font-black text-[#4318FF] hover:underline cursor-pointer group/link">{{ api.name }}</span>
                                 <span class="text-[10px] font-bold text-[#A3AED0] mt-0.5 group-hover:text-[#2B3674] transition-colors">{{ api.lob }} / {{ api.process }}</span>
                              </div>
                           </td>
                           <td class="px-6 py-5">
                              <span class="text-xs font-bold text-[#2B3674]">{{ api.docVersion || '-' }}</span>
                           </td>
                           <td class="px-6 py-5">
                              <span class="text-xs font-bold text-[#2B3674]">{{ api.apiVersion || '-' }}</span>
                           </td>
                           <td class="px-6 py-5 text-xs font-bold text-[#A3AED0]">{{ api.releaseDate || '-' }}</td>
                           <td class="px-6 py-5 text-xs font-bold text-[#A3AED0]">{{ api.deprecationDate || '-' }}</td>
                           <td class="px-6 py-5">
                              <span [class]="'px-3 py-1 rounded-lg text-[10px] font-bold ' + api.configStatusClass">
                                 {{ api.configStatus }}
                              </span>
                           </td>
                           <td class="px-6 py-5">
                              <div class="flex items-center gap-2">
                                 <span [class]="'w-1.5 h-1.5 rounded-full ' + (api.status === 'Live' ? 'bg-emerald-400' : 'bg-blue-400')"></span>
                                 <span [class]="'px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-[#2B3674] border ' + api.statusClass">
                                    {{ api.status }}
                                 </span>
                              </div>
                           </td>
                           <td class="px-6 py-5">
                              <div class="flex items-center gap-2">
                                 <ng-container *ngIf="api.configStatus === 'Configured'">
                                   <button (click)="viewTransformation(api.id)" class="action-btn action-btn--view" title="View Transformation">
                                     <lucide-icon [img]="Eye" class="w-3.5 h-3.5"></lucide-icon>
                                     <span>View</span>
                                   </button>
                                   <button (click)="createVersion(api)" class="action-btn action-btn--secondary" title="Create Version">
                                     <lucide-icon [img]="PlusCircle" class="w-3.5 h-3.5"></lucide-icon>
                                     <span>Create Version</span>
                                   </button>
                                   <button class="px-3 py-2 rounded-lg border border-red-100 text-red-400 hover:bg-red-50 transition-all flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest" title="Deprecate">
                                     <lucide-icon [img]="XCircle" class="w-3.5 h-3.5"></lucide-icon>
                                     <span>Deprecate</span>
                                   </button>
                                 </ng-container>
                                 
                                 <ng-container *ngIf="api.configStatus !== 'Configured'">
                                   <button (click)="viewTransformation(api.id)" class="action-btn action-btn--secondary" title="Edit">
                                     <lucide-icon [img]="Edit3" class="w-3.5 h-3.5"></lucide-icon>
                                     <span>Edit</span>
                                   </button>
                                   <button (click)="deleteVersion(api)" class="px-3 py-2 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-all flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest" title="Delete">
                                     <lucide-icon [img]="Trash2" class="w-3.5 h-3.5"></lucide-icon>
                                     <span>Delete</span>
                                   </button>
                                   <button class="px-3 py-2 rounded-lg border border-emerald-100 text-emerald-500 hover:bg-emerald-50 transition-all flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest" title="Go Live">
                                     <lucide-icon [img]="Zap" class="w-3.5 h-3.5"></lucide-icon>
                                     <span>Go Live</span>
                                   </button>
                                 </ng-container>
                              </div>
                           </td>
                       </tr>
                    </tbody>
                 </table>
              </div>

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
                   Select your Line of Business and Process Flow above to begin auditing version mappings.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; --brand-primary: #4318FF; }

    /* Hero Banner */
    .hero-banner {
      border-radius: 24px;
      box-shadow: 0 20px 50px rgba(67, 24, 255, 0.15), 0 0 0 1px rgba(255,255,255,0.05) inset;
    }
    .hero-bg { background: linear-gradient(145deg, #0C0F2E 0%, #141836 60%, #0E1428 100%); }
    .hero-grid {
      background-image: 
        radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 20px 20px, 100px 100px, 100px 100px;
    }
    .hero-orb {
      width: 300px; height: 300px;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
    }
    .hero-orb--blue { background: rgba(67, 24, 255, 0.3); }
    .hero-orb--indigo { background: rgba(139, 92, 246, 0.2); }

    .hero-stats-strip {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      backdrop-filter: blur(10px);
    }
    .hero-stat-item { display: flex; flex-direction: column; }
    .hero-stat-label { font-size: 9px; font-weight: 700; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.1em; }
    .hero-stat-value { font-size: 13px; font-weight: 800; color: white; }
    .hero-stat-divider { width: 1px; background: rgba(255,255,255,0.08); margin: 8px 0; }

    /* Meta Cards */
    .meta-card {
      background: white;
      border: 1px solid rgba(163, 174, 208, 0.15);
      border-radius: 16px;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      transition: all 0.3s cubic-bezier(0.2, 1, 0.2, 1);
    }
    .meta-card:hover { transform: translateY(-5px); box-shadow: 0 25px 50px rgba(112, 144, 176, 0.12); border-color: var(--brand-primary); }
    .meta-label { font-size: 10px; font-weight: 800; color: #A3AED0; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.25rem; }
    .meta-value { font-size: 13px; font-weight: 900; color: #2B3674; }

    .premium-glass {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(163, 174, 208, 0.15);
      border-radius: 24px;
      box-shadow: 0 12px 40px rgba(112, 144, 176, 0.08);
    }

    /* Form Controls */
    .premium-select {
      width: 100%; padding: 12px 16px; border-radius: 14px;
      border: 1px solid #E2E8F0; background: #F8FAFF;
      font-size: 13px; font-weight: 800; color: #2B3674;
      appearance: none; cursor: pointer; transition: all 0.2s;
    }
    .premium-select:focus { border-color: #4318FF; background: white; outline: none; box-shadow: 0 0 0 4px rgba(67,24,255,0.08); }
    .select-chevron { position: absolute; right: 14px; top: 12px; width: 14px; height: 14px; color: #A3AED0; pointer-events: none; }

    .premium-submit-btn {
      padding: 12px 32px; border-radius: 14px;
      background: #2B3674; color: white;
      font-size: 13px; font-weight: 900;
      display: flex; align-items: center; gap: 8px;
      transition: all 0.3s;
      box-shadow: 0 8px 16px rgba(43,54,116,0.2);
    }
    .premium-submit-btn:hover { background: #1B2559; transform: translateY(-2px); }

    .search-input {
      width: 100%; padding: 10px 16px 10px 42px; border-radius: 12px;
      border: 1.5px solid #E2E8F0; background: white;
      font-size: 13px; font-weight: 700; color: #2B3674;
      transition: all 0.2s;
    }
    .search-input:focus { border-color: #4318FF; outline: none; box-shadow: 0 4px 12px rgba(67,24,255,0.06); }

    .toolbar-btn {
      width: 38px; height: 38px; border-radius: 12px;
      border: 1px solid #E2E8F0; background: white;
      color: #A3AED0; display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
    }
    .toolbar-btn:hover { background: #F8FAFF; color: #4318FF; border-color: rgba(67,24,255,0.2); }

    .premium-input-field {
      width: 100%; padding: 12px 16px; border-radius: 14px;
      border: 1px solid #E2E8F0; background: #F8FAFF;
      font-size: 13px; font-weight: 700; color: #2B3674;
      transition: all 0.2s;
    }
    .premium-input-field:focus { border-color: #4318FF; background: white; outline: none; }

    /* Action Buttons */
    .action-btn {
       padding: 5px 12px; border-radius: 8px; font-size: 10px; font-weight: 800;
       display: flex; align-items: center; gap: 6px; transition: all 0.2s;
       text-transform: uppercase; letter-spacing: 0.05em;
    }
    .action-btn--view { 
      background: white; color: #4318FF; border: 1px solid rgba(67,24,255,0.2); 
    }
    .action-btn--view:hover { 
      background: #4318FF; color: white; border-color: #4318FF;
    }
    .action-btn--secondary { 
      background: white; color: #2B3674; border: 1px solid #E2E8F0; 
    }
    .action-btn--secondary:hover { 
      border-color: #2B3674; background: #F8FAFF;
    }

    /* Empty State */
    .empty-3d-icon { position: relative; width: 80px; height: 80px; }
    .icon-inner {
      position: relative; z-index: 2; width: 100%; height: 100%;
      background: white; border-radius: 20px; border: 1px solid #E2E8F0;
      display: flex; align-items: center; justify-content: center;
    }
    .icon-orbit {
       position: absolute; border: 1.5px dashed #A3AED030; border-radius: 50%;
       animation: rotate 20s linear infinite;
    }
    .icon-orbit--1 { inset: -15px; animation-duration: 15s; }
    .icon-orbit--2 { inset: -30px; animation-duration: 25s; reverse: true; }
    @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    /* Page Entrance */
    .animate-page-in {
      animation: pageIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    @keyframes pageIn {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ApiVersioningComponent implements OnDestroy {
  private router = inject(Router);
  private renderer = inject(Renderer2);

  activeTab = signal('endpoints');
  showResults = signal(false);

  // Modal tracking
  private modalEl: HTMLElement | null = null;
  private backdropListener: (() => void) | null = null;

  toastMessage = signal('');
  selectedApi: any = null;

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
  readonly ChevronRight = ChevronRight;
  readonly Database = Database;
  readonly Layers = Layers;
  readonly Clock = Clock;
  readonly Info = Info;
  readonly Printer = Printer;
  readonly Save = Save;
  readonly ExternalLink = ExternalLink;
  readonly PlayCircle = PlayCircle;
  readonly EyeOff = EyeOff;
  readonly XCircle = XCircle;

  apiEndpoints = [
    {
      id: 'ep-0', name: '/home-insurance-policies/{InsurancePolicyId}',
      lob: 'HOME', process: 'Insurance Data Sharing',
      docVersion: 'v8', apiVersion: 'v3.0', releaseDate: '25/02/2026', deprecationDate: '-',
      configStatus: 'Yet to Configure', configStatusClass: 'bg-gray-100 text-gray-600',
      status: 'In Migration', statusClass: 'bg-blue-50 border-blue-100',
    },
    {
      id: 'ep-1', name: '/home-insurance-policies/{InsurancePolicyId}',
      lob: 'HOME', process: 'Insurance Data Sharing',
      docVersion: 'v8', apiVersion: 'v2.0', releaseDate: '04/02/2026', deprecationDate: '-',
      configStatus: 'Configured', configStatusClass: 'bg-[#05CD99]/10 text-[#05CD99]',
      status: 'Live', statusClass: 'bg-emerald-50 border-emerald-100',
    },
    {
      id: 'ep-2', name: '/home-insurance-policies/{InsurancePolicyId}',
      lob: 'HOME', process: 'Insurance Data Sharing',
      docVersion: 'v8', apiVersion: 'v1.0', releaseDate: '02/12/2025', deprecationDate: '-',
      configStatus: 'In Progress', configStatusClass: 'bg-amber-100 text-amber-600',
      status: 'In Migration', statusClass: 'bg-blue-50 border-blue-100',
    }
  ];

  submitMappings(): void {
    this.showResults.set(true);
  }

  viewTransformation(id: string): void {
    this.router.navigate(['/api-versioning', id, 'transformation']);
  }

  openModal(): void {
    this.mountConfirmationModal({
      title: 'Create API Endpoint',
      message: 'This will navigate you to the designer to create a new endpoint definition.',
      confirmLabel: 'Proceed',
      accent: '#4318FF',
      callback: () => this.createEndpoint()
    });
  }

  closeModal(): void {
    this.unmountModal();
  }

  createEndpoint(): void {
    this.unmountModal();
    this.showResults.set(true);
    this.showToast('Designer initialized');
  }

  createVersion(api: any): void {
    this.selectedApi = api;
    this.mountConfirmationModal({
      title: 'Create New Version',
      message: `A new version will be created for <strong>${api.name}</strong>.`,
      confirmLabel: 'Create Version',
      accent: '#05CD99',
      callback: () => this.confirmCreateVersion()
    });
  }

  confirmCreateVersion(): void {
    this.unmountModal();
    this.showToast('Version v3.0 created successfully');
  }

  deleteVersion(api: any): void {
    this.selectedApi = api;
    this.mountConfirmationModal({
      title: 'Confirm Deletion',
      message: `Are you sure you want to delete the version of <strong>${api.name}</strong>?`,
      confirmLabel: 'Delete',
      accent: '#FF5252',
      isDelete: true,
      callback: () => this.confirmDelete()
    });
  }

  confirmDelete(): void {
    this.unmountModal();
    this.apiEndpoints = this.apiEndpoints.filter(a => a.id !== this.selectedApi.id);
    this.showToast('Version deleted successfully');
  }

  showToast(message: string): void {
    this.unmountToast();
    this.toastMessage.set(message);
    this.mountToastOnBody(message);
    setTimeout(() => this.unmountToast(), 3000);
  }

  // ─── Body-portal Modals ───────────────────────────────────────────────────

  private mountConfirmationModal(config: {
    title: string,
    message: string,
    confirmLabel: string,
    accent: string,
    isDelete?: boolean,
    callback: () => void
  }): void {
    this.unmountModal();

    const overlay = document.createElement('div');
    overlay.setAttribute('id', 'api-portal-overlay');

    const accentLight = config.accent + '20';
    const accentShadow = config.accent + '40';

    overlay.innerHTML = `
      <style>
        #api-portal-overlay {
          position: fixed; inset: 0; z-index: 99999;
          display: flex; align-items: center; justify-content: center; padding: 1rem;
          background: rgba(11, 14, 40, 0.4);
          backdrop-filter: blur(8px) saturate(180%);
          -webkit-backdrop-filter: blur(8px) saturate(180%);
          animation: apiFade .2s ease-out;
        }
        #api-portal-box {
          background: #fff; border-radius: 24px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.18);
          width: 100%; max-width: 420px; overflow: hidden;
          animation: apiSlide .3s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes apiFade  { from{opacity:0} to{opacity:1} }
        @keyframes apiSlide { from{opacity:0;transform:translateY(18px) scale(.96)} to{opacity:1;transform:none} }

        #api-ph { padding:20px 24px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center; }
        #api-ph h3 { margin:0; font-size:15px; font-weight:900; color:#2B3674; }
        #api-xbtn { background:none; border:none; cursor:pointer; padding:6px; border-radius:50%; color:#94a3b8; line-height:0; }

        #api-pb { padding:32px 24px; display:flex; flex-direction:column; align-items:center; gap:14px; text-align:center; }
        #api-icon { width:64px; height:64px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:${accentLight}; color:${config.accent}; }
        #api-pb p { margin:0; font-size:14px; font-weight:500; color:#2B3674; line-height:1.6; }
        #api-pb strong { color:#2B3674; font-weight: 800; }

        #api-pf { padding:20px 24px; background:#f8fafc; display:flex; justify-content:center; gap:12px; }
        .api-btn { padding:10px 28px; border-radius:16px; font-weight:700; font-size:13px; cursor:pointer; transition:all .15s; }
        #api-cbtn { border:1.5px solid #e2e8f0; background:#fff; color:#2B3674; }
        #api-okbtn { border:none; background:${config.accent}; color:#fff; box-shadow:0 4px 14px ${accentShadow}; }
        #api-okbtn:hover { transform:translateY(-1px); filter: brightness(1.1); }
      </style>

      <div id="api-portal-box">
        <div id="api-ph">
          <h3>${config.title}</h3>
          <button id="api-xbtn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div id="api-pb">
          <div id="api-icon">
            ${config.isDelete ?
        '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/></svg>' :
        '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>'
      }
          </div>
          <p>${config.message}</p>
        </div>
        <div id="api-pf">
          <button class="api-btn" id="api-cbtn">Cancel</button>
          <button class="api-btn" id="api-okbtn">${config.confirmLabel}</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    this.modalEl = overlay;

    overlay.querySelector('#api-xbtn')!.addEventListener('click', () => this.unmountModal());
    overlay.querySelector('#api-cbtn')!.addEventListener('click', () => this.unmountModal());
    overlay.querySelector('#api-okbtn')!.addEventListener('click', () => config.callback());

    this.backdropListener = this.renderer.listen(overlay, 'click', (e: MouseEvent) => {
      if (e.target === overlay) this.unmountModal();
    });
  }

  private unmountModal(): void {
    this.modalEl?.remove();
    this.modalEl = null;
    this.backdropListener?.();
    this.backdropListener = null;
  }

  // ─── Toast Portal ─────────────────────────────────────────────────────────

  private toastEl: HTMLElement | null = null;

  private mountToastOnBody(message: string): void {
    const toast = document.createElement('div');
    toast.setAttribute('id', 'api-toast-portal');
    toast.innerHTML = `
      <style>
        #api-toast-portal {
          position: fixed; top: 24px; right: 24px; z-index: 100000;
          animation: toastSlide .4s cubic-bezier(0.16,1,0.3,1);
        }
        #api-toast-box {
          background: #0d1b3e; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px; padding: 14px 20px; color: #fff;
          display: flex; align-items: center; gap: 12px;
          box-shadow: 0 20px 48px rgba(0,0,0,0.3);
        }
        @keyframes toastSlide { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:none} }
      </style>
      <div id="api-toast-box">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#05CD99" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <span style="font-size:12px; font-weight:700;">${message}</span>
      </div>
    `;
    document.body.appendChild(toast);
    this.toastEl = toast;
  }

  private unmountToast(): void {
    this.toastEl?.remove();
    this.toastEl = null;
    this.toastMessage.set('');
  }

  toggleFilter(): void { console.log('Filter toggled'); }
  exportData(): void { console.log('Exporting data...'); }

  ngOnDestroy(): void {
    this.unmountModal();
    this.unmountToast();
  }
}
