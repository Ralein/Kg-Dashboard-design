import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartComponent } from './base-chart.component';

@Component({
    selector: 'app-quote-traffic-chart',
    standalone: true,
    imports: [CommonModule],
    template: `<canvas #canvas class="w-full h-full"></canvas>`,
    styles: [`:host { display: block; position: relative; width: 100%; height: 100%; }`]
})
export class QuoteTrafficChartComponent extends BaseChartComponent {
    private months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
    private genData = [12, 480, 8, 5, 0, 0, 0, 0, 0, 0, 0, 0];
    private accData = [8, 290, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0];
    private maxVal = 530;

    protected draw(p: number) {
        const ctx = this.ctx;
        const W = this.width;
        const H = this.height;
        ctx.clearRect(0, 0, W, H);

        const pL = 38, pR = 16, pT = 20, pB = 32;
        const cW = W - pL - pR;
        const cH = H - pT - pB;
        const slotW = cW / (this.months.length - 1);

        // Grid
        [0, 150, 300, 450].forEach(v => {
            const y = pT + cH - (v / this.maxVal) * cH;
            ctx.beginPath(); ctx.moveTo(pL, y); ctx.lineTo(pL + cW, y);
            ctx.strokeStyle = v === 0 ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)';
            ctx.lineWidth = 1; ctx.setLineDash(v === 0 ? [] : [3, 8]); ctx.stroke(); ctx.setLineDash([]);
            if (v > 0) {
                ctx.fillStyle = 'rgba(255,255,255,0.2)';
                ctx.font = '500 8px "DM Sans",sans-serif';
                ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                ctx.fillText(String(v), pL - 5, y);
            }
        });

        // X labels
        this.months.forEach((m, i) => {
            const x = pL + i * slotW;
            ctx.fillStyle = i === 1 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.18)';
            ctx.font = `${i === 1 ? '700' : '400'} 9px "DM Sans",sans-serif`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
            ctx.fillText(m, x, pT + cH + 7);
        });

        const revealIdx = Math.floor(p * (this.months.length - 1));
        const revealFrac = (p * (this.months.length - 1)) - revealIdx;

        const genPts: [number, number][] = [];
        const accPts: [number, number][] = [];
        for (let i = 0; i <= Math.min(revealIdx + 1, this.months.length - 1); i++) {
            const frac = i <= revealIdx ? 1 : revealFrac;
            const x = pL + i * slotW;
            genPts.push([x, pT + cH - (this.genData[i] / this.maxVal) * cH * frac]);
            accPts.push([x, pT + cH - (this.accData[i] / this.maxVal) * cH * frac]);
        }

        this.drawArea(accPts, '#05CD99', 'rgba(5,205,153,0.7)', pT, cH);
        this.drawArea(genPts, '#7C5CFF', 'rgba(124,92,255,0.7)', pT, cH);

        if (p === 1) {
            const px = pL + slotW;
            const genY = pT + cH - (this.genData[1] / this.maxVal) * cH;
            const accY = pT + cH - (this.accData[1] / this.maxVal) * cH;
            [[genY, '#7C5CFF', '480'], [accY, '#05CD99', '290']].forEach(([y, c, v]) => {
                ctx.fillStyle = c as string;
                ctx.font = '700 9px "DM Sans",sans-serif';
                ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                ctx.shadowColor = c as string; ctx.shadowBlur = 8;
                ctx.fillText(v as string, px, (y as number) - 6);
                ctx.shadowBlur = 0;
            });
        }
    }

    private drawArea(pts: [number, number][], color: string, glowColor: string, pT: number, cH: number) {
        if (pts.length < 2) return;
        const ctx = this.ctx;

        // Digital Vertical Scan Gradient
        const areaGrad = ctx.createLinearGradient(0, pT, 0, pT + cH);
        areaGrad.addColorStop(0, color.replace(')', ', 0.5)').replace('rgb', 'rgba')); // Intense top
        areaGrad.addColorStop(0.2, color.replace(')', ', 0.1)').replace('rgb', 'rgba'));
        areaGrad.addColorStop(1, 'transparent'); // Fade out completely

        this.smoothPath(pts);
        ctx.lineTo(pts[pts.length - 1][0], pT + cH);
        ctx.lineTo(pts[0][0], pT + cH);
        ctx.closePath();
        ctx.fillStyle = areaGrad;
        ctx.fill();

        // Neon Stroke
        this.smoothPath(pts);
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 20; // Heavy neon glow
        ctx.stroke();
        ctx.shadowBlur = 0;

        // "Scan Line" Overlay (Horizontal line moving down)
        const scanY = pT + (Date.now() % 2000) / 2000 * cH;
        ctx.beginPath();
        ctx.moveTo(pts[0][0], scanY);
        ctx.lineTo(pts[pts.length - 1][0], scanY);
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Points (Hollow digital nodes)
        pts.forEach(([x, y]) => {
            ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#111'; // Dark center
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = color;
            ctx.shadowColor = color; ctx.shadowBlur = 10;
            ctx.stroke(); ctx.shadowBlur = 0;
        });
    }

    private smoothPath(points: [number, number][], tension = 0.35) {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        for (let i = 0; i < points.length - 1; i++) {
            const [x0, y0] = points[i];
            const [x1, y1] = points[i + 1];
            const cpx = x0 + (x1 - x0) * tension;
            ctx.bezierCurveTo(cpx, y0, x1 - (x1 - x0) * tension, y1, x1, y1);
        }
    }
}
