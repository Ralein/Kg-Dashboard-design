import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { LucideAngularModule, ChevronLeft, ShieldCheck, ClipboardCheck, History, Home as HomeIcon, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-angular';

interface NestedItem {
  title: string;
  items?: string[];
  description?: string;
  open: boolean;
}

interface MainSection {
  title: string;
  icon: any;
  open: boolean;
  subSections: NestedItem[];
}

@Component({
  selector: 'app-consent-detail',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink],
  template: `
    <div class="flex flex-col gap-6 animate-fade-in-up">
      <!-- Header Area -->
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-[#1B2559]">Consent Details</h1>
      </div>

      <!-- Main Metadata Banner -->
      <div class="chart-shell bg-white shadow-glass p-0 overflow-hidden border border-gray-100">
        <!-- Top Row -->
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 p-6 border-b border-gray-50">
          <div class="flex flex-col gap-1">
            <span class="text-[11px] font-bold text-[#A3AED0]">Consent ID:</span>
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-[#2B3674] font-mono">6a14XXXXXXX54c5</span>
              <button (click)="copyId()" class="text-[#4318FF] hover:bg-[#4318FF]/5 p-1 rounded transition-colors">
                <lucide-icon [img]="ClipboardCheck" class="w-3.5 h-3.5"></lucide-icon>
              </button>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[11px] font-bold text-[#A3AED0]">Status:</span>
            <span class="text-sm font-bold text-[#2B3674]">Authorized</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[11px] font-bold text-[#A3AED0]">TPP Name:</span>
            <span class="text-sm font-bold text-[#2B3674]">TPP Client Test</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[11px] font-bold text-[#A3AED0]">Consent Type:</span>
            <span class="text-sm font-bold text-[#2B3674]">Long-Lived</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[11px] font-bold text-[#A3AED0]">Emirates ID:</span>
            <span class="text-sm font-bold text-[#2B3674]">784-1940-6161905-5</span>
          </div>
          <div class="flex items-start justify-end">
            <button class="w-full py-2 bg-[#FFA000] text-white text-xs font-bold rounded-lg hover:bg-[#FF8F00] transition-colors shadow-lg shadow-[#FFA000]/20 flex items-center justify-center gap-2">
              <span class="inline-block w-3 h-3 border-2 border-white/40 rounded-full border-t-white"></span>
              Suspend
            </button>
          </div>
        </div>

        <!-- Bottom Row -->
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 p-6 items-center">
          <div class="flex flex-col gap-1">
            <span class="text-[11px] font-bold text-[#A3AED0]">Email:</span>
            <span class="text-sm font-bold text-[#2B3674]">homedata&#64;gmail.com</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[11px] font-bold text-[#A3AED0]">Base Consent ID:</span>
            <span class="text-sm font-bold text-[#2B3674] font-mono">1d15XXXXXXXbeb1</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[11px] font-bold text-[#A3AED0]">Created Date:</span>
            <span class="text-sm font-bold text-[#2B3674]">19 Feb 2026</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[11px] font-bold text-[#A3AED0]">Expiration Date:</span>
            <span class="text-sm font-bold text-[#2B3674]">29 Dec 2026</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[11px] font-bold text-[#A3AED0]">Authorization Channel:</span>
            <span class="text-sm font-bold text-[#2B3674]">Web</span>
          </div>
          <div class="flex items-center justify-end gap-3 lg:col-span-1">
             <button class="flex items-center gap-1.5 text-[11px] font-bold text-[#2B3674] hover:text-[#4318FF] transition-colors">
                <lucide-icon [img]="History" class="w-4 h-4"></lucide-icon>
                <span class="border-b border-[#2B3674]">List of Updates</span>
             </button>
             <button routerLink="/consent-management" class="px-4 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-[#2B3674] hover:bg-gray-50">Back</button>
          </div>
        </div>
      </div>

      <!-- Main Layout Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <!-- Left: Policy Explorer -->
        <div class="lg:col-span-5 flex flex-col gap-6">
          <div class="chart-shell bg-white p-6 shadow-glass border border-gray-100 flex-1">
             <h3 class="text-sm font-bold text-[#2B3674] mb-6">Policy(s) to share with TPP Client Test</h3>
             
             <!-- Filter Icons -->
             <div class="flex gap-2 mb-6">
                <button class="px-5 py-2 bg-[#1B2559] text-white rounded-full flex items-center gap-2 text-xs font-bold transition-all shadow-lg shadow-[#1B2559]/20">
                   <lucide-icon [img]="HomeIcon" class="w-4 h-4"></lucide-icon>
                   HOME
                </button>
             </div>

             <!-- Policy Card -->
             <div class="border-2 border-[#1B2559] rounded-2xl p-6 relative overflow-hidden bg-white">
                <div class="absolute top-0 left-0 w-1 bg-[#1B2559] h-full"></div>
                <div class="flex items-center gap-3 mb-6">
                   <lucide-icon [img]="HomeIcon" class="w-5 h-5 text-[#05CD99]"></lucide-icon>
                   <span class="text-md font-bold text-[#2B3674]">Villa</span>
                </div>
                
                <div class="space-y-4">
                   <div class="flex flex-col gap-0.5">
                      <span class="text-xs font-bold text-[#A3AED0]">Plan Name:</span>
                      <span class="text-xs font-bold text-[#2B3674]">HOME SAFE PLATINUM</span>
                   </div>
                   <div class="flex flex-col gap-0.5">
                      <span class="text-xs font-bold text-[#A3AED0]">Policy Number:</span>
                      <span class="text-xs font-bold text-[#2B3674] font-mono uppercase">A13170006228-R02</span>
                   </div>
                   <div class="flex flex-col gap-0.5">
                      <span class="text-xs font-bold text-[#A3AED0]">Status:</span>
                      <span class="text-xs font-bold text-[#2B3674]">EXPIRED</span>
                   </div>
                   <div class="flex flex-col gap-0.5">
                      <span class="text-xs font-bold text-[#A3AED0]">Cover End Date:</span>
                      <span class="text-xs font-bold text-[#2B3674]">29 Jul 2021</span>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <!-- Right: Accordion Review -->
        <div class="lg:col-span-7">
          <div class="chart-shell bg-white p-0 shadow-glass border border-gray-100 flex flex-col min-h-[600px]">
             <div class="p-6 border-b border-gray-50">
               <h3 class="text-sm font-bold text-[#2B3674]">Review the info you will be sharing</h3>
             </div>
             
             <div class="flex-1 p-6 space-y-4">
               <!-- Top Level "HOME" Accordion -->
               <div class="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                  <button (click)="toggleHome()" class="w-full p-4 flex justify-between items-center group bg-white hover:bg-gray-50 transition-colors">
                     <div class="flex items-center gap-3">
                        <lucide-icon [img]="HomeIcon" class="w-4 h-4 text-[#2B3674]"></lucide-icon>
                        <span class="text-xs font-bold text-[#2B3674] uppercase tracking-widest">HOME</span>
                     </div>
                     <lucide-icon [img]="homeOpen ? ChevronUp : ChevronDown" class="w-4 h-4 text-[#A3AED0]"></lucide-icon>
                  </button>

                  <div *ngIf="homeOpen" class="border-t border-gray-50 flex flex-col">
                     <div *ngFor="let sub of sections" class="border-b border-gray-50 last:border-b-0">
                        <button (click)="sub.open = !sub.open" class="w-full p-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors pl-8">
                           <span class="text-xs font-bold text-[#2B3674]">{{sub.title}}</span>
                           <lucide-icon [img]="sub.open ? ChevronUp : ChevronDown" class="w-4 h-4 text-[#A3AED0]"></lucide-icon>
                        </button>
                        
                        <div *ngIf="sub.open" class="bg-gray-50 px-8 py-4 space-y-3 animate-fade-in pl-12">
                           <ng-container *ngIf="sub.items">
                              <div *ngFor="let item of sub.items" class="flex items-start gap-3">
                                 <span class="text-xs font-medium text-[#2B3674] leading-relaxed flex items-start gap-2">
                                    <span class="mt-1.5 w-1 h-1 bg-[#2B3674] rounded-full shrink-0"></span>
                                    {{item}}
                                 </span>
                              </div>
                           </ng-container>
                           <p *ngIf="sub.description" class="text-xs font-medium text-[#2B3674] leading-relaxed border-l-2 border-[#FFA000] pl-4 italic">
                              {{sub.description}}
                           </p>
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
    :host {
      display: block;
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.5s ease-out forwards;
    }
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class ConsentDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);

  readonly ClipboardCheck = ClipboardCheck;
  readonly History = History;
  readonly HomeIcon = HomeIcon;
  readonly ChevronUp = ChevronUp;
  readonly ChevronDown = ChevronDown;

  homeOpen = true;

  sections: NestedItem[] = [
    {
      title: 'Policy Details',
      open: true,
      items: [
        'Your Insurance Policy Number',
        'The cover start date and end date, when applicable'
      ]
    },
    {
      title: 'Your Basic Customer Details',
      open: false,
      items: [
        'Your full name',
        'Address information',
        'Contact information',
        'Date of Birth'
      ]
    },
    {
      title: 'Your Detailed Customer Details',
      open: false,
      items: [
        'Your identity details',
        'Your employment details, when held.'
      ]
    },
    {
      title: 'Product Information',
      open: false,
      items: [
        'Your insurance coverage details',
        'Details of the item, property, or individual covered under the insurance policy.',
        'Details of any insurance cover add-ons included in the policy',
        'Details of the parties covered by the insurance policy'
      ]
    },
    {
      title: 'Claims Details',
      open: false,
      items: [
        'Details of any insurance claims declared during the insurance application.',
        'Details of any subsequent claims made during the duration of the policy.'
      ]
    },
    {
      title: 'Premium Details',
      open: false,
      description: 'As part of your consent, the premium details for the selected insurance policies will be securely shared with TPP Client Test. To protect this information, your premium details will be encrypted when requested. A one-time code will be sent to your mobile ending 971. You will need to provide this code to TPP Client Test when prompted, so they can display your premium details. Please note: this code will expire after 2 hours. After that, the premium details won’t be available to view unless you request them again.'
    },
    {
      title: 'Payment Details',
      open: false,
      items: [
        'Your bank account details used or being used to make the insurance premiums.'
      ]
    }
  ];

  ngOnInit() { }

  toggleHome() {
    this.homeOpen = !this.homeOpen;
  }

  copyId() {
    navigator.clipboard.writeText('6a14XXXXXXX54c5');
    // Optional: show toast/notification
  }
}