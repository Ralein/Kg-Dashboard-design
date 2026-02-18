import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface SubSection {
  title: string;
  open: boolean;
  items: string[];
}

interface Section {
  title: string;
  icon: boolean;
  open: boolean;
  subSections: SubSection[];
}

@Component({
  selector: 'app-consent-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <style>
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(14px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes expandDown {
        from { opacity: 0; transform: translateY(-6px); max-height: 0; }
        to   { opacity: 1; transform: translateY(0);   max-height: 600px; }
      }
      @keyframes copyPop {
        0%   { transform: scale(1); }
        40%  { transform: scale(1.3); }
        100% { transform: scale(1); }
      }
      @keyframes checkFade {
        0%   { opacity: 0; transform: scale(0.6); }
        40%  { opacity: 1; transform: scale(1.2); }
        100% { opacity: 1; transform: scale(1); }
      }

      .fade-up  { animation: fadeUp 0.4s cubic-bezier(.22,1,.36,1) both; }
      .expand   { animation: expandDown 0.28s cubic-bezier(.22,1,.36,1) both; overflow: hidden; }

      /* ── Banner card ── */
      .info-banner {
        transition: box-shadow 0.2s;
        box-shadow: 0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(30,42,90,.05);
      }

      /* ── Meta field ── */
      .meta-label {
        font-size: 10px;
        font-weight: 600;
        letter-spacing: .09em;
        text-transform: uppercase;
        color: #9ca3af;
        margin-bottom: 3px;
      }
      .meta-value {
        font-size: 13px;
        font-weight: 600;
        color: #1a202c;
        line-height: 1.4;
      }

      /* ── Copy button ── */
      .copy-btn {
        transition: color 0.15s, transform 0.15s;
        cursor: pointer;
      }
      .copy-btn:hover  { color: #1e2a5a; }
      .copy-btn.popped { animation: copyPop 0.3s ease; }

      /* ── Suspend button ── */
      .suspend-btn {
        transition: background 0.18s, transform 0.15s, box-shadow 0.18s;
      }
      .suspend-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 14px rgba(239,68,68,0.3);
      }
      .suspend-btn:active { transform: scale(0.97); }

      /* ── Back button ── */
      .back-btn {
        transition: background 0.15s, border-color 0.15s, transform 0.15s;
      }
      .back-btn:hover {
        background: #f3f4f6;
        border-color: #d1d5db;
        transform: translateX(-2px);
      }

      /* ── Policy card ── */
      .policy-card {
        transition: box-shadow 0.2s, transform 0.2s;
      }
      .policy-card:hover {
        box-shadow: 0 4px 18px rgba(30,42,90,0.1);
        transform: translateY(-2px);
      }

      /* ── Accordion ── */
      .accordion-header {
        transition: background 0.15s;
        position: relative;
      }
      .accordion-header:hover { background: #f9fafb; }

      .accordion-chevron {
        transition: transform 0.25s cubic-bezier(.22,1,.36,1), color 0.15s;
        color: #9ca3af;
      }
      .accordion-chevron.open {
        transform: rotate(180deg);
        color: #1e2a5a;
      }

      .accordion-body {
        animation: expandDown 0.25s cubic-bezier(.22,1,.36,1) both;
        overflow: hidden;
      }

      /* ── Policy badge ── */
      .policy-badge {
        transition: box-shadow 0.18s, transform 0.15s;
      }
      .policy-badge:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(30,42,90,0.25);
      }

      /* ── List items ── */
      .info-item {
        transition: background 0.15s, padding-left 0.15s;
        border-radius: 6px;
        padding: 3px 6px;
        margin-left: -6px;
      }
      .info-item:hover {
        background: rgba(30,42,90,0.04);
        padding-left: 10px;
      }

      /* ── Divider ── */
      .section-divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, #e5e7eb 20%, #e5e7eb 80%, transparent);
        margin: 4px 0;
      }

      /* status pill */
      .status-pill {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 3px 10px;
        border-radius: 99px;
        font-size: 12px;
        font-weight: 600;
      }
    </style>

    <div class="space-y-6">

      <!-- ── Page Title ── -->
      <h1 class="fade-up text-2xl font-bold text-primary" style="animation-delay:0ms">
        Consent Details
      </h1>

      <!-- ── Info Banner ── -->
      <div class="fade-up info-banner bg-card rounded-xl border border-border overflow-hidden" style="animation-delay:60ms">

        <!-- Top Row -->
        <div class="bg-accent/5 border-b border-accent/20 px-6 py-5 flex items-start justify-between gap-4">
          <div class="grid grid-cols-5 gap-6 flex-1">

            <!-- Consent ID -->
            <div>
              <p class="meta-label">Consent ID</p>
              <p class="meta-value flex items-center gap-1.5">
                <span class="font-mono text-xs tracking-wide">7164XXXXXXX1277</span>
                <button
                  class="copy-btn text-gray-400"
                  [class.popped]="copied"
                  (click)="copyId()"
                  aria-label="Copy consent ID"
                >
                  @if (!copied) {
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                  } @else {
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"
                      style="animation: checkFade 0.3s ease both">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  }
                </button>
              </p>
            </div>

            <!-- Status -->
            <div>
              <p class="meta-label">Status</p>
              <span class="status-pill bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 mt-1">
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block"></span>
                Authorized
              </span>
            </div>

            <!-- TPP Name -->
            <div>
              <p class="meta-label">TPP Name</p>
              <p class="meta-value">TPP Client Test</p>
            </div>

            <!-- Consent Type -->
            <div>
              <p class="meta-label">Consent Type</p>
              <p class="meta-value">Long-Lived</p>
            </div>

            <!-- Emirates ID -->
            <div>
              <p class="meta-label">Emirates ID</p>
              <p class="meta-value font-mono text-xs tracking-wide">784-1983-3183718-1</p>
            </div>
          </div>

          <!-- Suspend button -->
          <button
            class="suspend-btn bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full text-sm font-semibold
                   flex items-center gap-2 cursor-pointer shrink-0 shadow-sm"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
              stroke-linecap="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            Suspend
          </button>
        </div>

        <!-- Bottom Row -->
        <div class="px-6 py-4 flex items-center justify-between gap-4">
          <div class="grid grid-cols-5 gap-6 flex-1">
            <div>
              <p class="meta-label">Email</p>
              <p class="meta-value text-xs">travelopen&#64;gmail.com</p>
            </div>
            <div>
              <p class="meta-label">Base Consent ID</p>
              <p class="meta-value font-mono text-xs tracking-wide">8dfbXXXXXXXbce1</p>
            </div>
            <div>
              <p class="meta-label">Created Date</p>
              <p class="meta-value">18 Feb 2026</p>
            </div>
            <div>
              <p class="meta-label">Expiration Date</p>
              <p class="meta-value">29 Dec 2026</p>
            </div>
            <div>
              <p class="meta-label">Authorization Channel</p>
              <p class="meta-value">Web</p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3 shrink-0">
            <a class="text-sm font-medium text-info hover:underline cursor-pointer transition-colors">
              List of Updates
            </a>
            <a routerLink="/consents"
              class="back-btn border border-border px-5 py-2 rounded-lg text-sm font-medium cursor-pointer text-text
                     flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Back
            </a>
          </div>
        </div>
      </div>

      <!-- ── Content Grid ── -->
      <div class="fade-up grid grid-cols-1 lg:grid-cols-2 gap-6" style="animation-delay:120ms">

        <!-- ── Left: Policies ── -->
        <div class="space-y-4">
          <div class="bg-card rounded-xl border border-border p-6"
            style="box-shadow:0 1px 3px rgba(0,0,0,.05)">

            <h3 class="text-sm font-semibold text-text mb-4 flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              Policy(s) to share with <span class="text-primary">TPP Client Test</span>
            </h3>

            <!-- Badge -->
            <div class="mb-4">
              <span class="policy-badge inline-flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide cursor-default shadow-sm">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                  <line x1="4" y1="22" x2="4" y2="15"/>
                </svg>
                TRAVEL
              </span>
            </div>

            <!-- Policy card -->
            <div class="policy-card border border-border rounded-xl p-5 space-y-3 bg-white">
              <div class="flex items-center gap-2 pb-2 border-b border-gray-100">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                  <line x1="4" y1="22" x2="4" y2="15"/>
                </svg>
                <h4 class="font-bold text-sm text-text tracking-tight">Travel</h4>
              </div>

              <div class="space-y-2.5 text-sm">
                @for (field of policyFields; track field.label) {
                  <div class="flex items-start">
                    <span class="text-gray-400 w-40 shrink-0 text-xs font-medium pt-0.5">{{ field.label }}</span>
                    <span
                      class="font-medium text-xs leading-relaxed"
                      [class.text-info]="field.highlight === 'info'"
                      [class.text-red-500]="field.highlight === 'danger'"
                      [class.text-text]="!field.highlight"
                    >{{ field.value }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        <!-- ── Right: Info Sharing ── -->
        <div class="space-y-4">
          <div class="bg-card rounded-xl border border-border p-6"
            style="box-shadow:0 1px 3px rgba(0,0,0,.05)">

            <h3 class="text-sm font-semibold text-text mb-4 flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              Review the info you will be sharing
            </h3>

            <div class="space-y-2">
              @for (section of sections; track section.title; let i = $index) {
                <div
                  class="border border-border rounded-xl overflow-hidden transition-all duration-200"
                  [style.animation-delay]="(i * 60) + 'ms'"
                  [class.border-primary]="section.open"
                  style="box-shadow: {{ section.open ? '0 2px 10px rgba(30,42,90,0.07)' : 'none' }}"
                >
                  <!-- Accordion header -->
                  <button
                    (click)="section.open = !section.open"
                    class="accordion-header w-full px-5 py-3.5 flex items-center justify-between cursor-pointer"
                    [style.background]="section.open ? 'rgba(30,42,90,0.03)' : 'white'"
                  >
                    <span class="flex items-center gap-2 font-semibold text-sm"
                      [class.text-primary]="section.open"
                      [class.text-text]="!section.open"
                    >
                      @if (section.icon) {
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          [attr.stroke]="section.open ? '#1e2a5a' : '#9ca3af'" stroke-width="2">
                          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                          <line x1="4" y1="22" x2="4" y2="15"/>
                        </svg>
                      } @else {
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          [attr.stroke]="section.open ? '#1e2a5a' : '#9ca3af'" stroke-width="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                      }
                      {{ section.title }}
                    </span>
                    <svg
                      class="accordion-chevron"
                      [class.open]="section.open"
                      width="15" height="15" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" stroke-width="2"
                    >
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>

                  <!-- Accordion body -->
                  @if (section.open) {
                    <div class="accordion-body border-t border-border bg-gray-50/40 px-5 py-4">
                      @if (section.subSections) {
                        <div class="space-y-2">
                          @for (sub of section.subSections; track sub.title) {
                            <div class="border border-gray-200 rounded-lg overflow-hidden bg-white">
                              <button
                                (click)="sub.open = !sub.open"
                                class="accordion-header w-full px-4 py-2.5 flex items-center justify-between cursor-pointer"
                              >
                                <span class="font-semibold text-xs tracking-wide"
                                  [class.text-primary]="sub.open"
                                  [class.text-gray-600]="!sub.open"
                                >{{ sub.title }}</span>
                                <svg
                                  class="accordion-chevron"
                                  [class.open]="sub.open"
                                  width="13" height="13" viewBox="0 0 24 24"
                                  fill="none" stroke="currentColor" stroke-width="2"
                                >
                                  <polyline points="6 9 12 15 18 9"/>
                                </svg>
                              </button>
                              @if (sub.open) {
                                <div class="accordion-body border-t border-gray-100 px-4 py-3">
                                  <ul class="space-y-1.5">
                                    @for (item of sub.items; track item) {
                                      <li class="info-item flex items-center gap-2 text-xs text-gray-600">
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1e2a5a" stroke-width="3">
                                          <polyline points="20 6 9 17 4 12"/>
                                        </svg>
                                        {{ item }}
                                      </li>
                                    }
                                  </ul>
                                </div>
                              }
                            </div>
                          }
                        </div>
                      }
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class ConsentDetailComponent {
  copied = false;

  readonly policyFields = [
    { label: 'Policy Number',  value: 'HTL34008957',                               highlight: 'info'   },
    { label: 'Plan Name',      value: 'INDIVIDUAL-MEDICAL & TRAVEL ASST(M PLUS)',  highlight: ''       },
    { label: 'Passport Number',value: 'XQ3154786',                                 highlight: ''       },
    { label: 'Status',         value: 'EXPIRED',                                   highlight: 'danger' },
    { label: 'Cover End Date', value: '21 Sept 2025',                              highlight: ''       },
  ];

  sections: Section[] = [
    {
      title: 'TRAVEL',
      icon: true,
      open: true,
      subSections: [
        {
          title: 'Policy Details',
          open: true,
          items: [
            'Your Insurance Policy Number',
            'The cover start date and end date, when applicable'
          ]
        }
      ]
    },
    {
      title: 'Your Basic Customer Details',
      icon: false,
      open: false,
      subSections: [
        {
          title: 'Personal Info',
          open: false,
          items: ['Full Name', 'Emirates ID', 'Email Address', 'Phone Number']
        }
      ]
    },
    {
      title: 'Your Detailed Customer Details',
      icon: false,
      open: false,
      subSections: [
        {
          title: 'Extended Info',
          open: false,
          items: ['Date of Birth', 'Nationality', 'Address', 'Occupation']
        }
      ]
    }
  ];

  copyId(): void {
    navigator.clipboard?.writeText('7164XXXXXXX1277').catch(() => {});
    this.copied = true;
    setTimeout(() => { this.copied = false; }, 2000);
  }
}