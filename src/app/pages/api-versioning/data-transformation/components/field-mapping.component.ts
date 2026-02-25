import { Component, Input, signal, WritableSignal, OnDestroy, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    LucideAngularModule, Search, Trash2, ArrowRight, X, Play,
    Save as SaveIcon, ChevronUp, ChevronDown,
    ChevronRight
} from 'lucide-angular';

@Component({
    selector: 'app-field-mapping',
    standalone: true,
    imports: [CommonModule, FormsModule, LucideAngularModule],
    template: `
    <div class="grid grid-cols-12 gap-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div class="col-span-12 lg:col-span-9 flex flex-col gap-6">
        <div class="premium-glass p-0 overflow-hidden min-h-[600px] flex flex-col">
          <div class="p-6 border-b border-gray-100/50 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/20">
            <h3 class="text-sm font-black text-[#2B3674] tracking-tight">Mapping Rules</h3>
            <div class="flex items-center gap-3">
              <div class="relative">
                <lucide-icon [img]="Search" class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A3AED0]"></lucide-icon>
                <input 
                  type="text" 
                  [(ngModel)]="mappingSearchQuery"
                  placeholder="Search fields..." 
                  class="px-8 py-2 rounded-lg border border-gray-100 text-[11px] font-bold text-[#2B3674] focus:border-[#4318FF] transition-all w-60"
                >
              </div>
              <button *ngIf="isEditMode" (click)="clearAllMappings()" class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-red-400 hover:bg-red-50 text-[10px] font-black uppercase tracking-widest transition-all">
                <lucide-icon [img]="Trash2" class="w-3.5 h-3.5"></lucide-icon>
                <span>Clear All</span>
              </button>
            </div>
          </div>

          <div class="flex-1 overflow-auto custom-scrollbar p-6">
            <table class="w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr class="text-[10px] font-black text-[#A3AED0] uppercase tracking-[0.2em]">
                  <th class="px-4 pb-2">Open Finance Fields</th>
                  <th class="px-4 pb-2 text-center w-20"></th>
                  <th class="px-4 pb-2">LFI Fields</th>
                  <th *ngIf="isEditMode" class="px-4 pb-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let field of filteredMappingRules()" class="group">
                  <td class="px-4 py-4 bg-[#F8FAFF] rounded-l-2xl border-y border-l border-indigo-50/50">
                    <span class="text-xs font-black text-emerald-500 tracking-tight">{{ field.name }}</span>
                  </td>
                  <td class="px-4 py-4 bg-[#F8FAFF] border-y border-indigo-50/50 text-center">
                    <lucide-icon [img]="ArrowRight" class="w-4 h-4 text-[#A3AED0] rotate-180"></lucide-icon>
                  </td>
                  <td 
                    class="px-4 py-4 bg-[#F8FAFF] border-y border-indigo-50/50 drop-zone transition-all"
                    [class.drop-zone--active]="isEditMode && activeDragOver === field.name"
                    (dragover)="isEditMode ? onDragOver($event, field.name) : null"
                    (dragleave)="isEditMode ? onDragLeave($event) : null"
                    (drop)="isEditMode ? onDrop($event, field.name) : null"
                  >
                    <div *ngIf="field.mappedTo" class="flex items-center justify-between bg-white border border-indigo-100/50 px-4 py-2 rounded-xl text-xs font-black text-[#4318FF] shadow-sm animate-in zoom-in-95 duration-200">
                      {{ field.mappedTo }}
                      <button *ngIf="isEditMode" (click)="removeMapping(field)" class="text-[#A3AED0] hover:text-red-400 transition-colors">
                        <lucide-icon [img]="X" class="w-3 h-3"></lucide-icon>
                      </button>
                    </div>
                    <div *ngIf="!field.mappedTo" class="text-center py-2 px-4 rounded-xl border border-dashed border-indigo-200/50 text-[10px] font-bold text-[#A3AED0] uppercase tracking-widest bg-indigo-50/30">
                      {{ isEditMode ? 'Drop LFI' : 'No Mapping' }}
                    </div>
                  </td>
                  <td *ngIf="isEditMode" class="px-4 py-4 bg-[#F8FAFF] border-y border-r border-indigo-50/50 rounded-r-2xl text-right">
                    <div class="flex items-center justify-end gap-3">
                      <button class="text-[9px] font-black uppercase text-indigo-400 tracking-widest hover:text-[#4318FF]">Direct</button>
                      <button (click)="openRuleModal(field)" class="px-3 py-1.5 rounded-lg bg-[#05CD99] text-white text-[9px] font-black uppercase tracking-widest shadow-lg shadow-[#05CD99]/20 hover:scale-105 transition-all">Add Rule</button>
                      <button class="text-red-300 hover:text-red-500 transition-colors">
                        <lucide-icon [img]="Trash2" class="w-3.5 h-3.5"></lucide-icon>
                      </button>
                    </div>
                  </td>
                  <td *ngIf="!isEditMode" class="px-4 py-4 bg-[#F8FAFF] border-y border-r border-indigo-50/50 rounded-r-2xl text-right">
                    <span class="text-[9px] font-black uppercase text-indigo-400 tracking-widest">Static Mapping</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="p-6 border-t border-gray-100 flex justify-end gap-3">
            <button (click)="testMappings()" class="px-6 py-2.5 rounded-xl border border-indigo-100 text-indigo-400 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-indigo-50 transition-all flex items-center gap-2">
              <lucide-icon [img]="Play" class="w-3.5 h-3.5"></lucide-icon>
              Test
            </button>
            <button *ngIf="isEditMode" (click)="saveMappings()" class="px-8 py-2.5 rounded-xl bg-[#2B3674] text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-[#2B3674]/20 hover:bg-[#1B2559] transition-all flex items-center gap-2">
              <lucide-icon [img]="SaveIcon" class="w-3.5 h-3.5"></lucide-icon>
              <span>Save</span>
            </button>
            <button *ngIf="!isEditMode" class="px-8 py-2.5 rounded-xl border border-indigo-100 text-[#2B3674] text-[11px] font-black uppercase tracking-[0.2em] opacity-50 cursor-not-allowed">
              Read Only
            </button>
          </div>
        </div>
      </div>

      <div class="col-span-12 lg:col-span-3">
        <div class="premium-glass p-0 overflow-hidden flex flex-col h-full sticky top-4">
          <div class="p-6 border-b border-gray-100/50 bg-[#F8FAFF]/50">
            <h4 class="text-xs font-black text-[#2B3674] uppercase tracking-widest">LFI Field Names</h4>
          </div>
          
          <div class="p-4 border-b border-gray-100/50">
            <div class="relative">
              <lucide-icon [img]="Search" class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A3AED0]"></lucide-icon>
              <input 
                type="text" 
                [(ngModel)]="sidebarSearchQuery"
                placeholder="Search LFI fields..." 
                class="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50/30 text-[11px] font-bold text-[#2B3674] focus:border-[#4318FF] transition-all"
              >
            </div>
          </div>

          <div class="flex-1 overflow-auto custom-scrollbar p-2">
            <div *ngFor="let group of filteredLfiGroups()" class="mb-2">
              <button 
                (click)="group.expanded = !group.expanded"
                class="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-indigo-50/50 transition-all text-[#2B3674] font-black text-[11px] uppercase tracking-wider"
              >
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                  {{ group.name }}
                </div>
                <lucide-icon [img]="group.expanded ? ChevronUp : ChevronDown" class="w-3.5 h-3.5 text-[#A3AED0]"></lucide-icon>
              </button>
              
              <div *ngIf="group.expanded" class="flex flex-col gap-1 p-2 animate-in slide-in-from-top-2 duration-300 max-h-[220px] overflow-y-auto custom-scrollbar">
                <div 
                  *ngFor="let field of group.fields" 
                  [attr.draggable]="isEditMode"
                  (dragstart)="isEditMode ? onDragStart($event, field) : null"
                  class="px-4 py-2.5 rounded-lg text-xs font-bold text-[#4318FF] hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-indigo-100"
                  [class.cursor-grab]="isEditMode"
                  [class.active:cursor-grabbing]="isEditMode"
                  [class.opacity-70]="!isEditMode"
                >
                  {{ field }}
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  `,
    styles: [`
    .premium-glass {
      background: rgba(255, 255, 255, 0.9); border: 1px solid rgba(163,174,208,0.2);
      border-radius: 32px; box-shadow: 0 10px 40px rgba(112,144,176,0.1);
      backdrop-filter: blur(10px);
    }
    .drop-zone { position: relative; }
    .drop-zone::after {
      content: ''; position: absolute; inset: 6px; 
      border: 2px dashed transparent; border-radius: 16px;
      transition: all 0.2s; pointer-events: none;
    }
    .drop-zone--active::after {
      background: rgba(67, 24, 255, 0.05);
      border-color: rgba(67, 24, 255, 0.3);
      transform: scale(1.02);
    }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E0; }
  `]
})
export class FieldMappingComponent {
    @Input() mappingRules!: WritableSignal<any[]>;
    @Input() lfiFieldGroups!: WritableSignal<any[]>;
    @Input() mappingSearchQuery: string = '';
    @Input() sidebarSearchQuery: string = '';
    @Input() activeDragOver: string | null = null;
    @Input() isEditMode: boolean = false;

    private renderer = inject(Renderer2);

    // Modal state
    private modalEl: HTMLElement | null = null;
    private backdropListener: (() => void) | null = null;

    isRuleModalOpen = signal(false);
    selectedFieldForBonus = signal<any>(null);
    selectedFunction = '';
    condition = '';

    readonly Search = Search;
    readonly Trash2 = Trash2;
    readonly ArrowRight = ArrowRight;
    readonly X = X;
    readonly Play = Play;
    readonly SaveIcon = SaveIcon;
    readonly ChevronUp = ChevronUp;
    readonly ChevronDown = ChevronDown;
    readonly ChevronRight = ChevronRight;

    filteredMappingRules() {
        return this.mappingRules().filter((f: any) =>
            f.name.toLowerCase().includes(this.mappingSearchQuery.toLowerCase())
        );
    }

    filteredLfiGroups() {
        if (!this.sidebarSearchQuery) return this.lfiFieldGroups();
        const query = this.sidebarSearchQuery.toLowerCase();
        return this.lfiFieldGroups().map((group: any) => ({
            ...group,
            expanded: true,
            fields: group.fields.filter((f: string) => f.toLowerCase().includes(query))
        })).filter((group: any) => group.fields.length > 0);
    }

    // ─── Drag & Drop Handlers ────────────────────────────────────────────────

    onDragStart(event: DragEvent, field: string) {
        event.dataTransfer?.setData('text/plain', field);
        const ghost = (event.target as HTMLElement).cloneNode(true) as HTMLElement;
        ghost.style.position = 'absolute';
        ghost.style.top = '-1000px';
        document.body.appendChild(ghost);
        event.dataTransfer?.setDragImage(ghost, 0, 0);
        setTimeout(() => document.body.removeChild(ghost), 0);
    }

    onDragOver(event: DragEvent, fieldName: string) {
        event.preventDefault();
        this.activeDragOver = fieldName;
    }

    onDragLeave(event: DragEvent) {
        this.activeDragOver = null;
    }

    onDrop(event: DragEvent, fieldName: string) {
        event.preventDefault();
        this.activeDragOver = null;
        const lfiField = event.dataTransfer?.getData('text/plain');
        if (lfiField) {
            this.mappingRules.update(rules => rules.map(r =>
                r.name === fieldName ? { ...r, mappedTo: lfiField } : r
            ));
        }
    }

    removeMapping(field: any) {
        this.mappingRules.update(rules => rules.map(r =>
            r.name === field.name ? { ...r, mappedTo: null } : r
        ));
    }

    clearAllMappings() {
        this.mappingRules.update(rules => rules.map(r => ({ ...r, mappedTo: null })));
    }

    // ─── Rule Modal Handlers ─────────────────────────────────────────────────

    openRuleModal(field: any) {
        this.selectedFieldForBonus.set(field);
        this.isRuleModalOpen.set(true);
        this.mountRuleModal();
    }

    closeRuleModal() {
        this.isRuleModalOpen.set(false);
        this.selectedFunction = '';
        this.condition = '';
        this.unmountRuleModal();
    }

    private mountRuleModal() {
        this.unmountRuleModal();

        const fieldName = this.selectedFieldForBonus()?.name || '';

        const overlay = document.createElement('div');
        overlay.setAttribute('id', 'rule-portal-overlay');
        overlay.innerHTML = `
          <style>
            #rule-portal-overlay {
              position: fixed; inset: 0; z-index: 99999;
              display: flex; align-items: center; justify-content: center; padding: 1rem;
              background: rgba(11, 14, 40, 0.68);
              backdrop-filter: blur(4px);
              animation: ruleFade .2s ease-out;
            }
            #rule-portal-box {
              background: #fff; border-radius: 28px;
              box-shadow: 0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08);
              width: 100%; max-width: 440px; overflow: hidden;
              animation: ruleSlide .3s cubic-bezier(0.16,1,0.3,1);
            }
            @keyframes ruleFade  { from{opacity:0} to{opacity:1} }
            @keyframes ruleSlide { from{opacity:0;transform:translateY(18px) scale(.96)} to{opacity:1;transform:none} }

            #rule-ph { padding:24px 28px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center; background:#f8fafc; }
            #rule-ph h3 { margin:0; font-size:16px; font-weight:900; color:#2B3674; letter-spacing:-.3px; }
            #rule-xbtn { background:none; border:none; cursor:pointer; padding:8px; border-radius:50%; color:#94a3b8; line-height:0; transition:all .2s; }
            #rule-xbtn:hover { background:#fff; color:#FF5252; transform:rotate(90deg); }

            #rule-pb { padding:32px 28px; display:flex; flex-direction:column; gap:20px; }
            .rule-label { font-size:10px; font-weight:900; color:#2B3674; text-transform:uppercase; tracking:0.1em; margin-left:4px; }
            
            #rule-pb p { margin:0 0 8px 0; font-size:13px; font-weight:500; color:#A3AED0; line-height:1.5; }
            
            .rule-select-wrapper { position:relative; }
            .rule-select { 
              width:100%; background:#f8fafc; border:1px solid #e2e8f0; border-radius:16px; 
              padding:12px 16px; font-size:13px; font-weight:700; color:#2B3674; transition:all .2s;
              appearance:none; outline:none;
            }
            .rule-select:focus { border-color:#4318FF; background:#fff; }
            .rule-icon-down { position:absolute; right:16px; top:50%; transform:translateY(-50%); pointer-events:none; color:#A3AED0; }

            .rule-input {
              width:100%; background:#f8fafc; border:1px solid #e2e8f0; border-radius:16px; 
              padding:12px 16px; font-size:13px; font-weight:700; color:#2B3674; transition:all .2s;
              outline:none;
            }
            .rule-input:focus { border-color:#4318FF; background:#fff; }

            #rule-pf { padding:24px 28px; background:#f8fafc; display:flex; justify-content:flex-end; gap:12px; border-top:1px solid #f1f5f9; }
            .rule-btn { padding:12px 24px; border-radius:16px; font-weight:800; font-size:12px; cursor:pointer; transition:all .2s; text-transform:uppercase; letter-spacing:0.05em; }
            #rule-cbtn { border:1.5px solid #e2e8f0; background:#fff; color:#2B3674; }
            #rule-cbtn:hover { background:#fef2f2; border-color:#fee2e2; color:#FF5252; }
            #rule-okbtn { border:none; background:#2B3674; color:#fff; box-shadow:0 10px 20px rgba(43,54,116,0.2); }
            #rule-okbtn:hover { background:#1B2559; transform:translateY(-1px); box-shadow:0 12px 24px rgba(43,54,116,0.3); }
          </style>

          <div id="rule-portal-box">
            <div id="rule-ph">
              <h3>Add Rule</h3>
              <button id="rule-xbtn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div id="rule-pb">
              <p>Select the operation to be performed on <strong>${fieldName}</strong>.</p>
              
              <div class="rule-group">
                <div class="rule-label">Add Function</div>
                <div class="rule-select-wrapper">
                  <select id="rule-func-select" class="rule-select">
                    <option value="" disabled ${!this.selectedFunction ? 'selected' : ''}>Add Function</option>
                    <option value="uppercase" ${this.selectedFunction === 'uppercase' ? 'selected' : ''}>UPPERCASE</option>
                    <option value="lowercase" ${this.selectedFunction === 'lowercase' ? 'selected' : ''}>LOWERCASE</option>
                    <option value="date-format" ${this.selectedFunction === 'date-format' ? 'selected' : ''}>DATE_FORMAT</option>
                    <option value="concat" ${this.selectedFunction === 'concat' ? 'selected' : ''}>CONCAT</option>
                  </select>
                  <div class="rule-icon-down">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>

              <div class="rule-group">
                <div class="rule-label">Condition</div>
                <input id="rule-cond-input" type="text" class="rule-input" placeholder="e.g. Status = 'Approved'" value="${this.condition}">
              </div>
            </div>
            <div id="rule-pf">
              <button class="rule-btn" id="rule-cbtn">Cancel</button>
              <button class="rule-btn" id="rule-okbtn">Update Rule</button>
            </div>
          </div>
        `;

        document.body.appendChild(overlay);
        this.modalEl = overlay;

        const select = overlay.querySelector('#rule-func-select') as HTMLSelectElement;
        const input = overlay.querySelector('#rule-cond-input') as HTMLInputElement;

        select.addEventListener('change', (e) => this.selectedFunction = (e.target as HTMLSelectElement).value);
        input.addEventListener('input', (e) => this.condition = (e.target as HTMLInputElement).value);

        overlay.querySelector('#rule-xbtn')!.addEventListener('click', () => this.closeRuleModal());
        overlay.querySelector('#rule-cbtn')!.addEventListener('click', () => this.closeRuleModal());
        overlay.querySelector('#rule-okbtn')!.addEventListener('click', () => this.updateRule());

        this.backdropListener = this.renderer.listen(overlay, 'click', (e: MouseEvent) => {
            if (e.target === overlay) this.closeRuleModal();
        });
    }

    private unmountRuleModal() {
        this.modalEl?.remove();
        this.modalEl = null;
        this.backdropListener?.();
        this.backdropListener = null;
    }

    ngOnDestroy() {
        this.unmountRuleModal();
    }

    updateRule() {
        console.log('Updating rule for field:', this.selectedFieldForBonus()?.name, {
            function: this.selectedFunction,
            condition: this.condition
        });
        this.closeRuleModal();
    }

    testMappings() { console.log('Testing mappings:', this.mappingRules()); }
    saveMappings() { console.log('Saving mappings:', this.mappingRules()); }
}
