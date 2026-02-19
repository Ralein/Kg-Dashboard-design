import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartComponent } from './base-chart.component';

@Component({
    selector: 'app-quote-lob-chart',
    standalone: true,
    imports: [CommonModule],
    template: `<canvas #canvas class="w-full h-full"></canvas>`,
    styles: [`:host { display: block; position: relative; width: 100%; height: 100%; }`]
})
export class QuoteLobChartComponent extends BaseChartComponent {
    @Input() data: any[] = [];
    protected draw(p: number) {
        const ctx = this.ctx;
        const W = this.width;
        const H = this.height;
        ctx.clearRect(0, 0, W, H);

        const data = this.data;
        const maxVal = 500; // Approximate max
        const barW = 35;
        const gap = 25;
        const totalW = data.length * (barW + gap) - gap;
        const startX = (W - totalW) / 2;
        const floorY = H * 0.75;

        // Draw Floor Grid
        ctx.beginPath();
        for (let i = 0; i <= 6; i++) {
            const y = floorY + i * 15;
            ctx.moveTo(startX - 50, y);
            ctx.lineTo(startX + totalW + 50, y);
        }
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 1;
        ctx.stroke();

        data.forEach((d, i) => {
            const h = (d.value / maxVal) * (H * 0.5) * p;
            const x = startX + i * (barW + gap);
            const y = floorY;

            // Draw 3D Bar
            this.drawIsoBar(ctx, x, y, barW, h, d.color);

            // Label
            if (p === 1) {
                ctx.fillStyle = 'rgba(255,255,255,0.6)';
                ctx.font = '600 10px "DM Sans",sans-serif';
                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                ctx.fillText(d.name, x + barW / 2, y + 20);

                ctx.fillStyle = d.color;
                ctx.font = '700 12px "DM Sans",sans-serif';
                ctx.shadowColor = d.color; ctx.shadowBlur = 8;
                ctx.fillText(String(d.value), x + barW / 2, y - h - 25);
                ctx.shadowBlur = 0;
            }
        });
    }

    private drawIsoBar(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
        const depth = 15;
        const angle = -Math.PI / 6; // Isometric angle

        // Front Face
        ctx.fillStyle = color;
        ctx.fillRect(x, y - h, w, h);

        // Top Face
        ctx.beginPath();
        ctx.moveTo(x, y - h);
        ctx.lineTo(x + depth, y - h - depth);
        ctx.lineTo(x + w + depth, y - h - depth);
        ctx.lineTo(x + w, y - h);
        ctx.closePath();
        ctx.fillStyle = this.lighten(color, 0.3); // Lighter top
        ctx.fill();

        // Side Face
        ctx.beginPath();
        ctx.moveTo(x + w, y - h);
        ctx.lineTo(x + w + depth, y - h - depth);
        ctx.lineTo(x + w + depth, y - depth);
        ctx.lineTo(x + w, y);
        ctx.closePath();
        ctx.fillStyle = this.lighten(color, -0.2); // Darker side
        ctx.fill();

        // Glow
        ctx.shadowColor = color;
        ctx.shadowBlur = 20;
        ctx.globalAlpha = 0.3;
        ctx.fillRect(x, y - h, w, h);
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
    }
}
