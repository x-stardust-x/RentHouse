import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';

import { Authservice } from '../../@service/authservice';
import { UserService } from '../../@service/user-service';

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

  private readonly router = inject(Router);
  private routeScrollSub?: Subscription;
  private routeScrollRafId = 0;

  private lenis?: Lenis;
  private lenisTicker?: (time: number) => void;

  private lastScrollY = 0;
  private ticking = false;
  private removeScrollListener?: () => void;

  get isUserCenterPage(): boolean {
    return this.router.url.startsWith('/user-center');
  }

  private readonly headerHideThreshold = 50;
  private readonly scrollDelta = 6;

  public readonly authsev = inject(Authservice);
  public readonly usersev = inject(UserService);

  public userId = this.authsev.getUserId();
  public Tier = localStorage.getItem('subscriptionTier');

  fontSize: AppFontSize = 'medium';

  constructor(private renderer: Renderer2) {
    if (this.userId !== null && this.userId !== undefined) {
      this.usersev.loadProfile(this.userId);
    }
  }

  ngOnInit(): void {
    const savedFontSize = localStorage.getItem('app-font-size') as AppFontSize | null;

    this.fontSize = savedFontSize || 'medium';
    this.applyFontSize(this.fontSize);

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    this.routeScrollSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.scrollToPageTop();
      });
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

  ngOnDestroy(): void {
    this.routeScrollSub?.unsubscribe();

    if (this.routeScrollRafId) {
      cancelAnimationFrame(this.routeScrollRafId);
      this.routeScrollRafId = 0;
    }

    this.removeScrollListener?.();
    this.destroyLenisSmoothScroll();
  }

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

  private destroyLenisSmoothScroll(): void {
    if (this.lenisTicker) {
      gsap.ticker.remove(this.lenisTicker);
      this.lenisTicker = undefined;
    }

    this.lenis?.destroy();
    this.lenis = undefined;
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

    if (scrollDifference > this.scrollDelta) {
      this.renderer.addClass(header, 'is-hidden');
    }

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

  private scrollToPageTop(): void {
    if (this.routeScrollRafId) {
      cancelAnimationFrame(this.routeScrollRafId);
    }

    this.routeScrollRafId = requestAnimationFrame(() => {
      this.routeScrollRafId = requestAnimationFrame(() => {
        this.lenis?.scrollTo(0, {
          immediate: true,
          force: true,
        });

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto',
        });

        ScrollTrigger.refresh();
        this.routeScrollRafId = 0;
      });
    });
  }
}
