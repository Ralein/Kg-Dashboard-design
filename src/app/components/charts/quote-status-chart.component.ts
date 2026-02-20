import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartComponent } from './base-chart.component';

@Component({
    selector: 'app-quote-status-chart',
    standalone: true,
    imports: [CommonModule],
    template: `<canvas #canvas class="w-full h-full"></canvas>`,
    styles: [`:host { display: block; width: 100%; height: 100%; }`]
})
export class QuoteStatusChartComponent extends BaseChartComponent {
    @Input() data: any[] = [];
    private clusters: any[] = [];

    protected override initCanvas() {
        super.initCanvas();
        this.generateClusters();
    }

    private generateClusters() {
        const seed = (n: number) => { let s = n; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; };
        this.clusters = this.data.map((d, i) => {
            const rng = seed(i * 777 + 42);
            const pts: { x: number; y: number; r: number }[] = [];
            for (let j = 0; j < Math.min(d.value, 60); j++) {
                const angle = rng() * Math.PI * 2;
                const dist = Math.pow(rng(), 0.5) * 0.42;
                pts.push({ x: dist * Math.cos(angle), y: dist * Math.sin(angle), r: 2.2 + rng() * 2.2 });
            }
            return pts;
        });
    }

    protected draw(p: number) {
        const ctx = this.ctx;
        const W = this.width;
        const H = this.height;
        ctx.clearRect(0, 0, W, H);

        const cols = this.data.length;
        const cellW = W / cols;
        const cellH = H * 0.82;
        const pT = 10;

        this.data.forEach((d, i) => {
            const cx = cellW * i + cellW / 2;
            const cy = pT + cellH / 2 + 14;
            const cr = Math.min(cellW, cellH) * 0.36;

            ctx.fillStyle = d.color;
            ctx.font = '700 12px "DM Sans",sans-serif'; // Increased from 10px
            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
            ctx.fillText(d.label.toUpperCase(), cx, 6);

            ctx.fillStyle = '#A3AED0'; // Gray text
            ctx.font = '600 11px "DM Sans",sans-serif'; // Increased from 9px
            ctx.fillText(`n=${d.value}`, cx, 22);

            ctx.beginPath(); ctx.arc(cx, cy, cr, 0, Math.PI * 2);
            ctx.fillStyle = `${d.color}15`; ctx.fill(); // Slightly darker bg for visibility

            if (this.clusters[i]) {
                this.clusters[i].forEach((pt: any, j: number) => {
                    const appear = Math.min(1, p * this.clusters[i].length - j);
                    if (appear <= 0) return;
                    const dx = pt.x * cr, dy = pt.y * cr;
                    ctx.globalAlpha = Math.min(appear, 0.85);
                    ctx.beginPath();
                    ctx.arc(cx + dx, cy + dy, pt.r, 0, Math.PI * 2);
                    ctx.fillStyle = d.color;
                    ctx.fill();
                    ctx.globalAlpha = 1;
                });
            }

            if (p === 1) {
                ctx.beginPath(); ctx.arc(cx, cy, cr, 0, Math.PI * 2);
                ctx.strokeStyle = d.color;
                ctx.lineWidth = 1;
                ctx.globalAlpha = 0.3;
                ctx.setLineDash([4, 6]); ctx.stroke(); ctx.setLineDash([]);
                ctx.globalAlpha = 1;
            }
        });
    }
}
