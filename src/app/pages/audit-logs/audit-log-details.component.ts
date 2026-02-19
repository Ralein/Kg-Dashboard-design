import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { LucideAngularModule, ChevronLeft, Download, X } from 'lucide-angular';

@Component({
    selector: 'app-audit-log-details',
    standalone: true,
    imports: [CommonModule, LucideAngularModule, RouterLink],
    template: `
    <div class="flex flex-col gap-6 animate-fade-in-up">
      <!-- Top Action Bar -->
      <div class="flex justify-between items-center px-4">
         <div class="flex items-center gap-3">
            <button routerLink="/audit-logs" class="p-2 bg-white rounded-lg shadow-sm border border-gray-100 text-[#4318FF] hover:bg-gray-50 transition-colors">
               <lucide-icon [img]="ChevronLeft" class="w-4 h-4"></lucide-icon>
            </button>
            <h2 class="text-lg font-bold text-[#20244F]">Audit Log Details</h2>
         </div>
         <div class="flex items-center gap-2">
            <button class="p-2 text-[#4318FF] hover:bg-gray-50 rounded-lg"><lucide-icon [img]="Download" class="w-5 h-5"></lucide-icon></button>
            <button routerLink="/audit-logs" class="p-2 text-[#4318FF] hover:bg-gray-50 rounded-lg"><lucide-icon [img]="X" class="w-5 h-5"></lucide-icon></button>
         </div>
      </div>

      <!-- Main Banner Details -->
      <div class="chart-shell bg-white/70 backdrop-blur-xl border border-white/40 shadow-glass p-8 mx-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Timestamp:</span>
            <span class="text-sm font-medium text-[#2B3674]">Feb 19, 2026, 10:26:55 AM</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Service Name:</span>
            <span class="text-sm font-medium text-[#2B3674]">Adnic service</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase">HTTP Method:</span>
            <span class="text-sm font-medium text-[#2B3674]">-</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Endpoint Path:</span>
            <span class="text-sm font-medium text-[#2B3674]">v2.0</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Status Code:</span>
            <div class="flex items-center gap-2">
               <span class="bg-[#05CD99] text-white text-[10px] px-2 py-0.5 rounded font-bold">200</span>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Duration (ms):</span>
            <span class="text-sm font-medium text-[#2B3674]">3350</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase">GroupName:</span>
            <span class="text-sm font-medium text-[#2B3674]">Create Insurance Quote</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Username:</span>
            <span class="text-sm font-medium text-[#2B3674]">-</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase">User Roles:</span>
            <span class="text-sm font-medium text-[#2B3674]">-</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Client IP:</span>
            <span class="text-sm font-medium text-[#2B3674]">-</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase">User Agent:</span>
            <span class="text-sm font-medium text-[#2B3674]">-</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Trace ID:</span>
            <span class="text-[11px] font-mono font-medium text-[#2B3674] whitespace-nowrap overflow-hidden text-ellipsis">a615d49f-12be-43d2-84ea-6defaae999c1</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Module:</span>
            <span class="text-xs font-medium text-[#2B3674]">com.kgis.openfinance.ozone.dynamic.controller.DynamicApiController</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Operation:</span>
            <span class="text-sm font-medium text-[#2B3674]">handleDynamicCreateQuoteRequest</span>
          </div>
          <div class="flex flex-col gap-1 lg:col-span-2">
            <div class="flex gap-12">
               <div class="flex flex-col gap-1">
                  <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Action:</span>
                  <span class="text-sm font-medium text-[#2B3674]">Quotation</span>
               </div>
               <div class="flex flex-col gap-1">
                  <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Request Headers:</span>
                  <span class="text-sm font-medium text-[#2B3674]">-</span>
               </div>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Response Headers:</span>
            <span class="text-sm font-medium text-[#2B3674]">-</span>
          </div>
          <div class="flex flex-col gap-1 lg:col-span-2">
            <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Exception Message:</span>
            <span class="text-sm font-medium text-[#2B3674]">-</span>
          </div>
        </div>
      </div>

      <!-- JSON Viewers Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">
        <!-- Query Params -->
        <div class="chart-shell p-6 bg-white/70 backdrop-blur-xl border border-white/40 shadow-glass min-h-[300px]">
           <div class="flex items-center justify-between mb-4">
              <h3 class="text-xs font-extrabold text-[#2B3674] uppercase tracking-wider">Query Params</h3>
           </div>
           <div class="flex flex-col items-center justify-center h-[200px] opacity-30 select-none">
              <span class="text-xs font-bold text-[#A3AED0]">No data</span>
           </div>
        </div>

        <!-- Request Body -->
        <div class="chart-shell p-6 bg-white/70 backdrop-blur-xl border border-white/40 shadow-glass min-h-[300px]">
           <div class="flex items-center justify-between mb-4">
              <h3 class="text-xs font-extrabold text-[#2B3674] uppercase tracking-wider">Request Body</h3>
           </div>
                <pre class="text-[10px] font-mono text-[#2B3674] leading-relaxed">
{{ '{' }}
  "v2.0, home-insurance-quotes, {{ '{' }}"data": {{ '{' }}
    "CustomerId": "string",
    "QuoteReference": "cbuae-home-2.1-02",
    "QuoteType": "New",
    "PolicyIssuanceRequest": {{ '{' }}
      "CustomerVerification": true,
      "Payment": true,
      "PolicyDocuments": true
    {{ '}' }},
    "Policy": {{ '{' }}
      "TypeOfCover": "BuildingsOnly",
      "PolicyStartDate": "2026-11-20",
      "PolicyEndDate": "2027-11-19",
      "AddOns": {{ '{' }}
        "AccidentalDamageCover": true,
        "PersonalBelongingsCover": true,
        "LiabilityCover": true,
        "DomesticHelpersCover": true,
        "ClaimsInLastThreeYears": true
      {{ '}' }}
    {{ '}' }}
  {{ '}' }}
{{ '}' }}</pre>
        </div>

        <!-- Response Body -->
        <div class="chart-shell p-6 bg-white/70 backdrop-blur-xl border border-white/40 shadow-glass min-h-[300px]">
           <div class="flex items-center justify-between mb-4">
              <h3 class="text-xs font-extrabold text-[#2B3674] uppercase tracking-wider">Response Body</h3>
           </div>
           <div class="bg-gray-50/50 rounded-xl p-4 overflow-auto max-h-[400px]">
              <pre class="text-[10px] font-mono text-[#2B3674] leading-relaxed">
{{ '{' }}
  "<201 CREATED Created, {{ '{' }}data={{ '{' }}Premium={{ '{' }}Status=Initial,
  TotalPremiumAmount={{ '{' }}Amount=, Currency={{ '}' }}, InstallmentOptions=
  [OneTime], PaymentFrequency=OneTime, TotalDiscountAmount=
  {{ '{' }}Amount=, Currency={{ '}' }}, DiscountApplied=[{{ '{' }}DiscountPercentage=,
  DiscountName=, DiscountAmount={{ '{' }}Amount=, Currency={{ '}' }}{{ '}' }}],
  PremiumAmountExcludingVAT={{ '{' }}Currency=, Amount={{ '}' }}, VATAmount=
  {{ '{' }}Amount=180.00, Currency={{ '}' }}, VATPercentage=0.05{{ '}' }}, ServiceRating=,
  ClaimsServicePerformance={{ '{' }}ClaimsPaymentCapacityRatio=,
  AverageClaimSettlementTime=, ClaimSettlementRatio=,
  ComplaintResolutionTime=, NetPromoterScore=,
  CustomerComplaintRate={{ '}' }}, FinancialStrength={{ '{' }}YearsInBusiness=,
  SolvencyRatio={{ '}' }}, PolicyDigitalConvenience=
  {{ '{' }}CustomerSupportAvailability=[], DigitalPolicyIssuance=,
  SelfServiceOptions=[]{{ '}' }}, DigitalClaimsFiling={{ '}' }}{{ '}' }},
  RequiredDocuments=[], PolicyCover=[{{ '{' }}CoverType=,
  PolicyFeatures=, CoverLimitAmount={{ '{' }}Currency=AED,
  Amount=400,000{{ '}' }}, CoverID=, Description=Home Insurance -
  PLATINUM - Contents, PolicyExcess={{ '{' }}Currency=AED,
  ..."</pre>
           </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    :host {
      display: block;
      padding: 24px;
    }
    pre { white-space: pre-wrap; word-wrap: break-word; }
  `]
})
export class AuditLogDetailsComponent implements OnInit {
    private route = inject(ActivatedRoute);

    readonly ChevronLeft = ChevronLeft;
    readonly Download = Download;
    readonly X = X;

    ngOnInit() {
        // In real app, load data by route.snapshot.params['id']
    }
}
