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
      <div class="flex justify-between items-center mb-2">
        <h1 class="text-2xl font-black text-[#2B3674] tracking-tight">Consent Details</h1>
        <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold border border-indigo-100">ID: 6a14...54c5</span>
        </div>
      </div>

      <!-- Main Metadata Banner -->
      <div class="premium-glass p-0 overflow-hidden">
        <!-- Top Row -->
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 p-6 border-b border-white/20 bg-white/5">
          <div class="flex flex-col gap-1">
            <span class="text-[10px] uppercase font-bold text-[#A3AED0] tracking-wider">Consent ID</span>
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-[#2B3674] font-mono">6a14XXXXXXX54c5</span>
              <button (click)="copyId()" class="text-[#4318FF] hover:bg-[#4318FF]/10 p-1.5 rounded-lg transition-colors">
                <lucide-icon [img]="ClipboardCheck" class="w-3.5 h-3.5"></lucide-icon>
              </button>
            </div>
          </div>
          <div class="flex flex-col gap-2 items-start">
            <span class="text-[10px] uppercase font-bold text-[#A3AED0] tracking-wider">Status</span>
            <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Authorized
            </span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] uppercase font-bold text-[#A3AED0] tracking-wider">TPP Name</span>
            <span class="text-sm font-bold text-[#2B3674]">TPP Client Test</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] uppercase font-bold text-[#A3AED0] tracking-wider">Consent Type</span>
            <span class="text-sm font-bold text-[#2B3674]">Long-Lived</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] uppercase font-bold text-[#A3AED0] tracking-wider">Emirates ID</span>
            <span class="text-sm font-bold text-[#2B3674]">784-1940-6161905-5</span>
          </div>
          <div class="flex items-start justify-end">
            <button class="w-full py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 border border-white/20">
              <lucide-icon [img]="ShieldCheck" class="w-3.5 h-3.5"></lucide-icon>
              Suspend
            </button>
          </div>
        </div>

        <!-- Bottom Row -->
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 p-6 items-center">
          <div class="flex flex-col gap-1">
            <span class="text-[10px] uppercase font-bold text-[#A3AED0] tracking-wider">Email</span>
            <span class="text-sm font-bold text-[#2B3674]">homedata&#64;gmail.com</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] uppercase font-bold text-[#A3AED0] tracking-wider">Base Consent ID</span>
            <span class="text-sm font-bold text-[#2B3674] font-mono">1d15XXXXXXXbeb1</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] uppercase font-bold text-[#A3AED0] tracking-wider">Created Date</span>
            <span class="text-sm font-bold text-[#2B3674]">19 Feb 2026</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] uppercase font-bold text-[#A3AED0] tracking-wider">Expiration Date</span>
            <span class="text-sm font-bold text-[#2B3674]">29 Dec 2026</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] uppercase font-bold text-[#A3AED0] tracking-wider">Channel</span>
            <span class="text-sm font-bold text-[#2B3674]">Web</span>
          </div>
          <div class="flex items-center justify-end gap-3 lg:col-span-1">
             <button class="flex items-center gap-1.5 text-[10px] font-bold text-[#4318FF] hover:underline transition-colors">
                <lucide-icon [img]="History" class="w-3.5 h-3.5"></lucide-icon>
                History
             </button>
             <button routerLink="/consent-management" class="flex items-center gap-1 px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-[#2B3674] hover:bg-gray-50 hover:shadow-md transition-all">
                <lucide-icon [img]="ChevronLeft" class="w-3.5 h-3.5"></lucide-icon>
                Back
             </button>
          </div>
        </div>
      </div>

      <!-- Main Layout Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <!-- Left: Policy Explorer -->
        <div class="lg:col-span-5 flex flex-col gap-6">
          <div class="premium-glass p-6 flex flex-col h-full bg-gradient-to-br from-[#1B2559] to-[#111633] text-white relative overflow-hidden group">
             <!-- Decorative Background -->
             <div class="absolute top-0 right-0 w-64 h-64 bg-[#4318FF] rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
             <div class="absolute bottom-0 left-0 w-48 h-48 bg-[#05CD99] rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity duration-700"></div>

             <div class="relative z-10 flex flex-col h-full">
                 <div class="flex items-center justify-between mb-6">
                    <h3 class="text-sm font-bold text-white/90">Policy(s) Shared</h3>
                    <div class="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white flex items-center gap-1.5 shadow-lg">
                        <lucide-icon [img]="HomeIcon" class="w-3 h-3"></lucide-icon>
                        HOME
                    </div>
                 </div>
                 
                 <div class="flex-1 flex flex-col justify-center">
                    <!-- Glass Card -->
                    <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden hover:bg-white/10 transition-colors duration-300">
                        <div class="flex items-center gap-4 mb-6">
                           <div class="w-10 h-10 rounded-full bg-[#05CD99]/20 flex items-center justify-center text-[#05CD99] border border-[#05CD99]/30 shadow-[0_0_15px_rgba(5,205,153,0.3)]">
                                <lucide-icon [img]="HomeIcon" class="w-5 h-5"></lucide-icon>
                           </div>
                           <div>
                                <span class="block text-xs font-medium text-white/60 uppercase tracking-widest">Plan Type</span>
                                <span class="text-lg font-bold text-white">Villa</span>
                           </div>
                        </div>
                        
                        <div class="space-y-5">
                           <div class="flex flex-col gap-1">
                              <span class="text-[10px] font-bold text-white/40 uppercase tracking-wider">Plan Name</span>
                              <span class="text-sm font-medium text-white tracking-wide">HOME SAFE PLATINUM</span>
                           </div>
                           <div class="grid grid-cols-2 gap-4">
                               <div class="flex flex-col gap-1">
                                  <span class="text-[10px] font-bold text-white/40 uppercase tracking-wider">Policy Number</span>
                                  <span class="text-xs font-bold text-white font-mono tracking-widest">A1317...R02</span>
                               </div>
                               <div class="flex flex-col gap-1">
                                  <span class="text-[10px] font-bold text-white/40 uppercase tracking-wider">Status</span>
                                  <span class="text-xs font-bold text-red-300 flex items-center gap-1">
                                    <span class="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                                    EXPIRED
                                  </span>
                               </div>
                           </div>
                           <div class="flex flex-col gap-1 pt-2 border-t border-white/10">
                              <span class="text-[10px] font-bold text-white/40 uppercase tracking-wider">Cover End Date</span>
                              <span class="text-sm font-bold text-white">29 Jul 2021</span>
                           </div>
                        </div>
                    </div>
                 </div>
                 
                 <div class="mt-6 text-center">
                    <p class="text-[10px] text-white/30 font-medium">Secured by End-to-End Encryption</p>
                 </div>
             </div>
          </div>
        </div>

        <!-- Right: Accordion Review -->
        <div class="lg:col-span-7">
          <div class="premium-glass p-0 flex flex-col h-full min-h-[500px]">
             <div class="p-6 border-b border-white/10 bg-white/5">
               <h3 class="text-sm font-bold text-[#2B3674]">Shared Information Details</h3>
               <p class="text-xs text-[#A3AED0] mt-1">Review the specific data points authorized for this client</p>
             </div>
             
             <div class="flex-1 p-6 space-y-4 overflow-y-auto max-h-[600px] custom-scrollbar">
               <!-- Top Level "HOME" Accordion -->
               <div class="border border-white/20 rounded-xl overflow-hidden shadow-sm bg-white/40 backdrop-blur-sm">
                  <button (click)="toggleHome()" class="w-full p-4 flex justify-between items-center group hover:bg-white/60 transition-colors">
                     <div class="flex items-center gap-3">
                        <div class="p-2 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-[#4318FF] group-hover:text-white transition-colors">
                            <lucide-icon [img]="HomeIcon" class="w-4 h-4"></lucide-icon>
                        </div>
                        <span class="text-xs font-bold text-[#2B3674] uppercase tracking-widest">HOME POLICY</span>
                     </div>
                     <lucide-icon [img]="homeOpen ? ChevronUp : ChevronDown" class="w-4 h-4 text-[#A3AED0] transition-transform duration-300"></lucide-icon>
                  </button>

                  <div *ngIf="homeOpen" class="border-t border-white/10 flex flex-col bg-white/20">
                     <div *ngFor="let sub of sections" class="border-b border-white/10 last:border-b-0">
                        <button (click)="sub.open = !sub.open" class="w-full p-4 flex justify-between items-center hover:bg-white/40 transition-colors pl-6">
                           <span class="text-xs font-bold text-[#2B3674]">{{sub.title}}</span>
                           <lucide-icon [img]="sub.open ? ChevronUp : ChevronDown" class="w-3.5 h-3.5 text-[#A3AED0]"></lucide-icon>
                        </button>
                        
                        <div *ngIf="sub.open" class="bg-indigo-50/30 px-6 py-4 space-y-3 animate-fade-in pl-10 border-t border-white/5 relative">
                           <div class="absolute left-0 top-0 bottom-0 w-1 bg-[#4318FF]"></div>
                           <ng-container *ngIf="sub.items">
                              <div *ngFor="let item of sub.items" class="flex items-start gap-3 group/item">
                                 <lucide-icon [img]="CheckCircle2" class="w-3.5 h-3.5 text-[#05CD99] mt-0.5 shrink-0 opacity-70 group-hover/item:opacity-100 transition-opacity"></lucide-icon>
                                 <span class="text-xs font-medium text-[#2B3674] leading-relaxed">
                                    {{item}}
                                 </span>
                              </div>
                           </ng-container>
                           <p *ngIf="sub.description" class="text-xs font-medium text-[#2B3674] leading-relaxed p-3 bg-amber-50 rounded-lg border border-amber-100 text-amber-900">
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
  readonly ShieldCheck = ShieldCheck;
  readonly ChevronLeft = ChevronLeft;
  readonly CheckCircle2 = CheckCircle2;

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