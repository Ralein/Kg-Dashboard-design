import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartComponent } from './base-chart.component';

@Component({
    selector: 'app-tpp-requests-chart',
    standalone: true,
    imports: [CommonModule],
    template: `<canvas #canvas class="w-full h-full"></canvas>`,
    styles: [`:host { display: block; width: 100%; height: 100%; }`]
})
export class TppRequestsChartComponent extends BaseChartComponent {
    @Input() data: any[] = [];

    private metrics = [
        { key: 'authorized', label: 'Authorized', color: '#7C5CFF' },
        { key: 'revoked', label: 'Revoked', color: '#FF5252' },
        { key: 'rejected', label: 'Rejected', color: '#FF8F0C' },
    ];

    protected draw(p: number) {
        const ctx = this.ctx;
        const W = this.width;
        const H = this.height;
        ctx.clearRect(0, 0, W, H);

        const legendH = 26;
        const pL = 8, pR = 12, pT = legendH + 16, pB = 26; // Increased pB
        const chartW = W - pL - pR;
        const chartH = H - pT - pB;
        const maxVal = 420;
        const rowH = chartH / this.data.length;
        const lollySpacing = rowH * 0.22; // Reduced multiplier to spread out rows more in the available height
        const stemOriginX = pL + 125; // Increased padding for longer names

        // Legend
        this.metrics.forEach((m, i) => {
            const lx = pL + 8 + i * ((W - pL - pR - 16) / this.metrics.length);
            ctx.beginPath(); ctx.arc(lx + 5, legendH * 0.52, 6, 0, Math.PI * 2);
            ctx.fillStyle = m.color;
            ctx.fill();
            ctx.fillStyle = '#A3AED0'; // Gray text
            ctx.font = '500 12px "DM Sans",sans-serif';
            ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
            ctx.fillText(m.label, lx + 16, legendH * 0.52);
        });

        // Separator
        ctx.beginPath();
        ctx.moveTo(pL, legendH + 6); ctx.lineTo(W - pR, legendH + 6);
        ctx.strokeStyle = 'rgba(163, 174, 208, 0.2)';
        ctx.lineWidth = 1; ctx.stroke();

        // Grid
        [0, 100, 200, 300, 400].forEach(v => {
            const x = stemOriginX + (v / maxVal) * (chartW - (stemOriginX - pL));
            ctx.beginPath(); ctx.moveTo(x, pT); ctx.lineTo(x, pT + chartH);
            ctx.strokeStyle = v === 0 ? 'rgba(163, 174, 208, 0.4)' : 'rgba(163, 174, 208, 0.1)';
            ctx.lineWidth = 1; ctx.setLineDash(v === 0 ? [] : [3, 7]); ctx.stroke(); ctx.setLineDash([]);
            if (v > 0) {
                ctx.fillStyle = '#A3AED0';
                ctx.font = '500 11px "DM Sans",sans-serif';
                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                ctx.fillText(String(v), x, pT + chartH + 8);
            }
        });

        this.data.forEach((row, ri) => {
            const rowCY = pT + ri * rowH + rowH / 2;
            const stemW = chartW - (stemOriginX - pL);

            // Row Label Badge
            const badgeColor = row.active ? '#05CD99' : '#A3AED0';
            ctx.beginPath(); ctx.arc(pL + 8, rowCY - 8, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = badgeColor;
            ctx.fill();

            const words = row.label.split(' ');
            const line1 = words.slice(0, 2).join(' ');
            const line2 = words.slice(2).join(' ');

            // Primary text: Dark Navy
            ctx.fillStyle = '#2B3674';
            ctx.font = `${row.active ? '700' : '600'} 12px "DM Sans",sans-serif`; // Increased from 9.5px
            ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
            ctx.fillText(line1, pL + 18, rowCY - (line2 ? 8 : 0));

            if (line2) {
                ctx.fillStyle = '#A3AED0';
                ctx.font = '500 11px "DM Sans",sans-serif'; // Increased from 8.5px
                ctx.fillText(line2, pL + 18, rowCY + 10);
            }

            // Total count
            ctx.fillStyle = '#A3AED0';
            ctx.font = '500 11px "DM Sans",sans-serif'; // Increased from 9px
            ctx.fillText(`total: ${row.total}`, pL + 18, rowCY + (line2 ? 24 : 14));

            this.metrics.forEach((m, mi) => {
                const val = (row as any)[m.key] as number;
                const headX = stemOriginX + (val / maxVal) * stemW * p;
                const dotY = rowCY + (mi - 1) * lollySpacing;

                // Stem line
                ctx.beginPath();
                ctx.moveTo(stemOriginX, dotY);
                ctx.lineTo(stemOriginX + stemW, dotY);
                ctx.strokeStyle = 'rgba(163, 174, 208, 0.1)';
                ctx.lineWidth = 1; ctx.stroke();

                // Value bar
                ctx.beginPath();
                ctx.moveTo(stemOriginX, dotY);
                ctx.lineTo(headX, dotY);
                ctx.strokeStyle = m.color;
                ctx.lineWidth = 2.5; // Slightly thicker
                ctx.stroke();

                // Dot head
                ctx.beginPath();
                ctx.arc(headX, dotY, 4.5, 0, Math.PI * 2);
                ctx.fillStyle = m.color;
                ctx.fill();

                // Inner white dot for "hole" effect
                ctx.beginPath();
                ctx.arc(headX, dotY, 2.5, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.fill();

                if (p === 1 && val > 10) {
                    ctx.fillStyle = '#2B3674';
                    ctx.font = '700 11px "DM Sans",sans-serif'; // Increased from 9px
                    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
                    ctx.fillText(String(val), headX + 9, dotY);
                }
            });

            // Row separator
            if (ri < this.data.length - 1) {
                ctx.beginPath();
                ctx.moveTo(pL, pT + (ri + 1) * rowH);
                ctx.lineTo(W - pR, pT + (ri + 1) * rowH);
                ctx.strokeStyle = 'rgba(163, 174, 208, 0.1)';
                ctx.lineWidth = 1; ctx.stroke();
            }
        });
    }
}
