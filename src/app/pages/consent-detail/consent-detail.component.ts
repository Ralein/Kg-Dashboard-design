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
    <div class="space-y-8 pb-10">

      <!-- Page Title -->
      <div class="flex items-center justify-between">
         <div>
            <h1 class="text-3xl font-bold text-primary tracking-tight">Consent Details</h1>
            <p class="text-secondary text-sm mt-1 font-medium">Detailed view of authorization #7164...1277</p>
         </div>
         
         <a routerLink="/consents" class="btn-primary bg-white/50 text-primary hover:bg-white hover:text-accent border-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
            Back to List
         </a>
      </div>

      <!-- Info Banner Glass Card -->
      <div class="glass-card overflow-hidden animate-spring" style="animation-delay: 100ms">
         
         <!-- Top Section with Gradient -->
         <div class="px-8 py-6 bg-gradient-to-r from-accent/5 to-transparent border-b border-white/40">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                <div class="flex items-start gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-white/60 shadow-glass flex items-center justify-center text-accent">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <div>
                        <div class="flex items-center gap-3">
                            <h2 class="text-xl font-bold text-primary font-mono tracking-tight">7164XXXXXXX1277</h2>
                            <button (click)="copyId()" class="text-secondary hover:text-accent transition-colors relative" title="Copy ID">
                                @if(!copied) {
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                                } @else {
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-success"><polyline points="20 6 9 17 4 12"/></svg>
                                }
                            </button>
                        </div>
                        <div class="flex items-center gap-3 mt-1">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-success/10 text-success ring-1 ring-success/20">
                                <span class="w-1.5 h-1.5 rounded-full bg-success"></span>
                                Authorized
                            </span>
                            <span class="text-xs font-bold text-secondary uppercase tracking-wider">Long-Lived</span>
                        </div>
                    </div>
                </div>

                <div class="flex gap-4">
                   <button class="px-5 py-2.5 rounded-xl bg-danger/10 text-danger font-bold text-sm hover:bg-danger hover:text-white transition-all shadow-sm hover:shadow-lg hover:shadow-danger/30 flex items-center gap-2">
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                       Suspend Consent
                   </button>
                </div>

            </div>
         </div>

         <!-- Details Grid -->
         <div class="px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
             <div>
                 <p class="text-xs font-bold text-secondary uppercase tracking-wider mb-1">TPP Client</p>
                 <p class="text-sm font-bold text-primary">TPP Client Test</p>
             </div>
             <div>
                 <p class="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Customer</p>
                 <p class="text-sm font-bold text-primary">AZIZ ELGOUZOULI</p>
                 <p class="text-xs text-secondary font-mono mt-0.5">784-1983-3183718-1</p>
             </div>
             <div>
                 <p class="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Valid From</p>
                 <p class="text-sm font-bold text-primary">18 Feb 2026</p>
             </div>
             <div>
                 <p class="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Expires On</p>
                 <p class="text-sm font-bold text-primary">29 Dec 2026</p>
             </div>
              <div>
                 <p class="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Linked Email</p>
                 <p class="text-sm font-bold text-primary">travelopen&#64;gmail.com</p>
             </div>
              <div>
                 <p class="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Base Consent</p>
                 <p class="text-xs font-bold text-primary font-mono">8dfbXXXXXXXbce1</p>
             </div>
         </div>

      </div>

      <!-- Content Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-spring" style="animation-delay: 200ms">
        
        <!-- Left Column: Policies -->
        <div class="lg:col-span-1 space-y-6">
           <div class="glass-card p-6">
              <h3 class="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                 <svg class="text-accent" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                 Shared Policies
              </h3>
              
              <div class="space-y-4">
                 <!-- Policy Item -->
                 <div class="bg-white/40 rounded-xl p-4 border border-white/50 hover:bg-white/60 transition-colors">
                    <div class="flex items-center justify-between mb-3">
                        <span class="px-2.5 py-1 rounded-lg bg-accent text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-accent/20">Travel</span>
                        <span class="w-2 h-2 rounded-full bg-danger" title="Expired"></span>
                    </div>
                    
                    <div class="space-y-3">
                       <div class="flex justify-between items-center text-sm">
                          <span class="text-secondary font-medium">Policy No.</span>
                          <span class="text-primary font-bold font-mono">HTL34008957</span>
                       </div>
                       <div class="flex justify-between items-center text-sm">
                          <span class="text-secondary font-medium">Plan</span>
                          <span class="text-primary font-bold text-right truncate ml-4">INDIVIDUAL-MEDICAL & TRAVEL</span>
                       </div>
                       <div class="flex justify-between items-center text-sm">
                          <span class="text-secondary font-medium">End Date</span>
                          <span class="text-primary font-bold">21 Sept 2025</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <!-- Right Column: Requested Info -->
        <div class="lg:col-span-2 space-y-6">
           <div class="glass-card p-6">
               <h3 class="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                 <svg class="text-accent" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                 Information Requested by TPP
              </h3>
              
              <div class="space-y-4">
                 @for (section of sections; track section.title) {
                    <div class="border border-white/40 rounded-xl overflow-hidden bg-white/30 hover:bg-white/50 transition-colors">
                        
                        <!-- Header -->
                        <button (click)="section.open = !section.open" class="w-full px-5 py-4 flex items-center justify-between text-left">
                            <span class="flex items-center gap-3 font-bold text-primary">
                                @if (section.icon) {
                                    <svg class="text-accent" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                } @else {
                                    <svg class="text-secondary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                                }
                                {{ section.title }}
                            </span>
                            <svg 
                                class="text-secondary transition-transform duration-300" 
                                [class.rotate-180]="section.open"
                                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            >
                                <polyline points="6 9 12 15 18 9"/>
                            </svg>
                        </button>

                        <!-- Body -->
                        @if (section.open) {
                            <div class="border-t border-white/20 bg-white/20 px-5 py-4 space-y-4">
                                @for (sub of section.subSections; track sub.title) {
                                    <div class="bg-white/40 rounded-lg p-4">
                                        <h4 class="text-sm font-bold text-primary mb-3">{{ sub.title }}</h4>
                                        <ul class="space-y-2">
                                            @for (item of sub.items; track item) {
                                                <li class="flex items-center gap-2 text-sm text-secondary font-medium">
                                                    <svg class="text-success" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
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
    { label: 'Policy Number', value: 'HTL34008957', highlight: 'info' },
    { label: 'Plan Name', value: 'INDIVIDUAL-MEDICAL & TRAVEL ASST(M PLUS)', highlight: '' },
    { label: 'Passport Number', value: 'XQ3154786', highlight: '' },
    { label: 'Status', value: 'EXPIRED', highlight: 'danger' },
    { label: 'Cover End Date', value: '21 Sept 2025', highlight: '' },
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
    navigator.clipboard?.writeText('7164XXXXXXX1277').catch(() => { });
    this.copied = true;
    setTimeout(() => { this.copied = false; }, 2000);
  }
}