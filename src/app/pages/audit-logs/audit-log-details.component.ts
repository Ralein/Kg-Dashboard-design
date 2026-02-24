import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import {
  LucideAngularModule,
  ChevronLeft, Download, X, Clock, Shield,
  Activity, Code, Terminal, Copy, Check,
  ChevronDown, ChevronUp, AlertCircle, FileText,
  User, Database, Layers, ExternalLink, Info, Lock, LayoutGrid, Search
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

        <!-- Deep background -->
        <div class="hero-bg absolute inset-0"></div>

        <!-- Geometric grid overlay -->
        <div class="hero-grid absolute inset-0"></div>

        <!-- Animated gradient orbs -->
        <div class="hero-orb hero-orb--blue"></div>
        <div class="hero-orb hero-orb--teal"></div>
        <div class="hero-orb hero-orb--violet"></div>

        <!-- Scan-line accent -->
        <div class="hero-scanline"></div>

        <!-- Content -->
        <div class="relative z-10 px-8 pt-8 pb-0">

          <!-- Breadcrumb + back -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-2 text-white/40 text-[11px] font-semibold tracking-wider">
              <button routerLink="/audit-logs"
                class="flex items-center gap-1.5 hover:text-white/80 transition-colors duration-200 group">
                <lucide-icon [img]="ChevronLeft" class="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform"></lucide-icon>
                Audit Logs
              </button>
              <span class="text-white/20">/</span>
              <span class="text-white/60">Detail View</span>
            </div>

            <div class="flex items-center gap-3">
              <button (click)="exportLog()" class="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/8 border border-white/15 text-white/70 text-[11px] font-bold tracking-wide hover:bg-white/15 hover:text-white hover:border-white/30 transition-all duration-200 backdrop-blur-sm">
                <lucide-icon [img]="Download" class="w-3.5 h-3.5"></lucide-icon>
                Export Log
              </button>
              <button routerLink="/audit-logs" class="suspend-hero-btn flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF5252]/10 border border-[#FF5252]/20 text-[#FF5252] text-[11px] font-bold tracking-wide hover:bg-[#FF5252] hover:text-white transition-all">
                <lucide-icon [img]="X" class="w-3.5 h-3.5"></lucide-icon>
              </button>
            </div>
          </div>

          <!-- Main hero content -->
          <div class="flex items-end justify-between gap-8">

            <!-- Left: identity block -->
            <div class="flex items-start gap-5 pb-8">
              <div class="hero-avatar flex-shrink-0">
                <div class="hero-avatar-inner">
                  <lucide-icon [img]="Activity" class="w-7 h-7 text-white"></lucide-icon>
                </div>
                <div class="hero-avatar-ring"></div>
              </div>

              <div class="flex flex-col gap-3">
                <div class="flex items-center gap-3">
                  <h1 class="hero-title">Audit Log Details</h1>
                  <span class="hero-status-badge">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                    Success
                  </span>
                </div>

                <div class="flex items-center gap-2">
                  <span class="text-white/40 text-[11px] font-semibold tracking-widest uppercase">Trace ID</span>
                  <span class="hero-id-chip">
                    <lucide-icon [img]="Lock" class="w-3 h-3 text-indigo-400"></lucide-icon>
                    a615d49f...99c1
                  </span>
                  <button (click)="copyTraceId()" class="copy-btn-hero" title="Copy ID">
                    <lucide-icon [img]="traceCopied() ? Check : Copy" class="w-3.5 h-3.5"></lucide-icon>
                    <span *ngIf="traceCopied()" class="copy-toast-hero">Copied!</span>
                  </button>
                </div>

                <div class="flex items-center gap-2 flex-wrap text-white/60 text-[11px] font-bold uppercase tracking-wider">
                  <span class="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                    <lucide-icon [img]="Clock" class="w-3 h-3 text-indigo-300"></lucide-icon>
                    Feb 19, 2026, 10:26:55 AM
                  </span>
                  <span class="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                    <lucide-icon [img]="Terminal" class="w-3 h-3 text-emerald-300"></lucide-icon>
                    POST v2.0
                  </span>
                </div>
              </div>
            </div>

            <!-- Right: quick stats (reused from quote details style) -->
            <div class="hero-stats-strip flex items-stretch gap-0 mb-8">
              <div class="hero-stat-item px-6 py-3">
                <span class="hero-stat-label">Response Time</span>
                <span class="hero-stat-value text-emerald-300">3.3s</span>
              </div>
              <div class="hero-stat-divider"></div>
              <div class="hero-stat-item px-6 py-3">
                <span class="hero-stat-label">Category</span>
                <span class="hero-stat-value uppercase">API Log</span>
              </div>
            </div>
            </div>
          </div>

          <!-- Hero Bottom Tabs -->
          <div class="flex items-center gap-8 px-8 border-b border-white/10">
            <button 
              (click)="activeTab.set('detail')"
              class="relative py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300"
              [class.text-white]="activeTab() === 'detail'"
              [class.text-white/40]="activeTab() !== 'detail'"
            >
              <span class="flex items-center gap-2">
                <lucide-icon [img]="LayoutGrid" class="w-4 h-4"></lucide-icon>
                Detail View
              </span>
              <div 
                *ngIf="activeTab() === 'detail'" 
                class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4318FF] to-[#8B5CF6] rounded-t-full"
              ></div>
            </button>
            
            <button 
              (click)="activeTab.set('explorer')"
              class="relative py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300"
              [class.text-white]="activeTab() === 'explorer'"
              [class.text-white/40]="activeTab() !== 'explorer'"
            >
              <span class="flex items-center gap-2">
                <lucide-icon [img]="Search" class="w-4 h-4"></lucide-icon>
                Log Explorer
              </span>
              <div 
                *ngIf="activeTab() === 'explorer'" 
                class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4318FF] to-[#8B5CF6] rounded-t-full"
              ></div>
            </button>
          </div>
        </div>
      </div>

      <div *ngIf="activeTab() === 'detail'" class="animate-in fade-in slide-in-from-bottom-4 duration-500">

      <!-- ═══════════════════════════════════════════════════════════════ -->
      <!-- METADATA CARDS ROW                                             -->
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
        <div class="meta-card col-span-2">
          <span class="meta-label">Service Name</span>
          <span class="meta-value mt-1 block">Adnic service</span>
        </div>
        <div class="meta-card">
          <span class="meta-label">Method</span>
          <span class="meta-value mt-1 block">POST</span>
        </div>
        <div class="meta-card col-span-2">
          <span class="meta-label">Endpoint Path</span>
          <span class="meta-value truncate mt-1 block">/api/v2.0/quotes</span>
        </div>
        <div class="meta-card">
          <span class="meta-label">Duration</span>
          <span class="meta-value mt-1 block text-emerald-600">3350 ms</span>
        </div>
        <div class="meta-card">
          <span class="meta-label">User</span>
          <span class="meta-value mt-1 block">-</span>
        </div>
        <div class="meta-card">
          <span class="meta-label">Status</span>
          <span class="meta-value mt-1 block text-[#05CD99]">200 OK</span>
        </div>
      </div>

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
