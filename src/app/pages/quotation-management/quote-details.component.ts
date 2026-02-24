import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import {
   LucideAngularModule,
   ChevronLeft, LayoutGrid, FileJson, FileCode, Printer, Share2, FileSpreadsheet, Plus, Minus,
   Clock, Shield, Activity, Code, Terminal, Copy, Check, History, Globe,
   ChevronDown, ChevronUp, AlertCircle, FileText, User, Database, Layers, ExternalLink, Info,
   Search, ClipboardList, Trash2, Edit, ChevronRight
} from 'lucide-angular';

@Component({
   selector: 'app-quote-details',
   standalone: true,
   imports: [CommonModule, LucideAngularModule, RouterLink],
   template: `
    <div class="flex flex-col gap-0 animate-page-in pb-8">
      
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <!--  PREMIUM HERO BANNER                                            -->
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
              <button routerLink="/quotation-management" class="p-2 bg-white/10 rounded-xl border border-white/20 text-white hover:bg-white/20 transition-all group">
                <lucide-icon [img]="ChevronLeft" class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"></lucide-icon>
              </button>
              <div class="flex flex-col">
                <div class="flex items-center gap-2 text-white/40 text-[10px] uppercase font-bold tracking-widest">
                  <span>Administrative</span>
                  <span class="opacity-30">/</span>
                  <span>Quotation Management</span>
                </div>
                <h2 class="text-xl font-black text-white tracking-tight">Detail View</h2>
              </div>
            </div>
            
          </div>

          <!-- Hero Identity Section -->
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div class="flex items-start gap-5">
              <div class="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4318FF] to-[#B299FF] flex items-center justify-center border border-white/20 shadow-2xl shadow-[#4318FF]/40 group overflow-hidden relative">
                <div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <lucide-icon [img]="FileCode" class="w-8 h-8 text-white relative z-10"></lucide-icon>
              </div>
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-3">
                  <span class="text-2xl font-black text-white leading-none">Quote Configuration</span>
                  <span class="px-2.5 py-0.5 rounded-lg bg-[#05CD99] text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#05CD99]/20">Available</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-2 text-white/60">
                    <lucide-icon [img]="Clock" class="w-3.5 h-3.5"></lucide-icon>
                    <span class="text-xs font-bold uppercase tracking-wider">Created: 24 Feb 2026</span>
                  </div>
                  <div class="w-1 h-1 rounded-full bg-white/20"></div>
                  <div class="flex items-center gap-2 text-white/60">
                    <lucide-icon [img]="Layers" class="w-3.5 h-3.5"></lucide-icon>
                    <span class="text-xs font-bold uppercase tracking-wider">LOB: HOME</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- ID Quick Display -->
            <div class="glass-pill p-3 px-5 flex items-center gap-4 relative">
               <div class="flex flex-col">
                  <span class="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">Quote Identifier</span>
                  <span class="text-xs font-mono font-bold text-white/90">9003XXXXXXXX2611</span>
               </div>
               <button (click)="copyId('9003XXXXXXXX2611')" class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all relative overflow-hidden group/copy">
                  <lucide-icon [img]="idCopied() ? Check : Copy" class="w-3.5 h-3.5"></lucide-icon>
                  <div *ngIf="idCopied()" class="absolute inset-0 bg-emerald-500/20 animate-pulse"></div>
               </button>
               
               <!-- Floating "Copied" Toast -->
               <div *ngIf="idCopied()" class="absolute -top-10 right-0 py-1.5 px-3 bg-white text-[#4318FF] text-[10px] font-black rounded-lg shadow-2xl border border-indigo-50 animate-bounce-in">
                  COPIED!
               </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════════════════════════ -->
      <!-- METADATA CARDS ROW                                             -->
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div class="meta-card">
          <div class="flex justify-between items-start">
            <lucide-icon [img]="Layers" class="w-4 h-4 text-[#4318FF] mb-3"></lucide-icon>
            <button (click)="copyId('9003...2611')" class="text-[#A3AED0] hover:text-[#4318FF] transition-colors"><lucide-icon [img]="Copy" class="w-3 h-3"></lucide-icon></button>
          </div>
          <span class="meta-label">Quote ID</span>
          <span class="meta-value">9003...2611</span>
        </div>
        <div class="meta-card">
          <div class="flex justify-between items-start">
            <lucide-icon [img]="ExternalLink" class="w-4 h-4 text-[#05CD99] mb-3"></lucide-icon>
            <button (click)="copyId('cbuse-home')" class="text-[#A3AED0] hover:text-[#4318FF] transition-colors"><lucide-icon [img]="Copy" class="w-3 h-3"></lucide-icon></button>
          </div>
          <span class="meta-label">Reference</span>
          <span class="meta-value truncate uppercase">cbuse-home</span>
        </div>
        <div class="meta-card">
          <div class="flex justify-between items-start">
            <lucide-icon [img]="User" class="w-4 h-4 text-[#FF8F0C] mb-3"></lucide-icon>
            <button (click)="copyId('ADNIC Insurance')" class="text-[#A3AED0] hover:text-[#4318FF] transition-colors"><lucide-icon [img]="Copy" class="w-3 h-3"></lucide-icon></button>
          </div>
          <span class="meta-label">TPP Name</span>
          <span class="meta-value truncate">ADNIC Insurance</span>
        </div>
        <div class="meta-card">
          <lucide-icon [img]="Shield" class="w-4 h-4 text-emerald-400 mb-3"></lucide-icon>
          <span class="meta-label">Status</span>
          <span class="meta-value">Available</span>
        </div>
        <div class="meta-card">
          <lucide-icon [img]="Info" class="w-4 h-4 text-indigo-400 mb-3"></lucide-icon>
          <span class="meta-label">Channel</span>
          <span class="meta-value">Mobile App</span>
        </div>
        <div class="meta-card border-[#4318FF]/20 shadow-lg shadow-[#4318FF]/5">
          <lucide-icon [img]="Activity" class="w-4 h-4 text-[#4318FF] mb-3"></lucide-icon>
          <span class="meta-label">LOB Type</span>
          <span class="meta-value text-[#4318FF]">HOME</span>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════════════════════════ -->
      <!-- MAIN LAYOUT GRID                                               -->
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- Sidebar Navigation -->
        <div class="lg:col-span-4 flex flex-col gap-4">
          <div class="premium-glass p-0 overflow-hidden flex flex-col h-full">
            <div class="p-6 border-b border-gray-100/50 bg-[#F8FAFF]/50 backdrop-blur-sm">
              <h3 class="text-xs font-black text-[#2B3674] uppercase tracking-widest">Quote Parts</h3>
              <p class="text-[10px] text-[#A3AED0] mt-1 font-bold">Select the JSON component to view</p>
            </div>
            <div class="p-3 flex flex-col gap-1.5">
              <button 
                *ngFor="let part of quoteParts"
                (click)="selectedPart = part.id"
                class="w-full text-left px-5 py-4 rounded-xl text-xs font-bold transition-all flex items-center justify-between group"
                [class.bg-[#4318FF]]="selectedPart === part.id"
                [class.text-white]="selectedPart === part.id"
                [class.shadow-xl]="selectedPart === part.id"
                [class.shadow-[#4318FF]/20]="selectedPart === part.id"
                [class.text-[#A3AED0]]="selectedPart !== part.id"
                [class.hover:bg-[#4318FF]/5]="selectedPart !== part.id"
                [class.hover:text-[#4318FF]]="selectedPart !== part.id"
              >
                <div class="flex items-center gap-3">
                   <lucide-icon [img]="part.icon" class="w-4 h-4" [class.text-[#4318FF]]="selectedPart !== part.id"></lucide-icon>
                   {{part.label}}
                </div>
                <lucide-icon [img]="ChevronRight" class="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" [class.opacity-100]="selectedPart === part.id"></lucide-icon>
              </button>
            </div>
          </div>
        </div>

        <!-- Main Panel: Data Explorer -->
        <div class="lg:col-span-8">
          <div class="premium-glass p-0 overflow-hidden flex flex-col h-full min-h-[600px]">
            <div class="p-6 px-8 bg-[#F8FAFF]/50 backdrop-blur-sm border-b border-gray-100/50 flex justify-between items-center sticky top-0 z-20">
              <div class="flex items-center gap-4">
                 <div class="p-2.5 bg-[#4318FF]/10 rounded-xl text-[#4318FF] border border-[#4318FF]/20 shadow-sm">
                    <lucide-icon [img]="FileCode" class="w-5 h-5"></lucide-icon>
                 </div>
                 <div>
                   <h3 class="text-sm font-black text-[#2B3674] tracking-tight">Review the info of quote</h3>
                   <p class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-widest mt-0.5">Structured data mapping explorer</p>
                 </div>
              </div>
              <button class="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100 shadow-sm active:scale-95 group">
                <lucide-icon [img]="FileSpreadsheet" class="w-5 h-5 group-hover:scale-110 transition-transform"></lucide-icon>
              </button>
            </div>

            <div class="overflow-hidden flex-1 flex flex-col">
              <div class="flex-1 overflow-auto custom-scrollbar">
                <table class="w-full">
                  <thead>
                     <tr class="bg-[#F4F7FE]/30 text-left">
                        <th class="px-8 py-4 text-[10px] font-bold text-[#A3AED0] uppercase tracking-[0.2em]">Field Property</th>
                        <th class="px-8 py-4 text-[10px] font-bold text-[#A3AED0] uppercase tracking-[0.2em]">Value Mapping</th>
                     </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100/40">
                    <ng-container *ngFor="let row of tableData">
                      <tr class="hover:bg-[#F8FAFF] transition-colors group">
                        <td class="px-8 py-4 w-1/2">
                          <div class="flex items-center gap-3">
                            <button 
                              *ngIf="row.isObject"
                              (click)="toggleRow(row.key)"
                              class="w-6 h-6 flex items-center justify-center rounded-lg bg-[#4318FF]/10 text-[#4318FF] hover:bg-[#4318FF] hover:text-white transition-all border border-[#4318FF]/20 shadow-sm"
                            >
                              <lucide-icon [img]="expandedRows().has(row.key) ? Minus : Plus" class="w-3 h-3"></lucide-icon>
                            </button>
                            <span class="text-xs font-bold text-[#2B3674]" [class.pl-9]="!row.isObject">{{ row.key }}</span>
                          </div>
                        </td>
                        <td class="px-8 py-4">
                          <span class="text-xs font-bold text-[#4318FF] bg-[#4318FF]/5 px-2.5 py-1.5 rounded-lg border border-[#4318FF]/10" *ngIf="!row.isObject">{{ row.value }}</span>
                          <span class="text-xs font-black text-[#A3AED0]/60 uppercase tracking-widest" *ngIf="row.isObject">{{ row.value }}</span>
                        </td>
                      </tr>
                      
                      <!-- Expanded Child Rows Mockup -->
                      <tr *ngIf="expandedRows().has(row.key)" class="bg-[#F8FAFF]/40">
                         <td colspan="2" class="p-0">
                            <div class="pl-16 pr-8 py-4 border-l-[3px] border-[#4318FF] space-y-3 animate-slide-down">
                               <div class="flex justify-between items-center text-xs group/item">
                                  <span class="font-bold text-[#A3AED0] flex items-center gap-2">
                                     <div class="w-1.5 h-1.5 rounded-full bg-indigo-300"></div>
                                     subfield_alpha
                                  </span>
                                  <span class="text-[#2B3674] font-black italic">"example_value_from_lob"</span>
                               </div>
                               <div class="flex justify-between items-center text-xs group/item">
                                  <span class="font-bold text-[#A3AED0] flex items-center gap-2">
                                     <div class="w-1.5 h-1.5 rounded-full bg-indigo-300"></div>
                                     mapping_timestamp
                                  </span>
                                  <span class="text-indigo-500 font-black italic">1740401551000</span>
                               </div>
                            </div>
                         </td>
                      </tr>
                    </ng-container>
                  </tbody>
                </table>
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

    .glass-pill {
      background: rgba(255,255,255,0.08);
      backdrop-filter: blur(12px);
      border-radius: 16px;
      border: 1px solid rgba(255,255,255,0.12);
      box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
    }

    /* Meta Cards */
    .meta-card {
      background: white;
      border: 1px solid rgba(163, 174, 208, 0.15);
      border-radius: 20px;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      transition: all 0.3s cubic-bezier(0.2, 1, 0.2, 1);
    }
    .meta-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 25px 50px -12px rgba(112, 144, 176, 0.15);
      border-color: var(--brand-primary);
    }
    .meta-label {
      font-size: 10px;
      font-weight: 800;
      color: #A3AED0;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 0.25rem;
    }
    .meta-value {
      font-size: 13px;
      font-weight: 900;
      color: #2B3674;
    }

    .premium-glass {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 24px;
      box-shadow: 0 12px 40px rgba(112, 144, 176, 0.08);
    }

    /* Scrollbar */
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(163, 174, 208, 0.3);
      border-radius: 10px;
    }

    /* Animations */
    .animate-page-in {
      animation: pageIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    @keyframes pageIn {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .animate-slide-down {
      animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-bounce-in {
      animation: bounceIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    @keyframes bounceIn {
      0% { opacity: 0; transform: translateY(5px) scale(0.9) translateX(-50%); left: 50%; }
      100% { opacity: 1; transform: translateY(0) scale(1) translateX(-50%); left: 50%; }
    }
   `]
})
export class QuoteDetailsComponent implements OnInit {

   readonly ChevronLeft = ChevronLeft;
   readonly Share2 = Share2;
   readonly Trash2 = Trash2;
   readonly FileCode = FileCode;
   readonly Clock = Clock;
   readonly History = History;
   readonly Layers = Layers;
   readonly Copy = Copy;
   readonly Check = Check;
   readonly ExternalLink = ExternalLink;
   readonly User = User;
   readonly Shield = Shield;
   readonly Info = Info;
   readonly Activity = Activity;
   readonly Globe = Globe;
   readonly ChevronRight = ChevronRight;
   readonly FileSpreadsheet = FileSpreadsheet;
   readonly Plus = Plus;
   readonly Minus = Minus;

   selectedPart = 'createQuoteJson';
   expandedRows = signal<Set<string>>(new Set());
   idCopied = signal(false);

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
      const next = new Set(this.expandedRows());
      if (next.has(key)) {
         next.delete(key);
      } else {
         next.add(key);
      }
      this.expandedRows.set(next);
   }

   copyId(text: string) {
      navigator.clipboard.writeText(text);
      this.idCopied.set(true);
      setTimeout(() => this.idCopied.set(false), 2000);
   }
}
