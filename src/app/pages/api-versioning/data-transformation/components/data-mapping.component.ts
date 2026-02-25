import { Component, Input, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ArrowRight, Search, Hash } from 'lucide-angular';

@Component({
  selector: 'app-data-mapping',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="grid grid-cols-12 gap-5 animate-in slide-in-from-bottom-4 fade-in duration-500">

      <!-- ── Left: Entity List ── -->
      <div class="col-span-12 lg:col-span-3">
        <div class="entity-panel">

          <!-- Search -->
          <div class="entity-panel-header">
            <span class="text-[10px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">Entity Names</span>
            <span class="count-badge">{{ entities.length }}</span>
          </div>

          <div class="entity-search-wrap">
            <lucide-icon [img]="Search" class="entity-search-icon h-[10px] w-[10px]"></lucide-icon>
            <input
              type="text"
              placeholder="Filter entities..."
              [(ngModel)]="searchQuery"
              class="entity-search"
            >
          </div>

          <!-- List -->
          <div class="entity-list custom-scrollbar">
            <button
              *ngFor="let entity of filteredEntities(); let i = index"
              (click)="activeEntity.set(entity)"
              class="entity-item"
              [class.entity-item--active]="activeEntity() === entity"
            >
              <div class="entity-item-inner">
                <span class="entity-index">{{ (i + 1).toString().padStart(2, '0') }}</span>
                <span class="entity-name">{{ entity }}</span>
              </div>
              <lucide-icon
                *ngIf="activeEntity() === entity"
                [img]="ArrowRight"
                class="w-3.5 h-3.5 text-[#4318FF] flex-shrink-0"
              ></lucide-icon>
            </button>

            <div *ngIf="filteredEntities().length === 0" class="px-5 py-8 text-center">
              <p class="text-[11px] font-bold text-[#A3AED0] uppercase tracking-widest">No matches</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Right: Mapping Table ── -->
      <div class="col-span-12 lg:col-span-9">
        <div class="mapping-panel">

          <!-- Table header bar -->
          <div class="mapping-header">
            <div class="flex items-center gap-2.5">
              <lucide-icon [img]="Hash" class="w-3.5 h-3.5 text-[#4318FF]"></lucide-icon>
              <span class="text-xs font-black text-[#2B3674] uppercase tracking-widest">{{ activeEntity() }}</span>
              <span class="count-badge">{{ (mappingData[activeEntity()] || []).length }} rows</span>
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="table-head-row">
                  <th class="table-th w-6 pl-6 pr-2">#</th>
                  <th class="table-th">Open Finance Standard</th>
                  <th class="table-th">Reference Mapping Data</th>
                  <th class="table-th text-center w-32">Is Default</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr
                  *ngFor="let row of mappingData[activeEntity()] || []; let i = index"
                  class="table-row group"
                >
                  <td class="pl-6 pr-2 py-4">
                    <span class="row-index">{{ (i + 1).toString().padStart(2, '0') }}</span>
                  </td>
                  <td class="px-5 py-4">
                    <span class="text-sm font-black text-[#2B3674] tracking-tight">{{ row.standard }}</span>
                  </td>
                  <td class="px-5 py-4">
                    <input
                      type="text"
                      [value]="row.ref"
                      placeholder="Enter mapping value..."
                      class="mapping-input"
                    >
                  </td>
                  <td class="px-5 py-4 text-center">
                    <label class="toggle-wrap">
                      <input type="checkbox" [checked]="row.isDefault" class="toggle-input">
                      <span class="toggle-track">
                        <span class="toggle-thumb"></span>
                      </span>
                    </label>
                  </td>
                </tr>

                <!-- Empty state -->
                <tr *ngIf="(mappingData[activeEntity()] || []).length === 0">
                  <td colspan="4" class="py-16 text-center">
                    <p class="text-xs font-bold text-[#A3AED0] uppercase tracking-widest">No mapping data for this entity</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    /* ── Entity panel ── */
    .entity-panel {
      background: white;
      border: 1px solid rgba(163,174,208,0.18);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(112,144,176,0.07);
      display: flex; flex-direction: column;
      min-height: 520px;
    }

    .entity-panel-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 20px;
      background: #FAFBFF;
      border-bottom: 1px solid rgba(163,174,208,0.12);
      flex-shrink: 0;
    }

    .entity-search-wrap {
      position: relative; padding: 10px 14px;
      border-bottom: 1px solid rgba(163,174,208,0.1);
      flex-shrink: 0;
    }
    .entity-search-icon {
      position: absolute; left: 26px; top: 50%; translate: 0 -50%;
      width: 13px; height: 13px; color: #A3AED0;
      pointer-events: none;
    }
    .entity-search {
      width: 100%; padding: 7px 10px 7px 32px;
      border: 1px solid #E2E8F0; border-radius: 10px;
      font-size: 11px; font-weight: 700; color: #2B3674;
      background: #F8FAFF;
      outline: none; transition: all 0.2s;
    }
    .entity-search:focus { border-color: #4318FF; background: white; box-shadow: 0 0 0 3px rgba(67,24,255,0.06); }

    .entity-list {
      flex: 1; overflow-y: auto;
      padding: 6px 0;
    }

    .entity-item {
      width: 100%;
      display: flex; align-items: center; justify-content: space-between;
      padding: 9px 16px 9px 20px;
      border-left: 3px solid transparent;
      transition: all 0.18s ease;
      background: transparent;
      border-top: none; border-right: none; border-bottom: none;
      cursor: pointer;
    }
    .entity-item:hover { background: #FAFBFF; border-left-color: rgba(67,24,255,0.15); }
    .entity-item--active {
      background: rgba(67,24,255,0.04);
      border-left-color: #4318FF;
    }
    .entity-item-inner { display: flex; align-items: center; gap: 10px; overflow: hidden; }

    .entity-index {
      font-family: 'Courier New', monospace;
      font-size: 10px; font-weight: 700;
      color: #D0D5E8; flex-shrink: 0;
    }
    .entity-name {
      font-size: 11px; font-weight: 700;
      color: #2B3674;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .entity-item--active .entity-name { color: #4318FF; font-weight: 800; }

    /* ── Mapping panel ── */
    .mapping-panel {
      background: white;
      border: 1px solid rgba(163,174,208,0.18);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(112,144,176,0.07);
    }

    .mapping-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 20px;
      background: #FAFBFF;
      border-bottom: 1px solid rgba(163,174,208,0.12);
    }

    .count-badge {
      display: inline-flex; align-items: center; justify-content: center;
      padding: 2px 8px; border-radius: 6px;
      background: rgba(67,24,255,0.07);
      color: #4318FF;
      font-size: 10px; font-weight: 900;
    }

    /* Table */
    .table-head-row { background: #F8FAFF; border-bottom: 1px solid #EEF2FF; }
    .table-th {
      padding: 12px 20px;
      font-size: 10px; font-weight: 900;
      color: #A3AED0;
      text-transform: uppercase; letter-spacing: 0.15em;
    }

    .table-row { transition: background 0.15s ease; }
    .table-row:hover { background: rgba(67,24,255,0.015); }

    .row-index {
      font-family: 'Courier New', monospace;
      font-size: 10px; font-weight: 700; color: #D0D5E8;
    }

    .mapping-input {
      width: 100%; padding: 7px 12px;
      border: 1px solid #E8EDF8; border-radius: 10px;
      background: #F8FAFF;
      font-size: 12px; font-weight: 700; color: #2B3674;
      outline: none; transition: all 0.2s;
    }
    .mapping-input:focus {
      border-color: #4318FF; background: white;
      box-shadow: 0 0 0 3px rgba(67,24,255,0.06);
    }
    .mapping-input::placeholder { color: #C5CEDF; font-weight: 600; }

    /* Custom toggle switch replacing checkbox */
    .toggle-wrap { display: inline-flex; align-items: center; cursor: pointer; }
    .toggle-input { display: none; }
    .toggle-track {
      width: 34px; height: 18px; border-radius: 9px;
      background: #E2E8F0;
      position: relative; transition: background 0.2s;
      display: flex; align-items: center;
    }
    .toggle-thumb {
      width: 13px; height: 13px; border-radius: 50%;
      background: white;
      position: absolute; left: 3px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.15);
      transition: left 0.2s, background 0.2s;
    }
    .toggle-input:checked + .toggle-track { background: #4318FF; }
    .toggle-input:checked + .toggle-track .toggle-thumb { left: 18px; }

    /* Scrollbar */
    .custom-scrollbar::-webkit-scrollbar { width: 3px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(163,174,208,0.3); border-radius: 3px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(67,24,255,0.2); }
  `]
})
export class DataMappingComponent {
  @Input() entities: string[] = [];
  @Input() mappingData: Record<string, any[]> = {};
  @Input() activeEntity!: WritableSignal<string>;

  readonly ArrowRight = ArrowRight;
  readonly Search = Search;
  readonly Hash = Hash;

  searchQuery = '';

  filteredEntities() {
    if (!this.searchQuery.trim()) return this.entities;
    const q = this.searchQuery.toLowerCase();
    return this.entities.filter(e => e.toLowerCase().includes(q));
  }
}