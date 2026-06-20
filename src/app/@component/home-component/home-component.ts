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
  private readonly rentalAutoSpeed = 6200;
  // private readonly rentalNavSpeed = 650;
  // private rentalNavRestartTimer = 0;

  @ViewChild('introRoot', { static: true })
  introRoot!: ElementRef<HTMLElement>;

  @ViewChild('heroSwiper', { static: true })
  heroSwiper!: ElementRef<any>;

  @ViewChild('rentalSwiper', { static: true })
  rentalSwiper!: ElementRef<any>;

  private rentalUpdateRafId = 0;

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
      imageUrl: '/images/home/rental-room-01.jpg',
      routerLink: ['/rental-matching-detail', 'room', '1'],
    },
    {
      id: 2,
      category: 'room',
      title: '採光共居房',
      price: 'NT$ 9,500 / 月',
      meta: '三民區 建工路',
      tag: '近公車站',
      imageUrl: '/images/home/rental-room-02.jpg',
      routerLink: ['/rental-matching-detail', 'room', '2'],
    },
    {
      id: 3,
      category: 'room',
      title: '安靜套房',
      price: 'NT$ 7,800 / 月',
      meta: '苓雅區 文化路',
      tag: '含網路',
      imageUrl: '/images/home/rental-room-03.jpg',
      routerLink: ['/rental-matching-detail', 'room', '3'],
    },
    {
      id: 4,
      category: 'tool',
      title: '電動起子組',
      price: 'NT$ 120 / 日',
      meta: '左營區 可面交',
      tag: '居家修繕',
      imageUrl: '/images/home/rental-tool-01.jpg',
      routerLink: ['/rental-matching-detail', 'product', '4'],
    },
    {
      id: 5,
      category: 'tool',
      title: '摺疊梯',
      price: 'NT$ 80 / 日',
      meta: '鳳山區 可預約',
      tag: '清潔整理',
      imageUrl: '/images/home/rental-tool-02.jpg',
      routerLink: ['/rental-matching-detail', 'product', '5'],
    },
    {
      id: 6,
      category: 'skill',
      title: '簡易手機教學',
      price: 'NT$ 300 / 次',
      meta: '線上或到府',
      tag: '長輩友善',
      imageUrl: '/images/home/rental-skill-01.jpg',
      routerLink: ['/rental-matching-detail', 'product', '6'],
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

    if (this.rentalUpdateRafId) {
      cancelAnimationFrame(this.rentalUpdateRafId);
      this.rentalUpdateRafId = 0;
    }

    const rentalSwiperInstance = this.rentalSwiper?.nativeElement?.swiper;

    if (rentalSwiperInstance) {
      rentalSwiperInstance.destroy(true, true);
    }

    // window.clearTimeout(this.rentalNavRestartTimer);
  }

  private initHeroSwiper(): void {
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

  private initRentalSwiper(): void {
    const swiperEl = this.rentalSwiper.nativeElement;

    Object.assign(swiperEl, {
      slidesPerView: 'auto',
      centeredSlides: false,
      loop: true,
      loopAdditionalSlides: 12,
      // speed: 6200,
      grabCursor: true,
      watchSlidesProgress: true,
      observer: true,
      observeParents: true,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      // navigation: true,
      speed: this.rentalAutoSpeed,
      loopPreventsSliding: false,
      preventInteractionOnTransition: false,
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
        const MAP_FINAL_X = '45vw';
        const MAP_FINAL_Y = '95vh';

        // const MAP_FINAL_X = '14vw';
        // const MAP_FINAL_Y = '90vh';

        /**
         * h1 到下方後的位置與大小。
         * TITLE_FINAL_Y 越大，h1 越往下。
         */
        const TITLE_FINAL_Y = () => window.innerHeight * 0.85;
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
            opacity: 0.9,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.home-about',
              start: 'top 20%',
              end: 'top 30%',
              scrub: 1.2,
            },
          }
        );

        if (aboutSection && rentalSection) {
          ScrollTrigger.create({
            trigger: aboutSection,
            start: 'bottom bottom',
            end: () => `+=${window.innerHeight * 0.95}`,
            pin: aboutSection,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          });

          gsap.fromTo(
            rentalSection,
            {
              y: () => window.innerHeight * 0.18,
            },
            {
              y: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: aboutSection,
                start: 'bottom bottom',
                end: () => `+=${window.innerHeight * 0.95}`,
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );
        }

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
            opacity: 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.home-about',
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
      featureKeys: ['resource'],
    },
    {
      eyebrow: 'Matching',
      title: '媒合與聯繫追蹤',
      text: '媒合成立後，集中追蹤聯繫、狀態與後續提醒。',
      mockLabel: '當前媒合與聯繫管理畫面',
      featureKeys: ['match', 'smart'],
    },
    {
      eyebrow: 'Reservation',
      title: '預約審核與近期動態',
      text: '看房、工具與技能預約都能集中審核，重要動態即時提示。',
      mockLabel: '預約審核與近期動態畫面',
      featureKeys: ['activity', 'smart'],
    },
  ];

  getUserCenterCards(keys: HomeUserCenterFeatureKey[]): HomeUserCenterCard[] {
    return keys
      .map((key) => this.userCenterCards.find((card) => card.key === key))
      .filter((card): card is HomeUserCenterCard => Boolean(card));
  }
}
