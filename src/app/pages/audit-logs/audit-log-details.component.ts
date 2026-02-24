import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import {
  LucideAngularModule,
  ChevronLeft, Download, X, Clock, Shield,
  Activity, Code, Terminal, Copy, Check,
  ChevronDown, ChevronUp, AlertCircle, FileText,
  User, Database, Layers, ExternalLink, Info
} from 'lucide-angular';

@Component({
  selector: 'app-audit-log-details',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink],
  template: `
    <div class="flex flex-col gap-0 animate-fade-in-up">
      
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
                  <span>Administration</span>
                  <span class="opacity-30">/</span>
                  <span>Audit Logs</span>
                </div>
                <h2 class="text-xl font-black text-white tracking-tight">Audit Log Details</h2>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button (click)="exportLog()" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold hover:bg-white/20 transition-all">
                <lucide-icon [img]="Download" class="w-3.5 h-3.5"></lucide-icon>
                Export Log
              </button>
              <button routerLink="/audit-logs" class="p-2 bg-[#FF5252]/20 border border-[#FF5252]/40 rounded-xl text-[#FF5252] hover:bg-[#FF5252] hover:text-white transition-all">
                <lucide-icon [img]="X" class="w-4 h-4"></lucide-icon>
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
                  <span class="text-2xl font-black text-white leading-none">Quotation Request</span>
                  <span class="px-2.5 py-0.5 rounded-lg bg-[#05CD99] text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#05CD99]/20">Success</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-2 text-white/60">
                    <lucide-icon [img]="Clock" class="w-3.5 h-3.5"></lucide-icon>
                    <span class="text-xs font-bold uppercase tracking-wider">Feb 19, 2026, 10:26:55 AM</span>
                  </div>
                  <div class="w-1 h-1 rounded-full bg-white/20"></div>
                  <div class="flex items-center gap-2 text-white/60">
                    <lucide-icon [img]="Terminal" class="w-3.5 h-3.5"></lucide-icon>
                    <span class="text-xs font-bold uppercase tracking-wider">POST v2.0</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Trace ID Quick Display -->
            <div class="glass-pill p-3 px-5 flex items-center gap-4">
               <div class="flex flex-col">
                  <span class="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">Trace Identifier</span>
                  <span class="text-xs font-mono font-bold text-white/90">a615d49f-12be-43d2-84ea-6defaae999c1</span>
               </div>
               <button (click)="copyTraceId()" class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all">
                  <lucide-icon [img]="traceCopied() ? Check : Copy" class="w-3.5 h-3.5"></lucide-icon>
               </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════════════════════════ -->
      <!-- METADATA CARDS ROW                                             -->
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        <div class="meta-card">
          <lucide-icon [img]="Layers" class="w-4 h-4 text-[#4318FF] mb-3"></lucide-icon>
          <span class="meta-label">Service</span>
          <span class="meta-value">Adnic service</span>
        </div>
        <div class="meta-card">
          <lucide-icon [img]="Database" class="w-4 h-4 text-[#05CD99] mb-3"></lucide-icon>
          <span class="meta-label">Method</span>
          <span class="meta-value">POST</span>
        </div>
        <div class="meta-card">
          <lucide-icon [img]="ExternalLink" class="w-4 h-4 text-[#FF8F0C] mb-3"></lucide-icon>
          <span class="meta-label">Endpoint</span>
          <span class="meta-value truncate">/api/v2.0/quotes</span>
        </div>
        <div class="meta-card">
          <lucide-icon [img]="Activity" class="w-4 h-4 text-emerald-400 mb-3"></lucide-icon>
          <span class="meta-label">Duration</span>
          <span class="meta-value">3350 ms</span>
        </div>
        <div class="meta-card">
          <lucide-icon [img]="User" class="w-4 h-4 text-indigo-400 mb-3"></lucide-icon>
          <span class="meta-label">User</span>
          <span class="meta-value">-</span>
        </div>
        <div class="meta-card border-[#05CD99]/20 shadow-lg shadow-[#05CD99]/5">
          <lucide-icon [img]="Shield" class="w-4 h-4 text-[#05CD99] mb-3"></lucide-icon>
          <span class="meta-label">Status Code</span>
          <span class="meta-value text-[#05CD99]">200 OK</span>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════════════════════════ -->
      <!-- COLLAPSIBLE JSON CONTENT                                       -->
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <div class="flex flex-col gap-5 mb-10">
        
        <!-- Request Section -->
        <div class="premium-accordion" [class.open]="requestOpen()">
          <button (click)="requestOpen.set(!requestOpen())" class="accordion-trigger group">
            <div class="flex items-center gap-4">
              <div class="section-icon-wrap" [class.active]="requestOpen()">
                <lucide-icon [img]="Code" class="w-4 h-4"></lucide-icon>
              </div>
              <div class="flex flex-col text-left">
                <h3 class="text-sm font-black text-[#2B3674] tracking-tight group-hover:text-[#4318FF] transition-colors">Request Context</h3>
                <p class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-widest mt-0.5">Headers, Params & Body</p>
              </div>
            </div>
            <lucide-icon [img]="requestOpen() ? ChevronUp : ChevronDown" class="w-4 h-4 text-[#A3AED0] group-hover:scale-125 transition-all"></lucide-icon>
          </button>

          <div *ngIf="requestOpen()" class="accordion-body animate-slide-down">
            <!-- Headers Sub-section -->
            <div class="json-metadata mb-6">
               <div class="flex items-center gap-2 mb-3">
                  <lucide-icon [img]="Info" class="w-3 h-3 text-[#4318FF]"></lucide-icon>
                  <span class="text-[10px] font-black text-[#2B3674] uppercase tracking-widest">HTTP Headers</span>
               </div>
               <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div class="header-chip">Content-Type: application/json</div>
                  <div class="header-chip">Accept: */*</div>
                  <div class="header-chip">X-Trace-Id: a615d49f...</div>
               </div>
            </div>

            <!-- Body Section -->
            <div class="relative group/body">
              <div class="flex items-center justify-between mb-3">
                 <span class="text-[10px] font-black text-[#2B3674] uppercase tracking-widest">JSON Payload</span>
                 <button (click)="copyPayload('request')" class="text-[10px] font-bold text-[#4318FF] hover:underline flex items-center gap-1.5 opacity-0 group-hover/body:opacity-100 transition-opacity">
                    <lucide-icon [img]="Copy" class="w-3 h-3"></lucide-icon>
                    Copy Payload
                 </button>
              </div>
              <div class="code-viewer custom-scrollbar">
                <pre class="text-[11px] leading-relaxed">{{ requestJson }}</pre>
              </div>
            </div>
          </div>
        </div>

        <!-- Response Section -->
        <div class="premium-accordion border-[#05CD99]/20" [class.open]="responseOpen()">
          <button (click)="responseOpen.set(!responseOpen())" class="accordion-trigger group">
            <div class="flex items-center gap-4">
              <div class="section-icon-wrap" [class.active]="responseOpen()" style="--icon-color: #05CD99; --icon-bg: rgba(5,205,153,0.1)">
                <lucide-icon [img]="FileText" class="w-4 h-4"></lucide-icon>
              </div>
              <div class="flex flex-col text-left">
                <h3 class="text-sm font-black text-[#2B3674] tracking-tight group-hover:text-[#05CD99] transition-colors">Response Body</h3>
                <p class="text-[10px] font-bold text-[#A3AED0] uppercase tracking-widest mt-0.5">System Result & Response Data</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-[10px] font-bold text-[#05CD99] bg-[#05CD99]/10 px-2 py-0.5 rounded-full border border-[#05CD99]/20">201 Created</span>
              <lucide-icon [img]="responseOpen() ? ChevronUp : ChevronDown" class="w-4 h-4 text-[#A3AED0] group-hover:scale-125 transition-all"></lucide-icon>
            </div>
          </button>

          <div *ngIf="responseOpen()" class="accordion-body animate-slide-down">
            <div class="json-metadata border-[#05CD99]/10 bg-[#05CD99]/[0.02] mb-6">
                <div class="flex items-start gap-4">
                   <div class="p-2 bg-[#05CD99]/10 rounded-lg"><lucide-icon [img]="AlertCircle" class="w-4 h-4 text-[#05CD99]"></lucide-icon></div>
                   <div class="flex flex-col">
                      <span class="text-xs font-bold text-[#2B3674]">Transaction Successful</span>
                      <p class="text-[11px] text-[#A3AED0] leading-tight">The quotation was generated successfully and the response has been recorded.</p>
                   </div>
                </div>
            </div>
            <div class="relative group/body">
              <div class="code-viewer custom-scrollbar" style="border-left-color: #05CD99">
                <pre class="text-[11px] leading-relaxed">{{ responseJson }}</pre>
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

    /* Premium Accordion */
    .premium-accordion {
      background: white;
      border: 1px solid rgba(163, 174, 208, 0.15);
      border-radius: 24px;
      overflow: hidden;
      transition: all 0.3s;
    }
    .premium-accordion.open {
      box-shadow: 0 20px 40px rgba(112, 144, 176, 0.1);
      border-color: rgba(67, 24, 255, 0.2);
    }
    .accordion-trigger {
      width: 100%;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: background 0.2s;
    }
    .accordion-trigger:hover { background: #F8FAFF; }
    
    .section-icon-wrap {
      width: 44px; height: 44px;
      border-radius: 14px;
      display: flex; align-items: center; justify-content: center;
      background: rgba(163, 174, 208, 0.08);
      color: #A3AED0;
      transition: all 0.3s;
    }
    .section-icon-wrap.active {
      background: var(--icon-bg, rgba(67, 24, 255, 0.1));
      color: var(--icon-color, #4318FF);
      box-shadow: 0 8px 16px -4px var(--icon-bg, rgba(67, 24, 255, 0.2));
    }

    .accordion-body { padding: 0 1.5rem 1.5rem 1.5rem; }

    .json-metadata {
      padding: 1rem;
      border-radius: 16px;
      background: #F8FAFF;
      border: 1px solid rgba(67, 24, 255, 0.05);
    }
    .header-chip {
      background: white;
      border: 1px solid rgba(163, 174, 208, 0.2);
      padding: 6px 10px;
      border-radius: 10px;
      font-family: monospace;
      font-size: 10px;
      font-weight: 600;
      color: #2B3674;
    }

    .code-viewer {
      background: #0C0E1A;
      color: #E2E8F0;
      padding: 1.5rem;
      border-radius: 20px;
      border-left: 4px solid #4318FF;
      max-height: 500px;
      overflow: auto;
      box-shadow: inset 0 4px 12px rgba(0,0,0,0.2);
    }
    .code-viewer pre {
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      margin: 0;
      white-space: pre-wrap;
    }

    .animate-slide-down {
      animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
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
  readonly Code = Code;
  readonly Terminal = Terminal;
  readonly Copy = Copy;
  readonly Check = Check;
  readonly ChevronDown = ChevronDown;
  readonly ChevronUp = ChevronUp;
  readonly AlertCircle = AlertCircle;
  readonly FileText = FileText;
  readonly User = User;
  readonly Database = Database;
  readonly Layers = Layers;
  readonly ExternalLink = ExternalLink;
  readonly Info = Info;

  requestOpen = signal(true);
  responseOpen = signal(false);
  traceCopied = signal(false);

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

  copyTraceId() {
    navigator.clipboard.writeText('a615d49f-12be-43d2-84ea-6defaae999c1');
    this.traceCopied.set(true);
    setTimeout(() => this.traceCopied.set(false), 2000);
  }

  copyPayload(type: string) {
    const text = type === 'request' ? this.requestJson : this.responseJson;
    navigator.clipboard.writeText(text);
  }

  exportLog() {
    console.log('Exporting log data...');
  }
}
