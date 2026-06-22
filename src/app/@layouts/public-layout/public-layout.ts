import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Authservice } from '../../@service/authservice';

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type AppFontSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.scss',
})
export class PublicLayout implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('layoutHeader') layoutHeader!: ElementRef<HTMLElement>;

  private lenis?: Lenis;
  private lenisTicker?: (time: number) => void;

  private lastScrollY = 0;
  private ticking = false;
  private removeScrollListener?: () => void;

  private readonly headerHideThreshold = 50;
  private readonly scrollDelta = 6;

  public readonly authsev = inject(Authservice);

  fontSize: AppFontSize = 'medium';

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    const savedFontSize = localStorage.getItem('app-font-size') as AppFontSize | null;

    this.fontSize = savedFontSize || 'medium';
    this.applyFontSize(this.fontSize);
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    if (!this.layoutHeader?.nativeElement) {
      console.warn('找不到 .public-layout__header');
      return;
    }

    this.destroyLenisSmoothScroll();

    this.lastScrollY = this.getScrollY();
    this.initLenisSmoothScroll();

    requestAnimationFrame(() => {
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.refresh(true);
    });
  }

  private destroyLenisSmoothScroll(): void {
    if (this.lenisTicker) {
      gsap.ticker.remove(this.lenisTicker);
      this.lenisTicker = undefined;
    }

    this.lenis?.destroy();
    this.lenis = undefined;
  }

  // ngAfterViewInit(): void {
  //   gsap.registerPlugin(ScrollTrigger);

  //   if (!this.layoutHeader?.nativeElement) {
  //     console.warn('找不到 .public-layout__header');
  //     return;
  //   }

  //   this.lastScrollY = this.getScrollY();
  //   this.initLenisSmoothScroll();

  //   requestAnimationFrame(() => {
  //     ScrollTrigger.refresh();
  //   });
  // }

  ngOnDestroy(): void {
    this.destroyLenisSmoothScroll();
  }

  // ngOnDestroy(): void {
  //   // this.removeScrollListener?.();

  //   if (this.lenisTicker) {
  //     gsap.ticker.remove(this.lenisTicker);
  //     this.lenisTicker = undefined;
  //   }

  //   this.lenis?.destroy();
  //   this.lenis = undefined;
  // }

  private initLenisSmoothScroll(): void {
    this.lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    this.lenis.on('scroll', (event: any) => {
      const scrollY = typeof event?.scroll === 'number' ? event.scroll : this.getScrollY();

      this.scheduleHeaderUpdate(scrollY);
      ScrollTrigger.update();
    });

    this.lenisTicker = (time: number) => {
      this.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(this.lenisTicker);
    gsap.ticker.lagSmoothing(0);
  }

  private getScrollY(): number {
    return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  private scheduleHeaderUpdate(scrollY: number): void {
    if (this.ticking) {
      return;
    }

    window.requestAnimationFrame(() => {
      this.updateHeader(scrollY);
    });

    this.ticking = true;
  }

  private updateHeader(currentScrollY: number): void {
    const header = this.layoutHeader.nativeElement;
    const scrollDifference = currentScrollY - this.lastScrollY;

    if (currentScrollY <= this.headerHideThreshold) {
      this.renderer.removeClass(header, 'is-hidden');
      this.renderer.removeClass(header, 'is-scrolled');

      this.lastScrollY = currentScrollY;
      this.ticking = false;
      return;
    }

    this.renderer.addClass(header, 'is-scrolled');

    // 向下滾：header 往上藏起來
    if (scrollDifference > this.scrollDelta) {
      this.renderer.addClass(header, 'is-hidden');
    }

    // 向上滾：header 降回原本位置
    if (scrollDifference < -this.scrollDelta) {
      this.renderer.removeClass(header, 'is-hidden');
    }

    this.lastScrollY = currentScrollY;
    this.ticking = false;
  }

  setFontSize(size: AppFontSize): void {
    this.fontSize = size;
    localStorage.setItem('app-font-size', size);
    this.applyFontSize(size);
  }

  private applyFontSize(size: AppFontSize): void {
    document.documentElement.setAttribute('data-font-size', size);
  }

  logout(): void {
    this.authsev.logout();
  }
}
