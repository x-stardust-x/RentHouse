import { RentalMatchingService } from './../../@service/rental-matching-service';
import { MatSliderModule } from '@angular/material/slider';
import { Component, signal, OnInit, computed } from '@angular/core';
import { Router } from '@angular/router';
import { MatchHouseDto } from '../../@interface/match-house';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatchProduct } from '../../@interface/match-product';
import { RouterModule, Routes, RouterLink } from '@angular/router';
import { MatchFilter } from '../../@interface/match-filter';

@Component({
  selector: 'app-rental-matching-component',
  standalone: true,
  imports: [
    CommonModule,
    MatSliderModule,
    FormsModule,
    MatSlideToggleModule,
    MatExpansionModule,
    RouterLink
  ],
  templateUrl: './rental-matching-component.html',
  styleUrl: './rental-matching-component.scss',
})
export class RentalMatchingComponent implements OnInit {


  // 🟢 1. 篩選條件 (統一唯一的狀態來源)
  filters: MatchFilter = {
    category: 'all',
    city: '',
    priceMin: 0,
    priceMax: 50000,
    sortOrder: 'newest',
    isSmartMatch: false,
    lifeStyle: [],
    routines: [],
    showerRestrictions: [],
    visitorPolicies: [],
    cookingHabits: [],
    fridgeAllocations: [],
    interactionFrequencies: []
  };

  // 🟢 2. 狀態管理 (將舊的陣列改為 Signal 以配合 Angular 17 的現代寫法)
  houses = signal<MatchHouseDto[]>([]);
  products = signal<MatchProduct[]>([]);

  // 這是畫面右側卡片真正要綁定渲染的陣列
  rentalItems = signal<any[]>([]);

  // 顯示項目數量 (動態計算 rentalItems 的長度)
  rentalItemCount = computed(() => this.rentalItems().length);

  // 頁面狀態與切換
  viewMode: 'grid' | 'map' = 'grid';
  isFilterCollapsed = signal(false);
  readonly panelOpenState = signal(false);
  lightboxImage = signal<string | null>(null);

  constructor(
    private rentalMatchingService: RentalMatchingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // 保留您原本的背景資料載入 (可作其他用途備用)
    this.loadRentals();
    this.loadProducts();

    // 🟢 網頁一載入，就自動發送一次預設搜尋條件給 API，取得卡片資料
    this.applyFilters();
  }

  // 🟢 3. 呼叫後端 API 的核心方法
  applyFilters() {
    console.log('準備傳送給後端的條件:', this.filters);

    this.rentalMatchingService.searchRentals(this.filters).subscribe({
      next: (data) => {
        console.log('【前端檢查】後端成功回傳資料：', data);

        // 幫後端回傳的資料自動補上 displayType，並自動解析正確的圖片路徑
        const formattedData = data.map(item => {
          // 透過判斷物件是否有 price/Price 屬性來區分是產品還是房屋
          const isProduct = item.price !== undefined || item.Price !== undefined || item.priceUnit !== undefined;

          return {
            ...item,
            displayType: isProduct ? 'product' : 'room',
            // 🟢 關鍵修正：調用你寫好的 getCoverUrl 方法，把解析出來的網址塞給 item.url，這樣 HTML 才能成功讀取圖片
            url: this.getCoverUrl(item)
          };
        });

        // 將資料寫入 Signal，右側畫面就會自動更新
        this.rentalItems.set(formattedData);
      },
      error: (err) => console.error('搜尋失敗', err)
    });
  }

  // 處理複選框 (Checkbox) 的輔助函數
  // 處理複選框 (Checkbox) 的輔助函數
  toggleCheckbox(group: keyof MatchFilter, value: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const array = [...(this.filters[group] as string[])]; // 使用展開運算子複製新陣列

    if (isChecked) {
      if (!array.includes(value)) array.push(value);
    } else {
      const index = array.indexOf(value);
      if (index > -1) array.splice(index, 1);
    }

    // 🟢 關鍵修正：必須重新對 filters 賦值，產生全新物件參考，Angular 才會知道資料變了
    this.filters = {
      ...this.filters,
      [group]: array
    };

    // 陣列更新後，立刻向後端要新資料
    this.applyFilters();
  }

  /**
   * 抓取房屋列表 (保留原始邏輯)
   */
  loadRentals(): void {
    this.rentalMatchingService.getRentals().subscribe({
      next: (data) => {
        const activeHouses = data.filter((house: any) => {
          return house.status === 1 || house.Status === 1;
        });
        this.houses.set(activeHouses);
        console.log('成功從資料庫抓取房屋資料！', activeHouses);
      },
      error: (err) => console.error('抓取房屋資料失敗', err)
    });
  }

  /**
   * 抓取工具與技能列表 (保留原始邏輯)
   */
  loadProducts(): void {
    this.rentalMatchingService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        console.log('成功從資料庫抓取工具/技能資料！', data);
      },
      error: (err) => console.error('抓取工具/技能資料失敗', err)
    });
  }

  /**
   * 取得首圖 (保留原始邏輯)
   */
  getCoverUrl(item: any): string | null {
    if (item.coverUrl) return item.coverUrl;
    if (item.CoverUrl) return item.CoverUrl;

    if (item.images && item.images.length > 0) {
      const coverImg = item.images.find((img: any) => img.isCover === true || img.IsCover === true);
      return coverImg ? coverImg.url || coverImg.Url : item.images[0].url || item.images[0].Url;
    }

    if (item.Images && item.Images.length > 0) {
      const coverImg = item.Images.find((img: any) => img.isCover === true || img.IsCover === true);
      return coverImg ? coverImg.url || coverImg.Url : item.Images[0].url || item.Images[0].Url;
    }

    if (item.imageUrls && item.imageUrls.length > 0) return item.imageUrls[0];
    if (item.ImageUrls && item.ImageUrls.length > 0) return item.ImageUrls[0];

    if (item.url) return item.url;
    if (item.Url) return item.Url;

    return null;
  }

  /**
   * 開啟圖片燈箱
   */
  openLightbox(imageUrl: string | null): void {
    if (!imageUrl) return;
    this.lightboxImage.set(imageUrl);
  }

  /**
   * 關閉圖片燈箱
   */
  closeLightbox(): void {
    this.lightboxImage.set(null);
  }

  /**
   * 前往詳情頁
   */
  navigateToDetail(id: number | undefined, displayType: string): void {
    if (!id) {
      console.warn('找不到該項目的 ID');
      return;
    }
    this.router.navigate(['/rental-matching-detail', displayType, id]);
  }

  /**
   * 價格格式化
   */
  formatPrice(value: number | undefined | null): string {
    if (value === undefined || value === null) return '0';
    return value.toLocaleString();
  }

  /**
   * 開啟/關閉篩選面板 (HTML 中 toggle 按鈕綁定的方法)
   */
  toggleFilterPanel(): void {
    // 透過 Signal 更新狀態，切換 true / false
    this.isFilterCollapsed.set(!this.isFilterCollapsed());
  }

  /**
   * 智慧配對切換
   */
  onToggleChange(): void {
    console.log('智慧配對狀態：', this.filters.isSmartMatch);
    this.applyFilters();
  }

  // 在 RentalMatchingComponent 類別中加入這個方法
  // 將 order: string 改成明確的字串聯集型別
  changeSortOrder(order: 'newest' | 'oldest') {
    this.filters.sortOrder = order;
    this.applyFilters();
  }

} // 確保最後有補上這個 Class 的收尾大括號！

