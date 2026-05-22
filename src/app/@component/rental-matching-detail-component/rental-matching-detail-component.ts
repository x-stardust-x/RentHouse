import { Schema } from './../../../../node_modules/hono/dist/types/types.d';
import { RentalMatchingService } from './../../@service/rental-matching-service';
import { Component, OnInit, inject, signal, computed, CUSTOM_ELEMENTS_SCHEMA, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatchHouseDto } from '../../@interface/match-house';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { register } from 'swiper/element/bundle';
import { switchMap } from 'rxjs/operators';



@Component({
  selector: 'app-rental-matching-detail-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rental-matching-detail-component.html',
  styleUrl: './rental-matching-detail-component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RentalMatchingDetailComponent implements OnInit {



  private rentalMatchingService = inject(RentalMatchingService);
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  isRoom = computed(() => this.detailData()?.displayType === 'room');
  isProduct = computed(() => this.detailData()?.displayType === 'product');
  isSkill = computed(() => this.isProduct() && this.detailData()?.category === '專業諮詢');
  isTool = computed(() => this.isProduct() && this.detailData()?.category === '工具共享');



  // isSkill(): boolean {
  //   // return this.detailData()?.category === '技能' || this.detailData()?.category === '服務';

  //   // const data = this.detailData();
  //   // return data?.category === '技能';

  //   // const cat = this.detailData()?.category;
  //   // if (!cat) return false;
  //   // return cat.includes('技能') || cat?.includes('諮詢') || cat?.includes('專業');


  //   const data = this.detailData(); // 先存起來
  //   if (!data || !data.category) return false; // 若資料為空，直接回傳 false
  //   return data.category.includes('技能') || data?.includes('諮詢') || data?.includes('專業');
  // }

  // isTool(): boolean {
  //   // return this.detailData()?.category === '工具' || this.detailData()?.category === '設備';

  //   // const data = this.detailData();
  //   // return data?.category === '工具';

  //   // const cat = this.detailData()?.category;
  //   // if (!cat) return false;
  //   // return cat.includes('工具') || cat.includes('設備');

  //   const data = this.detailData(); // 先存起來
  //   if (!data || !data.category) return false; // 若資料為空，直接回傳 false
  //   return data.category.includes('工具') || data?.includes('設備');
  // }



  // 新增：用來記錄當前詳情頁的種類 ('room' | 'product')
  itemType = signal<string | null>(null);

  // 建立一個 Signal 或屬性存取資料
  detailData = signal<any>(null);

  // 儲存當前點進來的類型 ('room' 或 'product')，供 HTML 分流判斷
  displayType = signal<string>('');

  // 使用 computed 動態生成安全的 Google 地圖網址
  mapUrl = computed<SafeResourceUrl | null>(() => {

    // 防呆：如果不是房間，或者沒有地址，就不生成地圖
    // if (this.displayType() !== 'room') return null;

    const address = this.detailData()?.address;
    if (!address) return null;

    // 將地址進行編碼，避免中文字或特殊符號在網址中壞掉
    const encodedAddress = encodeURIComponent(address);

    // Google 官方提供免費嵌入網址格式
    // const rawUrl = `https://www.google.com/maps/embed/v1/place?key=你的API_KEY&q=${encodedAddress}`;
    const rawUrl = `https://maps.google.com/maps?q=${encodedAddress}&output=embed&z=16`;

    // 透過 sanitizer 轉換成安全網址
    return this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);

  })


  constructor() {

    // 在 .ts 中監控 signal 的變化
    effect(() => {
      console.log('當前 detailData 的狀態:', this.detailData());
      if (this.detailData() === null) {
        console.warn('警告：detailData 被清空了！');
        // 在這裡設定斷點 (Breakpoint)，看看是哪行程式碼導致它變回 null
      }
    });

  }





  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        const type = params['type'];
        const itemId = Number(params['id']);

        if (isNaN(itemId)) return [];

        this.displayType.set(type);

        // ✅ 關鍵：在請求發出時，不要強制把 detailData 設為 null
        // 讓舊資料留在畫面上，直到新資料回來才替換，這樣就不會看到「資料載入中」

        return type === 'room'
          ? this.rentalMatchingService.getRentalById(itemId)
          : this.rentalMatchingService.getProductById(itemId);
      })
    ).subscribe({
      next: (data: any) => {
        this.detailData.set({ ...data, displayType: this.displayType() });
      }
    });
  }


  selectedHeroImage = signal<string | null>(null);
  selectedHeroIndex = signal(0);
  heroImageChanging = signal(false);

  heroImages(): { src: string; alt: string }[] {
    const mainImage = this.detailData()?.url || 'images/default_image_16-9.jpg';

    return [
      {
        src: this.detailData()?.url || 'images/house1.jpg',
        alt: '租賃物預覽圖 1',
        // alt: this.detailData()?.name || '租賃物主圖',
      },
      {
        src: this.detailData()?.url || 'images/house2.jpg',
        alt: '租賃物預覽圖 2',
      },
      {
        src: this.detailData()?.url || 'images/house3.jpg',
        alt: '租賃物預覽圖 3',
      },
      {
        src: this.detailData()?.url || 'images/house4.jpg',
        alt: '租賃物預覽圖 4',
      },
    ];
  }

  currentHeroImage(): string {
    return this.selectedHeroImage() || this.heroImages()[0]?.src || 'images/default_image_16-9.jpg';
  }

  selectHeroImage(imageSrc: string, index: number): void {
    if (this.currentHeroImage() === imageSrc) {
      return;
    }

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

      // 往下滾動：隱藏
      if (
        currentScrollY > headerHideThreshold &&
        scrollDifference > scrollDelta
      ) {
        header.classList.add('is-hidden');
      }

      // 往上滾動：顯示
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


  // ngOnInit(): void {
  // // 使用 switchMap 自動處理路由參數變化
  // this.route.params.pipe(
  //   switchMap(params => {
  //     const type = params['type'];
  //     const itemId = Number(params['id']);

  //     if (isNaN(itemId)) {
  //       console.error('ID 不是有效的數字');
  //       return []; // 回傳空陣列停止後續處理
  //     }

  //     this.displayType.set(type);

  //     // 這裡回傳 API Observable，switchMap 會自動取消上一次未完成的請求
  //     return type === 'room'
  //       ? this.rentalMatchingService.getRentalById(itemId)
  //       : this.rentalMatchingService.getProductById(itemId);
  //   })
  // ).subscribe({
  //   next: (data: any) => {
  //     // 只有當資料確實拿到時，才更新 Signal
  //     this.detailData.set({ ...data, displayType: this.displayType() });
  //   },
  //   error: (err: any) => console.error('請求失敗：', err)
  // });




  // ngOnInit(): void {

  //   // alert('有成功進入這個組件！');

  //   this.route.params.subscribe(params => {

  //     const type = params['type']; // 'room' 或 'product'
  //     const itemId = Number(params['id']); // 轉成數字 ID

  //     console.log('當前組件接收到的參數 ID 是:', itemId);
  //     console.log('當前組件接收到的參數 Type 是:', params['type']);

  //     if (isNaN(itemId)) {
  //       console.error('錯誤：ID 不是有效的數字');
  //       return;
  //     }

  //     this.displayType.set(type);

  //     // 依據類別分流發送 API 請求給後端
  //     if (type === 'room') {
  //       // 房屋詳情 (沿用你原本的方法)
  //       this.rentalMatchingService.getRentalById(itemId).subscribe({
  //         next: (data: any) => {
  //           console.log('房屋詳情成功抓到資料：', data);
  //           this.detailData.set({ ...data, displayType: type });
  //           // this.detailData.set(data);
  //         },
  //         error: (err: any) => console.error('房屋詳情抓取失敗：', err)
  //       });
  //     } else if (type === 'product') {
  //       // 工具/技能詳情 (記得要去你的 Service 補上這個 getProductById 方法喔！)
  //       this.rentalMatchingService.getProductById(itemId).subscribe({
  //         next: (data: any) => {
  //           console.log('工具/技能詳情成功抓到資料：', data);
  //           this.detailData.set({ ...data, displayType: type });
  //           // this.detailData.set(data);
  //         },
  //         error: (err: any) => console.error('工具/技能詳情抓取失敗：', err)
  //       });
  //     }






  //   });
  // }



}




