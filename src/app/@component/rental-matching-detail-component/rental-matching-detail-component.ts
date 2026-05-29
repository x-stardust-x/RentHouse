import { Schema } from './../../../../node_modules/hono/dist/types/types.d';
import { RentalMatchingService } from './../../@service/rental-matching-service';
import { Component, OnInit, inject, signal, computed, CUSTOM_ELEMENTS_SCHEMA, effect, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatchHouseDto } from '../../@interface/match-house';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { register } from 'swiper/element/bundle'; // ✅ 保留元件註冊引入
import { switchMap } from 'rxjs/operators';
import { HouseFacilityService } from '../../@service/house-facility-service';
import { RouterModule, Routes, RouterLink } from '@angular/router';
import { faLine } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-rental-matching-detail-component',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FontAwesomeModule, FormsModule],
  templateUrl: './rental-matching-detail-component.html',
  styleUrl: './rental-matching-detail-component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // ✅ 這裡有開，<swiper-container> 就能完美運作
})
export class RentalMatchingDetailComponent implements OnInit, AfterViewInit {
  faLine = faLine;

  // 1. 定義圖示對應 (跟之前一樣)
  readonly HABIT_ICONS: { [key: string]: string } = {
    'routines': 'routine',
    'showerRestrictions': 'do_not_disturb_on',
    'visitorPolicies': 'groups',
    'cookingHabits': 'chef_hat',
    'fridgeAllocations': 'kitchen',
    'interactionFrequencies': 'conversation'
  };

  // 2. 新增標籤名稱對應 (這是解決冒號問題的關鍵)
  readonly HABIT_LABELS: { [key: string]: string } = {
    'routines': '作息型態',
    'showerRestrictions': '深夜限制',
    'visitorPolicies': '訪客規範',
    'cookingHabits': '廚房文化',
    'fridgeAllocations': '冰箱分配',
    'interactionFrequencies': '交流頻率'
  };

  // 2. 宣告屬性
  parsedRules: any = {};
  objectKeys = Object.keys; // 讓 HTML 可以用


  private rentalMatchingService = inject(RentalMatchingService);
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  private houseFacilityService = inject(HouseFacilityService);

  // isRoom = computed(() => this.detailData()?.displayType === 'room');
  // isProduct = computed(() => this.detailData()?.displayType === 'product');
  // isSkill = computed(() => this.isProduct() && this.detailData()?.category === '專業諮詢');
  // isTool = computed(() => this.isProduct() && this.detailData()?.category === '工具共享');

  itemType = signal<string | null>(null);
  // detailData = signal<any>(null);
  displayType = signal<string>('');

  mapUrl = computed<SafeResourceUrl | null>(() => {
    const address = this.detailData()?.address;
    if (!address) return null;
    const encodedAddress = encodeURIComponent(address);
    const rawUrl = `https://maps.google.com/maps?q=${encodedAddress}&output=embed&z=16`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  });

  constructor() {
    // 💥 確保 Swiper 元件有在當前組件確實啟動註冊
    register();

    effect(() => {
      console.log('當前 detailData 的狀態:', this.detailData());
      if (this.detailData() === null) {
        console.warn('警告：detailData 被清空了！');
      }
    });
  }


  // ===================================================================
  // 1. 移除 get facilities() 裡面的 console.log（避免觸發 NG0100 錯誤）
  // ===================================================================
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
  // 2. 修正 ngOnInit 路由訂閱，徹底清除 ID 旁邊的「:1」
  // ===================================================================
  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        const type = params['type'];
        const rawId = params['id'];
        const itemId = typeof rawId === 'string' && rawId.includes(':')
          ? parseInt(rawId.split(':')[0], 10)
          : parseInt(rawId, 10);

        if (isNaN(itemId)) return [];
        this.displayType.set(type);

        return type === 'room'
          ? this.rentalMatchingService.getRentalById(itemId)
          : this.rentalMatchingService.getProductById(itemId);
      })
    ).subscribe({
      next: (data: any) => {
        console.log("🔥 API 原始回傳資料:", data);
        // 1. 設定主資料
        this.detailData.set({ ...data, displayType: this.displayType() });
        const cleanHouseId = Number(data?.id || data?.Id);

        // 2. 解析 JSON 生活習慣 (從拿到的 data 解析，確保順序正確)
        if (data && data.advancedRules) {
          try {
            this.parsedRules = typeof data.advancedRules === 'string'
              ? JSON.parse(data.advancedRules)
              : data.advancedRules;
            console.log('解析後的規則內容:', this.parsedRules);
          } catch (e) {
            console.error("JSON 解析失敗", e);
          }
        }

        // 3. 取得設施資料 (確保 cleanHouseId 存在後再執行)
        if (this.displayType() === 'room' && cleanHouseId) {
          // ⚠️ 請檢查這裡的路徑，如果是 404，試試看改為 HouseFacilities (複數)
          this.http.get<any[]>(`https://localhost:7215/api/HouseFacility/${cleanHouseId}`).subscribe({
            next: (facilitiesList: any[]) => {
              setTimeout(() => {
                this.detailData.set({
                  ...this.detailData(),
                  facilities: facilitiesList
                });
              }, 0);
            },
            error: (err) => console.error('設施 API 失敗 (請確認後端路徑是否正確):', err)
          });
        }
      }
    });
  }

  selectedHeroImage = signal<string | null>(null);
  selectedHeroIndex = signal(0);
  heroImageChanging = signal(false);

  heroImages(): { src: string; alt: string }[] {
    return [
      { src: this.detailData()?.url || 'images/house1.jpg', alt: '租賃物預覽圖 1' },
      { src: this.detailData()?.url || 'images/house2.jpg', alt: '租賃物預覽圖 2' },
      { src: this.detailData()?.url || 'images/house3.jpg', alt: '租賃物預覽圖 3' },
      { src: this.detailData()?.url || 'images/house4.jpg', alt: '租賃物預覽圖 4' },
    ];
  }

  currentHeroImage(): string {
    return this.selectedHeroImage() || this.heroImages()[0]?.src || 'images/default_image_16-9.jpg';
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
        header.classList.remove('is-scrolled');
        header.classList.remove('is-hidden');
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

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // 線上預約彈窗
  // 元件基礎狀態與原有的 Signal 保持不變...
  isContactModalOpen = signal(false);
  detailData = signal<any>({ name: '溫莎牛頓專業水彩 24 色套組', price: 150, priceUnit: '日', realName: '王大明', address: '高雄市前鎮區成功二路' });
  isRoom = signal(false); // 測試時可手動切換開關
  isSkill = signal(false);
  isTool = signal(true);

  // ==================== 🏢 房屋預約增強欄位 ====================
  roomDate = signal(''); // 看房日期
  roomTimeSlots = signal([
    { label: '上午 (09:00 - 12:00)', checked: false },
    { label: '下午 (14:00 - 18:00)', checked: false },
    { label: '晚上 (18:00 - 21:00)', checked: false }
  ]);
  roomMoveInTime = signal('一週內'); // 預計搬入時間
  roomProfiles = signal([
    { label: '單人入住', icon: 'person', checked: false },
    { label: '無寵物', icon: 'pets', checked: false },
    { label: '不抽菸', icon: 'smoke_free', checked: false },
    { label: '學生', icon: 'school', checked: false },
    { label: '上班族', icon: 'work', checked: false },
    { label: '生活單純', icon: 'spa', checked: false }
  ]);
  roomIntro = signal('');

  // ==================== 🎓 技能諮詢原有欄位 ====================
  skillFormat = signal('');
  skillDate = signal('');
  skillNeeds = signal('');
  skillToolChecked = signal(false);

  // ==================== 🧰 工具借用增強欄位 ====================
  toolStartDate = signal('');
  toolEndDate = signal('');
  toolDeliveryMethod = signal('面交'); // 取件方式：'面交' 或 '物流'
  toolPurpose = signal('');
  toolTermsChecked = signal(false);

  // 動態計算天數 (對應設計稿上的「總共 X 天」)
  calculateToolDays = computed(() => {
    if (!this.toolStartDate() || !this.toolEndDate()) return 0;
    const start = new Date(this.toolStartDate());
    const end = new Date(this.toolEndDate());
    const diffTime = end.getTime() - start.getTime();
    if (diffTime < 0) return 0;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // 包含首尾天數
  });

  // 輔助方法：點擊切換多選狀態
  toggleSlot(index: number) {
    const current = this.roomTimeSlots();
    current[index].checked = !current[index].checked;
    this.roomTimeSlots.set([...current]);
  }

  toggleProfile(index: number) {
    const current = this.roomProfiles();
    current[index].checked = !current[index].checked;
    this.roomProfiles.set([...current]);
  }

  // openContactModal() { this.isContactModalOpen.set(true); }
  openContactModal(event: Event) {
    event.preventDefault(); // 防止 a 連結預設跳頁行為
    this.isContactModalOpen.set(true);
  }
  closeContactModal() { this.isContactModalOpen.set(false); }
  submitContactMessage() { this.closeContactModal(); }




  // // --- 彈窗顯示狀態 ---
  // isContactModalOpen = signal(false);

  // // --- 1. 房屋預約彈窗表單欄位 ---
  // roomTimeSlots = signal<{ label: string; checked: boolean }[]>([
  //   { label: '平日白天', checked: false },
  //   { label: '平日晚上', checked: false },
  //   { label: '週末假日', checked: false }
  // ]);
  // roomIntro = signal('');

  // // --- 2. 技能諮詢彈窗表單欄位 ---
  // skillFormat = signal(''); // 線上或實體
  // skillDate = signal('');
  // skillNeeds = signal('');
  // skillToolChecked = signal(false);

  // // --- 3. 工具借用彈窗表單欄位 ---
  // toolStartDate = signal('');
  // toolEndDate = signal('');
  // toolPurpose = signal('');
  // toolTermsChecked = signal(false);


  // // --- 彈窗核心邏輯方法 ---
  // openContactModal(event: Event) {
  //   event.preventDefault();
  //   this.isContactModalOpen.set(true);
  // }

  // closeContactModal() {
  //   this.isContactModalOpen.set(false);
  //   this.resetForm(); // 關閉時自動重設表單
  // }

  // // 點擊確認送出
  // submitContactMessage() {
  //   // 封裝準備送給後端 API 的資料物件
  //   const postData = {
  //     category: this.detailData()?.category || this.detailData()?.Category,
  //     targetId: this.detailData()?.accountId,
  //     projectId: this.detailData()?.id,

  //     // 根據不同類別撈取對應 Signal 的值
  //     roomData: this.isRoom() ? {
  //       preferredTimes: this.roomTimeSlots().filter(t => t.checked).map(t => t.label),
  //       intro: this.roomIntro()
  //     } : null,

  //     skillData: this.isSkill() ? {
  //       format: this.skillFormat(),
  //       date: this.skillDate(),
  //       needs: this.skillNeeds()
  //     } : null,

  //     toolData: this.isTool() ? {
  //       startDate: this.toolStartDate(),
  //       endDate: this.toolEndDate(),
  //       purpose: this.toolPurpose()
  //     } : null
  //   };

  //   console.log('準備送出至後端 Controller 的 DTO 資料：', postData);

  //   // TODO: 這裡接你的後端 Service API 發送 POST 請求
  //   alert('訊息已成功發送給提供者！快去訊息匣看看吧。');
  //   this.closeContactModal();
  // }

  // // 重置表單狀態
  // private resetForm() {
  //   this.roomTimeSlots.update(slots => slots.map(s => ({ ...s, checked: false })));
  //   this.roomIntro.set('');
  //   this.skillFormat.set('');
  //   this.skillDate.set('');
  //   this.skillNeeds.set('');
  //   this.skillToolChecked.set(false);
  //   this.toolStartDate.set('');
  //   this.toolEndDate.set('');
  //   this.toolPurpose.set('');
  //   this.toolTermsChecked.set(false);
  // }
}
