import { Component, OnInit, ViewChild, ElementRef, signal, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Activity, Clock, PieChart, BarChart3, ChevronDown, Info } from 'lucide-angular';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
    selector: 'app-api-monitoring',
    standalone: true,
    imports: [CommonModule, FormsModule, LucideAngularModule],
    template: `
    <div class="flex flex-col gap-6 animate-fade-in-up">
      <!-- Header & Selector Row -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-4">
        <div>
          <h1 class="text-2xl font-bold text-[#2B3674] tracking-tight">API Monitoring</h1>
          <p class="text-[#A3AED0] text-sm font-medium">Real-time API performance and usage metrics</p>
        </div>
        <div class="bg-white p-3 rounded-xl shadow-sm border border-gray-100/50 flex items-center gap-4">
           <span class="text-xs font-bold text-[#A3AED0] uppercase tracking-wider">Select Service</span>
           <div class="relative min-w-[200px]">
              <select class="glass-input pl-3 pr-10 py-2 w-full appearance-none cursor-pointer font-bold text-[#2B3674]">
                <option>Adnic service</option>
                <option>Travel Gateway</option>
                <option>Medical API</option>
              </select>
              <lucide-icon [img]="ChevronDown" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0] pointer-events-none"></lucide-icon>
           </div>
        </div>
      </div>

      <!-- Top Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        <!-- Usage Volume -->
        <div class="chart-shell p-6 flex flex-col gap-4">
          <div class="flex justify-between items-center">
            <h3 class="text-sm font-bold text-[#2B3674] uppercase tracking-wider">Usage Volume - TPM</h3>
            <lucide-icon [img]="Activity" class="w-4 h-4 text-[#4318FF]"></lucide-icon>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Average</span>
                <span class="text-[8px] font-bold bg-[#05CD99]/10 text-[#05CD99] px-1.5 py-0.5 rounded">Last 7 Days</span>
              </div>
              <span class="text-2xl font-bold text-[#2B3674]">2 TPM</span>
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Maximum</span>
                <span class="text-[8px] font-bold bg-[#05CD99]/10 text-[#05CD99] px-1.5 py-0.5 rounded">Last 7 Days</span>
              </div>
              <span class="text-2xl font-bold text-[#2B3674]">22 TPM</span>
            </div>
          </div>
        </div>

        <!-- Response Time -->
        <div class="chart-shell p-6 flex flex-col gap-4">
          <div class="flex justify-between items-center">
            <h3 class="text-sm font-bold text-[#2B3674] uppercase tracking-wider">Response Time - Milliseconds</h3>
            <lucide-icon [img]="Clock" class="w-4 h-4 text-[#05CD99]"></lucide-icon>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Average</span>
                <span class="text-[8px] font-bold bg-[#05CD99]/10 text-[#05CD99] px-1.5 py-0.5 rounded">Last 7 Days</span>
              </div>
              <span class="text-2xl font-bold text-[#2B3674]">23975 MS</span>
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Maximum</span>
                <span class="text-[8px] font-bold bg-[#05CD99]/10 text-[#05CD99] px-1.5 py-0.5 rounded">Last 7 Days</span>
              </div>
              <span class="text-2xl font-bold text-[#2B3674]">4668574 MS</span>
            </div>
          </div>
        </div>

        <!-- API Groups Donut -->
        <div class="chart-shell p-6 flex flex-col gap-4">
          <div class="flex justify-between items-center">
            <h3 class="text-sm font-bold text-[#2B3674] uppercase tracking-wider">By API Groups</h3>
            <lucide-icon [img]="PieChart" class="w-4 h-4 text-[#FF8F0C]"></lucide-icon>
          </div>
          <div class="flex-1 flex items-center justify-center relative min-h-[120px]">
             <canvas #groupsDonut></canvas>
             <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span class="text-center text-[10px] font-bold text-[#A3AED0]">No Data</span>
             </div>
          </div>
        </div>
      </div>

      <!-- Bottom Grid: Stats & Monthly History -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 mb-6">
        <!-- Daily Stats List -->
        <div class="chart-shell p-6 lg:col-span-1 flex flex-col gap-6">
          <div class="flex justify-between items-center pb-2 border-b border-gray-50">
             <h3 class="text-sm font-bold text-[#2B3674] uppercase tracking-wider">Daily Stats</h3>
             <lucide-icon [img]="Info" class="w-4 h-4 text-[#A3AED0]"></lucide-icon>
          </div>
          <div class="flex flex-col gap-5">
             <div class="flex justify-between items-end">
                <div>
                   <h4 class="text-xs font-bold text-[#FF5252] mb-0.5">Average response time</h4>
                   <p class="text-[10px] text-[#A3AED0] font-medium">In Milliseconds</p>
                </div>
                <span class="text-sm font-extrabold text-[#2B3674]">21691</span>
             </div>
             <div class="flex justify-between items-end">
                <div>
                   <h4 class="text-xs font-bold text-[#FF8F0C] mb-0.5">Total API Calls</h4>
                   <p class="text-[10px] text-[#A3AED0] font-medium">Total number of API Calls including 2xx, 4xx and 5xx</p>
                </div>
                <span class="text-sm font-extrabold text-[#2B3674]">36</span>
             </div>
             <div class="flex justify-between items-end">
                <div>
                   <h4 class="text-xs font-bold text-[#05CD99] mb-0.5">Successful API Calls</h4>
                   <p class="text-[10px] text-[#A3AED0] font-medium">total number of 2xx API Calls</p>
                </div>
                <span class="text-sm font-extrabold text-[#2B3674]">31</span>
             </div>
             <div class="flex justify-between items-end">
                <div>
                   <h4 class="text-xs font-bold text-[#FF5252] mb-0.5">Client Error</h4>
                   <p class="text-[10px] text-[#A3AED0] font-medium">total number of 4xx API Calls</p>
                </div>
                <span class="text-sm font-extrabold text-[#2B3674]">0</span>
             </div>
             <div class="flex justify-between items-end">
                <div>
                   <h4 class="text-xs font-bold text-[#4318FF] mb-0.5">System Error</h4>
                   <p class="text-[10px] text-[#A3AED0] font-medium">total number of 5xx API Calls</p>
                </div>
                <span class="text-sm font-extrabold text-[#2B3674]">5</span>
             </div>
          </div>
        </div>

        <!-- Monthly History Bar Chart -->
        <div class="chart-shell p-6 lg:col-span-2 flex flex-col gap-6">
          <div class="flex justify-between items-center pb-2 border-b border-gray-100/50">
             <h3 class="text-sm font-bold text-[#2B3674] uppercase tracking-wider">API Status Chart - Monthly</h3>
             <lucide-icon [img]="BarChart3" class="w-4 h-4 text-[#4318FF]"></lucide-icon>
          </div>
          <div class="flex-1 min-h-[300px]">
             <canvas #monthlyBar></canvas>
          </div>
          <!-- Legend -->
          <div class="flex flex-wrap justify-center gap-6 pt-2">
             <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-sm bg-[#2B3674]"></span>
                <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Total API Calls</span>
             </div>
             <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-sm bg-[#05CD99]"></span>
                <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Successful API Calls</span>
             </div>
             <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-sm bg-[#FF8F0C]"></span>
                <span class="text-[10px] font-bold text-[#A3AED0] uppercase">Failed API Calls</span>
             </div>
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
    .chart-shell {
      background: white;
      border-radius: 20px;
      border: 1px solid rgba(0,0,0,0.03);
      box-shadow: 0 4px 20px rgba(0,0,0,0.02);
    }
  `]
})
export class ApiMonitoringComponent implements AfterViewInit {
    @ViewChild('groupsDonut') groupsDonutRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('monthlyBar') monthlyBarRef!: ElementRef<HTMLCanvasElement>;

    readonly ChevronDown = ChevronDown;
    readonly Activity = Activity;
    readonly Clock = Clock;
    readonly PieChart = PieChart;
    readonly BarChart3 = BarChart3;
    readonly Info = Info;

    ngAfterViewInit(): void {
        this.initCharts();
    }

    private initCharts() {
        // API Groups Donut (Empty/Placeholder)
        new Chart(this.groupsDonutRef.nativeElement, {
            type: 'doughnut',
            data: {
                labels: ['No Data'],
                datasets: [{
                    data: [100],
                    backgroundColor: ['#F4F7FE'],
                    borderWidth: 0
                }]
            },
            options: {
                cutout: '80%',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                }
            }
        });

        // Monthly Status Chart
        new Chart(this.monthlyBarRef.nativeElement, {
            type: 'bar',
            data: {
                labels: ['February'],
                datasets: [
                    {
                        label: 'Total API Calls',
                        data: [1500],
                        backgroundColor: '#2B3674',
                        borderRadius: 6,
                        barPercentage: 0.6,
                        categoryPercentage: 0.4
                    },
                    {
                        label: 'Successful API Calls',
                        data: [1320],
                        backgroundColor: '#05CD99',
                        borderRadius: 6,
                        barPercentage: 0.6,
                        categoryPercentage: 0.4
                    },
                    {
                        label: 'Failed API Calls',
                        data: [180],
                        backgroundColor: '#FF8F0C',
                        borderRadius: 6,
                        barPercentage: 0.6,
                        categoryPercentage: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#F4F7FE' },
                        ticks: {
                            color: '#A3AED0',
                            font: { size: 10, weight: 'bold' }
                        },
                        border: { display: false }
                    },
                    x: {
                        grid: { display: false },
                        ticks: {
                            color: '#2B3674',
                            font: { size: 11, weight: 'bold' }
                        },
                        border: { display: false }
                    }
                }
            }
        });
    }
}
