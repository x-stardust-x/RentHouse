import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AfterViewInit, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { Authservice } from '../../@service/authservice';


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

  private lastScrollY = 0;
  private ticking = false;
  private removeScrollListener?: () => void;

  public readonly authsev = inject(Authservice);

  private readonly headerHideThreshold = 50;
  private readonly scrollDelta = 6;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (!this.layoutHeader?.nativeElement) {
      console.warn('找不到 .public-layout__header');
      return;
    }

    this.lastScrollY = this.getScrollY();

    this.removeScrollListener = this.renderer.listen('window', 'scroll', () => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.updateHeader();
        });

        this.ticking = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.removeScrollListener?.();
  }

  private getScrollY(): number {
    return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  private updateHeader(): void {
    const header = this.layoutHeader.nativeElement;
    const currentScrollY = this.getScrollY();
    const scrollDifference = currentScrollY - this.lastScrollY;

    if (currentScrollY <= this.headerHideThreshold) {
      this.renderer.removeClass(header, 'is-hidden');
      this.renderer.removeClass(header, 'is-scrolled');

      this.lastScrollY = currentScrollY;
      this.ticking = false;
      return;
    }

    this.renderer.addClass(header, 'is-scrolled');

    // 往下滾：隱藏 header
    if (scrollDifference > this.scrollDelta) {
      this.renderer.addClass(header, 'is-hidden');
    }

    // 往上滾：顯示 header
    if (scrollDifference < -this.scrollDelta) {
      this.renderer.removeClass(header, 'is-hidden');
    }

    this.lastScrollY = currentScrollY;
    this.ticking = false;
  }



  fontSize: AppFontSize = 'medium';

  ngOnInit(): void {
    const savedFontSize = localStorage.getItem('app-font-size') as AppFontSize | null;

    this.fontSize = savedFontSize || 'medium';
    this.applyFontSize(this.fontSize);
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
