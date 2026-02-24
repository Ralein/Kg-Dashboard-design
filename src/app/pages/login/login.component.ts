import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex min-h-screen w-screen" style="font-family: 'Outfit', sans-serif;">

      <!-- ── LEFT BRAND PANEL ── -->
      <div class="hidden lg:flex flex-col w-[50%] relative overflow-hidden px-14 py-12"
           style="background: linear-gradient(145deg, #0d1b3e 0%, #1a2f5a 60%, #0a1628 100%);">

        <!-- Grid texture -->
        <div class="absolute inset-0 opacity-[0.03]"
             style="background-image: linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px);
                    background-size: 48px 48px;"></div>

        <!-- Animated canvas -->
        <canvas #networkCanvas class="absolute inset-0 w-full h-full pointer-events-none z-0"></canvas>

        <!-- Glows -->
        <div class="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
             style="background: radial-gradient(circle, #fabd00, transparent 65%);"></div>
        <div class="absolute -top-20 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl"
             style="background: radial-gradient(circle, #3b82f6, transparent 65%);"></div>

        <!-- Logo -->
        <div class="relative z-10 flex items-center gap-5">
          <div class="flex items-center justify-center w-20 h-20 rounded-[28px] bg-white/10 backdrop-blur-xl shadow-2xl shadow-black/20 border border-white/20 flex-shrink-0 relative overflow-hidden group/logo">
            <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity duration-700"></div>
            <img src="cropped-favicon.png" alt="n-sure" class="w-12 h-12 object-contain relative z-10 transition-transform duration-700 group-hover/logo:scale-110">
          </div>
          <div class="flex flex-col gap-0">
            <div class="flex items-center gap-3">
              <span class="text-[42px] font-black text-white leading-none tracking-[-0.04em]">n-<span class="text-[#fabd00]">sure</span></span>
              <span class="text-[10px] mt-3 font-black tracking-[2px] text-[#fabd00] bg-[#fabd00]/10 border border-[#fabd00]/25 px-2.5 py-1 rounded-full translate-y-[-2px]">OFI</span>
            </div>
            <span class="text-[12px] font-black tracking-[4px] text-[#fabd00] uppercase mt-1 opacity-80">Infrastructure</span>
          </div>
        </div>

        <!-- Hero copy — vertically centered -->
        <div class="relative z-10 flex flex-col gap-5 my-auto">
          <p class="text-[10px] font-semibold tracking-[3px] uppercase text-[#fabd00]/60 animate-fade-up" style="animation-delay:0.1s">
            Open Finance Infrastructure
          </p>
          <h1 class="font-black leading-[1] text-white animate-fade-up"
              style="font-size: clamp(48px, 5vw, 64px); letter-spacing: -3px; animation-delay:0.2s">
            Digital Trust.<br/>
            <span style="background: linear-gradient(90deg, #fabd00, #ff8a00);
                         -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
              Unified
            </span><br/>
            Ecosystem.
          </h1>
          <p class="text-base font-medium leading-relaxed text-white/40 max-w-sm animate-fade-up" style="animation-delay:0.35s">
            One gateway to manage your<br/>
            open finance ecosystem.
          </p>
        </div>

        <!-- Footer -->
        <p class="relative z-10 text-[9px] font-medium tracking-[2.5px] uppercase text-white/15">
          © 2026 KGISL · All rights reserved
        </p>
      </div>

      <!-- ── RIGHT AUTH PANEL ── -->
      <div class="flex flex-1 items-center justify-center bg-white px-6 relative overflow-hidden">

        <!-- Soft bg accents -->
        <div class="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] blur-3xl opacity-60 pointer-events-none"></div>
        <div class="absolute bottom-[-10%] left-[-10%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] rounded-full bg-gradient-to-t from-[#fff7ed] to-transparent blur-3xl opacity-60 pointer-events-none"></div>

        <div class="w-full max-w-[380px] flex flex-col gap-8 relative z-10 animate-slide-up">

          <div class="flex flex-col gap-2">
            <h2 class="text-3xl font-black text-[#0d1b3e] tracking-tight">Portal Access</h2>
            <p class="text-sm text-slate-400 font-bold uppercase tracking-widest">Enterprise Authentication</p>
          </div>

          <form class="flex flex-col gap-4" (ngSubmit)="onSubmit()">

            <!-- Username -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-bold uppercase tracking-[2px]"
                     [class.text-[#1a2f5a]]="usernameFocused"
                     [class.text-slate-400]="!usernameFocused">User Name</label>
              <div class="relative flex items-center">
                <svg class="absolute left-3.5 w-4 h-4 pointer-events-none transition-colors duration-200"
                     [class.text-[#1a2f5a]]="usernameFocused" [class.text-slate-300]="!usernameFocused"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <input type="text" [(ngModel)]="username" name="username" placeholder="Enter your username"
                  (focus)="usernameFocused = true" (blur)="usernameFocused = false"
                  autocomplete="username" required
                  class="w-full pl-10 pr-4 py-4 text-sm font-bold text-[#0d1b3e] placeholder:text-slate-300 bg-slate-50 rounded-2xl outline-none transition-all duration-300 border-2"
                  [style.borderColor]="usernameFocused ? '#1a2f5a' : '#f1f5f9'"
                  [style.boxShadow]="usernameFocused ? '0 12px 24px -8px rgba(26,47,90,0.15)' : 'none'"/>
              </div>
            </div>

            <!-- Password -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-bold uppercase tracking-[2px]"
                     [class.text-[#1a2f5a]]="passwordFocused"
                     [class.text-slate-400]="!passwordFocused">Password</label>
              <div class="relative flex items-center">
                <svg class="absolute left-3.5 w-4 h-4 pointer-events-none transition-colors duration-200"
                     [class.text-[#1a2f5a]]="passwordFocused" [class.text-slate-300]="!passwordFocused"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input [type]="showPassword ? 'text' : 'password'" [(ngModel)]="password" name="password"
                  placeholder="••••••••" (focus)="passwordFocused = true" (blur)="passwordFocused = false"
                  autocomplete="current-password" required
                  class="w-full pl-10 pr-10 py-4 text-sm font-bold text-[#0d1b3e] placeholder:text-slate-300 bg-slate-50 rounded-2xl outline-none transition-all duration-300 border-2"
                  [style.borderColor]="passwordFocused ? '#1a2f5a' : '#f1f5f9'"
                  [style.boxShadow]="passwordFocused ? '0 12px 24px -8px rgba(26,47,90,0.15)' : 'none'"/>
                <button type="button" tabindex="-1" (click)="showPassword = !showPassword"
                        class="absolute right-3.5 p-0.5 text-slate-300 hover:text-[#1a2f5a] transition-colors duration-200">
                  <svg *ngIf="!showPassword" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg *ngIf="showPassword" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Options -->
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer select-none group">
                <input type="checkbox" [(ngModel)]="rememberMe" name="rememberMe" class="hidden"/>
                <div class="w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all duration-200"
                     [style.background]="rememberMe ? '#1a2f5a' : 'white'"
                     [style.border-color]="rememberMe ? '#1a2f5a' : '#cbd5e1'">
                  <svg *ngIf="rememberMe" class="w-2.5 h-2.5 text-white" viewBox="0 0 10 8" fill="none"
                       stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 4l2.5 2.5L9 1"/>
                  </svg>
                </div>
                <span class="text-xs font-medium text-slate-400 group-hover:text-slate-600 transition-colors">Keep me signed in</span>
              </label>
              <a href="#" class="text-xs font-semibold text-[#fabd00] hover:text-[#e6a800] transition-colors">Forgot password?</a>
            </div>

            <!-- Sign In -->
            <button type="submit" [disabled]="isLoading"
              class="relative w-full py-3.5 rounded-xl text-sm font-extrabold text-[#0d1b3e] overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-1"
              style="background: linear-gradient(135deg, #fabd00 0%, #f59e0b 100%); box-shadow: 0 4px 20px rgba(250,189,0,0.3);">
              <span class="absolute inset-0 btn-shimmer pointer-events-none"></span>
              <span *ngIf="!isLoading" class="relative flex items-center justify-center gap-2 tracking-wide">
                Sign In
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
              <span *ngIf="isLoading" class="relative flex items-center justify-center gap-2">
                <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.15)" stroke-width="3"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="#0d1b3e" stroke-width="3" stroke-linecap="round"/>
                </svg>
                Signing in...
              </span>
            </button>

            @if (errorMessage) {
              <div class="flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold text-red-500"
                   style="background: #fef2f2; border: 1px solid #fecaca;">
                <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {{ errorMessage }}
              </div>
            }

          </form>
        </div>
      </div>

    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
    :host { display: block; }

    /* ── Button shimmer ── */
    .btn-shimmer {
      background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.3) 50%, transparent 65%);
      background-size: 200% 100%;
      background-position: -200% 0;
      animation: shimmer 2.5s linear infinite;
    }
    @keyframes shimmer { to { background-position: 200% 0; } }

    /* ── Left panel text animations ── */
    .animate-fade-up {
      opacity: 0;
      transform: translateY(18px);
      animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes fadeUp {
      to { opacity: 1; transform: translateY(0); }
    }

    /* ── Right panel card animation ── */
    .animate-slide-up {
      opacity: 0;
      transform: translateY(24px);
      animation: slideUp 0.6s 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes slideUp {
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('networkCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private router = inject(Router);
  private animationId = 0;

  username = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  isLoading = false;
  errorMessage = '';
  usernameFocused = false;
  passwordFocused = false;

  tags = [
    { label: 'Consent Management', color: '#fabd00' },
    { label: 'API Gateway', color: '#3b82f6' },
    { label: 'Real-time Analytics', color: '#22c55e' },
  ];

  ngOnInit(): void {
    const saved = localStorage.getItem('nsure_username');
    if (saved) { this.username = saved; this.rememberMe = true; }
  }

  ngAfterViewInit(): void {
    this.initCanvas();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
  }

  private initCanvas(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Node types ──────────────────────────────────────────
    // Each node drifts slowly and pulses. Some are "gold" (key nodes),
    // most are dim blue-white (network nodes).
    type Node = {
      x: number; y: number;
      vx: number; vy: number;
      r: number;          // base radius
      pulse: number;      // phase offset for pulse anim
      kind: 'gold' | 'blue' | 'dim';
    };

    const NODE_COUNT = 48;
    const nodes: Node[] = [];

    const kinds: Array<Node['kind']> = ['gold', 'blue', 'dim', 'dim', 'dim', 'dim'];

    for (let i = 0; i < NODE_COUNT; i++) {
      const kind = kinds[Math.floor(Math.random() * kinds.length)];
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: kind === 'gold' ? 3.5 : kind === 'blue' ? 2.5 : 1.8,
        pulse: Math.random() * Math.PI * 2,
        kind,
      });
    }

    const COLOR = {
      gold: 'rgba(250,189,0,',
      blue: 'rgba(96,165,250,',
      dim: 'rgba(180,200,255,',
    };

    let t = 0;

    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Move nodes ──
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      }

      // ── Draw connections ──
      const CONNECT_DIST = 130;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > CONNECT_DIST) continue;

          const fade = 1 - dist / CONNECT_DIST;
          const isGoldEdge = nodes[i].kind === 'gold' || nodes[j].kind === 'gold';
          const isBlueEdge = nodes[i].kind === 'blue' || nodes[j].kind === 'blue';

          let edgeColor: string;
          if (isGoldEdge) edgeColor = `rgba(250,189,0,${fade * 0.35})`;
          else if (isBlueEdge) edgeColor = `rgba(96,165,250,${fade * 0.2})`;
          else edgeColor = `rgba(180,200,255,${fade * 0.08})`;

          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = edgeColor;
          ctx.lineWidth = isGoldEdge ? 0.8 : 0.5;
          ctx.stroke();

          // Travelling data packet on gold edges
          if (isGoldEdge && dist < 90 && Math.sin(t * 2 + i * 0.7) > 0.7) {
            const progress = ((t * 0.5 + i * 0.3) % 1);
            const px = nodes[i].x + (nodes[j].x - nodes[i].x) * progress;
            const py = nodes[i].y + (nodes[j].y - nodes[i].y) * progress;
            ctx.beginPath();
            ctx.arc(px, py, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(250,189,0,0.9)';
            ctx.fill();
          }
        }
      }

      // ── Draw nodes ──
      for (const n of nodes) {
        const pulse = Math.sin(t * 1.5 + n.pulse) * 0.4 + 0.6; // 0.2 → 1.0
        const col = COLOR[n.kind];

        // Outer glow ring for gold/blue nodes
        if (n.kind !== 'dim') {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 2.8 * pulse, 0, Math.PI * 2);
          ctx.fillStyle = col + (n.kind === 'gold' ? '0.06)' : '0.05)');
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = col + (n.kind === 'dim' ? '0.25)' : '0.85)');
        ctx.fill();
      }

      this.animationId = requestAnimationFrame(draw);
    };

    draw();
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.isLoading = true;
    if (this.rememberMe) {
      if (this.username) localStorage.setItem('nsure_username', this.username);
    } else {
      localStorage.removeItem('nsure_username');
    }

    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/dashboard']);
    }, 800);
  }
}