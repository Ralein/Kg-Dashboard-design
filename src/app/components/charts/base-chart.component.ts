import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    template: '',
    standalone: true,
    imports: [CommonModule]
})
export abstract class BaseChartComponent implements AfterViewInit, OnDestroy {
    @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

    protected ctx!: CanvasRenderingContext2D;
    protected dpr = window.devicePixelRatio || 1;
    protected width = 0;
    protected height = 0;
    protected animationId?: number;
    protected startTime = 0;

    @Input() duration = 1200;
    @Input() eased = true;

    ngAfterViewInit() {
        this.initCanvas();
        this.startAnimation();
        window.addEventListener('resize', this.onResize);
    }

    ngOnDestroy() {
        window.removeEventListener('resize', this.onResize);
        if (this.animationId) cancelAnimationFrame(this.animationId);
    }

    protected initCanvas() {
        const canvas = this.canvasRef.nativeElement;
        this.ctx = canvas.getContext('2d')!;
        this.resize();
    }

    protected resize() {
        const canvas = this.canvasRef.nativeElement;
        const parent = canvas.parentElement!;
        this.width = parent.clientWidth;
        this.height = parent.clientHeight;

        canvas.width = this.width * this.dpr;
        canvas.height = this.height * this.dpr;
        canvas.style.width = `${this.width}px`;
        canvas.style.height = `${this.height}px`;

        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }

    protected onResize = () => {
        this.resize();
        this.draw(1); // Redraw at final state
    };

    protected startAnimation() {
        this.startTime = performance.now();
        const animate = (now: number) => {
            let progress = (now - this.startTime) / this.duration;
            if (progress > 1) progress = 1;

            const easedProgress = this.eased ? this.easeOutCubic(progress) : progress;
            this.draw(easedProgress);

            if (progress < 1) {
                this.animationId = requestAnimationFrame(animate);
            }
        };
        this.animationId = requestAnimationFrame(animate);
    }

    protected easeOutCubic(t: number): number {
        return 1 - Math.pow(1 - t, 3);
    }

    protected abstract draw(progress: number): void;

    // Helper methods for drawing
    protected hexToRgb(hex: string): [number, number, number] {
        const n = parseInt(hex.replace('#', ''), 16);
        return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
    }

    protected lighten(hex: string, a: number): string {
        const [r, g, b] = this.hexToRgb(hex);
        return `rgb(${Math.min(255, r + Math.round(255 * a))},${Math.min(255, g + Math.round(255 * a))},${Math.min(255, b + Math.round(255 * a))})`;
    }
}
