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

type HomeRentalCategory = 'room' | 'tool' | 'skill';

type HomeRentalItem = {
  id: number;
  category: HomeRentalCategory;
  title: string;
  price: string;
  meta: string;
  tag: string;
  imageUrl: string;
  routerLink: string[];
};

type HomeNewsCategory = '全部' | '會員故事' | '平台公告' | '共居知識';

type HomeNewsItem = {
  id: number;
  category: Exclude<HomeNewsCategory, '全部'>;
  date: string;
  title: string;
  routerLink: string[];
};

type HomeRentalLoopItem = HomeRentalItem & {
  loopId: string;
};

type HomeUserCenterTone = 'orange' | 'green' | 'blue' | 'pink' | 'gold';

type HomeFaqCategory = '會員與帳號' | '刊登與內容審核' | '媒合、預約與追蹤' | '會員故事';

type HomeFaqItem = {
  id: number;
  category: HomeFaqCategory;
  question: string;
  answer: string;
};

type HomeUserCenterFeatureKey = 'role' | 'match' | 'resource' | 'smart' | 'activity';

type HomeUserCenterCard = {
  key: HomeUserCenterFeatureKey;
  icon: string;
  title: string;
  text: string;
  tone: HomeUserCenterTone;
  routerLink: string[];
};

type HomeUserCenterPage = {
  title: string;
  eyebrow: string;
  text: string;
  imageUrl?: string;
  mockLabel?: string;
  featureKeys: HomeUserCenterFeatureKey[];
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
  private readonly rentalAutoSpeed = 10000;

  private heroAutoplayWatchTimer = 0;
  private heroVisibilityHandler?: () => void;
  private aboutVideoLoadedHandler?: () => void;

  // private readonly rentalNavSpeed = 650;
  // private rentalNavRestartTimer = 0;

  @ViewChild('introRoot', { static: true })
  introRoot!: ElementRef<HTMLElement>;

  @ViewChild('heroSwiper', { static: true })
  heroSwiper!: ElementRef<any>;

  @ViewChild('rentalSwiper', { static: true })
  rentalSwiper!: ElementRef<any>;

  @ViewChild('aboutVideo') aboutVideo?: ElementRef<HTMLVideoElement>;

  private rentalUpdateRafId = 0;

  private mm?: gsap.MatchMedia;

  heroSlides: HeroSlide[] = [
    {
      label: 'Shared Home',
      title: '跨世代共居',
      imageUrl: '/images/about_hero.jpg',
      routerLink: ['/rental-matching-component'],
    },
    {
      label: 'Living Together',
      title: '安心看房媒合',
      imageUrl: '/images/house_viewing.jpg',
      routerLink: ['/rental-matching-component'],
    },
    {
      label: 'Tool Sharing',
      title: '工具共享',
      imageUrl: '/images/tool_sharing.jpeg',
      routerLink: ['/rental-matching-component'],
    },
    {
      label: 'Skill Exchange',
      title: '技能交流',
      imageUrl: '/images/skill_exchange.jpg',
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

  activeRentalCategory: HomeRentalCategory = 'room';
  activeNewsCategory: HomeNewsCategory = '全部';

  rentalCategories: Array<{
    label: string;
    value: HomeRentalCategory;
  }> = [
      { label: '房屋', value: 'room' },
      { label: '工具', value: 'tool' },
      { label: '技能', value: 'skill' },
    ];

  rentalItems: HomeRentalItem[] = [
    {
      id: 1,
      category: 'room',
      title: '溫馨小宅',
      price: 'NT$ 8,000 / 月',
      meta: '中華路 3 段',
      tag: '可養寵物',
      imageUrl: '/images/villa1.jpg',
      routerLink: ['/rental-matching-detail', 'room', '1'],
    },
    {
      id: 2,
      category: 'room',
      title: '採光共居房',
      price: 'NT$ 9,500 / 月',
      meta: '三民區 建工路',
      tag: '近公車站',
      imageUrl: '/images/villa2.jpg',
      routerLink: ['/rental-matching-detail', 'room', '2'],
    },
    {
      id: 3,
      category: 'room',
      title: '安靜套房',
      price: 'NT$ 7,800 / 月',
      meta: '苓雅區 文化路',
      tag: '含網路',
      imageUrl: '/images/house3.jpg',
      routerLink: ['/rental-matching-detail', 'room', '3'],
    },
    {
      id: 4,
      category: 'tool',
      title: '家用縫紉機',
      price: 'NT$ 180 / 日',
      meta: '左營區 可面交',
      tag: '衣物修補',
      imageUrl: '/images/家用縫紉機.jpg',
      routerLink: ['/rental-matching-detail', 'product', '4'],
    },
    {
      id: 5,
      category: 'tool',
      title: '傳統蒸籠組',
      price: 'NT$ 100 / 日',
      meta: '鳳山區 可預約',
      tag: '料理器具',
      imageUrl: '/images/傳統蒸籠組.jpg',
      routerLink: ['/rental-matching-detail', 'product', '5'],
    },
    {
      id: 6,
      category: 'tool',
      title: '手搖磨豆機',
      price: 'NT$ 80 / 日',
      meta: '三民區 可面交',
      tag: '生活器物',
      imageUrl: '/images/手搖磨豆機.jpg',
      routerLink: ['/rental-matching-detail', 'product', '6'],
    },
    {
      id: 7,
      category: 'tool',
      title: '老式工具箱',
      price: 'NT$ 120 / 日',
      meta: '鼓山區 可預約',
      tag: '居家修繕',
      imageUrl: '/images/老式工具箱.jpg',
      routerLink: ['/rental-matching-detail', 'product', '7'],
    },
    {
      id: 8,
      category: 'tool',
      title: '傳統熨斗組',
      price: 'NT$ 90 / 日',
      meta: '前鎮區 可自取',
      tag: '衣物整理',
      imageUrl: '/images/傳統熨斗組.jpg',
      routerLink: ['/rental-matching-detail', 'product', '8'],
    },
    {
      id: 9,
      category: 'skill',
      title: '退休生活規劃交流',
      price: 'NT$ 300 / 次',
      meta: '線上或到府',
      tag: '跨世代對談',
      imageUrl: '/images/退休生活規劃交流.jpg',
      routerLink: ['/rental-matching-detail', 'product', '9'],
    },
    {
      id: 10,
      category: 'skill',
      title: '居家水電檢查',
      price: 'NT$ 500 / 次',
      meta: '高雄市區 可到府',
      tag: '生活維修',
      imageUrl: '/images/居家水電檢查.jpg',
      routerLink: ['/rental-matching-detail', 'product', '10'],
    },
    {
      id: 11,
      category: 'skill',
      title: '家常料理教學',
      price: 'NT$ 450 / 次',
      meta: '苓雅區 可預約',
      tag: '料理交流',
      imageUrl: '/images/家常料理教學.jpg',
      routerLink: ['/rental-matching-detail', 'product', '11'],
    },
    {
      id: 12,
      category: 'skill',
      title: '園藝整理陪作',
      price: 'NT$ 350 / 次',
      meta: '鳳山區 可到府',
      tag: '植栽照護',
      imageUrl: '/images/園藝整理陪作.jpg',
      routerLink: ['/rental-matching-detail', 'product', '12'],
    },
    {
      id: 13,
      category: 'skill',
      title: '傳統手作編織',
      price: 'NT$ 400 / 次',
      meta: '左營區 可預約',
      tag: '手作技藝',
      imageUrl: '/images/傳統手作編織.jpg',
      routerLink: ['/rental-matching-detail', 'product', '13'],
    },
  ];

  newsCategories: HomeNewsCategory[] = ['全部', '會員故事', '平台公告', '共居知識'];

  newsItems: HomeNewsItem[] = [
    {
      id: 1,
      category: '會員故事',
      date: '2026.06.18',
      title: '從一間空房開始：林阿姨與小安的跨世代共居日常',
      routerLink: ['/news', '1'],
    },
    {
      id: 2,
      category: '平台公告',
      date: '2026.06.12',
      title: '厚厝味新增線上預約看房功能，讓媒合流程更安心',
      routerLink: ['/news', '2'],
    },
    {
      id: 3,
      category: '共居知識',
      date: '2026.06.05',
      title: '第一次共居前，可以先討論的五個生活習慣',
      routerLink: ['/news', '3'],
    },
    {
      id: 4,
      category: '會員故事',
      date: '2026.05.28',
      title: '工具共享讓老屋修繕變簡單：一次鄰里間的互相幫忙',
      routerLink: ['/news', '4'],
    },
  ];

  get filteredRentalItems(): HomeRentalItem[] {
    return this.rentalItems.filter((item) => item.category === this.activeRentalCategory);
  }

  get filteredNewsItems(): HomeNewsItem[] {
    if (this.activeNewsCategory === '全部') {
      return this.newsItems;
    }

    return this.newsItems.filter((item) => item.category === this.activeNewsCategory);
  }

  private readonly rentalLoopSlotCount = 18;

  get filteredRentalLoopItems(): HomeRentalLoopItem[] {
    const items = this.filteredRentalItems;

    if (!items.length) {
      return [];
    }

    return Array.from({ length: this.rentalLoopSlotCount }).map((_, index) => {
      const item = items[index % items.length];

      return {
        ...item,
        loopId: `rental-loop-${index}`,
      };
    });
  }

  setRentalCategory(category: HomeRentalCategory): void {
    if (this.activeRentalCategory === category) {
      return;
    }

    this.activeRentalCategory = category;
    this.scheduleRentalSwiperUpdate();
  }

  setNewsCategory(category: HomeNewsCategory): void {
    this.activeNewsCategory = category;
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      register();
      gsap.registerPlugin(ScrollTrigger);

      requestAnimationFrame(() => {
        this.initHeroSwiper();
        this.initRentalSwiper();
        this.initScrollMotion();
        this.initHeroTitleSkipMotion();
        this.playAboutVideo();
        this.initContactParallax();
        this.initUserStackCopyMotion();
        this.initAboutAiMatchMotion();
        this.initScrollTitleRevealMotion();

        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    });
  }

  private playAboutVideo(): void {
    const video = this.aboutVideo?.nativeElement;

    if (!video) {
      return;
    }

    this.removeAboutVideoListener();

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const play = () => {
      video.play().catch((error) => {
        console.warn('背景影片播放失敗：', error);
      });
    };

    if (video.readyState >= 2) {
      play();
    } else {
      this.aboutVideoLoadedHandler = play;
      video.addEventListener('loadeddata', this.aboutVideoLoadedHandler, { once: true });
      video.load();
    }
  }

  private removeAboutVideoListener(): void {
    const video = this.aboutVideo?.nativeElement;

    if (video && this.aboutVideoLoadedHandler) {
      video.removeEventListener('loadeddata', this.aboutVideoLoadedHandler);
    }

    this.aboutVideoLoadedHandler = undefined;
  }

  ngOnDestroy(): void {
    this.stopHeroTitleSkipMotion();
    this.stopHeroAutoplayWatch();
    this.removeAboutVideoListener();

    this.mm?.revert();

    if (this.rentalUpdateRafId) {
      cancelAnimationFrame(this.rentalUpdateRafId);
      this.rentalUpdateRafId = 0;
    }

    this.destroySwiper(this.heroSwiper?.nativeElement);
    this.destroySwiper(this.rentalSwiper?.nativeElement);
  }

  private destroySwiper(swiperEl?: any): void {
    const swiper = swiperEl?.swiper;

    if (!swiper || swiper.destroyed) {
      return;
    }

    swiper.destroy(true, true);
    swiperEl.swiper = undefined;
    swiperEl.initialized = false;
  }

  private initHeroSwiper(): void {
    const swiperEl = this.heroSwiper.nativeElement;

    this.destroySwiper(swiperEl);

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
        pauseOnMouseEnter: false,
        stopOnLastSlide: false,
        waitForTransition: true,
      },

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
      swiperEl.swiper?.autoplay?.start();
      this.startHeroAutoplayWatch();
    });
  }

  private startHeroAutoplayWatch(): void {
    this.stopHeroAutoplayWatch();

    this.heroAutoplayWatchTimer = window.setInterval(() => {
      const swiper = this.heroSwiper?.nativeElement?.swiper;

      if (!swiper || swiper.destroyed) {
        return;
      }

      swiper.update();

      if (!swiper.autoplay?.running) {
        swiper.autoplay?.start();
      }
    }, 2000);

    this.heroVisibilityHandler = () => {
      if (document.hidden) {
        return;
      }

      const swiper = this.heroSwiper?.nativeElement?.swiper;

      swiper?.update();
      swiper?.autoplay?.start();
    };

    document.addEventListener('visibilitychange', this.heroVisibilityHandler);
  }

  private stopHeroAutoplayWatch(): void {
    if (this.heroAutoplayWatchTimer) {
      window.clearInterval(this.heroAutoplayWatchTimer);
      this.heroAutoplayWatchTimer = 0;
    }

    if (this.heroVisibilityHandler) {
      document.removeEventListener('visibilitychange', this.heroVisibilityHandler);
      this.heroVisibilityHandler = undefined;
    }
  }

  private initRentalSwiper(): void {
    const swiperEl = this.rentalSwiper.nativeElement;

    Object.assign(swiperEl, {
      slidesPerView: 'auto',
      centeredSlides: false,
      loop: true,
      loopAdditionalSlides: 12,
      speed: this.rentalAutoSpeed,
      grabCursor: true,
      watchSlidesProgress: true,
      observer: true,
      observeParents: true,

      freeMode: {
        enabled: true,
        momentum: false,
      },

      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },

      loopPreventsSliding: false,
      preventInteractionOnTransition: false,

      injectStyles: [
        `
        .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `,
      ],

      spaceBetween: 40,

      breakpoints: {
        0: {
          spaceBetween: 18,
        },
        768: {
          spaceBetween: 28,
        },
        1024: {
          spaceBetween: 40,
        },
      },
    });

    swiperEl.initialize();

    requestAnimationFrame(() => {
      swiperEl.swiper?.update();
      swiperEl.swiper?.autoplay?.start();
    });
  }

  private scheduleRentalSwiperUpdate(): void {
    if (this.rentalUpdateRafId) {
      cancelAnimationFrame(this.rentalUpdateRafId);
    }

    this.rentalUpdateRafId = requestAnimationFrame(() => {
      this.rentalUpdateRafId = requestAnimationFrame(() => {
        const swiper = this.rentalSwiper?.nativeElement?.swiper;

        swiper?.update();
        swiper?.autoplay?.start();
      });
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
        const stackCards = gsap.utils.toArray<HTMLElement>('.js-user-stack-card');
        const aboutMedia = root.querySelector('.js-about-media');
        const aboutSection = root.querySelector<HTMLElement>('.home-about');
        const rentalSection = root.querySelector<HTMLElement>('.home-rental');

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
        const MAP_FINAL_SCALE = 1.1;
        // const MAP_FINAL_SCALE = 1.0;

        /**
         * 地圖到下方後的位置。
         * x 越大越往右，y 越大越往下。
         */
        const MAP_FINAL_X = '36vw';
        const MAP_FINAL_Y = '95vh';
        const MAP_FINAL_Z = 80;



        // const MAP_FINAL_ROTATE_X = -16;
        // const MAP_FINAL_ROTATE_Y = 16;
        // const MAP_FINAL_ROTATE_Z = 2;

        const MAP_FINAL_ROTATE_X = -20;
        const MAP_FINAL_ROTATE_Y = 0;
        const MAP_FINAL_ROTATE_Z = 10;

        // const MAP_FINAL_X = '14vw';
        // const MAP_FINAL_Y = '90vh';

        /**
         * h1 到下方後的位置與大小。
         * TITLE_FINAL_Y 越大，h1 越往下。
         */
        const TITLE_FINAL_Y = () => window.innerHeight * 0.98;
        const TITLE_FINAL_SCALE = 0.75;
        // const userCards = gsap.utils.toArray<HTMLElement>('.js-user-center-card');

        stackCards.forEach((stackCard) => {
          const featureCards = stackCard.querySelectorAll<HTMLElement>('.js-stack-feature');

          gsap.fromTo(
            featureCards,
            {
              y: 56,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.6,
              delay: 0.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: stackCard,
                start: 'top 70%',
                end: 'bottom 35%',
                toggleActions: 'restart none none reverse',
              },
            }
          );
        });

        // gsap.from(userCards, {
        //   y: 72,
        //   opacity: 0,
        //   duration: 1.05,
        //   stagger: 0.22,
        //   delay: 0.18,
        //   ease: 'power3.out',
        //   scrollTrigger: {
        //     trigger: '.home-user-center__cards',
        //     start: 'top 68%',
        //   },
        // });

        gsap.set(heroTitle, {
          transformOrigin: 'center center',
          willChange: 'transform, opacity',
        });

        gsap.set(map, {
          transformOrigin: 'center center',
          transformPerspective: 1200,
          force3D: true,
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
            z: MAP_FINAL_Z,
            rotationX: MAP_FINAL_ROTATE_X,
            rotationY: MAP_FINAL_ROTATE_Y,
            rotationZ: MAP_FINAL_ROTATE_Z,
            opacity: 0.14,
            duration: ARRIVE_PROGRESS,
            delay: 0.08,
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

        gsap.fromTo(
          aboutMedia,
          {
            opacity: 0,
            scale: 1.04,
          },
          {
            opacity: 0.55,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.home-first',
              start: 'top 70%',
              end: 'top 20%',
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }
        );

        // if (aboutSection && rentalSection) {
        //   ScrollTrigger.create({
        //     trigger: aboutSection,
        //     start: 'bottom 85%',
        //     end: () => `+=${window.innerHeight * 0.95}`,
        //     pin: aboutSection,
        //     pinSpacing: false,
        //     anticipatePin: 1,
        //     invalidateOnRefresh: true,
        //   });

        //   gsap.fromTo(
        //     rentalSection,
        //     {
        //       y: () => window.innerHeight * 0.28,
        //     },
        //     {
        //       y: 0,
        //       ease: 'none',
        //       scrollTrigger: {
        //         trigger: aboutSection,
        //         start: 'bottom bottom',
        //         end: () => `+=${window.innerHeight * 0.95}`,
        //         scrub: 1,
        //         invalidateOnRefresh: true,
        //       },
        //     }
        //   );
        // }

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

        gsap.fromTo(
          '.js-about-media',
          {
            opacity: 0,
          },
          {
            opacity: 0.35,
            ease: 'none',
            scrollTrigger: {
              trigger: '.home-first',
              start: 'top 88%',
              end: 'top 42%',
              scrub: 1,
            },
          }
        );

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
        const skipDistance = safeWidth + slideWidth * -0.3;

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

  activeFaqCategory: HomeFaqCategory = '會員與帳號';

  userCenterCards: HomeUserCenterCard[] = [
    {
      key: 'role',
      icon: 'switch_account',
      title: '角色切換',
      text: '出租人與承租人雙視角，依角色切換不同管理流程。',
      tone: 'orange',
      routerLink: ['/user-center/dashboard'],
    },
    {
      key: 'match',
      icon: 'handshake',
      title: '當前媒合',
      text: '成功媒合後集中管理，方便聯絡與追蹤後續。',
      tone: 'green',
      routerLink: ['/user-center/dashboard'],
    },
    {
      key: 'resource',
      icon: 'dashboard',
      title: '資源總覽',
      text: '房源、工具、技能與預約狀態集中呈現。',
      tone: 'blue',
      routerLink: ['/user-center/dashboard'],
    },
    {
      key: 'smart',
      icon: 'tips_and_updates',
      title: '智慧提示',
      text: '系統提示待辦與配對建議，降低管理負擔。',
      tone: 'pink',
      routerLink: ['/user-center/dashboard'],
    },
    {
      key: 'activity',
      icon: 'notifications_active',
      title: '近期動態',
      text: '重要申請與預約提醒，快速掌握最新進度。',
      tone: 'gold',
      routerLink: ['/user-center/dashboard'],
    },
  ];

  faqCategories: HomeFaqCategory[] = ['會員與帳號', '刊登與內容審核', '媒合、預約與追蹤', '會員故事'];

  faqItems: HomeFaqItem[] = [
    {
      id: 1,
      category: '會員與帳號',
      question: '如何註冊厚厝味會員？',
      answer: '進入註冊頁面，填寫基本資料、電子信箱與密碼後，即可建立會員帳號。',
    },
    {
      id: 2,
      category: '會員與帳號',
      question: '可以同時使用出租人與承租人身份嗎？',
      answer: '可以，會員可依需求切換角色，管理房源、共享資源或查看預約申請。',
    },
    {
      id: 3,
      category: '會員與帳號',
      question: '忘記密碼時該怎麼處理？',
      answer: '可在登入頁面使用忘記密碼功能，依照信箱驗證流程重新設定密碼。',
    },
    {
      id: 4,
      category: '刊登與內容審核',
      question: '刊登房源後會立即上架嗎？',
      answer: '房源送出後會進入審核流程，確認資料完整與內容合規後才會正式顯示。',
    },
    {
      id: 5,
      category: '媒合、預約與追蹤',
      question: '如何預約看房或共享資源？',
      answer: '進入租賃物詳情頁後，可依照頁面指示送出預約或聯繫申請。',
    },
  ];

  get filteredFaqItems(): HomeFaqItem[] {
    return this.faqItems
      .filter((item) => item.category === this.activeFaqCategory)
      .slice(0, 3);
  }

  setFaqCategory(category: HomeFaqCategory): void {
    this.activeFaqCategory = category;
  }

  moveUserCenterCard(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateX = (y - 0.5) * -10;
    const rotateY = (x - 0.5) * 10;

    card.style.setProperty('--card-rotate-x', `${rotateX}deg`);
    card.style.setProperty('--card-rotate-y', `${rotateY}deg`);
    card.style.setProperty('--card-glow-x', `${x * 100}%`);
    card.style.setProperty('--card-glow-y', `${y * 100}%`);

    const layers = card.querySelectorAll<HTMLElement>('.home-user-card__layer');
    layers.forEach((layer, index) => {
      const depth = 18 + index * 10;
      const moveX = (x - 0.5) * (8 + index * 4);
      const moveY = (y - 0.5) * (8 + index * 4);

      layer.style.transform = `translate3d(${moveX}px, ${moveY}px, ${depth}px)`;
    });

    const decors = card.querySelectorAll<HTMLElement>('.home-user-card__decor');
    decors.forEach((decor, index) => {
      const moveX = (x - 0.5) * (12 + index * 8);
      const moveY = (y - 0.5) * (12 + index * 8);

      decor.style.transform = `translate3d(${moveX}px, ${moveY}px, ${8 + index * 8}px)`;
    });
  }

  resetUserCenterCard(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;

    card.style.removeProperty('--card-rotate-x');
    card.style.removeProperty('--card-rotate-y');
    card.style.removeProperty('--card-glow-x');
    card.style.removeProperty('--card-glow-y');

    card
      .querySelectorAll<HTMLElement>('.home-user-card__layer, .home-user-card__decor')
      .forEach((element) => {
        element.style.removeProperty('transform');
      });
  }

  userCenterPages: HomeUserCenterPage[] = [
    {
      eyebrow: 'Dashboard',
      title: '個人專區首頁',
      text: '從角色切換、資源總覽到待辦提醒，快速掌握目前狀態。',
      imageUrl: '/images/user-center-preview.jpg',
      featureKeys: ['role', 'resource'],
    },
    {
      eyebrow: 'Resources',
      title: '房源與共享資源管理',
      text: '集中管理房源、工具與技能，讓刊登與維護流程更清楚。',
      mockLabel: '房源 / 工具 / 技能管理畫面',
      imageUrl: '/images/user-center-management.jpg',
      featureKeys: ['resource'],
    },
    {
      eyebrow: 'Matching',
      title: '媒合與聯繫追蹤',
      text: '媒合成立後，集中追蹤聯繫、狀態與後續提醒。',
      mockLabel: '當前媒合與聯繫管理畫面',
      imageUrl: '/images/user-center-matches.jpg',
      featureKeys: ['match', 'smart'],
    },
    {
      eyebrow: 'Reservation',
      title: '預約審核與近期動態',
      text: '看房、工具與技能預約都能集中審核，重要動態即時提示。',
      mockLabel: '預約審核與近期動態畫面',
      imageUrl: '/images/user-center-booking.jpg',
      featureKeys: ['activity', 'smart'],
    },
  ];

  getUserCenterCards(keys: HomeUserCenterFeatureKey[]): HomeUserCenterCard[] {
    return keys
      .map((key) => this.userCenterCards.find((card) => card.key === key))
      .filter((card): card is HomeUserCenterCard => Boolean(card));
  }

  private initContactParallax(): void {
    const root = this.introRoot.nativeElement;
    const section = root.querySelector<HTMLElement>('.js-contact-cta');
    const video = root.querySelector<HTMLElement>('.js-contact-video');
    const side = root.querySelector<HTMLElement>('.js-contact-side');
    const content = root.querySelector<HTMLElement>('.js-contact-content');

    if (!section || !video) {
      return;
    }

    gsap.fromTo(
      video,
      {
        yPercent: -8,
        scale: 1.16,
      },
      {
        yPercent: 8,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      }
    );

    gsap.from([side, content], {
      y: 48,
      opacity: 0,
      duration: 0.85,
      stagger: 0.14,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 72%',
      },
    });
  }

  private initUserStackCopyMotion(): void {
    const root = this.introRoot.nativeElement;

    const copy = root.querySelector<HTMLElement>('.js-user-stack-copy');
    const eyebrow = root.querySelector<HTMLElement>('.js-user-stack-copy-eyebrow');
    const title = root.querySelector<HTMLElement>('.js-user-stack-copy-title');
    const text = root.querySelector<HTMLElement>('.js-user-stack-copy-text');
    const cards = gsap.utils.toArray<HTMLElement>('.js-user-stack-card');
    const copyStage = root.querySelector<HTMLElement>('.home-user-stack__copy-stage');
    const stack = root.querySelector<HTMLElement>('.home-user-stack');
    const stackBg = root.querySelector<HTMLElement>('.js-user-stack-bg');

    if (!copy || !copyStage || !stack || !eyebrow || !title || !text || !cards.length) {
      return;
    }

    if (stackBg) {
      const firstCard = cards[0];
      const lastCard = cards[cards.length - 1];

      gsap.set(stackBg, { opacity: 0 });

      const userCenterSection = root.querySelector<HTMLElement>('.home-user-center');
      const setStackBgActive = (isActive: boolean) => {
        userCenterSection?.classList.toggle('is-stack-active', isActive);

        gsap.killTweensOf(stackBg);
        gsap.to(stackBg, {
          opacity: isActive ? 1 : 0,
          duration: 0.56,
          ease: 'power3.out',
        });
      };

      ScrollTrigger.create({
        trigger: firstCard,
        start: 'top 52%',
        endTrigger: lastCard,
        end: 'bottom 48%',
        onEnter: () => setStackBgActive(true),
        onEnterBack: () => setStackBgActive(true),
        onLeave: () => setStackBgActive(false),
        onLeaveBack: () => setStackBgActive(false),
        invalidateOnRefresh: true,
      });
    }

    let activeIndex = 0;

    const updateCopy = (index: number) => {
      const page = this.userCenterPages[index];

      if (!page || index === activeIndex) {
        return;
      }

      activeIndex = index;

      const targets = [eyebrow, title, text];

      gsap.killTweensOf(targets);

      gsap.to(targets, {
        y: -10,
        opacity: 0,
        duration: 0.18,
        stagger: 0.03,
        ease: 'power2.out',
        onComplete: () => {
          eyebrow.textContent = page.eyebrow;
          title.textContent = page.title;
          text.textContent = page.text;

          gsap.fromTo(
            targets,
            {
              y: 18,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.45,
              stagger: 0.06,
              ease: 'power3.out',
            }
          );
        },
      });
    };

    copyStage.classList.remove('is-exiting');

    ScrollTrigger.create({
      trigger: stack,
      start: 'top 85%',
      end: 'bottom 82%',
      onEnter: () => copyStage.classList.remove('is-exiting'),
      onEnterBack: () => copyStage.classList.remove('is-exiting'),
      onLeave: () => copyStage.classList.add('is-exiting'),
      onLeaveBack: () => copyStage.classList.add('is-exiting'),
      invalidateOnRefresh: true,
    });

    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 48%',
        end: 'bottom 48%',
        onEnter: () => updateCopy(index),
        onEnterBack: () => updateCopy(index),
        invalidateOnRefresh: true,
      });
    });
  }

  private initAboutAiMatchMotion(): void {
    const root = this.introRoot.nativeElement;
    const section = root.querySelector<HTMLElement>('.js-ai-match-section');
    const stage = root.querySelector<HTMLElement>('.js-ai-match-stage');

    if (!section || !stage) {
      return;
    }

    const HOLD_DISTANCE = window.innerHeight * 1.8;

    const getAiAnimationEnd = () => {
      const total = section.offsetHeight - window.innerHeight;
      return `+=${Math.max(window.innerHeight * 3, total - HOLD_DISTANCE)}`;
    };

    const q = gsap.utils.selector(stage);

    const heading = q<HTMLElement>('.js-ai-heading')[0];
    const progress = q<SVGCircleElement>('.js-ai-progress')[0];
    const number = q<HTMLElement>('.js-ai-number')[0];
    const orb = q<HTMLElement>('.js-ai-orb')[0];
    const young = q<HTMLElement>('.js-ai-young')[0];
    const elder = q<HTMLElement>('.js-ai-elder')[0];
    const arcFlow = q<SVGPathElement>('.js-ai-arc-flow')[0];
    const result = q<HTMLElement>('.js-ai-result')[0];
    const tags = q<HTMLElement>('.js-ai-tag');
    const speech = q<HTMLElement>('.js-ai-speech-young, .js-ai-speech-elder');
    const youngSpeech = q<HTMLElement>('.js-ai-speech-young')[0];
    const elderSpeech = q<HTMLElement>('.js-ai-speech-elder')[0];
    const youngSpeechText = q<HTMLElement>('.js-ai-speech-young p')[0];
    const elderSpeechText = q<HTMLElement>('.js-ai-speech-elder p')[0];

    if (!heading || !progress || !number || !orb || !young || !elder || !arcFlow || !result) {
      return;
    }

    if (youngSpeechText) {
      this.splitTextToRevealChars(youngSpeechText);
    }

    if (elderSpeechText) {
      this.splitTextToRevealChars(elderSpeechText);
    }

    const youngSpeechChars = youngSpeechText
      ? gsap.utils.toArray<HTMLElement>(youngSpeechText.querySelectorAll('.js-scroll-title-char'))
      : [];

    const elderSpeechChars = elderSpeechText
      ? gsap.utils.toArray<HTMLElement>(elderSpeechText.querySelectorAll('.js-scroll-title-char'))
      : [];

    const radius = 86;
    const circumference = 2 * Math.PI * radius;
    const target = Number(orb.dataset['target'] || 95);
    const score = { value: 0 };

    progress.style.strokeDasharray = `${circumference}`;
    progress.style.strokeDashoffset = `${circumference}`;

    // gsap.set(stage, { clearProps: 'position,top,left,width,height,transform' });
    gsap.set(heading, { opacity: 1, y: 0 });
    gsap.set(young, { x: '-38vw', opacity: 0 });
    gsap.set(elder, { x: '38vw', opacity: 0 });
    gsap.set(orb, {
      xPercent: -50,
      yPercent: -50,
      scale: 0.86,
      transformOrigin: '50% 50%',
    });
    // gsap.set(orb, { scale: 0.86, transformOrigin: '50% 50%' });
    gsap.set(tags, { opacity: 0, y: 16, scale: 0.92, x: 0 });
    gsap.set(speech, { opacity: 0, y: 20 });
    gsap.set([youngSpeechChars, elderSpeechChars], {
      opacity: 0,
      y: 14,
      filter: 'blur(3px)',
    });

    gsap.set(result, { opacity: 0, y: 20 });
    gsap.set(arcFlow, { opacity: 0, strokeDashoffset: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: getAiAnimationEnd,
        // end: 'bottom bottom',
        scrub: 1.1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(
      young,
      {
        x: '-11vw',
        opacity: 1,
        duration: 0.36,
        ease: 'none',
      },
      0.04
    );

    tl.to(
      elder,
      {
        x: '11vw',
        opacity: 1,
        duration: 0.36,
        ease: 'none',
      },
      0.04
    );

    tl.to(youngSpeech, {
      opacity: 1,
      y: 0,
      duration: 0.18,
      ease: 'power2.out',
    }, 0.12);

    tl.to(elderSpeech, {
      opacity: 1,
      y: 0,
      duration: 0.18,
      ease: 'power2.out',
    }, 0.28);

    tl.to(youngSpeechChars, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.28,
      stagger: 0.018,
      ease: 'power3.out',
    }, 0.30);

    tl.to(elderSpeechChars, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.28,
      stagger: 0.018,
      ease: 'power3.out',
    }, 0.40);

    tl.to(tags, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.16,
      stagger: 0.035,
      ease: 'power2.out',
    }, 0.22);

    tl.to(orb, {
      scale: 1,
      duration: 0.24,
      ease: 'back.out(1.5)',
    }, 0.3);

    tl.to(arcFlow, {
      opacity: 1,
      strokeDashoffset: -420,
      duration: 0.45,
      ease: 'none',
    }, 0.34);

    tl.to(score, {
      value: target,
      duration: 0.38,
      ease: 'power2.out',
      onUpdate: () => {
        const value = Math.round(score.value);
        number.textContent = `${value}%`;
        progress.style.strokeDashoffset = `${circumference * (1 - value / 100)}`;
      },
    }, 0.42);

    tl.to(tags, {
      x: (_index, element) => Number((element as HTMLElement).dataset['endX'] || 0),
      y: (_index, element) => Number((element as HTMLElement).dataset['endY'] || 0),
      scale: 0.82,
      opacity: 0.28,
      duration: 0.3,
      stagger: 0.025,
      ease: 'power1.inOut',
    }, 0.48);

    tl.to(young, { x: '-4vw', duration: 0.26, ease: 'power1.inOut' }, 0.68);
    tl.to(elder, { x: '4vw', duration: 0.26, ease: 'power1.inOut' }, 0.68);

    tl.to(result, {
      opacity: 1,
      y: 0,
      duration: 0.18,
      ease: 'power2.out',
    }, 0.78);
  }

  private initScrollTitleRevealMotion(): void {
    const root = this.introRoot.nativeElement;
    const titles = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll('.js-scroll-title-reveal')
    );

    titles.forEach((title) => {
      this.splitTextToRevealChars(title);

      const chars = gsap.utils.toArray<HTMLElement>(
        title.querySelectorAll('.js-scroll-title-char')
      );
      const revealDelay = Number(title.dataset['revealDelay'] ?? 0);

      gsap.set(chars, {
        opacity: 0,
        y: 24,
        filter: 'blur(4px)',
      });

      gsap.to(chars, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.75,
        ease: 'power3.out',
        stagger: {
          each: 0.035,
          from: 'start',
        },
        scrollTrigger: {
          trigger: title,
          start: 'top 78%',
          once: true,
        },
      });
    });
  }

  private splitTextToRevealChars(element: HTMLElement): void {
    if (element.dataset['titleRevealSplit'] === 'true') {
      return;
    }

    const splitNode = (node: ChildNode): DocumentFragment => {
      const fragment = document.createDocumentFragment();

      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent ?? '';

        Array.from(text).forEach((char) => {
          if (char.trim() === '') {
            fragment.appendChild(document.createTextNode(char));
            return;
          }

          const span = document.createElement('span');
          span.className = 'js-scroll-title-char';
          span.textContent = char;
          span.style.display = 'inline-block';
          span.style.willChange = 'transform, opacity, filter';

          fragment.appendChild(span);
        });

        return fragment;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const originalElement = node as HTMLElement;
        const clonedElement = originalElement.cloneNode(false) as HTMLElement;

        Array.from(originalElement.childNodes).forEach((childNode) => {
          clonedElement.appendChild(splitNode(childNode));
        });

        fragment.appendChild(clonedElement);
      }

      return fragment;
    };

    const fragment = document.createDocumentFragment();

    Array.from(element.childNodes).forEach((childNode) => {
      fragment.appendChild(splitNode(childNode));
    });

    element.replaceChildren(fragment);
    element.dataset['titleRevealSplit'] = 'true';
  }
}
