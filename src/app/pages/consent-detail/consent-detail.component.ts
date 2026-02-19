import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronLeft, FileCheck, ShieldCheck, User, Mail, Calendar, Hash, Globe, Activity, Trash2, StopCircle, ClipboardCheck, AlertCircle } from 'lucide-angular';

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
  imports: [RouterLink, CommonModule, LucideAngularModule],
  template: `
    <div class="flex flex-col gap-6 animate-fade-in-up">
      <!-- Top Action Bar -->
      <div class="flex justify-between items-center px-4">
         <div class="flex items-center gap-3">
            <button routerLink="/consent-management" class="p-2 bg-white rounded-lg shadow-sm border border-gray-100 text-[#4318FF] hover:bg-gray-50 transition-colors">
               <lucide-icon [img]="ChevronLeft" class="w-4 h-4"></lucide-icon>
            </button>
            <h2 class="text-xl font-bold text-[#2B3674] tracking-tight">Consent Details</h2>
         </div>
         <div class="flex items-center gap-2">
            <button class="px-6 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-[#2B3674] hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2">
               <lucide-icon [img]="StopCircle" class="w-4 h-4"></lucide-icon>
               Suspend Consent
            </button>
         </div>
      </div>

      <!-- Main Info Card -->
      <div class="chart-shell bg-white/70 backdrop-blur-xl border border-white/40 shadow-glass p-8 mx-4">
        <div class="flex flex-col lg:flex-row gap-8 justify-between items-start">
           <div class="flex items-start gap-4">
              <div class="w-16 h-16 bg-[#4318FF]/10 rounded-2xl flex items-center justify-center text-[#4318FF]">
                 <lucide-icon [img]="ShieldCheck" class="w-8 h-8"></lucide-icon>
              </div>
              <div class="flex flex-col gap-1">
                 <div class="flex items-center gap-3">
                    <h2 class="text-2xl font-bold text-[#2B3674] tracking-tight">7164XXXXXXX1277</h2>
                    <button (click)="copyId()" class="p-1.5 hover:bg-gray-100 rounded-lg text-[#A3AED0] transition-colors">
                       <lucide-icon [img]="ClipboardCheck" class="w-4 h-4"></lucide-icon>
                    </button>
                 </div>
                 <div class="flex gap-2">
                    <span class="px-3 py-0.5 rounded-md bg-[#05CD99]/10 text-[#05CD99] text-[10px] font-bold tracking-wider uppercase">Authorized</span>
                    <span class="px-3 py-0.5 rounded-md bg-[#4318FF]/10 text-[#4318FF] text-[10px] font-bold tracking-wider uppercase">Long-Lived</span>
                 </div>
              </div>
           </div>
           
           <div class="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-6 flex-1 lg:ml-12 border-l border-gray-100/50 pl-12">
              <div class="flex flex-col gap-1">
                 <span class="text-[10px] font-bold text-[#A3AED0] uppercase">TPP Client</span>
                 <span class="text-sm font-bold text-[#2B3674]">TPP Client Test</span>
              </div>
              <div class="flex flex-col gap-1">
                 <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Customer</span>
                 <span class="text-sm font-bold text-[#2B3674]">AZIZ ELGOUZOULI</span>
                 <span class="text-[10px] font-mono font-medium text-[#A3AED0]">784-1983-3183718-1</span>
              </div>
              <div class="flex flex-col gap-1">
                 <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Valid From</span>
                 <span class="text-sm font-bold text-[#2B3674]">18 Feb 2026</span>
              </div>
              <div class="flex flex-col gap-1">
                 <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Expires On</span>
                 <span class="text-sm font-bold text-[#2B3674]">29 Dec 2026</span>
              </div>
              <div class="flex flex-col gap-1">
                 <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Linked Email</span>
                 <span class="text-xs font-medium text-[#2B3674]">travelopen&#64;gmail.com</span>
              </div>
              <div class="flex flex-col gap-1">
                 <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Base Consent</span>
                 <span class="text-[11px] font-mono font-bold text-[#2B3674]">8dfbXXXXXXXbce1</span>
              </div>
           </div>
        </div>
      </div>

      <!-- Nested Content -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mx-4 mb-10">
         <!-- Left: Shared Policies -->
         <div class="lg:col-span-4">
            <div class="chart-shell p-6 bg-white/70 backdrop-blur-xl border border-white/40 shadow-glass">
               <div class="flex items-center gap-3 mb-6">
                  <lucide-icon [img]="FileCheck" class="w-5 h-5 text-[#4318FF]"></lucide-icon>
                  <h3 class="text-sm font-extrabold text-[#2B3674] uppercase tracking-wider">Shared Policies</h3>
               </div>
               <div class="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 relative overflow-hidden group">
                  <div class="absolute top-0 right-0 w-24 h-24 bg-[#FF5252]/5 rounded-bl-full animate-pulse transition-transform group-hover:scale-110"></div>
                  <div class="flex justify-between items-start mb-4">
                     <span class="px-3 py-1 rounded bg-[#4318FF] text-white text-[10px] font-extrabold tracking-widest uppercase shadow-lg shadow-[#4318FF]/20">TRAVEL</span>
                     <lucide-icon [img]="AlertCircle" class="w-4 h-4 text-[#FF5252]"></lucide-icon>
                  </div>
                  <div class="space-y-4">
                     <div class="flex justify-between">
                        <span class="text-[11px] font-bold text-[#A3AED0]">Policy No.</span>
                        <span class="text-[11px] font-mono font-extrabold text-[#2B3674]">HTL34008957</span>
                     </div>
                     <div class="flex flex-col gap-1">
                        <span class="text-[11px] font-bold text-[#A3AED0]">Plan</span>
                        <span class="text-[11px] font-extrabold text-[#2B3674]">INDIVIDUAL-MEDICAL & TRAVEL</span>
                     </div>
                     <div class="flex justify-between">
                        <span class="text-[11px] font-bold text-[#A3AED0]">End Date</span>
                        <span class="text-[11px] font-extrabold text-[#2B3674]">21 Sept 2025</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <!-- Right: Info Requested -->
         <div class="lg:col-span-8">
            <div class="chart-shell p-6 bg-white/70 backdrop-blur-xl border border-white/40 shadow-glass">
               <div class="flex items-center gap-3 mb-8">
                  <lucide-icon [img]="Activity" class="w-5 h-5 text-[#4318FF]"></lucide-icon>
                  <h3 class="text-sm font-extrabold text-[#2B3674] uppercase tracking-wider">Information Requested by TPP</h3>
               </div>
               
               <div class="flex flex-col gap-4">
                 <div *ngFor="let section of sections" class="border border-gray-100/50 rounded-2xl bg-white/40 overflow-hidden">
                    <button (click)="section.open = !section.open" class="w-full px-6 py-5 flex items-center justify-between group transition-all">
                       <span class="flex items-center gap-4 text-xs font-extrabold text-[#2B3674] uppercase tracking-widest">
                          <lucide-icon [img]="section.icon ? Globe : FileCheck" class="w-4 h-4 text-[#A3AED0] group-hover:text-[#4318FF] transition-colors"></lucide-icon>
                          {{section.title}}
                       </span>
                       <lucide-icon [img]="ChevronLeft" class="w-4 h-4 text-[#A3AED0] transform transition-transform duration-300" [class.-rotate-90]="section.open" [class.rotate-0]="!section.open"></lucide-icon>
                    </button>
                    <div *ngIf="section.open" class="px-6 pb-6 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                        <div *ngFor="let sub of section.subSections" class="bg-gray-50/50 rounded-xl p-5 border border-gray-100/30">
                           <h4 class="text-[11px] font-extrabold text-[#2B3674] uppercase tracking-widest mb-4 flex items-center gap-2">
                              <div class="w-1 h-3 bg-[#4318FF] rounded-full"></div>
                              {{sub.title}}
                           </h4>
                           <div class="flex flex-col gap-3">
                              <div *ngFor="let item of sub.items" class="flex items-center gap-3">
                                 <lucide-icon [img]="ClipboardCheck" class="w-3.5 h-3.5 text-[#05CD99]"></lucide-icon>
                                 <span class="text-xs font-semibold text-[#A3AED0]">{{item}}</span>
                              </div>
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
  styles: [`:host { display: block; }`]
})
export class ConsentDetailComponent {
  copied = false;

  readonly ChevronLeft = ChevronLeft;
  readonly FileCheck = FileCheck;
  readonly ShieldCheck = ShieldCheck;
  readonly User = User;
  readonly Mail = Mail;
  readonly Calendar = Calendar;
  readonly Hash = Hash;
  readonly Globe = Globe;
  readonly Activity = Activity;
  readonly Trash2 = Trash2;
  readonly StopCircle = StopCircle;
  readonly ClipboardCheck = ClipboardCheck;
  readonly AlertCircle = AlertCircle;

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