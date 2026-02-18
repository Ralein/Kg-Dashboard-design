import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-consent-detail',
    imports: [RouterLink],
    template: `
    <div class="space-y-6">
      <!-- Page Title -->
      <h1 class="text-2xl font-bold text-primary">Consent Details</h1>

      <!-- Info Banner -->
      <div class="bg-card rounded-xl border border-border overflow-hidden">
        <!-- Top Row -->
        <div class="bg-accent/5 border-b border-accent/20 px-6 py-4 flex items-start justify-between">
          <div class="grid grid-cols-5 gap-8 flex-1">
            <div>
              <p class="text-xs text-text-light font-medium mb-1">Consent ID:</p>
              <p class="text-sm font-semibold text-text flex items-center gap-1">
                7164XXXXXXX1277
                <button class="text-info hover:text-primary cursor-pointer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
              </p>
            </div>
            <div>
              <p class="text-xs text-text-light font-medium mb-1">Status:</p>
              <p class="text-sm font-semibold text-status-authorized">Authorized</p>
            </div>
            <div>
              <p class="text-xs text-text-light font-medium mb-1">TPP Name:</p>
              <p class="text-sm font-semibold text-text">TPP Client Test</p>
            </div>
            <div>
              <p class="text-xs text-text-light font-medium mb-1">Consent Type:</p>
              <p class="text-sm font-semibold text-text">Long-Lived</p>
            </div>
            <div>
              <p class="text-xs text-text-light font-medium mb-1">Emirates ID:</p>
              <p class="text-sm font-semibold text-text">784-1983-3183718-1</p>
            </div>
          </div>
          <button class="bg-accent hover:bg-accent-light text-white px-6 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer shrink-0 ml-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
            Suspend
          </button>
        </div>

        <!-- Bottom Row -->
        <div class="px-6 py-4 flex items-center justify-between">
          <div class="grid grid-cols-5 gap-8 flex-1">
            <div>
              <p class="text-xs text-text-light font-medium mb-1">Email:</p>
              <p class="text-sm font-semibold text-text">travelopen&#64;gmail.com</p>
            </div>
            <div>
              <p class="text-xs text-text-light font-medium mb-1">Base Consent ID:</p>
              <p class="text-sm font-semibold text-text">8dfbXXXXXXXbce1</p>
            </div>
            <div>
              <p class="text-xs text-text-light font-medium mb-1">Created Date:</p>
              <p class="text-sm font-semibold text-text">18 Feb 2026</p>
            </div>
            <div>
              <p class="text-xs text-text-light font-medium mb-1">Expiration Date:</p>
              <p class="text-sm font-semibold text-text">29 Dec 2026</p>
            </div>
            <div>
              <p class="text-xs text-text-light font-medium mb-1">Authorization Channel:</p>
              <p class="text-sm font-semibold text-text">Web</p>
            </div>
          </div>
          <div class="flex items-center gap-3 shrink-0 ml-4">
            <a class="text-info text-sm hover:underline cursor-pointer">List of Updates</a>
            <a routerLink="/consents" class="border border-border px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer text-text">
              Back
            </a>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Left: Policies Column -->
        <div class="space-y-4">
          <div class="bg-card rounded-xl border border-border p-6">
            <h3 class="text-base font-semibold text-text mb-4">Policy(s) to share with TPP Client Test</h3>

            <!-- Policy Badge -->
            <div class="mb-4">
              <span class="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                TRAVEL
              </span>
            </div>

            <!-- Policy Card -->
            <div class="border border-border rounded-lg p-5 space-y-3">
              <div class="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f5a623" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                <h4 class="font-semibold text-text">Travel</h4>
              </div>
              <div class="space-y-2 text-sm">
                <div class="flex">
                  <span class="text-text-light w-40 shrink-0">Policy Number:</span>
                  <span class="text-info font-medium">HTL34008957</span>
                </div>
                <div class="flex">
                  <span class="text-text-light w-40 shrink-0">Plan Name:</span>
                  <span class="text-text">INDIVIDUAL-MEDICAL & TRAVEL ASST(M PLUS)</span>
                </div>
                <div class="flex">
                  <span class="text-text-light w-40 shrink-0">Passport Number:</span>
                  <span class="text-text">XQ3154786</span>
                </div>
                <div class="flex">
                  <span class="text-text-light w-40 shrink-0">Status:</span>
                  <span class="text-danger font-medium">EXPIRED</span>
                </div>
                <div class="flex">
                  <span class="text-text-light w-40 shrink-0">Cover End Date:</span>
                  <span class="text-text">21 Sept 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Info Sections Column -->
        <div class="space-y-4">
          <div class="bg-card rounded-xl border border-border p-6">
            <h3 class="text-base font-semibold text-text mb-4">Review the info you will be sharing</h3>

            <!-- Accordion Items -->
            <div class="space-y-3">
              @for (section of sections; track section.title) {
                <div class="border border-border rounded-lg overflow-hidden">
                  <button
                    (click)="section.open = !section.open"
                    class="w-full px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <span class="flex items-center gap-2 font-medium text-sm text-text">
                      @if (section.icon) {
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                      }
                      {{ section.title }}
                    </span>
                    <svg
                      class="transition-transform duration-200"
                      [class.rotate-180]="section.open"
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  @if (section.open) {
                    <div class="px-5 py-3 border-t border-border bg-gray-50/30">
                      @if (section.subSections) {
                        <div class="space-y-3">
                          @for (sub of section.subSections; track sub.title) {
                            <div class="border border-border rounded-lg overflow-hidden bg-white">
                              <button
                                (click)="sub.open = !sub.open"
                                class="w-full px-4 py-2.5 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                              >
                                <span class="font-medium text-sm text-text">{{ sub.title }}</span>
                                <svg
                                  class="transition-transform duration-200"
                                  [class.rotate-180]="sub.open"
                                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                >
                                  <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                              </button>
                              @if (sub.open) {
                                <div class="px-4 py-3 border-t border-border text-sm text-text-light">
                                  <ul class="space-y-1 list-disc list-inside">
                                    @for (item of sub.items; track item) {
                                      <li>{{ item }}</li>
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
    styles: [`
    :host { display: block; }
  `]
})
export class ConsentDetailComponent {
    sections = [
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
                    items: [
                        'Full Name',
                        'Emirates ID',
                        'Email Address',
                        'Phone Number'
                    ]
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
                    items: [
                        'Date of Birth',
                        'Nationality',
                        'Address',
                        'Occupation'
                    ]
                }
            ]
        }
    ];
}
