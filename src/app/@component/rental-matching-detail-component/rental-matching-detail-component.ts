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

@Component({
  selector: 'app-rental-matching-detail-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rental-matching-detail-component.html',
  styleUrl: './rental-matching-detail-component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // ✅ 這裡有開，<swiper-container> 就能完美運作
})
export class RentalMatchingDetailComponent implements OnInit, AfterViewInit {

  // 1. 修正：宣告為屬性，不能用 const
  readonly HABIT_ICONS: { [key: string]: string } = {
    'routines': 'routine',
    'showerRestrictions': 'do_not_disturb_on',
    'visitorPolicies': 'groups',
    'cookingHabits': 'chef_hat',
    'fridgeAllocations': 'kitchen',
    'interactionFrequencies': 'conversation'
  };

  readonly HABIT_LABELS: { [key: string]: string } = {
    'routines': '作息型態',
    'showerRestrictions': '深夜洗衣/洗澡限制',
    'visitorPolicies': '訪客留宿規範',
    'cookingHabits': '廚房與飲食文化',
    'fridgeAllocations': '冰箱使用分配',
    'interactionFrequencies': '期望交流頻率'
  };

  // 2. 宣告屬性
  parsedRules: any = {};
  objectKeys = Object.keys; // 讓 HTML 可以用


  private rentalMatchingService = inject(RentalMatchingService);
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  private houseFacilityService = inject(HouseFacilityService);

  isRoom = computed(() => this.detailData()?.displayType === 'room');
  isProduct = computed(() => this.detailData()?.displayType === 'product');
  isSkill = computed(() => this.isProduct() && this.detailData()?.category === '專業諮詢');
  isTool = computed(() => this.isProduct() && this.detailData()?.category === '工具共享');

  itemType = signal<string | null>(null);
  detailData = signal<any>(null);
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

    // 在 ngOnInit 或資料撈取後的處理函數中
    // this.http.get<any>(`api/houses/${id}`).subscribe(data => {
    //   // 假設後端回傳的欄位叫 advancedRules
    //   if (data.advancedRules) {
    //     try {
    //       // 關鍵：將 JSON 字串轉成 JS 物件
    //       this.parsedRules = JSON.parse(data.advancedRules);
    //       // 現在 this.parsedRules 就會像這樣：
    //       // { "routines": ["早睡早起"], "cookingHabits": ["禁開伙"] }
    //     } catch (e) {
    //       console.error("JSON 解析失敗", e);
    //     }
    //   }
    // });

    this.route.params.pipe(
      switchMap(params => {
        const type = params['type'];
        // 💡 確保拉出來的 ID 經過精確的 parseInt 解析，把任何帶有「:1」或字串的雜質完全濾掉，變成純數字
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
        // 1. 先把主資料塞進去
        this.detailData.set({ ...data, displayType: this.displayType() });

        // 💡 確保這裡抓取的是剛剛主資料回傳、百分之百正確的純數字 id (例如 16 或 17)
        const cleanHouseId = Number(data?.id || data?.Id);

        if (this.displayType() === 'room' && cleanHouseId) {
          // 🔥 直連後端，確保網址是乾乾淨淨的 /api/HouseFacility/17
          this.http.get<any[]>(`https://localhost:7215/api/HouseFacility/${cleanHouseId}`).subscribe({
            next: (facilitiesList: any[]) => {
              console.log('🎉 終極雷達 - 成功拿到該房設施：', facilitiesList);

              // 使用 setTimeout 巧妙包裹，把更新 Signal 的動作推遲到下一個事件循環
              // 完美解決 NG0100 ExpressionChangedAfterItHasBeenCheckedError 錯誤！
              setTimeout(() => {
                this.detailData.set({
                  ...this.detailData(),
                  facilities: facilitiesList
                });
              }, 0);
            },
            error: (err: any) => {
              console.error('❌ 設施 API 依然失敗，原因：', err);
            }
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
}
