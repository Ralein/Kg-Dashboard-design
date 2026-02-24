import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import {
  LucideAngularModule,
  ChevronLeft, ShieldCheck, ClipboardCheck, History,
  Home as HomeIcon, ChevronUp, ChevronDown, CheckCircle2,
  Lock, Calendar, User, Globe, ArrowUpRight, Shield,
  Building2, BadgeCheck, AlertCircle, FileText, Infinity,
  Heart, Car, Plane
} from 'lucide-angular';

interface NestedItem {
  title: string;
  items?: string[];
  description?: string;
  open: boolean;
}

@Component({
  selector: 'app-consent-detail',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink],
  template: `
    <div class="cd-root flex flex-col gap-0 animate-page-in">

      <!-- ═══════════════════════════════════════════════════════════════ -->
      <!--  HERO HEADER BANNER                                            -->
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
              <button routerLink="/consent-management"
                class="flex items-center gap-1.5 hover:text-white/80 transition-colors duration-200 group">
                <lucide-icon [img]="ChevronLeft" class="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform"></lucide-icon>
                Consent Management
              </button>
              <span class="text-white/20">/</span>
              <span class="text-white/60">Detail View</span>
            </div>

            <div class="flex items-center gap-3">
              <button class="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/8 border border-white/15 text-white/70 text-[11px] font-bold tracking-wide hover:bg-white/15 hover:text-white hover:border-white/30 transition-all duration-200 backdrop-blur-sm">
                <lucide-icon [img]="History" class="w-3.5 h-3.5"></lucide-icon>
                Audit History
              </button>
              <button class="suspend-hero-btn flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-bold tracking-wide">
                <lucide-icon [img]="ShieldCheck" class="w-3.5 h-3.5"></lucide-icon>
                Suspend Access
              </button>
            </div>
          </div>

          <!-- Main hero content -->
          <div class="flex items-end justify-between gap-8">

            <!-- Left: identity block -->
            <div class="flex items-start gap-5 pb-8">
              <div class="hero-avatar flex-shrink-0">
                <div class="hero-avatar-inner">
                  <lucide-icon [img]="FileText" class="w-7 h-7 text-white"></lucide-icon>
                </div>
                <div class="hero-avatar-ring"></div>
              </div>

              <div class="flex flex-col gap-3">
                <div class="flex items-center gap-3">
                  <h1 class="hero-title">Consent Details</h1>
                  <span class="hero-status-badge">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                    Authorized
                  </span>
                </div>

                <div class="flex items-center gap-2">
                  <span class="text-white/40 text-[11px] font-semibold tracking-widest uppercase">ID</span>
                  <span class="hero-id-chip">
                    <lucide-icon [img]="Lock" class="w-3 h-3 text-indigo-400"></lucide-icon>
                    6a14XXXXXXX54c5
                  </span>
                  <button (click)="copyId()" class="copy-btn-hero" title="Copy ID">
                    <lucide-icon [img]="idCopied ? CheckCircle2 : ClipboardCheck" class="w-3.5 h-3.5"></lucide-icon>
                    <span *ngIf="idCopied" class="copy-toast-hero">Copied!</span>
                  </button>
                </div>

                <div class="flex items-center gap-2 flex-wrap">
                  <span class="hero-tag">
                    <lucide-icon [img]="Infinity" class="w-3 h-3"></lucide-icon>
                    Long-Lived
                  </span>
                  <span class="hero-tag">
                    <lucide-icon [img]="Globe" class="w-3 h-3"></lucide-icon>
                    Web Channel
                  </span>
                  <span class="hero-tag">
                    <lucide-icon [img]="Building2" class="w-3 h-3"></lucide-icon>
                    TPP Client Test
                  </span>
                  <span class="hero-tag">
                    <lucide-icon [img]="getPolicyIcon()" class="w-3 h-3" [ngClass]="getPolicyColorClass()"></lucide-icon>
                    {{selectedPolicy}} Policy
                  </span>
                </div>
              </div>
            </div>

            <!-- Right: quick stats strip -->
            <div class="hero-stats-strip flex items-stretch gap-0 mb-8">
              <div class="hero-stat-item">
                <lucide-icon [img]="Calendar" class="w-4 h-4 text-indigo-300 mb-1.5"></lucide-icon>
                <span class="hero-stat-label">Created</span>
                <span class="hero-stat-value">19 Feb 2026</span>
              </div>
              <div class="hero-stat-divider"></div>
              <div class="hero-stat-item">
                <lucide-icon [img]="Shield" class="w-4 h-4 text-amber-300 mb-1.5"></lucide-icon>
                <span class="hero-stat-label">Expires</span>
                <span class="hero-stat-value">29 Dec 2026</span>
              </div>
              <div class="hero-stat-divider"></div>
              <div class="hero-stat-item">
                <lucide-icon [img]="User" class="w-4 h-4 text-teal-300 mb-1.5"></lucide-icon>
                <span class="hero-stat-label">Emirates ID</span>
                <span class="hero-stat-value font-mono text-[11px]">784-1940-XXXX</span>
              </div>
            </div>
          </div>

          <!-- Bottom tab-bar removed per user request -->
        </div>
      </div>

      <!-- ═══════════════════════════════════════════════════════════════ -->
      <!-- METADATA CARDS ROW                                             -->
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <div class="mb-6">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">

          <div class="meta-card col-span-2">
            <span class="meta-label">Consent ID</span>
            <div class="flex items-center gap-2 mt-1">
              <span class="meta-value font-mono text-[12px] tracking-wider">6a14XXXXXXX54c5</span>
              <button (click)="copyId()" class="text-[#4318FF]/60 hover:text-[#4318FF] p-1 rounded-md hover:bg-indigo-50 transition-all active:scale-90">
                <lucide-icon [img]="idCopied ? CheckCircle2 : ClipboardCheck" class="w-3.5 h-3.5"></lucide-icon>
              </button>
            </div>
          </div>

          <div class="meta-card col-span-2">
            <span class="meta-label">Base Consent ID</span>
            <span class="meta-value font-mono text-[12px] tracking-wider mt-1 block">1d15XXXXXXXbeb1</span>
          </div>

          <div class="meta-card">
            <span class="meta-label">Status</span>
            <span class="meta-status mt-1">
              <span class="pulse-dot-sm"></span>
              Authorized
            </span>
          </div>

          <div class="meta-card">
            <span class="meta-label">Email</span>
            <span class="meta-value text-[12px] mt-1 block truncate">homedata&#64;gmail.com</span>
          </div>

          <div class="meta-card">
            <span class="meta-label">Created</span>
            <span class="meta-value text-[12px] mt-1 block">19 Feb 2026</span>
          </div>

          <div class="meta-card">
            <span class="meta-label">Expiration</span>
            <div class="flex items-center gap-1.5 mt-1">
              <span class="meta-value text-[12px]">29 Dec 2026</span>
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </div>
          </div>

        </div>
      </div>

      <!-- ═══════════════════════════════════════════════════════════════ -->
      <!-- MAIN LAYOUT GRID                                               -->
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">

        <!-- ── LEFT: Policy Card ── -->
        <div class="lg:col-span-5 flex flex-col gap-6">
          <div class="policy-card relative overflow-hidden flex flex-col h-full">

            <div class="policy-bg"></div>
            <div class="policy-grid absolute inset-0 opacity-[0.04]"
              style="background-image: linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px); background-size: 28px 28px;"></div>
            <div class="policy-orb policy-orb--blue absolute top-0 right-0"></div>
            <div class="policy-orb policy-orb--teal absolute bottom-0 left-0"></div>

            <div class="relative z-10 flex flex-col h-full p-6">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <p class="text-[10px] font-bold text-white/30 uppercase tracking-[0.15em] mb-1">Shared Policies</p>
                  <h3 class="text-sm font-bold text-white/90 tracking-wide">Policy Explorer</h3>
                </div>
                <div class="policy-type-badge" [ngClass]="getPolicyBadgeClass()">
                  <lucide-icon [img]="getPolicyIcon()" class="w-3.5 h-3.5"></lucide-icon>
                  <span>{{selectedPolicy}}</span>
                </div>
              </div>

              <div class="flex-1 flex flex-col justify-center">
                <div class="policy-inner-card group/pc relative overflow-hidden">
                  <div class="inner-shine absolute inset-0 opacity-0 group-hover/pc:opacity-100 transition-opacity duration-600"></div>

                  <div class="inner-card-header">
                    <div class="inner-icon-wrap" [ngClass]="getPolicyIconWrapClass()">
                      <lucide-icon [img]="getPolicyIcon()" class="w-5 h-5"></lucide-icon>
                    </div>
                    <div class="ml-4">
                      <p class="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-0.5">Plan Type</p>
                      <p class="text-base font-bold text-white leading-tight">{{currentPolicy.planType}}</p>
                    </div>
                    <div class="ml-auto">
                      <span class="status-badge" [ngClass]="currentPolicy.status === 'ACTIVE' ? 'active-badge' : 'expired-badge'">
                        <lucide-icon [img]="currentPolicy.status === 'ACTIVE' ? CheckCircle2 : AlertCircle" class="w-3 h-3"></lucide-icon>
                        {{currentPolicy.status}}
                      </span>
                    </div>
                  </div>

                  <div class="inner-divider"></div>

                  <div class="p-5 space-y-4">
                    <div>
                      <p class="detail-label">Plan Name</p>
                      <p class="detail-value">{{currentPolicy.planName}}</p>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <p class="detail-label">Policy Number</p>
                        <p class="detail-value font-mono text-[11px] tracking-widest">{{currentPolicy.policyNumber}}</p>
                      </div>
                      <div>
                        <p class="detail-label">Cover End</p>
                        <p class="detail-value" [ngClass]="currentPolicy.status === 'EXPIRED' ? 'text-red-300' : 'text-emerald-300'">{{currentPolicy.coverEnd}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 rounded-full bg-teal-400/20 border border-teal-400/30 flex items-center justify-center">
                    <lucide-icon [img]="Lock" class="w-2.5 h-2.5 text-teal-400"></lucide-icon>
                  </div>
                  <p class="text-[10px] text-white/30 font-medium tracking-wide">End-to-End Encrypted</p>
                </div>
                <button class="text-[10px] text-white/40 hover:text-white/70 flex items-center gap-1 transition-colors font-bold tracking-wide">
                  View Full Policy
                  <lucide-icon [img]="ArrowUpRight" class="w-3 h-3"></lucide-icon>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ── RIGHT: Accordion ── -->
        <div class="lg:col-span-7">
          <div class="accordion-panel flex flex-col h-full min-h-[500px]">

            <div class="accordion-panel-header">
              <div class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4318FF] via-indigo-400 to-transparent"></div>
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-sm font-bold text-[#1a2660] tracking-wide">Shared Information Details</h3>
                  <p class="text-[11px] text-[#A3AED0] mt-0.5 leading-relaxed">Review the specific data points authorized for this consent record</p>
                </div>
                <div class="panel-badge">
                  <lucide-icon [img]="BadgeCheck" class="w-3 h-3 text-indigo-500"></lucide-icon>
                  <span>{{getOpenCount()}} active</span>
                </div>
              </div>
            </div>

            <div class="flex-1 p-5 space-y-2.5 overflow-y-auto max-h-[600px] custom-scrollbar">

              <div class="top-accordion" [class.top-accordion--open]="policyOpen">
                <button (click)="policyOpen = !policyOpen" class="top-accordion-trigger">
                  <div class="flex items-center gap-3">
                    <div class="trigger-icon-wrap" [class.trigger-icon-wrap--active]="policyOpen" [ngClass]="getPolicyIconWrapStaticClass()">
                      <lucide-icon [img]="getPolicyIcon()" class="w-4 h-4"></lucide-icon>
                    </div>
                    <div>
                      <p class="text-xs font-bold text-[#1a2660] uppercase tracking-widest">{{selectedPolicy}} Policy</p>
                      <p class="text-[10px] text-[#A3AED0] mt-0.5">{{currentPolicy.sections.length}} data categories</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full" [ngClass]="getPolicyCountBadgeClass()">{{currentPolicy.sections.length}} sections</span>
                    <div class="chevron-wrap" [class.chevron-wrap--open]="policyOpen">
                      <lucide-icon [img]="ChevronDown" class="w-4 h-4 text-[#A3AED0]"></lucide-icon>
                    </div>
                  </div>
                </button>

                <div *ngIf="policyOpen" class="top-accordion-body animate-accordion-in">
                  <div *ngFor="let sub of currentPolicy.sections; let i = index"
                    class="sub-item"
                    [class.sub-item--open]="sub.open"
                    [style.animation-delay]="(i * 35) + 'ms'">

                    <button (click)="sub.open = !sub.open" class="sub-trigger group/sub">
                      <div class="flex items-center gap-3">
                        <div class="sub-dot" [class.sub-dot--open]="sub.open" [ngClass]="getPolicyDotClass(sub.open)"></div>
                        <span class="text-[11px] font-bold text-[#2B3674] transition-colors duration-150 tracking-wide"
                          [ngClass]="sub.open ? getPolicyTextClass() : 'group-hover/sub:text-[#4318FF]'">
                          {{sub.title}}
                        </span>
                      </div>
                      <div class="flex items-center gap-2">
                        <span *ngIf="sub.items" class="item-count-badge">{{sub.items.length}}</span>
                        <lucide-icon [img]="sub.open ? ChevronUp : ChevronDown"
                          class="w-3.5 h-3.5 text-[#A3AED0] transition-transform duration-200"></lucide-icon>
                      </div>
                    </button>

                    <div *ngIf="sub.open" class="sub-content animate-fade-in">
                      <div class="sub-accent-bar" [ngClass]="getPolicyAccentClass()"></div>

                      <ng-container *ngIf="sub.items">
                        <div *ngFor="let item of sub.items; let j = index"
                          class="data-row"
                          [style.animation-delay]="(j * 25) + 'ms'">
                          <div class="data-check" [ngClass]="getPolicyDataCheckClass()">
                            <lucide-icon [img]="CheckCircle2" class="w-3 h-3" [ngClass]="getPolicyCheckIconClass()"></lucide-icon>
                          </div>
                          <span class="text-[11px] font-medium text-[#2B3674] leading-relaxed">{{item}}</span>
                        </div>
                      </ng-container>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    :host {
      --brand: #4318FF;
      --teal: #05CD99;
      --navy: #1B2559;
      --navy-light: #2B3674;
      --text-muted: #A3AED0;
    }

    /* ── Page entrance ── */
    .animate-page-in {
      animation: pageIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    @keyframes pageIn {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .animate-accordion-in {
      animation: accordionIn 0.28s cubic-bezier(0.22,1,0.36,1) forwards;
    }
    @keyframes accordionIn {
      from { opacity:0; transform: scaleY(0.94); transform-origin: top; }
      to   { opacity:1; transform: scaleY(1); }
    }
    .animate-fade-in {
      animation: fadeIn 0.25s ease-out forwards;
    }
    @keyframes fadeIn {
      from { opacity:0; transform: translateY(-3px); }
      to   { opacity:1; transform: translateY(0); }
    }

    /* ═══════════════════════════════════════
       HERO BANNER
    ═══════════════════════════════════════ */
    .hero-banner {
      border-radius: 20px;
      box-shadow: 0 32px 80px rgba(12, 15, 46, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset;
    }
    .hero-bg {
      background: linear-gradient(145deg, #0C0F2E 0%, #141836 60%, #0E1428 100%);
    }
    .hero-grid {
      background-image:
        linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px);
      background-size: 32px 32px;
    }
    .hero-orb {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
    }
    .hero-orb--blue {
      width: 420px; height: 420px;
      top: -120px; right: -80px;
      background: radial-gradient(circle, rgba(67,24,255,0.4) 0%, transparent 70%);
      animation: orbFloat 9s ease-in-out infinite;
    }
    .hero-orb--teal {
      width: 280px; height: 280px;
      bottom: -60px; left: 20%;
      background: radial-gradient(circle, rgba(5,205,153,0.25) 0%, transparent 70%);
      animation: orbFloat 11s ease-in-out infinite reverse;
    }
    .hero-orb--violet {
      width: 200px; height: 200px;
      top: 20px; left: -40px;
      background: radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%);
      animation: orbFloat 7s ease-in-out infinite;
    }
    @keyframes orbFloat {
      0%,100% { transform: translate(0,0) scale(1); }
      50%      { transform: translate(-10px,12px) scale(1.06); }
    }
    .hero-scanline {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(99,102,241,0.8), rgba(5,205,153,0.6), transparent);
    }

    .hero-title {
      font-size: 1.65rem;
      font-weight: 900;
      color: white;
      letter-spacing: -0.025em;
      line-height: 1.1;
      text-shadow: 0 2px 20px rgba(67,24,255,0.3);
    }

    .hero-status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px 4px 8px;
      border-radius: 100px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      font-size: 11px;
      font-weight: 700;
      color: #34d399;
      letter-spacing: 0.04em;
    }
    .pulse-ring {
      width: 8px; height: 8px;
      border-radius: 50%;
      position: relative;
      display: flex; align-items: center; justify-content: center;
    }
    .pulse-ring::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: #34d399;
    }

    .hero-id-chip {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 3px 10px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 6px;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 11px;
      font-weight: 600;
      color: rgba(255,255,255,0.7);
      letter-spacing: 0.08em;
    }

    .copy-btn-hero {
      position: relative;
      color: rgba(255,255,255,0.4);
      padding: 5px;
      border-radius: 6px;
      transition: all 0.15s;
      display: flex; align-items: center; justify-content: center;
    }
    .copy-btn-hero:hover { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.8); }
    .copy-btn-hero:active { transform: scale(0.88); }
    .copy-toast-hero {
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%);
      background: white;
      color: var(--navy);
      font-size: 10px;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 5px;
      white-space: nowrap;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      animation: toastPop 0.2s ease-out;
    }
    @keyframes toastPop {
      from { opacity:0; transform: translateX(-50%) translateY(4px); }
      to   { opacity:1; transform: translateX(-50%) translateY(0); }
    }

    .hero-tag {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 3px 10px;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 100px;
      font-size: 10px;
      font-weight: 700;
      color: rgba(255,255,255,0.55);
      letter-spacing: 0.04em;
      transition: all 0.2s;
      cursor: default;
    }
    .hero-tag:hover {
      background: rgba(255,255,255,0.12);
      color: rgba(255,255,255,0.8);
      border-color: rgba(255,255,255,0.2);
    }

    .hero-avatar {
      width: 68px; height: 68px;
      position: relative;
      flex-shrink: 0;
    }
    .hero-avatar-inner {
      width: 68px; height: 68px;
      border-radius: 20px;
      background: linear-gradient(135deg, rgba(67,24,255,0.6), rgba(99,102,241,0.4));
      border: 1px solid rgba(255,255,255,0.15);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 8px 32px rgba(67,24,255,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
    }
    .hero-avatar-ring {
      position: absolute;
      inset: -4px;
      border-radius: 24px;
      border: 1px solid rgba(67,24,255,0.3);
      animation: ringPulse 3s ease-in-out infinite;
    }
    @keyframes ringPulse {
      0%,100% { opacity: 0.4; transform: scale(1); }
      50%      { opacity: 0.8; transform: scale(1.03); }
    }

    .hero-stats-strip {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 14px;
      backdrop-filter: blur(12px);
      overflow: hidden;
    }
    .hero-stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 14px 20px;
      min-width: 110px;
    }
    .hero-stat-label {
      font-size: 9px;
      font-weight: 700;
      color: rgba(255,255,255,0.3);
      text-transform: uppercase;
      letter-spacing: 0.12em;
      margin-bottom: 2px;
    }
    .hero-stat-value {
      font-size: 12px;
      font-weight: 800;
      color: rgba(255,255,255,0.85);
      letter-spacing: 0.02em;
    }
    .hero-stat-divider {
      width: 1px;
      background: rgba(255,255,255,0.08);
      margin: 10px 0;
    }

    .suspend-hero-btn {
      background: linear-gradient(135deg, #f59e0b, #f97316);
      color: white;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(249,115,22,0.35);
      transition: all 0.25s;
    }
    .suspend-hero-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 25px rgba(249,115,22,0.45);
    }
    .suspend-hero-btn:active { transform: translateY(0); box-shadow: none; }

    .hero-bottom-tabs {
      border-top: 1px solid rgba(255,255,255,0.07);
      padding-top: 2px;
    }
    .hero-tab {
      padding: 10px 18px;
      font-size: 11px;
      font-weight: 700;
      color: rgba(255,255,255,0.35);
      letter-spacing: 0.04em;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      transition: all 0.2s;
      user-select: none;
    }
    .hero-tab:hover { color: rgba(255,255,255,0.65); }
    .hero-tab--active {
      color: white;
      border-bottom-color: #4318FF;
    }

    /* ═══════════════════════════════════════
       META CARDS
    ═══════════════════════════════════════ */
    .meta-card {
      background: white;
      border: 1px solid rgba(226,232,240,0.8);
      border-radius: 20px;
      padding: 14px 16px;
      box-shadow: 0 1px 3px rgba(27,37,89,0.05), 0 4px 12px rgba(27,37,89,0.03);
      transition: all 0.3s cubic-bezier(0.2, 1, 0.2, 1);
    }
    .meta-card:hover {
      border-color: rgba(67,24,255,0.2);
      box-shadow: 
        0 20px 40px -12px rgba(112, 144, 176, 0.15),
        0 4px 6px -4px rgba(112, 144, 176, 0.05);
      transform: translateY(-4px);
    }
    .meta-label {
      font-size: 10px;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .meta-value {
      font-size: 13px;
      font-weight: 700;
      color: var(--navy-light);
    }
    .meta-status {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 4px;
      padding: 3px 10px;
      border-radius: 100px;
      background: rgba(16,185,129,0.08);
      border: 1px solid rgba(16,185,129,0.2);
      font-size: 11px;
      font-weight: 700;
      color: #059669;
    }
    .pulse-dot-sm {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 0 0 rgba(16,185,129,0.5);
    }

    /* ═══════════════════════════════════════
       POLICY CARD
    ═══════════════════════════════════════ */
    .policy-card {
      border-radius: 20px;
      box-shadow: 0 24px 60px rgba(12, 15, 46, 0.35), 0 0 0 1px rgba(255,255,255,0.1) inset;
    }
    .policy-bg {
      position: absolute; inset: 0;
      background: linear-gradient(145deg, #0C0F2E 0%, #141836 60%, #0E1428 100%);
      border-radius: 20px;
    }
    .policy-orb--blue {
      width: 250px; height: 250px;
      background: radial-gradient(circle, rgba(67,24,255,0.4) 0%, transparent 70%);
      animation: orbFloat 8s ease-in-out infinite;
      transform: translate(60%, -50%);
      border-radius: 50%;
    }
    .policy-orb--teal {
      width: 180px; height: 180px;
      background: radial-gradient(circle, rgba(5,205,153,0.3) 0%, transparent 70%);
      animation: orbFloat 12s ease-in-out infinite reverse;
      transform: translate(-30%, 30%);
      border-radius: 50%;
    }

    .policy-type-badge {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 6px 12px;
      background: rgba(5,205,153,0.1);
      border: 1px solid rgba(5,205,153,0.25);
      border-radius: 8px;
      font-size: 10px; font-weight: 800;
      color: rgba(255,255,255,0.7);
      letter-spacing: 0.1em;
    }

    .policy-inner-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px;
      overflow: hidden;
      transition: all 0.4s;
    }
    .policy-inner-card:hover {
      background: rgba(255,255,255,0.06);
      border-color: rgba(255,255,255,0.15);
    }
    .inner-shine {
      background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%);
      background-size: 200% 200%;
      animation: shineSweep 2.5s ease-in-out infinite;
      pointer-events: none;
    }
    @keyframes shineSweep {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    .inner-card-header {
      display: flex; align-items: center;
      padding: 16px 20px;
      background: rgba(255,255,255,0.04);
    }
    .inner-icon-wrap {
      width: 42px; height: 42px;
      border-radius: 50%;
      background: rgba(5,205,153,0.15);
      border: 1px solid rgba(5,205,153,0.3);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 0 20px rgba(5,205,153,0.2);
      flex-shrink: 0;
    }
    .inner-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
    }
    .detail-label {
      font-size: 9px;
      font-weight: 700;
      color: rgba(255,255,255,0.35);
      text-transform: uppercase;
      letter-spacing: 0.15em;
      margin-bottom: 3px;
    }
    .detail-value {
      font-size: 12px;
      font-weight: 700;
      color: rgba(255,255,255,0.85);
      letter-spacing: 0.03em;
    }
    .active-badge {
      background: rgba(16,185,129,0.12);
      border: 1px solid rgba(16,185,129,0.25);
      color: #6ee7b7;
    }
    .expired-badge {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 4px 10px;
      background: rgba(239,68,68,0.12);
      border: 1px solid rgba(239,68,68,0.25);
      border-radius: 6px;
      font-size: 10px; font-weight: 800;
      color: #fca5a5;
      letter-spacing: 0.08em;
    }
    .status-badge {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 10px; font-weight: 800;
      letter-spacing: 0.08em;
    }

    /* ═══════════════════════════════════════
       ACCORDION PANEL
    ═══════════════════════════════════════ */
    .accordion-panel {
      background: white;
      border: 1px solid rgba(226,232,240,0.8);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(27,37,89,0.07), 0 1px 4px rgba(27,37,89,0.05);
    }
    .accordion-panel-header {
      padding: 20px 24px;
      border-bottom: 1px solid rgba(226,232,240,0.7);
      background: linear-gradient(to right, rgba(238,242,255,0.5), white);
      position: relative;
    }
    .panel-badge {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 4px 10px;
      background: rgba(99,102,241,0.07);
      border: 1px solid rgba(99,102,241,0.15);
      border-radius: 8px;
      font-size: 10px; font-weight: 700;
      color: #4338ca;
    }

    .top-accordion {
      border: 1px solid rgba(226,232,240,0.8);
      border-radius: 20px;
      overflow: hidden;
      transition: box-shadow 0.2s, border-color 0.2s;
    }
    .top-accordion--open {
      border-color: rgba(99,102,241,0.25);
      box-shadow: 0 4px 20px rgba(67,24,255,0.06);
    }
    .top-accordion-trigger {
      width: 100%;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(248,250,252,0.8);
      transition: background 0.2s;
    }
    .top-accordion-trigger:hover { background: rgba(238,242,255,0.6); }
    .top-accordion-body {
      border-top: 1px solid rgba(226,232,240,0.6);
      background: rgba(249,250,251,0.5);
    }

    .trigger-icon-wrap {
      width: 36px; height: 36px;
      border-radius: 10px;
      background: rgba(238,242,255,1);
      color: #4318FF;
      border: 1px solid rgba(99,102,241,0.2);
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
      box-shadow: 0 1px 3px rgba(67,24,255,0.1);
    }
    .trigger-icon-wrap--active {
      background: #4318FF;
      color: white;
      border-color: transparent;
      box-shadow: 0 4px 12px rgba(67,24,255,0.35);
    }
    .chevron-wrap {
      width: 26px; height: 26px;
      border-radius: 50%;
      background: rgba(241,245,249,1);
      display: flex; align-items: center; justify-content: center;
      transition: all 0.25s;
    }
    .chevron-wrap--open { transform: rotate(180deg); background: rgba(238,242,255,1); }

    .sub-item {
      border-bottom: 1px solid rgba(226,232,240,0.5);
      animation: subSlideIn 0.22s cubic-bezier(0.22,1,0.36,1) both;
    }
    .sub-item:last-child { border-bottom: none; }
    @keyframes subSlideIn {
      from { opacity: 0; transform: translateX(-5px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    .sub-trigger {
      width: 100%;
      padding: 12px 16px 12px 24px;
      display: flex; justify-content: space-between; align-items: center;
      transition: background 0.15s;
    }
    .sub-trigger:hover { background: rgba(238,242,255,0.5); }

    .sub-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #cbd5e1;
      transition: all 0.2s;
      flex-shrink: 0;
    }
    .sub-dot--open {
      background: #4318FF;
      box-shadow: 0 0 0 3px rgba(67,24,255,0.15);
    }

    .sub-content {
      background: white;
      padding: 14px 18px 14px 36px;
      border-top: 1px solid rgba(226,232,240,0.5);
      position: relative;
    }
    .sub-accent-bar {
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 3px;
      background: linear-gradient(to bottom, #4318FF, rgba(67,24,255,0.1));
      border-radius: 0 2px 2px 0;
    }

    .item-count-badge {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 20px; height: 18px;
      padding: 0 6px;
      background: rgba(241,245,249,1);
      border: 1px solid rgba(226,232,240,0.8);
      border-radius: 5px;
      font-size: 9px; font-weight: 800;
      color: #64748b;
    }
    .item-count-badge--amber {
      background: rgba(254,243,199,1);
      border-color: rgba(251,191,36,0.3);
      color: #92400e;
    }

    .data-row {
      display: flex; align-items: flex-start;
      gap: 10px; padding: 6px 0;
      animation: dataRowIn 0.18s ease-out both;
    }
    @keyframes dataRowIn {
      from { opacity: 0; transform: translateX(-4px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    .data-check {
      width: 20px; height: 20px;
      border-radius: 50%;
      background: rgba(16,185,129,0.08);
      border: 1px solid rgba(16,185,129,0.2);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; margin-top: 1px;
      transition: all 0.15s;
    }
    .data-row:hover .data-check {
      background: rgba(16,185,129,0.15);
      border-color: rgba(16,185,129,0.4);
    }

    .premium-note {
      background: linear-gradient(135deg, rgba(255,251,235,1), rgba(255,243,199,0.6));
      border: 1px solid rgba(251,191,36,0.3);
      border-radius: 12px;
      padding: 14px;
      position: relative;
      overflow: hidden;
    }
    .premium-note::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, #f59e0b, #f97316);
    }
    .premium-note-header {
      display: flex; align-items: center; gap: 8px;
    }
    .premium-note-icon {
      width: 26px; height: 26px;
      border-radius: 7px;
      background: rgba(245,158,11,0.15);
      border: 1px solid rgba(245,158,11,0.3);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }

    /* ── Custom scrollbar ── */
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
export class ConsentDetailComponent {
  readonly ClipboardCheck = ClipboardCheck;
  readonly History = History;
  readonly HomeIcon = HomeIcon;
  readonly ChevronUp = ChevronUp;
  readonly ChevronDown = ChevronDown;
  readonly ShieldCheck = ShieldCheck;
  readonly ChevronLeft = ChevronLeft;
  readonly CheckCircle2 = CheckCircle2;
  readonly Lock = Lock;
  readonly Calendar = Calendar;
  readonly User = User;
  readonly Globe = Globe;
  readonly ArrowUpRight = ArrowUpRight;
  readonly Shield = Shield;
  readonly Building2 = Building2;
  readonly BadgeCheck = BadgeCheck;
  readonly AlertCircle = AlertCircle;
  readonly FileText = FileText;
  readonly Infinity = Infinity;

  readonly Heart = Heart;
  readonly Car = Car;
  readonly Plane = Plane;

  selectedPolicy: string = 'HOME';
  policyOpen = true;
  idCopied = false;

  private route = inject(ActivatedRoute);

  policyMockups: any = {
    '1': {
      type: 'HOME',
      planType: 'Villa',
      planName: 'HOME SAFE PLATINUM',
      policyNumber: 'A1317...R02',
      coverEnd: '29 Jul 2021',
      status: 'EXPIRED',
      icon: this.HomeIcon,
      color: 'emerald',
      sections: [
        { title: 'Policy Details', open: true, items: ['Your Insurance Policy Number', 'The cover start date and end date'] },
        { title: 'Customer Details', open: false, items: ['Your full name', 'Address information', 'Date of Birth'] },
        { title: 'Premium Details', open: false, items: ['Premium amount', 'Payment history'] }
      ]
    },
    '2': {
      type: 'MEDICAL',
      planType: 'Individual',
      planName: 'AFFINITY INDIVIDUAL',
      policyNumber: '601003',
      coverEnd: '06 Feb 2024',
      status: 'EXPIRED',
      icon: this.Heart,
      color: 'rose',
      sections: [
        { title: 'Member Details', open: true, items: ['Full Name of Member', 'Medical Card Number', 'Date of Birth'] },
        { title: 'Plan Coverage', open: false, items: ['In-patient Limits', 'Out-patient Co-payment', 'Dental/Optical Benefits'] },
        { title: 'Provider Network', open: false, items: ['List of Hospitals', 'Direct Billing Status'] }
      ]
    },
    '3': {
      type: 'TRAVEL',
      planType: 'Multi-Trip',
      planName: 'GLOBE TROTTER PLUS',
      policyNumber: 'TRV-4421-B',
      coverEnd: '12 Sep 2026',
      status: 'ACTIVE',
      icon: this.Plane,
      color: 'amber',
      sections: [
        { title: 'Trip Details', open: true, items: ['Destination Scope', 'Travel Dates', 'Flight PNR linkage'] },
        { title: 'Travelers', open: false, items: ['Primary Insured', 'Accompanying Family Members'] },
        { title: 'Emergency Contact', open: false, items: ['24/7 Helpline Number', 'Local Assistance Partners'] }
      ]
    },
    '4': {
      type: 'MOTOR',
      planType: 'Comprehensive',
      planName: 'MOTOR SECURE GOLD',
      policyNumber: 'M9921...X05',
      coverEnd: '15 Dec 2024',
      status: 'ACTIVE',
      icon: this.Car,
      color: 'indigo',
      sections: [
        { title: 'Vehicle Details', open: true, items: ['Plate Number', 'VIM / Chassis Number', 'Make/Model'] },
        { title: 'Coverage Scope', open: false, items: ['Third Party Liability', 'Roadside Assistance', 'Own Damage Cover'] },
        { title: 'Claims Profile', open: false, items: ['No-claims Bonus Level', 'Recent Claims History'] }
      ]
    }
  };

  get currentPolicy() {
    const id = this.route.snapshot.paramMap.get('id') || '1';
    const data = this.policyMockups[id] || this.policyMockups['1'];
    this.selectedPolicy = data.type;
    return data;
  }

  getPolicyIcon() { return this.currentPolicy.icon; }

  getPolicyColorClass() {
    switch (this.currentPolicy.color) {
      case 'rose': return 'text-rose-400';
      case 'amber': return 'text-amber-400';
      case 'indigo': return 'text-indigo-400';
      default: return 'text-emerald-400';
    }
  }

  getPolicyBadgeClass() {
    const base = 'policy-type-badge ';
    switch (this.currentPolicy.color) {
      case 'rose': return base + 'border-rose-200 bg-rose-50 text-rose-600';
      case 'amber': return base + 'border-amber-200 bg-amber-50 text-amber-600';
      case 'indigo': return base + 'border-indigo-200 bg-indigo-50 text-indigo-600';
      default: return base + 'border-emerald-200 bg-emerald-50 text-emerald-600';
    }
  }

  getPolicyIconWrapClass() {
    const base = 'inner-icon-wrap ';
    switch (this.currentPolicy.color) {
      case 'rose': return base + 'bg-rose-500/10 border-rose-500/20 text-rose-400';
      case 'amber': return base + 'bg-amber-500/10 border-amber-500/20 text-amber-400';
      case 'indigo': return base + 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400';
      default: return base + 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
    }
  }

  getPolicyIconWrapStaticClass() {
    const base = 'trigger-icon-wrap ';
    if (!this.policyOpen) return base;
    switch (this.currentPolicy.color) {
      case 'rose': return base + '!bg-rose-500 !text-white !border-transparent shadow-rose-200';
      case 'amber': return base + '!bg-amber-500 !text-white !border-transparent shadow-amber-200';
      case 'indigo': return base + '!bg-indigo-500 !text-white !border-transparent shadow-indigo-200';
      default: return base + '!bg-emerald-500 !text-white !border-transparent shadow-emerald-200';
    }
  }

  getPolicyCountBadgeClass() {
    switch (this.currentPolicy.color) {
      case 'rose': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'amber': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'indigo': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      default: return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    }
  }

  getPolicyDotClass(open: boolean) {
    if (!open) return '';
    switch (this.currentPolicy.color) {
      case 'rose': return '!bg-rose-500 shadow-[0_0_0_3px_rgba(244,63,94,0.15)]';
      case 'amber': return '!bg-amber-500 shadow-[0_0_0_3px_rgba(245,158,11,0.15)]';
      case 'indigo': return '!bg-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.15)]';
      default: return '!bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]';
    }
  }

  getPolicyTextClass() {
    switch (this.currentPolicy.color) {
      case 'rose': return 'text-rose-600';
      case 'amber': return 'text-amber-600';
      case 'indigo': return 'text-indigo-600';
      default: return 'text-emerald-600';
    }
  }

  getPolicyAccentClass() {
    switch (this.currentPolicy.color) {
      case 'rose': return 'bg-gradient-to-b from-rose-500 to-rose-50';
      case 'amber': return 'bg-gradient-to-b from-amber-500 to-amber-50';
      case 'indigo': return 'bg-gradient-to-b from-indigo-500 to-indigo-50';
      default: return 'bg-gradient-to-b from-emerald-500 to-emerald-50';
    }
  }

  getPolicyDataCheckClass() {
    switch (this.currentPolicy.color) {
      case 'rose': return 'bg-rose-50 border-rose-100';
      case 'amber': return 'bg-amber-50 border-amber-100';
      case 'indigo': return 'bg-indigo-50 border-indigo-100';
      default: return 'bg-emerald-50 border-emerald-100';
    }
  }

  getPolicyCheckIconClass() {
    switch (this.currentPolicy.color) {
      case 'rose': return 'text-rose-500';
      case 'amber': return 'text-amber-500';
      case 'indigo': return 'text-indigo-500';
      default: return 'text-emerald-500';
    }
  }

  getOpenCount(): number {
    return this.currentPolicy.sections.filter((s: any) => s.open).length;
  }

  copyId() {
    navigator.clipboard.writeText('6a14XXXXXXX54c5');
    this.idCopied = true;
    setTimeout(() => this.idCopied = false, 2000);
  }
}