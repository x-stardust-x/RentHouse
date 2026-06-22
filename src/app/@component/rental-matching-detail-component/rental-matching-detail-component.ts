import { Component, OnInit, inject, signal, computed, CUSTOM_ELEMENTS_SCHEMA, effect, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { register } from 'swiper/element/bundle';
import { faLine } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Authservice } from '../../@service/authservice';
import { LesseeProfileTag } from '../../@interface/lessee-profile-tag';
import { AvailableViewingSlot } from '../../@interface/available-viewing-slot';
import { HouseService } from '../../@service/house.service';
// Services & Interfaces
import { RentalMatchingService } from '../../@service/rental-matching-service';
import { HouseFacilityService } from '../../@service/house-facility-service';
import { HouseViewingService } from '../../@service/house-viewing-service';
import { ProductBookingService } from '../../@service/product-booking-service';
import { MatchHouseDto } from '../../@interface/match-house';
import { AlertService } from '../../@service/alert-service';


@Component({
  selector: 'app-rental-matching-detail-component',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FontAwesomeModule, FormsModule],
  templateUrl: './rental-matching-detail-component.html',
  styleUrl: './rental-matching-detail-component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RentalMatchingDetailComponent implements OnInit, AfterViewInit {

  currentCleanId = signal<number>(0);
  // ===================================================================
  // 注入 Services
  // ===================================================================
  private rentalMatchingService = inject(RentalMatchingService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(Authservice);
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  private houseFacilityService = inject(HouseFacilityService);
  private houseService = inject(HouseService);
  private viewingService = inject(HouseViewingService);
  private productBookingService = inject(ProductBookingService);
  private alert = inject(AlertService);

  // ===================================================================
  // 靜態屬性與設定
  // ===================================================================
  faLine = faLine;
  objectKeys = Object.keys;
  parsedRules: any = {};

  isViewingSlotsLoading = signal(false);
  viewingSlotsLoadError = signal('');

  readonly HABIT_ICONS: { [key: string]: string } = {
    livingWithLessor: 'home',

    cleanLevel: 'cleaning_services',
    noiseTolerance: 'volume_down',

    'routines': 'routine',
    'showerRestrictions': 'do_not_disturb_on',
    'visitorPolicies': 'groups',
    'cookingHabits': 'chef_hat',
    'fridgeAllocations': 'kitchen',
    'interactionFrequencies': 'conversation'
  };

  readonly HABIT_LABELS: { [key: string]: string } = {
    livingWithLessor: '與出租人同住',
    cleanLevel: '整潔',
    noiseTolerance: '安靜',

    routines: '作息',
    showerRestrictions: '深夜',
    visitorPolicies: '訪客',
    cookingHabits: '廚房',
    fridgeAllocations: '冰箱',
    interactionFrequencies: '交流',
    note: '補充'
  };

  // readonly HABIT_LABELS: { [key: string]: string } = {
  //   livingWithLessor: '是否與出租人同住',

  //   cleanLevel: '整潔要求',
  //   noiseTolerance: '安靜要求',

  //   'routines': '作息型態',
  //   'showerRestrictions': '深夜限制',
  //   'visitorPolicies': '訪客規範',
  //   'cookingHabits': '廚房文化',
  //   'fridgeAllocations': '冰箱分配',
  //   'interactionFrequencies': '交流頻率'
  // };

  readonly RULE_DISPLAY_ORDER = [
    'livingWithLessor',
    'cleanLevel',
    'noiseTolerance',
    'routines',
    'showerRestrictions',
    'visitorPolicies',
    'cookingHabits',
    'fridgeAllocations',
    'interactionFrequencies',
    'note'
  ];

  // HABIT_ICONS: Record<string, string> = {
  //   routines: 'routine',
  //   showerRestrictions: 'do_not_disturb_on',
  //   visitorPolicies: 'groups',
  //   cookingHabits: 'skillet',
  //   fridgeAllocations: 'kitchen',
  //   interactionFrequencies: 'conversation',
  //   note: 'rule'
  // };

  // ===================================================================
  // 核心資料 Signals
  // ===================================================================
  itemType = signal<string | null>(null);
  detailData = signal<any>(null);
  displayType = signal<string>('');

  isRoom = computed(() => this.displayType() === 'room' || this.detailData()?.displayType === 'room');
  isProduct = computed(() => this.displayType() === 'product' || this.detailData()?.displayType === 'product');
  productCategory = computed(() => {
    return String(
      this.detailData()?.category ??
      this.detailData()?.Category ??
      ''
    ).trim();
  });

  isSkill = computed(() => {
    const category = this.productCategory();

    return this.isProduct() && [
      '專業諮詢',
      '技能',
      'Skill',
      'skill'
    ].includes(category);
  });

  isTool = computed(() => {
    const category = this.productCategory();

    return this.isProduct() && [
      '工具共享',
      '工具',
      'Tool',
      'tool'
    ].includes(category);
  });

  mapUrl = computed<SafeResourceUrl | null>(() => {
    const data = this.detailData();

    const address =
      data?.address ??
      data?.Address ??
      '';

    if (!address || !address.trim()) return null;

    const encodedAddress = encodeURIComponent(address.trim());
    const rawUrl = `https://maps.google.com/maps?q=${encodedAddress}&hl=zh-TW&output=embed&z=16`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  });

  get facilities() {
    const data = this.detailData();
    if (!data || !data.facilities || !Array.isArray(data.facilities)) {
      return [];
    }
    return data.facilities.map((f: any) => ({
      name: f.name || f.Name,
      icon: f.iconClass || f.IconClass || f.icon || f.Icon || 'star'
    }));
  }

  // ===================================================================
  // 圖片預覽 Signals
  // ===================================================================
  selectedHeroImage = signal<string | null>(null);
  selectedHeroIndex = signal(0);
  heroImageChanging = signal(false);

  heroImages = signal<{ src: string; alt: string }[]>([]);

  private readonly apiBaseUrl = 'https://localhost:7215';

  private normalizeImageUrl(rawUrl: unknown): string | null {
    if (rawUrl === null || rawUrl === undefined) {
      return null;
    }

    let url = String(rawUrl).trim();

    if (!url) {
      return null;
    }

    url = url.replace(/\\/g, '/');

    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:')) {
      return url;
    }

    if (url.startsWith('/')) {
      return `${this.apiBaseUrl}${url}`;
    }

    if (url.startsWith('Uploads/')) {
      return `${this.apiBaseUrl}/${url}`;
    }

    return url;
  }

  private extractImageUrls(data: any): string[] {
    const candidates: unknown[] = [];

    const coverUrl =
      data?.coverUrl ??
      data?.CoverUrl ??
      data?.url ??
      data?.Url;

    if (coverUrl) {
      candidates.push(coverUrl);
    }

    const imageUrls =
      data?.imageUrls ??
      data?.ImageUrls;

    if (Array.isArray(imageUrls)) {
      candidates.push(...imageUrls);
    }

    const images =
      data?.images ??
      data?.Images;

    if (Array.isArray(images)) {
      images.forEach((image: any) => {
        candidates.push(
          image?.url ??
          image?.Url ??
          image?.coverUrl ??
          image?.CoverUrl
        );
      });
    }

    const normalizedUrls = candidates
      .map(url => this.normalizeImageUrl(url))
      .filter((url): url is string => !!url);

    return Array.from(new Set(normalizedUrls));
  }

  private syncHeroImages(data: any): void {
    const urls = this.extractImageUrls(data);

    const fallbackUrl = 'images/default_image_16-9.jpg';

    const finalUrls = urls.length > 0
      ? urls
      : [fallbackUrl];

    const itemName =
      data?.name ??
      data?.Name ??
      '租賃物';

    const images = finalUrls.map((url, index) => ({
      src: url,
      alt: `${itemName} 圖片 ${index + 1}`
    }));

    this.heroImages.set(images);
    this.selectedHeroIndex.set(0);
    this.selectedHeroImage.set(images[0]?.src ?? fallbackUrl);
  }

  currentHeroImage(): string {
    return this.selectedHeroImage()
      || this.heroImages()[0]?.src
      || 'images/default_image_16-9.jpg';
  }

  selectHeroImage(imageSrc: string, index: number): void {
    if (this.currentHeroImage() === imageSrc) return;
    this.heroImageChanging.set(true);
    this.selectedHeroImage.set(imageSrc);
    this.selectedHeroIndex.set(index);
    window.setTimeout(() => {
      this.heroImageChanging.set(false);
    }, 520);
  }

  // ===================================================================
  // 表單與彈窗 Signals
  // ===================================================================
  isContactModalOpen = signal(false);
  isFavorite = signal(false);
  // 1. 房屋
  roomDate = signal('');
  roomTimeSlots = signal<{ label: string; checked: boolean }[]>([
    { label: '上午 (09:00 - 12:00)', checked: false },
    { label: '下午 (14:00 - 18:00)', checked: false },
    { label: '晚上 (18:00 - 21:00)', checked: false }
  ]);
  moveInTimes = signal(['一週內', '半個月內', '一個月後']);
  roomMoveInTime = signal('一週內');
  tenantProfiles = signal([
    { label: '單人入住', icon: 'person', checked: false },
    { label: '無寵物', icon: 'pets', checked: false },
    { label: '不抽菸', icon: 'smoke_free', checked: false },
    { label: '學生', icon: 'school', checked: false },
    { label: '上班族', icon: 'work', checked: false },
    { label: '生活單純', icon: 'spa', checked: false }
  ]);
  roomIntro = signal('');

  // 2. 技能
  skillFormat = signal('');
  skillDate = signal('');
  skillNeeds = signal('');
  skillToolChecked = signal(false);

  // 3. 工具
  toolStartDate = signal('');
  toolEndDate = signal('');
  toolDelivery = signal('面交自取');
  toolPurpose = signal('');
  toolNoticeChecked = signal(false);

  lesseeProfileTags = signal<LesseeProfileTag[]>([]);
  availableViewingSlots = signal<AvailableViewingSlot[]>([]);
  selectedViewingSlotIds = signal<number[]>([]);

  // ===================================================================
  // Constructor & 生命週期
  // ===================================================================
  constructor() {
    register();
    effect(() => {
      console.log('當前 detailData 的狀態:', this.detailData());
      if (this.detailData() === null) {
        console.warn('警告：detailData 被清空了！');
      }
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        const type = params['type'];

        const rawId = params['id'];
        // 直接拔掉可能的冒號，再轉成數字
        const cleanIdString = typeof rawId === 'string' ? rawId.replace(':', '') : rawId;
        const itemId = Number(cleanIdString);

        console.log('📌 網址上的 rawId 是:', rawId);
        console.log('📌 轉換後的 itemId 是:', itemId);

        if (isNaN(itemId) || itemId === 0) {
          console.warn('⚠️ 無效的房屋 ID:', rawId);
          return []; // 或者使用 import { EMPTY } from 'rxjs'; return EMPTY;
        }

        this.currentCleanId.set(itemId);

        // const rawId = params['id'];
        // const itemId = typeof rawId === 'string' && rawId.includes(':')
        //   ? parseInt(rawId.split(':')[0], 10)
        //   : parseInt(rawId, 10);

        // if (isNaN(itemId)) return [];
        // this.currentCleanId.set(itemId);
        this.displayType.set(type);

        return type === 'room'
          ? this.rentalMatchingService.getRentalById(itemId)
          : this.rentalMatchingService.getProductById(itemId);
      })
    ).subscribe({
      next: (data: any) => {
        console.log('🔥 API 原始回傳資料:', data);

        const detail = {
          ...data,
          displayType: this.displayType()
        };

        this.detailData.set(detail);
        this.syncHeroImages(detail);

        this.isFavorite.set(
          Boolean(detail?.isFavorite ?? detail?.IsFavorite ?? false)
        );

        const cleanHouseId = Number(data?.id || data?.Id);

        if (cleanHouseId) {
          this.checkFavoriteStatus(cleanHouseId);
        }
        setTimeout(() => {
          this.detailData.set({ ...data, displayType: this.displayType() });
        });

        let advancedRules: Record<string, string> = {};

        const rawAdvancedRules =
          detail?.advancedRules ??
          detail?.AdvancedRules ??
          '';

        if (rawAdvancedRules) {
          try {
            advancedRules = typeof rawAdvancedRules === 'string'
              ? JSON.parse(rawAdvancedRules)
              : rawAdvancedRules;
          } catch (e) {
            console.error('JSON 解析失敗', e);
            advancedRules = {};
          }
        }

        this.parsedRules = {
          livingWithLessor: this.livingWithLessorLabel(detail?.livingWithLessor ?? detail?.LivingWithLessor),
          cleanLevel: this.cleanLevelLabel(detail?.cleanLevel ?? detail?.CleanLevel),
          noiseTolerance: this.noiseToleranceLabel(detail?.noiseTolerance ?? detail?.NoiseTolerance),
          ...advancedRules
        };

        if (this.displayType() === 'room' && cleanHouseId) {
          this.http.get<any[]>(`https://localhost:7215/api/HouseFacility/${cleanHouseId}`).subscribe({
            next: (facilitiesList: any[]) => {
              setTimeout(() => {
                this.detailData.set({
                  ...this.detailData(),
                  facilities: facilitiesList
                });
              }, 0);
            },
            error: (err) => console.error('設施 API 失敗:', err)
          });
        }
      },

      error: (err) => {
        console.error('詳情頁資料載入失敗：', err);

        if (err.status === 404) {
          this.router.navigate(['/404'], { replaceUrl: true });
          return;
        }

        alert('載入資料失敗，請稍後再試。');
      }
    });
  }

  ngAfterViewInit(): void {
    const header = document.querySelector<HTMLElement>('.public-layout__header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;
    const headerHideThreshold = 80;
    const scrollDelta = 6;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY;

      if (currentScrollY > headerHideThreshold) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled', 'is-hidden');
      }

      if (currentScrollY > headerHideThreshold && scrollDifference > scrollDelta) {
        header.classList.add('is-hidden');
      }
      if (scrollDifference < -scrollDelta) {
        header.classList.remove('is-hidden');
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  // ===================================================================
  // 邏輯方法 (彈窗與表單送出)
  // ===================================================================
  calculateDays(): number {
    const start = this.toolStartDate();
    const end = this.toolEndDate();
    if (!start || !end) return 0;
    const diffTime = new Date(end).getTime() - new Date(start).getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }

  openContactModal(event?: Event) {
    if (event) event.preventDefault();

    if (!this.authService.isLoggedIn()) {
      const returnUrl = this.router.url;

      this.alert.warning('請先登入後再進行預約。');

      this.router.navigate(['/login'], {
        queryParams: { returnUrl }
      });

      return;
    }

    if (this.isRoom()) {
      this.loadLesseeProfileTags();
      this.loadAvailableViewingSlots();
    }

    this.isContactModalOpen.set(true);
  }

  isViewingSlotSelected(slotId: number | string | null | undefined): boolean {
    const id = Number(slotId);

    if (!Number.isFinite(id)) {
      return false;
    }

    return this.selectedViewingSlotIds().includes(id);
  }

  toggleViewingSlot(slotId: number | string | null | undefined): void {
    const id = Number(slotId);

    if (!Number.isFinite(id)) {
      console.warn('無效的時段 ID：', slotId);
      return;
    }

    this.selectedViewingSlotIds.update(current => {
      if (current.includes(id)) {
        return current.filter(currentId => currentId !== id);
      }

      return [...current, id];
    });

    console.log('目前選取的看房時段 IDs：', this.selectedViewingSlotIds());
  }

  closeContactModal() {
    this.isContactModalOpen.set(false);
    this.resetForm();
  }

  submitContactMessage(): void {
    if (this.isRoom()) {
      if (!this.authService.isLoggedIn()) {
        this.alert.warning('請先登入後再進行預約。');

        this.router.navigate(['/login'], {
          queryParams: { returnUrl: this.router.url }
        });

        return;
      }

      const hasAvailableSlots = this.availableViewingSlots().length > 0;

      const selectedSlots = this.availableViewingSlots()
        .filter(s => this.selectedViewingSlotIds().includes(Number(s.id)));

      let selectedTimes: string[] = [];
      let finalViewingTime = '';

      if (!this.roomDate()) {
        this.alert.warning('請選擇看房日期！');
        return;
      }

      if (!hasAvailableSlots) {
        this.alert.warning('出租人尚未設定可預約看房時段，暫時無法送出預約。');
        return;
      }

      if (selectedSlots.length === 0) {
        this.alert.warning('請至少選擇一個出租人開放的看房時段！');
        return;
      }

      selectedTimes = selectedSlots.map(slot => slot.label);

      const firstSelectedSlot = selectedSlots[0];
      finalViewingTime = `${this.roomDate()}T${firstSelectedSlot.startTime}:00`;

      const selectedLesseeProfileTags = this.lesseeProfileTags()
        .filter(p => p.checked && p.label !== '更多偏好')
        .map(p => ({
          label: p.label,
          source: p.source
        }));

      const requestData = {
        houseId: this.currentCleanId(),
        viewingSlotId: selectedSlots.length > 0 ? selectedSlots[0].id : null,
        viewingTime: finalViewingTime,
        expectedMoveIn: new Date().toISOString(),
        expectedMoveInText: this.roomMoveInTime(),
        preferredTimeSlots: selectedTimes,
        lesseeProfileTags: selectedLesseeProfileTags,
        message: this.roomIntro(),
        matchScore: this.detailData()?.matchScore || 85
      };

      console.log('準備發送的房屋預約請求:', requestData);

      this.viewingService.submitApplication(requestData).subscribe({
        next: () => {
          this.alert.success('預約成功！請至個人專區查看追蹤。');
          this.closeContactModal();
        },
        error: (err) => {
          console.error(err);

          const backendMessage =
            err.error?.details ||
            err.error?.message ||
            err.message ||
            '請確認後端伺服器是否正常開啟並稍後再試';

          this.alert.error(`預約失敗：${backendMessage}`);
        }
      });

      return;
    }

    if (!this.authService.isLoggedIn()) {
      this.alert.warning('請先登入後再送出預約。');

      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url }
      });

      return;
    }

    const productId = this.currentCleanId();

    if (!productId) {
      this.alert.warning('找不到工具 / 技能 ID');
      return;
    }

    const bookingType: 'tool' | 'skill' = this.isSkill() ? 'skill' : 'tool';

    let startTime: string | null = null;
    let endTime: string | null = null;
    let method = '';
    let message = '';
    let extraNote = '';

    if (bookingType === 'tool') {
      if (!this.toolStartDate() || !this.toolEndDate()) {
        this.alert.warning('請選擇借用開始與結束日期');
        return;
      }

      if (!this.toolNoticeChecked()) {
        this.alert.warning('請先勾選工具借用須知');
        return;
      }

      startTime = `${this.toolStartDate()}T09:00:00`;
      endTime = `${this.toolEndDate()}T18:00:00`;
      method = this.toolDelivery();
      message = this.toolPurpose();

      if (!message.trim()) {
        this.alert.warning('請填寫借用目的與用途');
        return;
      }

      extraNote = '已確認工具借用須知，若有嚴重損壞願照價賠償';
    }

    if (bookingType === 'skill') {
      if (!this.skillFormat()) {
        this.alert.warning('請選擇授課形式');
        return;
      }

      if (!this.skillDate()) {
        this.alert.warning('請選擇預約日期');
        return;
      }

      if (!this.skillNeeds().trim()) {
        this.alert.warning('請填寫學習背景與需求');
        return;
      }

      startTime = `${this.skillDate()}T14:00:00`;
      endTime = `${this.skillDate()}T15:00:00`;
      method = this.skillFormat();
      message = this.skillNeeds();
      extraNote = this.skillToolChecked()
        ? '已確認會自備需要的用具'
        : '';
    }

    const requestData = {
      productId,
      bookingType,
      startTime,
      endTime,
      method,
      message,
      extraNote,
      matchScore: this.detailData()?.matchScore || 85
    };

    console.log('準備送出的工具 / 技能預約：', requestData);

    this.productBookingService.apply(requestData).subscribe({
      next: () => {
        this.alert.success('申請已送出！請至個人專區查看工具 / 技能預約紀錄。');
        this.closeContactModal();
      },
      error: (err) => {
        console.error('工具 / 技能預約失敗：', err);

        const backendMessage =
          err.error?.details ||
          err.error?.message ||
          err.message ||
          '請稍後再試';

        this.alert.error(`申請失敗：${backendMessage}`);
      }
    });
  }

  // submitContactMessage() {
  //   // 【情境一：送出房屋預約 (打 API 到後端)】
  //   if (this.isRoom()) {
  //     if (!this.authService.isLoggedIn()) {
  //       alert('請先登入後再進行預約。');

  //       this.router.navigate(['/login'], {
  //         queryParams: { returnUrl: this.router.url }
  //       });

  //       return;
  //     }

  //     const hasAvailableSlots = this.availableViewingSlots().length > 0;

  //     const selectedSlots = this.availableViewingSlots()
  //       .filter(s => this.selectedViewingSlotIds().includes(Number(s.id)));

  //     let selectedTimes: string[] = [];
  //     let finalViewingTime = '';

  //     if (!this.roomDate()) {
  //       alert('請選擇看房日期！');
  //       return;
  //     }

  //     if (!hasAvailableSlots) {
  //       alert('出租人尚未設定可預約看房時段，暫時無法送出預約。');
  //       return;
  //     }

  //     if (selectedSlots.length === 0) {
  //       alert('請至少選擇一個出租人開放的看房時段！');
  //       return;
  //     }

  //     selectedTimes = selectedSlots.map(slot => slot.label);

  //     const firstSelectedSlot = selectedSlots[0];
  //     finalViewingTime = `${this.roomDate()}T${firstSelectedSlot.startTime}:00`;

  //     const selectedLesseeProfileTags = this.lesseeProfileTags()
  //       .filter(p => p.checked && p.label !== '更多偏好')
  //       .map(p => ({
  //         label: p.label,
  //         source: p.source
  //       }));

  //     const requestData = {
  //       houseId: this.currentCleanId(),

  //       // 目前後端欄位仍是單一 ViewingSlotId，所以先存第一個選到的時段 ID
  //       viewingSlotId: selectedSlots.length > 0 ? selectedSlots[0].id : null,

  //       // 目前後端欄位仍是單一 ViewingTime，所以先存第一個選到的時段開始時間
  //       viewingTime: finalViewingTime,

  //       expectedMoveIn: new Date().toISOString(),
  //       expectedMoveInText: this.roomMoveInTime(),

  //       // 這裡會存所有複選時段
  //       preferredTimeSlots: selectedTimes,

  //       lesseeProfileTags: selectedLesseeProfileTags,
  //       message: this.roomIntro(),
  //       matchScore: this.detailData()?.matchScore || 85
  //     };

  //     console.log('準備發送的房屋預約請求:', requestData);

  //     this.viewingService.submitApplication(requestData).subscribe({
  //       next: () => {
  //         alert('預約成功！請至個人專區查看追蹤。');
  //         this.closeContactModal();
  //       },
  //       error: (err) => {
  //         console.error(err);

  //         const backendMessage =
  //           err.error?.details ||
  //           err.error?.message ||
  //           err.message ||
  //           '請確認後端伺服器是否正常開啟並稍後再試';

  //         alert(`預約失敗：${backendMessage}`);
  //       }
  //     });

  //     return;
  //   }
  //   // 【情境二：送出技能與工具申請 (保留舊有邏輯)】

  //   else {
  //     if (!this.authService.isLoggedIn()) {
  //       alert('請先登入後再送出預約。');

  //       this.router.navigate(['/login'], {
  //         queryParams: { returnUrl: this.router.url }
  //       });

  //       return;
  //     }

  //     const productId = this.currentCleanId();

  //     if (!productId) {
  //       alert('找不到工具 / 技能 ID');
  //       return;
  //     }

  //     const bookingType: 'tool' | 'skill' = this.isSkill() ? 'skill' : 'tool';

  //     let startTime: string | null = null;
  //     let endTime: string | null = null;
  //     let method = '';
  //     let message = '';
  //     let extraNote = '';

  //     if (bookingType === 'tool') {
  //       if (!this.toolStartDate() || !this.toolEndDate()) {
  //         alert('請選擇借用開始與結束日期');
  //         return;
  //       }

  //       if (!this.toolNoticeChecked()) {
  //         alert('請先勾選工具借用須知');
  //         return;
  //       }

  //       startTime = `${this.toolStartDate()}T09:00:00`;
  //       endTime = `${this.toolEndDate()}T18:00:00`;
  //       method = this.toolDelivery();
  //       message = this.toolPurpose();

  //       if (!message.trim()) {
  //         alert('請填寫借用目的與用途');
  //         return;
  //       }

  //       extraNote = '已確認工具借用須知，若有嚴重損壞願照價賠償';
  //     }

  //     if (bookingType === 'skill') {
  //       if (!this.skillFormat()) {
  //         alert('請選擇授課形式');
  //         return;
  //       }

  //       if (!this.skillDate()) {
  //         alert('請選擇預約日期');
  //         return;
  //       }

  //       if (!this.skillNeeds().trim()) {
  //         alert('請填寫學習背景與需求');
  //         return;
  //       }

  //       startTime = `${this.skillDate()}T14:00:00`;
  //       endTime = `${this.skillDate()}T15:00:00`;
  //       method = this.skillFormat();
  //       message = this.skillNeeds();
  //       extraNote = this.skillToolChecked()
  //         ? '已確認會自備需要的用具'
  //         : '';
  //     }

  //     const requestData = {
  //       productId,
  //       bookingType,
  //       startTime,
  //       endTime,
  //       method,
  //       message,
  //       extraNote,
  //       matchScore: this.detailData()?.matchScore || 85
  //     };

  //     console.log('準備送出的工具 / 技能預約：', requestData);

  //     this.productBookingService.apply(requestData).subscribe({
  //       next: () => {
  //         alert('申請已送出！請至個人專區查看工具 / 技能預約紀錄。');
  //         this.closeContactModal();
  //       },
  //       error: (err) => {
  //         console.error('工具 / 技能預約失敗：', err);

  //         const backendMessage =
  //           err.error?.details ||
  //           err.error?.message ||
  //           err.message ||
  //           '請稍後再試';

  //         alert(`申請失敗：${backendMessage}`);
  //       }
  //     });

  //     return;
  //   }

  //   // else {
  //   //   const postData = {
  //   //     category: this.detailData()?.category || '測試類別',
  //   //     targetId: this.detailData()?.accountId || 1,
  //   //     projectId: this.detailData()?.id || 999,

  //   //     skillData: this.isSkill() ? {
  //   //       format: this.skillFormat(),
  //   //       date: this.skillDate(),
  //   //       needs: this.skillNeeds()
  //   //     } : null,

  //   //     toolData: this.isTool() ? {
  //   //       startDate: this.toolStartDate(),
  //   //       endDate: this.toolEndDate(),
  //   //       purpose: this.toolPurpose(),
  //   //       delivery: this.toolDelivery()
  //   //     } : null
  //   //   };

  //   console.log('準備送出至後端的技能/工具 DTO 資料：', postData);
  //   alert('訊息已成功發送給提供者！快去訊息匣看看吧。');
  //   this.closeContactModal();
  // }


  private resetForm() {
    this.roomDate.set('');
    this.roomTimeSlots.update(slots => slots.map(s => ({ ...s, checked: false })));
    this.roomMoveInTime.set('一週內');
    this.tenantProfiles.update(profiles => profiles.map(p => ({ ...p, checked: false })));
    this.roomIntro.set('');

    this.skillFormat.set('');
    this.skillDate.set('');
    this.skillNeeds.set('');
    this.skillToolChecked.set(false);

    this.toolStartDate.set('');
    this.toolEndDate.set('');
    this.toolDelivery.set('面交自取');
    this.toolPurpose.set('');
    this.toolNoticeChecked.set(false);

    this.selectedViewingSlotIds.set([]);
    this.availableViewingSlots.set([]);
    this.lesseeProfileTags.set([]);
  }

  private loadLesseeProfileTags() {
    this.viewingService.getMyLesseeProfileTags().subscribe({
      next: (tags) => {
        this.lesseeProfileTags.set([
          ...tags.map(t => ({
            ...t,
            checked: false,
            isEditing: false
          })),
          {
            label: '更多偏好',
            source: 'custom',
            icon: 'add',
            checked: false,
            isEditing: false
          }
        ]);
      },
      error: (err) => {
        console.error('取得承租人偏好失敗', err);
      }
    });
  }

  private loadAvailableViewingSlots() {
    const houseId = this.currentCleanId();

    if (!houseId || houseId <= 0) {
      console.warn('無效的房源 ID，無法取得可預約時段：', houseId);
      this.availableViewingSlots.set([]);
      this.viewingSlotsLoadError.set('無法取得房源 ID');
      return;
    }

    this.isViewingSlotsLoading.set(true);
    this.viewingSlotsLoadError.set('');
    this.availableViewingSlots.set([]);
    this.selectedViewingSlotIds.set([]);

    this.viewingService.getAvailableSlotsByHouse(houseId).subscribe({
      next: (slots: any[]) => {
        console.log('可預約時段 API 回傳：', slots);

        const normalizedSlots = (slots || [])
          .map(slot => {
            const id = Number(slot.id ?? slot.Id);
            const startTime = slot.startTime ?? slot.StartTime ?? '';
            const endTime = slot.endTime ?? slot.EndTime ?? '';

            return {
              id,
              houseId: slot.houseId ?? slot.HouseId,
              lessorId: slot.lessorId ?? slot.LessorId,
              availableDate: slot.availableDate ?? slot.AvailableDate ?? null,
              startTime,
              endTime,
              label: slot.label ?? slot.Label ?? `${startTime} - ${endTime}`,
              isEnabled: slot.isEnabled ?? slot.IsEnabled ?? true
            };
          })
          .filter(slot =>
            Number.isFinite(slot.id) &&
            slot.startTime &&
            slot.endTime
          );

        this.availableViewingSlots.set(normalizedSlots);
        this.isViewingSlotsLoading.set(false);

        console.log('整理後的可預約時段：', normalizedSlots);

        if (normalizedSlots.length === 0) {
          this.viewingSlotsLoadError.set('出租人尚未設定可預約看房時段');
        }
      },
      error: (err) => {
        console.error('取得可預約時段失敗', err);

        this.availableViewingSlots.set([]);
        this.isViewingSlotsLoading.set(false);
        this.viewingSlotsLoadError.set('取得可預約時段失敗，請稍後再試');
      }
    });
  }

  handleLesseeProfileTagClick(index: number) {
    const tags = [...this.lesseeProfileTags()];
    const target = tags[index];

    if (!target) return;

    if (target.label === '更多偏好') {
      tags[index] = {
        label: '',
        source: 'custom',
        icon: 'edit',
        checked: false,
        isEditing: true
      };

      tags.push({
        label: '更多偏好',
        source: 'custom',
        icon: 'add',
        checked: false,
        isEditing: false
      });

      this.lesseeProfileTags.set(tags);
      return;
    }

    target.checked = !target.checked;
    this.lesseeProfileTags.set(tags);
  }

  finishCustomLesseeTag(index: number) {
    const tags = [...this.lesseeProfileTags()];
    const target = tags[index];

    if (!target) return;

    const value = target.label.trim();

    if (!value) {
      tags.splice(index, 1);
      this.lesseeProfileTags.set(tags);
      return;
    }

    tags[index] = {
      ...target,
      label: value,
      source: 'custom',
      icon: 'sell',
      checked: true,
      isEditing: false
    };

    const hasAddMore = tags.some(t => t.label === '更多偏好');

    if (!hasAddMore) {
      tags.push({
        label: '更多偏好',
        source: 'custom',
        icon: 'add',
        checked: false,
        isEditing: false
      });
    }

    this.lesseeProfileTags.set(tags);
  }

  toggleFallbackRoomTimeSlot(index: number): void {
    this.roomTimeSlots.update(slots =>
      slots.map((slot, i) =>
        i === index ? { ...slot, checked: !slot.checked } : slot
      )
    );
  }

  private cleanLevelLabel(
    value: number | string | null | undefined
  ): string {
    const level = Number(value);

    const labels: Record<number, string> = {
      1: '基本整潔即可',
      2: '偶爾整理',
      3: '一般乾淨',
      4: '需保持整潔',
      5: '高度重視整潔'
    };

    return labels[level] || '一般乾淨';
  }

  private noiseToleranceLabel(
    value: number | string | null | undefined
  ): string {
    const level = Number(value);

    const labels: Record<number, string> = {
      1: '非常重視安靜',
      2: '偏好安靜',
      3: '一般生活音可接受',
      4: '可接受偶爾吵雜',
      5: '可接受熱鬧環境'
    };

    return labels[level] || '一般生活音可接受';
  }

  private livingWithLessorLabel(
    value: boolean | string | number | null | undefined
  ): string {
    const normalizedValue =
      value === true ||
      value === 'true' ||
      value === 1 ||
      value === '1';

    return normalizedValue
      ? '是，與出租人同住'
      : '否，不與出租人同住';
  }

  onToggleFavorite() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.alert.warning('請先登入');
      return;
    }

    let currentAccountId: number;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      currentAccountId = Number(payload.AccountId);
      if (!currentAccountId) {
        console.error('在 Token 中找不到會員 ID 欄位！');
        return;
      }
    } catch (e) {
      console.error('Token 解析失敗', e);
      return;
    }


    const targetHouseId = this.currentCleanId();

    this.houseService.toggleFavoriteHouse(currentAccountId, targetHouseId).subscribe({
      next: (res) => {

        console.log("🔥 [點擊收藏] API 回傳結果：", res);


        const status = res.isFavorite !== undefined ? res.isFavorite : res.IsFavorite;
        this.isFavorite.set(status);
      },
      error: (err) => {
        console.error('收藏失敗，請稍後再試', err);
      }
    });
  }


  checkFavoriteStatus(houseId: number) {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const accountId = Number(payload.AccountId);

      this.houseService.checkIsFavorite(accountId, houseId).subscribe({
        next: (res) => {
          // 🚨 裝上監視器：看看進場檢查時，後端說了什麼？
          console.log("🔥 [進場檢查] API 回傳結果：", res);

          // 🔍 同樣加上大小寫防呆
          const status = res.isFavorite !== undefined ? res.isFavorite : res.IsFavorite;
          this.isFavorite.set(status);
        },
        error: (err) => {
          console.error('檢查收藏狀態失敗', err);
        }
      });
    } catch (e) {
      console.error("無法讀取登入狀態", e);
    }
  }

  getProviderPhoneHref(): string | null {
    const detail = this.detailData();

    const rawPhone =
      detail?.phone ??
      detail?.Phone ??
      detail?.providerPhone ??
      detail?.ProviderPhone ??
      detail?.contactPhone ??
      detail?.ContactPhone ??
      '';

    const phone = String(rawPhone).trim();

    if (!phone) {
      return null;
    }

    // 若後端已經回傳 tel: 開頭，直接使用
    if (/^tel:/i.test(phone)) {
      return phone;
    }

    // 移除空白、括號、橫線等顯示符號
    const normalizedPhone = phone.replace(/[^\d+]/g, '');

    if (!normalizedPhone) {
      return null;
    }

    return `tel:${normalizedPhone}`;
  }

  getProviderLineHref(): string | null {
    const detail = this.detailData();

    const rawLine =
      detail?.lineId ??
      detail?.LineId ??
      detail?.lineID ??
      detail?.LineID ??
      detail?.providerLineId ??
      detail?.ProviderLineId ??
      '';

    const lineId = String(rawLine).trim();

    if (!lineId) {
      return null;
    }

    // 如果資料庫存的是完整網址，直接使用
    if (/^https?:\/\//i.test(lineId)) {
      return lineId;
    }

    // LINE 官方帳號格式
    if (lineId.startsWith('@')) {
      return `https://line.me/R/ti/p/${lineId}`;
    }

    // 一般 LINE ID
    return `https://line.me/ti/p/~${encodeURIComponent(lineId)}`;
  }

  handleProviderContactClick(
    event: Event,
    href: string | null,
    unavailableMessage: string
  ): void {
    if (href) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    this.alert.warning(unavailableMessage);
  }
}





// import { Schema } from './../../../../node_modules/hono/dist/types/types.d';
// import { RentalMatchingService } from './../../@service/rental-matching-service';
// import { Component, OnInit, inject, signal, computed, CUSTOM_ELEMENTS_SCHEMA, effect, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { ActivatedRoute } from '@angular/router';
// import { MatchHouseDto } from '../../@interface/match-house';
// import { CommonModule } from '@angular/common';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { register } from 'swiper/element/bundle'; // ✅ 保留元件註冊引入
// import { switchMap } from 'rxjs/operators';
// import { HouseFacilityService } from '../../@service/house-facility-service';
// import { RouterModule, Routes, RouterLink } from '@angular/router';
// import { faLine } from '@fortawesome/free-brands-svg-icons';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { FormsModule } from '@angular/forms';
// import { HouseViewingService } from '../../@service/house-viewing-service';


// @Component({
//   selector: 'app-rental-matching-detail-component',
//   standalone: true,
//   imports: [CommonModule, RouterModule, RouterLink, FontAwesomeModule, FormsModule],
//   templateUrl: './rental-matching-detail-component.html',
//   styleUrl: './rental-matching-detail-component.scss',
//   schemas: [CUSTOM_ELEMENTS_SCHEMA], // ✅ 這裡有開，<swiper-container> 就能完美運作

// })
// export class RentalMatchingDetailComponent implements OnInit, AfterViewInit {

//   faLine = faLine;

//   // 1. 定義圖示對應 (跟之前一樣)
//   readonly HABIT_ICONS: { [key: string]: string } = {
//     'routines': 'routine',
//     'showerRestrictions': 'do_not_disturb_on',
//     'visitorPolicies': 'groups',
//     'cookingHabits': 'chef_hat',
//     'fridgeAllocations': 'kitchen',
//     'interactionFrequencies': 'conversation'
//   };

//   // 2. 新增標籤名稱對應 (這是解決冒號問題的關鍵)
//   readonly HABIT_LABELS: { [key: string]: string } = {
//     'routines': '作息型態',
//     'showerRestrictions': '深夜限制',
//     'visitorPolicies': '訪客規範',
//     'cookingHabits': '廚房文化',
//     'fridgeAllocations': '冰箱分配',
//     'interactionFrequencies': '交流頻率'
//   };

//   // 2. 宣告屬性
//   parsedRules: any = {};
//   objectKeys = Object.keys; // 讓 HTML 可以用


//   private rentalMatchingService = inject(RentalMatchingService);
//   private route = inject(ActivatedRoute);
//   private http = inject(HttpClient);
//   private sanitizer = inject(DomSanitizer);
//   private houseFacilityService = inject(HouseFacilityService);
//   private viewingService = inject(HouseViewingService);





//   isRoom = computed(() => this.detailData()?.displayType === 'room');
//   isProduct = computed(() => this.detailData()?.displayType === 'product');
//   isSkill = computed(() => this.isProduct() && this.detailData()?.category === '專業諮詢');
//   isTool = computed(() => this.isProduct() && this.detailData()?.category === '工具共享');

//   itemType = signal<string | null>(null);
//   detailData = signal<any>(null);
//   displayType = signal<string>('');

//   mapUrl = computed<SafeResourceUrl | null>(() => {
//     const address = this.detailData()?.address;
//     if (!address) return null;
//     const encodedAddress = encodeURIComponent(address);
//     const rawUrl = `https://maps.google.com/maps?q=${encodedAddress}&output=embed&z=16`;
//     return this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
//   });

//   constructor() {
//     // 💥 確保 Swiper 元件有在當前組件確實啟動註冊
//     register();

//     effect(() => {
//       console.log('當前 detailData 的狀態:', this.detailData());
//       if (this.detailData() === null) {
//         console.warn('警告：detailData 被清空了！');
//       }
//     });
//   }


//   // ===================================================================
//   // 1. 移除 get facilities() 裡面的 console.log（避免觸發 NG0100 錯誤）
//   // ===================================================================
//   get facilities() {
//     const data = this.detailData();
//     if (!data || !data.facilities || !Array.isArray(data.facilities)) {
//       return [];
//     }
//     return data.facilities.map((f: any) => ({
//       name: f.name || f.Name,
//       icon: f.iconClass || f.IconClass || f.icon || f.Icon || 'star'
//     }));
//   }

//   // ===================================================================
//   // 2. 修正 ngOnInit 路由訂閱，徹底清除 ID 旁邊的「:1」
//   // ===================================================================
//   ngOnInit(): void {
//     this.route.params.pipe(
//       switchMap(params => {
//         const type = params['type'];
//         const rawId = params['id'];
//         const itemId = typeof rawId === 'string' && rawId.includes(':')
//           ? parseInt(rawId.split(':')[0], 10)
//           : parseInt(rawId, 10);

//         if (isNaN(itemId)) return [];
//         this.displayType.set(type);

//         return type === 'room'
//           ? this.rentalMatchingService.getRentalById(itemId)
//           : this.rentalMatchingService.getProductById(itemId);
//       })
//     ).subscribe({
//       next: (data: any) => {
//         console.log("🔥 API 原始回傳資料:", data);
//         // 1. 設定主資料
//         this.detailData.set({ ...data, displayType: this.displayType() });
//         const cleanHouseId = Number(data?.id || data?.Id);

//         // 2. 解析 JSON 生活習慣 (從拿到的 data 解析，確保順序正確)
//         if (data && data.advancedRules) {
//           try {
//             this.parsedRules = typeof data.advancedRules === 'string'
//               ? JSON.parse(data.advancedRules)
//               : data.advancedRules;
//             console.log('解析後的規則內容:', this.parsedRules);
//           } catch (e) {
//             console.error("JSON 解析失敗", e);
//           }
//         }

//         // 3. 取得設施資料 (確保 cleanHouseId 存在後再執行)
//         if (this.displayType() === 'room' && cleanHouseId) {
//           // ⚠️ 請檢查這裡的路徑，如果是 404，試試看改為 HouseFacilities (複數)
//           this.http.get<any[]>(`https://localhost:7215/api/HouseFacility/${cleanHouseId}`).subscribe({
//             next: (facilitiesList: any[]) => {
//               setTimeout(() => {
//                 this.detailData.set({
//                   ...this.detailData(),
//                   facilities: facilitiesList
//                 });
//               }, 0);
//             },
//             error: (err) => console.error('設施 API 失敗 (請確認後端路徑是否正確):', err)
//           });
//         }
//       }
//     });
//   }

//   selectedHeroImage = signal<string | null>(null);
//   selectedHeroIndex = signal(0);
//   heroImageChanging = signal(false);

//   heroImages(): { src: string; alt: string }[] {
//     return [
//       { src: this.detailData()?.url || 'images/house1.jpg', alt: '租賃物預覽圖 1' },
//       { src: this.detailData()?.url || 'images/house2.jpg', alt: '租賃物預覽圖 2' },
//       { src: this.detailData()?.url || 'images/house3.jpg', alt: '租賃物預覽圖 3' },
//       { src: this.detailData()?.url || 'images/house4.jpg', alt: '租賃物預覽圖 4' },
//     ];
//   }

//   currentHeroImage(): string {
//     return this.selectedHeroImage() || this.heroImages()[0]?.src || 'images/default_image_16-9.jpg';
//   }

//   selectHeroImage(imageSrc: string, index: number): void {
//     if (this.currentHeroImage() === imageSrc) return;
//     this.heroImageChanging.set(true);
//     this.selectedHeroImage.set(imageSrc);
//     this.selectedHeroIndex.set(index);
//     window.setTimeout(() => {
//       this.heroImageChanging.set(false);
//     }, 520);
//   }

//   ngAfterViewInit(): void {
//     const header = document.querySelector<HTMLElement>('.public-layout__header');
//     if (!header) return;

//     let lastScrollY = window.scrollY;
//     let ticking = false;
//     const headerHideThreshold = 80;
//     const scrollDelta = 6;

//     const updateHeader = () => {
//       const currentScrollY = window.scrollY;
//       const scrollDifference = currentScrollY - lastScrollY;

//       if (currentScrollY > headerHideThreshold) {
//         header.classList.add('is-scrolled');
//       } else {
//         header.classList.remove('is-scrolled');
//         header.classList.remove('is-hidden');
//       }

//       if (currentScrollY > headerHideThreshold && scrollDifference > scrollDelta) {
//         header.classList.add('is-hidden');
//       }

//       if (scrollDifference < -scrollDelta) {
//         header.classList.remove('is-hidden');
//       }

//       lastScrollY = currentScrollY;
//       ticking = false;
//     };

//     const handleScroll = () => {
//       if (!ticking) {
//         window.requestAnimationFrame(updateHeader);
//         ticking = true;
//       }
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//   }

//   // 線上預約彈窗
//   isContactModalOpen = signal(false);

//   // --- 1. 房屋預約彈窗表單欄位 ---
//   roomDate = signal('');
//   roomTimeSlots = signal<{ label: string; checked: boolean }[]>([
//     { label: '上午 (09:00 - 12:00)', checked: false },
//     { label: '下午 (14:00 - 18:00)', checked: false },
//     { label: '晚上 (18:00 - 21:00)', checked: false }
//   ]);
//   moveInTimes = signal(['一週內', '半個月內', '一個月後']);
//   roomMoveInTime = signal('一週內');
//   tenantProfiles = signal([
//     { label: '單人入住', icon: 'person', checked: false },
//     { label: '無寵物', icon: 'pets', checked: false },
//     { label: '不抽菸', icon: 'smoke_free', checked: false },
//     { label: '學生', icon: 'school', checked: false },
//     { label: '上班族', icon: 'work', checked: false },
//     { label: '生活單純', icon: 'spa', checked: false }
//   ]);
//   roomIntro = signal('');

//   // --- 2. 技能諮詢彈窗表單欄位 ---
//   skillFormat = signal('');
//   skillDate = signal('');
//   skillNeeds = signal('');
//   skillToolChecked = signal(false);

//   // --- 3. 工具借用彈窗表單欄位 ---
//   toolStartDate = signal('');
//   toolEndDate = signal('');
//   toolDelivery = signal('面交自取');
//   toolPurpose = signal('');
//   toolNoticeChecked = signal(false);

//   // 輔助方法：計算工具借用總天數
//   calculateDays(): number {
//     const start = this.toolStartDate();
//     const end = this.toolEndDate();
//     if (!start || !end) return 0;

//     const diffTime = new Date(end).getTime() - new Date(start).getTime();
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays > 0 ? diffDays : 0;
//   }

//   // --- 彈窗核心邏輯方法 ---
//   openContactModal(event?: Event) {
//     if (event) {
//       event.preventDefault();
//     }
//     this.isContactModalOpen.set(true);
//   }

//   closeContactModal() {
//     this.isContactModalOpen.set(false);
//     this.resetForm();
//   }

//   // 點擊確認送出
//   submitContactMessage() {
//     // 這裡同樣寫死測試資料，確保不會因為 detailData 尚未齊全而報錯
//     const postData = {
//       category: this.detailData()?.category || '測試類別',
//       targetId: this.detailData()?.accountId || 1,
//       projectId: this.detailData()?.id || 999,

//       roomData: this.isRoom() ? {
//         preferredTimes: this.roomTimeSlots().filter(t => t.checked).map(t => t.label),
//         intro: this.roomIntro()
//       } : null,

//       skillData: this.isSkill() ? {
//         format: this.skillFormat(),
//         date: this.skillDate(),
//         needs: this.skillNeeds()
//       } : null,

//       toolData: this.isTool() ? {
//         startDate: this.toolStartDate(),
//         endDate: this.toolEndDate(),
//         purpose: this.toolPurpose(),
//         delivery: this.toolDelivery()
//       } : null
//     };

//     console.log('準備送出至後端 Controller 的 DTO 資料：', postData);

//     alert('訊息已成功發送給提供者！快去訊息匣看看吧。');
//     this.closeContactModal();
//   }

//   // 重置表單狀態
//   private resetForm() {
//     this.roomDate.set('');
//     this.roomTimeSlots.update(slots => slots.map(s => ({ ...s, checked: false })));
//     this.roomMoveInTime.set('一週內');
//     this.tenantProfiles.update(profiles => profiles.map(p => ({ ...p, checked: false })));
//     this.roomIntro.set('');

//     this.skillFormat.set('');
//     this.skillDate.set('');
//     this.skillNeeds.set('');
//     this.skillToolChecked.set(false);

//     this.toolStartDate.set('');
//     this.toolEndDate.set('');
//     this.toolDelivery.set('面交自取');
//     this.toolPurpose.set('');
//     this.toolNoticeChecked.set(false);
//   }
// }
