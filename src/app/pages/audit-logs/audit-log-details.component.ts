import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import {
  LucideAngularModule,
  ChevronLeft, Download, X, Clock, Shield,
  Activity, Code, Terminal, Copy, Check,
  ChevronDown, ChevronUp, AlertCircle, FileText,
  User, Database, Layers, ExternalLink, Info, Lock, LayoutGrid, Search, ChevronRight, FileCode
} from 'lucide-angular';

@Component({
  selector: 'app-audit-log-details',
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
              <button routerLink="/audit-logs" class="p-2 bg-white/10 rounded-xl border border-white/20 text-white hover:bg-white/20 transition-all group">
                <lucide-icon [img]="ChevronLeft" class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"></lucide-icon>
              </button>
              <div class="flex flex-col">
                <div class="flex items-center gap-2 text-white/40 text-[10px] uppercase font-bold tracking-widest">
                  <span>Administrative</span>
                  <span class="opacity-30">/</span>
                  <span>Audit Logs</span>
                </div>
                <h2 class="text-xl font-black text-white tracking-tight">Detail View</h2>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <button (click)="exportLog()" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all backdrop-blur-sm">
                <lucide-icon [img]="Download" class="w-3.5 h-3.5"></lucide-icon>
                Export Log
              </button>
            </div>
          </div>

          <!-- Hero Identity Section -->
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div class="flex items-start gap-5">
              <div class="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4318FF] to-[#B299FF] flex items-center justify-center border border-white/20 shadow-2xl shadow-[#4318FF]/40 group overflow-hidden relative">
                <div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <lucide-icon [img]="Activity" class="w-8 h-8 text-white relative z-10"></lucide-icon>
              </div>
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-3">
                  <span class="text-2xl font-black text-white leading-none">Audit Log Record</span>
                  <span class="px-2.5 py-0.5 rounded-lg bg-[#05CD99] text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#05CD99]/20">Success</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-2 text-white/60">
                    <lucide-icon [img]="Clock" class="w-3.5 h-3.5"></lucide-icon>
                    <span class="text-xs font-bold uppercase tracking-wider">Feb 19, 2026, 10:26 AM</span>
                  </div>
                  <div class="w-1 h-1 rounded-full bg-white/20"></div>
                  <div class="flex items-center gap-2 text-white/60">
                    <lucide-icon [img]="Terminal" class="w-3.5 h-3.5"></lucide-icon>
                    <span class="text-xs font-bold uppercase tracking-wider">POST v2.0</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- ID Quick Display -->
            <div class="glass-pill p-3 px-5 flex items-center gap-4 relative">
               <div class="flex flex-col">
                  <span class="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">Trace Identifier</span>
                  <span class="text-xs font-mono font-bold text-white/90">a615d49f...99c1</span>
               </div>
               <button (click)="copyTraceId()" class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all relative overflow-hidden group/copy">
                  <lucide-icon [img]="traceCopied() ? Check : Copy" class="w-3.5 h-3.5"></lucide-icon>
                  <div *ngIf="traceCopied()" class="absolute inset-0 bg-emerald-500/20 animate-pulse"></div>
               </button>
               
               <!-- Floating "Copied" Toast -->
               <div *ngIf="traceCopied()" class="absolute -top-10 right-0 py-1.5 px-3 bg-white text-[#4318FF] text-[10px] font-black rounded-lg shadow-2xl border border-indigo-50 animate-bounce-in">
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
          <lucide-icon [img]="Layers" class="w-4 h-4 text-[#4318FF] mb-3"></lucide-icon>
          <span class="meta-label">Service Name</span>
          <span class="meta-value">Adnic service</span>
        </div>
        <div class="meta-card">
          <lucide-icon [img]="Terminal" class="w-4 h-4 text-[#05CD99] mb-3"></lucide-icon>
          <span class="meta-label">Method</span>
          <span class="meta-value uppercase">POST</span>
        </div>
        <div class="meta-card">
          <lucide-icon [img]="ExternalLink" class="w-4 h-4 text-[#FF8F0C] mb-3"></lucide-icon>
          <span class="meta-label">Endpoint Path</span>
          <span class="meta-value truncate">/api/v2.0/quotes</span>
        </div>
        <div class="meta-card">
          <lucide-icon [img]="Clock" class="w-4 h-4 text-emerald-400 mb-3"></lucide-icon>
          <span class="meta-label">Duration</span>
          <span class="meta-value text-emerald-600">3350 ms</span>
        </div>
        <div class="meta-card">
          <lucide-icon [img]="User" class="w-4 h-4 text-indigo-400 mb-3"></lucide-icon>
          <span class="meta-label">User</span>
          <span class="meta-value">-</span>
        </div>
        <div class="meta-card border-[#4318FF]/20 shadow-lg shadow-[#4318FF]/5">
          <lucide-icon [img]="Info" class="w-4 h-4 text-[#4318FF] mb-3"></lucide-icon>
          <span class="meta-label">Status</span>
          <span class="meta-value text-[#05CD99]">200 OK</span>
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
              <h3 class="text-xs font-black text-[#2B3674] uppercase tracking-widest">Payload Explorer</h3>
              <p class="text-[10px] text-[#A3AED0] mt-1 font-bold">Select the transaction data to view</p>
            </div>
            <div class="p-3 flex flex-col gap-1.5">
              <button 
                *ngFor="let part of logParts"
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
                   <h3 class="text-sm font-black text-[#2B3674] tracking-tight">{{ getPartLabel() }}</h3>
                   <p class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-widest mt-0.5">Structured transaction payload</p>
                 </div>
              </div>
              <button (click)="copySelectedPayload()" class="p-2.5 rounded-xl bg-indigo-50 text-[#4318FF] hover:bg-[#4318FF] hover:text-white transition-all border border-[#4318FF]/10 shadow-sm active:scale-95 group flex items-center gap-2">
                <lucide-icon [img]="Copy" class="w-4 h-4 group-hover:scale-110 transition-transform"></lucide-icon>
                <span class="text-[10px] font-black uppercase tracking-widest px-1">Copy JSON</span>
              </button>
            </div>

            <div class="p-8 flex-1 flex flex-col">
              <div class="code-viewer flex-1 custom-scrollbar">
                <pre class="text-[11px] leading-relaxed">{{ getSelectedJson() }}</pre>
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

    .code-viewer {
      background: #0C0E1A;
      color: #E2E8F0;
      padding: 1.5rem;
      border-radius: 20px;
      border-left: 4px solid #4318FF;
      box-shadow: inset 0 4px 12px rgba(0,0,0,0.3);
    }
    .code-viewer pre {
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      margin: 0;
      white-space: pre-wrap;
      word-break: break-all;
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
    .animate-bounce-in {
      animation: bounceIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    @keyframes bounceIn {
      0% { opacity: 0; transform: translateY(5px) scale(0.9) translateX(-50%); left: 50%; }
      100% { opacity: 1; transform: translateY(0) scale(1) translateX(-50%); left: 50%; }
    }
  `]
})
export class AuditLogDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);

  readonly ChevronLeft = ChevronLeft;
  readonly Download = Download;
  readonly X = X;
  readonly Clock = Clock;
  readonly Shield = Shield;
  readonly Activity = Activity;
  readonly Terminal = Terminal;
  readonly Copy = Copy;
  readonly Check = Check;
  readonly Layers = Layers;
  readonly ExternalLink = ExternalLink;
  readonly Info = Info;
  readonly User = User;
  readonly ChevronRight = ChevronRight;
  readonly FileCode = FileCode;
  readonly Database = Database;

  traceCopied = signal(false);
  selectedPart = 'requestBody';

  logParts = [
    { id: 'queryParams', label: 'Query Params', icon: Info },
    { id: 'requestBody', label: 'Request Body', icon: Terminal },
    { id: 'responseBody', label: 'Response Body', icon: Database }
  ];

  requestJson = JSON.stringify({
    data: {
      CustomerId: "98274102",
      QuoteReference: "cbuae-home-2.1-02",
      QuoteType: "New",
      PolicyIssuanceRequest: {
        CustomerVerification: true,
        Payment: true,
        PolicyDocuments: true
      },
      Policy: {
        TypeOfCover: "BuildingsOnly",
        PolicyStartDate: "2026-11-20",
        PolicyEndDate: "2027-11-19",
        AddOns: {
          AccidentalDamageCover: true,
          PersonalBelongingsCover: true,
          LiabilityCover: true,
          DomesticHelpersCover: true,
          ClaimsInLastThreeYears: true
        }
      }
    }
  }, null, 2);

  responseJson = JSON.stringify({
    status: "CREATED",
    statusCode: 201,
    data: {
      Premium: {
        Status: "Initial",
        TotalPremiumAmount: { Amount: 1800.00, Currency: "AED" },
        InstallmentOptions: ["OneTime"],
        PaymentFrequency: "OneTime",
        VATAmount: { Amount: 90.00, Currency: "AED" },
        VATPercentage: 0.05
      },
      PolicyCover: [
        {
          CoverType: "Building",
          CoverLimitAmount: { Currency: "AED", Amount: 400000 },
          Description: "Home Insurance - PLATINUM - Contents"
        }
      ]
    }
  }, null, 2);

  ngOnInit() {
    // In real app, load data by route.snapshot.params['id']
  }

  getPartLabel(): string {
    return this.logParts.find(p => p.id === this.selectedPart)?.label || '';
  }

  getSelectedJson(): string {
    if (this.selectedPart === 'requestBody') return this.requestJson;
    if (this.selectedPart === 'responseBody') return this.responseJson;
    return '{\\n  "error": "No query parameters found for this trace"\\n}';
  }

  copyTraceId() {
    navigator.clipboard.writeText('a615d49f-12be-43d2-84ea-6defaae999c1');
    this.traceCopied.set(true);
    setTimeout(() => this.traceCopied.set(false), 2000);
  }

  copySelectedPayload() {
    navigator.clipboard.writeText(this.getSelectedJson());
  }

  exportLog() {
    console.log('Exporting log data...');
  }
}
