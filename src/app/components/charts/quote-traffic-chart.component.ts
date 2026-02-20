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

        const pL = 48, pR = 16, pT = 20, pB = 32; // Increased pL from 38 to 48
        const cW = W - pL - pR;
        const cH = H - pT - pB;
        const slotW = cW / (this.months.length - 1);

        // Grid
        [0, 150, 300, 450].forEach(v => {
            const y = pT + cH - (v / this.maxVal) * cH;
            ctx.beginPath(); ctx.moveTo(pL, y); ctx.lineTo(pL + cW, y);
            ctx.strokeStyle = v === 0 ? 'rgba(163, 174, 208, 0.4)' : 'rgba(163, 174, 208, 0.1)';
            ctx.lineWidth = 1; ctx.setLineDash(v === 0 ? [] : [3, 8]); ctx.stroke(); ctx.setLineDash([]);
            if (v > 0) {
                ctx.fillStyle = '#A3AED0';
                ctx.font = '500 11px "DM Sans",sans-serif'; // Increased from 8px
                ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                ctx.fillText(String(v), pL - 8, y);
            }
        });

        // X labels
        this.months.forEach((m, i) => {
            const x = pL + i * slotW;
            ctx.fillStyle = i === 1 ? '#2B3674' : '#A3AED0';
            ctx.font = `${i === 1 ? '700' : '400'} 12px "DM Sans",sans-serif`; // Increased from 9px
            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
            ctx.fillText(m, x, pT + cH + 8);
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

        this.drawArea(accPts, '#05CD99', 'rgba(5,205,153,0.2)', pT, cH);
        this.drawArea(genPts, '#7C5CFF', 'rgba(124,92,255,0.2)', pT, cH);

        if (p === 1) {
            const px = pL + slotW;
            const genY = pT + cH - (this.genData[1] / this.maxVal) * cH;
            const accY = pT + cH - (this.accData[1] / this.maxVal) * cH;
            [[genY, '#7C5CFF', '480'], [accY, '#05CD99', '290']].forEach(([y, c, v]) => {
                ctx.fillStyle = c as string;
                ctx.font = '700 12px "DM Sans",sans-serif'; // Increased from 9px
                ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                ctx.fillText(v as string, px, (y as number) - 8);
            });
        }
    }

    private drawArea(pts: [number, number][], color: string, glowColor: string, pT: number, cH: number) {
        if (pts.length < 2) return;
        const ctx = this.ctx;

        // Gradient Area
        const areaGrad = ctx.createLinearGradient(0, pT, 0, pT + cH);

        // Handle hex or rgba colors for gradient
        if (color.startsWith('#')) {
            const rgb = this.hexToRgb(color);
            areaGrad.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.4)`);
            areaGrad.addColorStop(1, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.0)`);
        } else {
            // Fallback for named colors or existing rgba
            areaGrad.addColorStop(0, color);
            areaGrad.addColorStop(1, 'transparent');
        }

        this.smoothPath(pts);
        ctx.lineTo(pts[pts.length - 1][0], pT + cH);
        ctx.lineTo(pts[0][0], pT + cH);
        ctx.closePath();
        ctx.fillStyle = areaGrad;
        ctx.fill();

        // Stroke
        this.smoothPath(pts);
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        // Points (Hollow white nodes)
        pts.forEach(([x, y]) => {
            ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = color;
            ctx.stroke();
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
