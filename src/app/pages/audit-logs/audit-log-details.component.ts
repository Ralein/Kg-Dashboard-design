import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import {
  LucideAngularModule,
  ChevronLeft, Download, X, Clock, Shield,
  Activity, Code, Terminal, Copy, Check,
  ChevronDown, ChevronUp, AlertCircle, FileText,
  User, Database, Layers, ExternalLink, Info, Lock, LayoutGrid, Search, ChevronRight,
  FileCode
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
   <div *ngIf="activeTab() === 'detail'" class="animate-in fade-in slide-in-from-bottom-4 duration-500">

        <!-- ═══════════════════════════════════════════════════════════════ -->
        <!-- 3-PANEL DATA EXPLORER                                          -->
        <!-- ═══════════════════════════════════════════════════════════════ -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          
          <!-- Panel 1: Query Params -->
          <div class="explorer-panel animate-fade-in-up" style="animation-delay: 200ms;">
            <div class="panel-header">
              <h3 class="panel-title">Query Params</h3>
            </div>
            <div class="panel-content flex flex-col items-center justify-center min-h-[300px]">
              <div class="empty-state">
                <lucide-icon [img]="Layers" class="w-8 h-8 text-[#A3AED0]/20 mb-3"></lucide-icon>
                <p class="text-xs font-bold text-[#A3AED0]">No data</p>
              </div>
            </div>
          </div>

          <!-- Panel 2: Request Body -->
          <div class="explorer-panel animate-fade-in-up" style="animation-delay: 300ms;">
            <div class="panel-header">
              <h3 class="panel-title">Request Body</h3>
              <button (click)="copyPayload('request')" class="panel-action-btn">
                <lucide-icon [img]="Copy" class="w-3 h-3"></lucide-icon>
                <span>Copy</span>
              </button>
            </div>
            <div class="panel-content">
              <div class="code-viewer custom-scrollbar">
                <pre class="text-[11px] leading-relaxed">{{ requestJson }}</pre>
              </div>
            </div>
          </div>

          <!-- Panel 3: Response Body -->
          <div class="explorer-panel animate-fade-in-up border-emerald-100" style="animation-delay: 400ms;">
            <div class="panel-header border-emerald-50 bg-emerald-50/20">
              <h3 class="panel-title text-emerald-800">Response Body</h3>
              <div class="flex items-center gap-2">
                <span class="text-[9px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-full">201 CREATED</span>
                <button (click)="copyPayload('response')" class="panel-action-btn text-emerald-600 hover:bg-emerald-50 border-emerald-100">
                  <lucide-icon [img]="Copy" class="w-3 h-3"></lucide-icon>
                  <span>Copy</span>
                </button>
              </div>
            </div>
            <div class="panel-content">
              <div class="code-viewer custom-scrollbar border-l-emerald-400">
                <pre class="text-[11px] leading-relaxed">{{ responseJson }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── LOG EXPLORER TAB ── -->
      <div *ngIf="activeTab() === 'explorer'" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div class="premium-glass p-12 text-center flex flex-col items-center">
          <div class="w-20 h-20 rounded-3xl bg-[#4318FF]/10 flex items-center justify-center mb-8 border border-[#4318FF]/20 shadow-2xl shadow-[#4318FF]/10">
            <lucide-icon [img]="Search" class="w-10 h-10 text-[#4318FF]"></lucide-icon>
          </div>
          <h3 class="text-2xl font-black text-[#2B3674] tracking-tight mb-4">Deep Log Analysis</h3>
          <p class="text-[#A3AED0] font-medium max-w-md mx-auto leading-relaxed mb-10">
            Query across historical traces and correlate events using our advanced log explorer. Advanced filtering and pattern matching coming soon.
          </p>
          <div class="flex items-center gap-4">
            <button class="bg-[#4318FF] text-white px-8 py-4 rounded-2xl font-black text-sm tracking-tight hover:bg-[#3311CC] transition-all shadow-xl shadow-[#4318FF]/20">Launch Analyzer</button>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; --brand-primary: #4318FF; }

    .hero-banner {
      border-radius: 24px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
    }
    .hero-bg { background: linear-gradient(135deg, #0C0F2E 0%, #141836 100%); }
    .hero-grid {
      background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
      background-size: 24px 24px;
      opacity: 0.4;
    }
    .hero-orb {
      position: absolute; width: 300px; height: 300px;
      border-radius: 50%; filter: blur(80px); opacity: 0.4;
      pointer-events: none;
    }
    .hero-orb--blue   { background: #4318FF; top: -100px; right: -50px; }
    .hero-orb--teal   { background: #05CD99; bottom: -100px; left: 10%; }
    .hero-orb--violet { background: #8B5CF6; top: 20%; left: 40%; }
    
    .hero-scanline {
      position: absolute; inset: 0;
      background: linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.02) 50%, transparent 100%);
      background-size: 100% 4px;
      pointer-events: none;
    }

    .hero-avatar {
      position: relative; width: 64px; height: 64px;
    }
    .hero-avatar-inner {
      position: relative; z-index: 2;
      width: 100%; height: 100%;
      background: linear-gradient(135deg, #4318FF, #8B5CF6);
      border-radius: 20px;
      display: flex; align-items: center; justify-content: center;
      border: 1px solid rgba(255,255,255,0.2);
      box-shadow: 0 8px 20px rgba(67, 24, 255, 0.3);
    }
    .hero-avatar-ring {
      position: absolute; inset: -4px;
      border-radius: 24px;
      border: 1.5px solid rgba(255,255,255,0.1);
      animation: orbit 10s linear infinite;
    }
    @keyframes orbit { from { rotate: 0deg; } to { rotate: 360deg; } }

    .hero-title {
      font-size: 24px; font-weight: 900; color: white;
      letter-spacing: -0.02em;
    }
    .hero-status-badge {
      display: flex; align-items: center; gap: 6px;
      padding: 4px 10px; border-radius: 8px;
      background: rgba(5, 205, 153, 0.15);
      border: 1px solid rgba(5, 205, 153, 0.3);
      color: #05CD99; font-size: 10px; font-weight: 800;
      text-transform: uppercase; letter-spacing: 0.05em;
    }

    .hero-id-chip {
      display: flex; align-items: center; gap: 8px;
      padding: 6px 12px; border-radius: 10px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      color: rgba(255,255,255,0.9);
      font-family: monospace; font-size: 11px; font-weight: 600;
    }
    .copy-btn-hero {
      position: relative;
      width: 32px; height: 32px;
      display: flex; align-items: center; justify-content: center;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px; color: white;
      transition: all 0.2s;
    }
    .copy-btn-hero:hover { background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.3); }
    .copy-toast-hero {
      position: absolute; bottom: calc(100% + 8px); left: 50%;
      translate: -50% 0; padding: 4px 8px; border-radius: 6px;
      background: #4318FF; color: white; font-size: 9px;
      font-weight: 800; text-transform: uppercase;
      animation: toastIn 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
    }
    @keyframes toastIn { from { opacity: 0; scale: 0.5; translate: -50% 10px; } to { opacity: 1; scale: 1; translate: -50% 0; } }

    .hero-stats-strip {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px; backdrop-filter: blur(8px);
    }
    .hero-stat-item { display: flex; flex-direction: column; gap: 2px; }
    .hero-stat-label { font-size: 9px; font-weight: 700; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.1em; }
    .hero-stat-value { font-size: 13px; font-weight: 800; color: white; }
    .hero-stat-divider { width: 1px; background: rgba(255,255,255,0.08); margin: 8px 0; }

    /* Meta Cards */
    .meta-card {
      background: white;
      border: 1px solid rgba(163, 174, 208, 0.15);
      border-radius: 16px;
      padding: 1rem;
      transition: all 0.3s cubic-bezier(0.2, 1, 0.2, 1);
    }
    .meta-card:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(112, 144, 176, 0.1); border-color: #4318FF40; }
    .meta-label { font-size: 10px; font-weight: 800; color: #A3AED0; text-transform: uppercase; letter-spacing: 0.08em; }
    .meta-value { font-size: 13px; font-weight: 800; color: #2B3674; }

    /* Explorer Panels */
    .explorer-panel {
      background: white;
      border: 1px solid rgba(163, 174, 208, 0.15);
      border-radius: 20px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 10px 30px rgba(112, 144, 176, 0.05);
    }
    .panel-header {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid rgba(163, 174, 208, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fafbff;
    }
    .panel-title {
      font-size: 13px;
      font-weight: 800;
      color: #1a2660;
      letter-spacing: -0.01em;
    }
    .panel-content {
      padding: 1.5rem;
      flex: 1;
    }
    .panel-action-btn {
      display: flex;
      align-items: center;
      gap: 1.5;
      padding: 4px 10px;
      border-radius: 8px;
      background: white;
      border: 1px solid #e2e8f0;
      font-size: 10px;
      font-weight: 700;
      color: #4318FF;
      transition: all 0.2s;
    }
    .panel-action-btn:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
      transform: translateY(-1px);
    }
    .panel-action-btn lucide-icon {
      width: 12px;
      height: 12px;
      margin-right: 4px;
    }

    .empty-state { text-align: center; }

    .code-viewer {
      background: #0C0E1A;
      color: #E2E8F0;
      padding: 1.25rem;
      border-radius: 16px;
      border-left: 3px solid #4318FF;
      height: 400px;
      overflow: auto;
      box-shadow: inset 0 4px 12px rgba(0,0,0,0.2);
    }
    .code-viewer pre {
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      margin: 0;
      white-space: pre-wrap;
      word-break: break-all;
    }

    .animate-fade-in-up {
      animation: fadeInUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Custom scrollbar */
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(67,24,255,0.12);
      border-radius: 2px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(67,24,255,0.25);
    }
  `]
})
export class AuditLogDetailsComponent implements OnInit {
  activeTab = signal('detail');
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
  readonly LayoutGrid = LayoutGrid;
  readonly Search = Search;
  readonly Lock = Lock;

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
