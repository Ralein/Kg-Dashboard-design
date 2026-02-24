import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ChevronDown, CheckCircle2, Search, Filter, Download, Plus, Settings2, Globe, FileJson, Maximize2, Eye, PlusCircle, StopCircle, Edit3, Trash2, Zap, LayoutGrid, ClipboardList, ChevronRight, Database, Layers, Clock, Info } from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-api-versioning',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="flex flex-col gap-0 animate-page-in relative pb-8">
      
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <!-- CREATE ENDPOINT MODAL                                          -->
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <div *ngIf="isModalOpen()" class="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div class="absolute inset-0 bg-[#0C0F2E]/60 backdrop-blur-sm" (click)="closeModal()"></div>
        
        <div class="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl shadow-black/20 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
          <div class="px-8 py-6 bg-[#f8faff] border-b border-gray-100/50 flex items-center justify-between">
            <h2 class="text-xl font-black text-[#2B3674] tracking-tight">Create API Endpoint</h2>
            <button (click)="closeModal()" class="w-8 h-8 rounded-full hover:bg-gray-200/50 flex items-center justify-center text-[#A3AED0] transition-colors">
              <lucide-icon [img]="Plus" class="w-5 h-5 rotate-45"></lucide-icon>
            </button>
          </div>

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
      <!-- METADATA CARDS ROW                                             -->
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 px-8">
        <div class="meta-card">
          <lucide-icon [img]="Globe" class="w-4 h-4 text-[#4318FF] mb-3"></lucide-icon>
          <span class="meta-label">Domain</span>
          <span class="meta-value">Insurance</span>
        </div>
        <div class="meta-card">
          <lucide-icon [img]="Zap" class="w-4 h-4 text-[#05CD99] mb-3"></lucide-icon>
          <span class="meta-label">Environment</span>
          <span class="meta-value uppercase">Production</span>
        </div>
        <div class="meta-card">
          <lucide-icon [img]="Clock" class="w-4 h-4 text-[#FF8F0C] mb-3"></lucide-icon>
          <span class="meta-label">Uptime</span>
          <span class="meta-value">99.9%</span>
        </div>
        <div class="meta-card">
          <lucide-icon [img]="Database" class="w-4 h-4 text-emerald-400 mb-3"></lucide-icon>
          <span class="meta-label">DB Sync</span>
          <span class="meta-value">Stable</span>
        </div>
        <div class="meta-card">
          <lucide-icon [img]="Layers" class="w-4 h-4 text-indigo-400 mb-3"></lucide-icon>
          <span class="meta-label">Total APIs</span>
          <span class="meta-value">128</span>
        </div>
        <div class="meta-card border-[#4318FF]/20 shadow-lg shadow-[#4318FF]/5">
          <lucide-icon [img]="Info" class="w-4 h-4 text-[#4318FF] mb-3"></lucide-icon>
          <span class="meta-label">Region</span>
          <span class="meta-value text-[#4318FF]">UAE-NORTH</span>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════════════════════════ -->
      <!-- MAIN LAYOUT GRID                                               -->
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 px-8">
        
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

              <button 
                (click)="activeTab.set('drafts')"
                class="w-full text-left px-5 py-4 rounded-xl text-xs font-bold transition-all flex items-center justify-between group"
                [class.bg-[#4318FF]]="activeTab() === 'drafts'"
                [class.text-white]="activeTab() === 'drafts'"
                [class.shadow-xl]="activeTab() === 'drafts'"
                [class.shadow-[#4318FF]/20]="activeTab() === 'drafts'"
                [class.text-[#A3AED0]]="activeTab() !== 'drafts'"
                [class.hover:bg-[#4318FF]/5]="activeTab() !== 'drafts'"
                [class.hover:text-[#4318FF]]="activeTab() !== 'drafts'"
              >
                <div class="flex items-center gap-3">
                   <lucide-icon [img]="ClipboardList" class="w-4 h-4" [class.text-[#4318FF]]="activeTab() !== 'drafts'"></lucide-icon>
                   Draft Explorer
                </div>
                <lucide-icon [img]="ChevronRight" class="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" [class.opacity-100]="activeTab() === 'drafts'"></lucide-icon>
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

                <div class="flex justify-end mt-8">
                  <button (click)="submitMappings()" class="premium-submit-btn">
                    <lucide-icon [img]="CheckCircle2" class="w-4 h-4"></lucide-icon>
                    <span>Submit Mappings</span>
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
                    <span class="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest">{{ showResults() ? '2 results matched' : '0 results matched' }}</span>
                 </div>
                 <div class="flex items-center gap-2">
                    <button (click)="toggleFilter()" class="toolbar-btn" title="Filter"><lucide-icon [img]="Filter" class="w-4 h-4"></lucide-icon></button>
                    <button (click)="exportData()" class="toolbar-btn" title="Export CSV"><lucide-icon [img]="Download" class="w-4 h-4"></lucide-icon></button>
                    <button class="toolbar-btn" title="Documentation"><lucide-icon [img]="Globe" class="w-4 h-4"></lucide-icon></button>
                    <button class="toolbar-btn" title="Export JSON"><lucide-icon [img]="FileJson" class="w-4 h-4"></lucide-icon></button>
                 </div>
              </div>

              <div *ngIf="showResults()" class="flex-1 overflow-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <table class="w-full text-left">
                    <thead>
                       <tr class="bg-gray-50/50 border-b border-gray-100">
                          <th class="px-6 py-4 text-[10px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">API Name</th>
                          <th class="px-6 py-4 text-[10px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">Doc Version</th>
                          <th class="px-6 py-4 text-[10px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">API Version</th>
                          <th class="px-6 py-4 text-[10px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">Status</th>
                          <th class="px-6 py-4 text-[10px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">Actions</th>
                       </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                       <tr *ngFor="let api of apiEndpoints" class="hover:bg-[#4318FF]/[0.02] transition-all group">
                          <td class="px-6 py-5">
                             <div class="flex flex-col">
                                <span class="text-sm font-black text-[#2B3674] tracking-tight">{{ api.name }}</span>
                                <span class="text-[10px] font-bold text-[#A3AED0] mt-0.5">{{ api.lob }} / {{ api.process }}</span>
                             </div>
                          </td>
                          <td class="px-6 py-5">
                             <span class="px-2 py-1 rounded-md bg-gray-100 text-[#2B3674] text-[10px] font-black">{{ api.docVersion }}</span>
                          </td>
                          <td class="px-6 py-5 text-xs font-bold text-[#2B3674]">{{ api.apiVersion }}</td>
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
                                <button class="action-btn action-btn--secondary"><lucide-icon [img]="Edit3" class="w-3.5 h-3.5"></lucide-icon></button>
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

          <div *ngIf="activeTab() === 'drafts'" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div class="premium-glass p-20 text-center flex flex-col items-center">
              <div class="w-20 h-20 rounded-3xl bg-[#4318FF]/10 flex items-center justify-center mb-8 border border-[#4318FF]/20 shadow-2xl shadow-[#4318FF]/10">
                <lucide-icon [img]="ClipboardList" class="w-10 h-10 text-[#4318FF]"></lucide-icon>
              </div>
              <h3 class="text-2xl font-black text-[#2B3674] tracking-tight mb-4">Draft Mappings Explorer</h3>
              <p class="text-[#A3AED0] font-medium max-w-md mx-auto leading-relaxed mb-10">
                You currently have no draft mappings. Any unsaved transformation logic will appear here for later review and deployment.
              </p>
              <button class="bg-[#2B3674] text-white px-8 py-4 rounded-2xl font-black text-sm tracking-tight hover:bg-[#1B2559] transition-all shadow-xl shadow-[#2B3674]/20">Sync Drafts</button>
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
       padding: 6px 12px; border-radius: 10px; font-size: 11px; font-weight: 800;
       display: flex; align-items: center; gap: 6px; transition: all 0.2s;
    }
    .action-btn--view { background: #f0f7ff; color: #4318FF; border: 1px solid rgba(67,24,255,0.1); }
    .action-btn--view:hover { background: #4318FF; color: white; }
    .action-btn--secondary { background: #f8faff; color: #A3AED0; border: 1px solid #E2E8F0; }
    .action-btn--secondary:hover { border-color: #2B3674; color: #2B3674; }

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
  readonly ChevronRight = ChevronRight;
  readonly Database = Database;
  readonly Layers = Layers;
  readonly Clock = Clock;
  readonly Info = Info;

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
    console.log('Exporting data...');
  }
}
