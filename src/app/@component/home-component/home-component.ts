import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { register } from 'swiper/element/bundle';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


type HeroSlide = {
  title: string;
  label: string;
  imageUrl: string;
  routerLink: string[];
};

type HeroLoopSlide = HeroSlide & {
  loopId: string;
};

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private zone = inject(NgZone);
  private heroSkipRafId = 0;

  @ViewChild('introRoot', { static: true })
  introRoot!: ElementRef<HTMLElement>;

  @ViewChild('heroSwiper', { static: true })
  heroSwiper!: ElementRef<any>;

  private mm?: gsap.MatchMedia;

  heroSlides: HeroSlide[] = [
    {
      label: 'Shared Home',
      title: '跨世代共居',
      imageUrl: '/images/home/hero-01.jpg',
      routerLink: ['/rental-matching-component'],
    },
    {
      label: 'Living Together',
      title: '安心看房媒合',
      imageUrl: '/images/home/hero-02.jpg',
      routerLink: ['/rental-matching-component'],
    },
    {
      label: 'Tool Sharing',
      title: '工具共享',
      imageUrl: '/images/home/hero-03.jpg',
      routerLink: ['/rental-matching-component'],
    },
    {
      label: 'Skill Exchange',
      title: '技能交流',
      imageUrl: '/images/home/hero-04.jpg',
      routerLink: ['/rental-matching-component'],
    },
  ];

  heroLoopSlides: HeroLoopSlide[] = Array.from({ length: 5 }).flatMap((_, groupIndex) =>
    this.heroSlides.map((slide, slideIndex) => ({
      ...slide,
      loopId: `${groupIndex}-${slideIndex}`,
    }))
  );

  aboutCards = [
    {
      label: 'Space',
      title: '空間不只是房間',
      text: '讓空著的房源被重新看見，成為另一段安心生活的起點。',
      icon: 'home_work',
    },
    {
      label: 'Tools',
      title: '工具不只是物品',
      text: '把暫時用不到的工具，分享給剛好需要完成生活小事的人。',
      icon: 'construction',
    },
    {
      label: 'Skill',
      title: '技能不只是經驗',
      text: '讓累積多年的知識與手藝，成為跨世代互相學習的連結。',
      icon: 'school',
    },
  ];

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      register();
      gsap.registerPlugin(ScrollTrigger);

      requestAnimationFrame(() => {
        this.initSwiper();
        this.initScrollMotion();
        this.initHeroTitleSkipMotion();
      });
    });
  }

  ngOnDestroy(): void {
    this.stopHeroTitleSkipMotion();

    this.mm?.revert();

    const swiperInstance = this.heroSwiper?.nativeElement?.swiper;

    if (swiperInstance) {
      swiperInstance.destroy(true, true);
    }
  }

  private initSwiper(): void {
    const swiperEl = this.heroSwiper.nativeElement;

    Object.assign(swiperEl, {
      slidesPerView: 'auto',
      centeredSlides: false,
      loop: true,
      loopAdditionalSlides: 16,
      speed: 900,
      grabCursor: true,
      mousewheel: false,
      watchSlidesProgress: true,
      observer: true,
      observeParents: true,
      autoplay: {
        delay: 2600,
        disableOnInteraction: false,
      },

      /**
       * 所有卡片本身仍然維持一般間距。
       * H1 的跨越空間交給 initHeroTitleSkipMotion() 動態處理。
       */
      spaceBetween: 36,

      breakpoints: {
        0: {
          spaceBetween: 18,
          centeredSlides: true,
        },
        768: {
          spaceBetween: 24,
          centeredSlides: true,
        },
        1024: {
          spaceBetween: 36,
          centeredSlides: false,
        },
      },
    });

    swiperEl.initialize();

    requestAnimationFrame(() => {
      swiperEl.swiper?.update();
    });
  }

  // private getHeroTitleGap(): number {
  //   const width = window.innerWidth;

  //   /**
  //    * 這裡控制桌機版 H1 需要預留的實際空間。
  //    *
  //    * 數字越大：
  //    * - H1 左右越空
  //    * - 卡片距離越遠
  //    *
  //    * 數字越小：
  //    * - 卡片越靠近 H1
  //    */
  //   if (width >= 1440) {
  //     return 340;
  //   }

  //   if (width >= 1280) {
  //     return 300;
  //   }

  //   if (width >= 1024) {
  //     return 260;
  //   }

  //   return 24;
  // }

  private initScrollMotion(): void {
    const root = this.introRoot.nativeElement;

    this.mm = gsap.matchMedia();

    this.mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
        const heroTitle = root.querySelector('.js-hero-title');
        const map = root.querySelector('.js-taiwan-map');
        const aboutText = root.querySelector('.js-about-copy');
        const aboutCards = gsap.utils.toArray<HTMLElement>('.js-about-card');

        /**
         * ===== 可調整參數 =====
         *
         * ARRIVE_PROGRESS：
         * 數字越小，h1 和地圖越早抵達下方位置。
         * 例如：
         * 0.65 = 比較慢到
         * 0.5  = 中段就到
         * 0.38 = 很早就到
         */
        const ARRIVE_PROGRESS = 0.45;

        /**
         * 地圖到下方後的大小。
         * 數字越大，地圖越大。
         */
        const MAP_FINAL_SCALE = 1.0;

        /**
         * 地圖到下方後的位置。
         * x 越大越往右，y 越大越往下。
         */
        const MAP_FINAL_X = '14vw';
        const MAP_FINAL_Y = '90vh';

        /**
         * h1 到下方後的位置與大小。
         * TITLE_FINAL_Y 越大，h1 越往下。
         */
        const TITLE_FINAL_Y = () => window.innerHeight * 0.90;
        const TITLE_FINAL_SCALE = 0.82;

        gsap.set(heroTitle, {
          transformOrigin: 'center center',
          willChange: 'transform, opacity',
        });

        gsap.set(map, {
          transformOrigin: 'center center',
          willChange: 'transform, opacity',
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',

            /**
             * 這個是整段滾動動畫的總距離。
             * 數字越小，整段動畫越快跑完。
             * 如果你只想 h1 / 地圖早點到，不要先改這個，先改 ARRIVE_PROGRESS。
             */
            end: '+=145%',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        /**
         * 地圖移動與放大
         * duration 使用 ARRIVE_PROGRESS，
         * 代表它會在整段滾動的前 52% 就抵達最終位置。
         */
        tl.to(
          map,
          {
            scale: MAP_FINAL_SCALE,
            x: MAP_FINAL_X,
            y: MAP_FINAL_Y,
            opacity: 0.24,
            duration: ARRIVE_PROGRESS,
            ease: 'none',
          },
          0
        );

        /**
         * h1 移動到下方
         */
        tl.to(
          heroTitle,
          {
            y: TITLE_FINAL_Y,
            scale: TITLE_FINAL_SCALE,
            // opacity: 0.72,
            duration: ARRIVE_PROGRESS,
            ease: 'none',
          },
          0
        );

        /**
         * 補一段空白時間，讓 h1 和地圖抵達後維持在下方位置。
         * 沒有這段的話，GSAP 會把整段 timeline 壓縮，導致「提早抵達」效果不明顯。
         */
        tl.to(
          {},
          {
            duration: 1 - ARRIVE_PROGRESS,
          },
          ARRIVE_PROGRESS
        );

        gsap.from(aboutText, {
          y: 48,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.home-about',
            start: 'top 64%',
          },
        });

        gsap.from(aboutCards, {
          y: 42,
          opacity: 0,
          duration: 0.72,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.home-about__cards',
            start: 'top 78%',
          },
        });
      }, root);

      return () => ctx.revert();
    });

    this.mm.add('(max-width: 1023px)', () => {
      const ctx = gsap.context(() => {
        gsap.set('.js-hero-title, .js-taiwan-map, .js-hero-swiper', {
          clearProps: 'transform,opacity',
        });

        gsap.from('.home-hero__slide-card', {
          y: 24,
          opacity: 0,
          duration: 0.72,
          stagger: 0.08,
          ease: 'power2.out',
        });

        gsap.from('.js-about-copy', {
          y: 32,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.home-about',
            start: 'top 80%',
          },
        });
      }, root);

      return () => ctx.revert();
    });
  }

  private initHeroTitleSkipMotion(): void {
    const root = this.introRoot.nativeElement;
    const hero = root.querySelector<HTMLElement>('.home-hero');
    const heroTitle = root.querySelector<HTMLElement>('.js-hero-title');

    if (!hero || !heroTitle) {
      return;
    }

    const update = () => {
      const slides = Array.from(
        root.querySelectorAll<HTMLElement>('.home-hero__swiper-slide')
      );

      /**
       * 平板與手機版不需要跨過 H1。
       * 因此清掉位移即可。
       */
      if (window.innerWidth < 1024) {
        slides.forEach((slide) => {
          const card = slide.querySelector<HTMLElement>('.home-hero__slide-card');
          card?.style.removeProperty('--hero-skip-x');
        });

        this.heroSkipRafId = requestAnimationFrame(update);
        return;
      }

      const heroRect = hero.getBoundingClientRect();
      const titleRect = heroTitle.getBoundingClientRect();

      /**
       * H1 左右預留空間。
       * 想讓卡片離 H1 更遠，調大這個數字。
       */
      const safePadding = window.innerWidth >= 1440 ? 56 : 44;

      /**
       * H1 保留區的左邊界與寬度。
       */
      const safeLeft = titleRect.left - heroRect.left - safePadding;
      const safeWidth = titleRect.width + safePadding * 2;

      slides.forEach((slide) => {
        const card = slide.querySelector<HTMLElement>('.home-hero__slide-card');

        if (!card) {
          return;
        }

        /**
         * 注意：
         * 這裡讀的是 swiper-slide 的位置，不是 card 的位置。
         * 因為 card 會被我們額外位移，如果讀 card 會造成計算抖動。
         */
        const slideRect = slide.getBoundingClientRect();
        const slideLeft = slideRect.left - heroRect.left;
        const slideWidth = slideRect.width;

        /**
         * 判斷卡片是否還在 H1 右側。
         *
         * 當卡片即將碰到 H1 保留區時，
         * 它會被推到 H1 右側更遠的位置。
         *
         * 當卡片滑過這條線後，
         * 位移會解除，視覺上就像跨過 H1 來到左側。
         */
        const crossingLine = safeLeft - slideWidth * 0.72;

        /**
         * 真正要跨過的距離。
         * safeWidth 是 H1 保留區，
         * slideWidth * 0.86 是補上卡片自身寬度，避免卡片邊緣壓到 H1。
         */
        const skipDistance = safeWidth + slideWidth * 0.2;

        const shouldSkip = slideLeft > crossingLine;

        card.style.setProperty(
          '--hero-skip-x',
          shouldSkip ? `${skipDistance}px` : '0px'
        );
      });

      this.heroSkipRafId = requestAnimationFrame(update);
    };

    this.stopHeroTitleSkipMotion();
    this.heroSkipRafId = requestAnimationFrame(update);
  }

  private stopHeroTitleSkipMotion(): void {
    if (this.heroSkipRafId) {
      cancelAnimationFrame(this.heroSkipRafId);
      this.heroSkipRafId = 0;
    }
  }
}
