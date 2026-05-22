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

@Component({
  selector: 'app-rental-matching-component',
  standalone: true,
  imports: [
    CommonModule,
    MatSliderModule,
    FormsModule,
    MatSlideToggleModule,
    MatExpansionModule
  ],
  templateUrl: './rental-matching-component.html',
  styleUrl: './rental-matching-component.scss',
})
export class RentalMatchingComponent implements OnInit {

  // 分類篩選：全部 / 房屋 / 工具技能
  selectedCategory = signal<'all' | 'room' | 'product'>('all');

  // 後端資料
  houses = signal<MatchHouseDto[]>([]);
  products = signal<MatchProduct[]>([]);

  // 頁面狀態
  city: string = '';
  viewMode: 'grid' | 'map' = 'grid';

  // 價格篩選
  priceMin = 5000;
  priceMax = 25000;

  // 智慧配對
  isSmartMatch: boolean = false;

  // Angular Material Expansion Panel 狀態
  readonly panelOpenState = signal(false);

  // 燈箱圖片狀態
  lightboxImage = signal<string | null>(null);

  /**
   * 綜合顯示資料：
   * 房屋資料加上 displayType: 'room'
   * 工具 / 技能資料加上 displayType: 'product'
   */
  displayedItems = computed<any[]>(() => {
    const category = this.selectedCategory();

    const currentHouses = this.houses().map(h => ({
      ...h,
      displayType: 'room'
    }));

    const currentProducts = this.products().map(p => ({
      ...p,
      displayType: 'product'
    }));

    if (category === 'room') {
      return currentHouses;
    }

    if (category === 'product') {
      return currentProducts;
    }

    return [...currentHouses, ...currentProducts];
  });

  // 顯示項目數量
  rentalItemCount = computed(() => this.displayedItems().length);

  constructor(
    private rentalMatchingService: RentalMatchingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadRentals();
    this.loadProducts();
  }

  /**
   * 抓取房屋列表
   */
  loadRentals(): void {
    this.rentalMatchingService.getRentals().subscribe({
      next: (data) => {
        /**
         * 注意：
         * 你原本後端 Rent_House 狀態是：
         * 0: 待審
         * 1: 已上架
         * 2: 退回
         * 3: 已租出
         *
         * 如果 getRentals() 後端已經只回傳已上架資料，這裡可以不用再 filter。
         * 如果需要前端保險過濾，請用 status === 1。
         */
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
   * 抓取工具與技能列表
   */
  loadProducts(): void {
    this.rentalMatchingService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        console.log('成功從資料庫抓取工具/技能資料！', data);
      },
      error: (err) => console.error('抓取工具/技能資料失敗', err)
    });

  /**
   * 取得首圖
   * 支援：
   * 1. coverUrl
   * 2. images 陣列，優先找 isCover === true
   * 3. imageUrls 陣列
   * 4. url 單張圖片
   */
  }
  getCoverUrl(item: any): string | null {
    if (item.coverUrl) {
      return item.coverUrl;
    }

    if (item.CoverUrl) {
      return item.CoverUrl;
    }

    if (item.images && item.images.length > 0) {
      const coverImg = item.images.find((img: any) => img.isCover === true || img.IsCover === true);
      return coverImg ? coverImg.url || coverImg.Url : item.images[0].url || item.images[0].Url;
    }

    if (item.Images && item.Images.length > 0) {
      const coverImg = item.Images.find((img: any) => img.isCover === true || img.IsCover === true);
      return coverImg ? coverImg.url || coverImg.Url : item.Images[0].url || item.Images[0].Url;
    }

    if (item.imageUrls && item.imageUrls.length > 0) {
      return item.imageUrls[0];
    }

    if (item.ImageUrls && item.ImageUrls.length > 0) {
      return item.ImageUrls[0];
    }

    if (item.url) {
      return item.url;
    }

    if (item.Url) {
      return item.Url;
    }

    return null;
  }

  /**
   * 開啟圖片燈箱
   */
  openLightbox(imageUrl: string | null): void {
    if (!imageUrl) {
      return;
    }

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
    if (value === undefined || value === null) {
      return '0';
    }

    return value.toLocaleString();
  }

  /**
   * 智慧配對切換
   */
  onToggleChange(): void {
    console.log('智慧配對狀態：', this.isSmartMatch);

    // 在此呼叫後端 C# API 重新計算或篩選 Match_Score
  }

}







// import { RentalMatchingService } from './../../@service/rental-matching-service';
// import { MatSliderModule } from '@angular/material/slider';
// import { Component, signal, OnInit, computed } from '@angular/core';
// import { Router } from '@angular/router';
// import { MatchHouseDto } from '../../@interface/match-house';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms'
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { MatchProduct } from '../../@interface/match-product';


// @Component({
//   selector: 'app-rental-matching-component',
//   standalone: true,
//   imports: [CommonModule, MatSliderModule, FormsModule, MatSlideToggleModule, MatExpansionModule],
//   templateUrl: './rental-matching-component.html',
//   styleUrl: './rental-matching-component.scss',
// })


// export class RentalMatchingComponent implements OnInit {

//   selectedCategory = signal<'all' | 'room' | 'product'>('all');

//   houses = signal<MatchHouseDto[]>([]);
//   products = signal<MatchProduct[]>([]);


//   city: string = '';
//   // rentalItemCount: number = 0;
//   viewMode: 'grid' | 'map' = 'grid';

//   priceMin = 5000;
//   priceMax = 25000;

//   isSmartMatch: boolean = false;

//   readonly panelOpenState = signal(false);


//   // 動態綜合計算屬性
//   displayedItems = computed<any[]>(() => {
//     const category = this.selectedCategory();
//     const roomData = this.houses() || [];       // 假設你原本存房屋的叫 houses
//     const productData = this.products() || [];   // 假設你原本存工具的叫 products

//     // 確保你在合併資料時，有幫它們加上 displayType 分流標記
//     const mappedRooms = roomData.map((h: any) => ({ ...h, displayType: 'room' }));
//     const mappedProducts = productData.map((p: any) => ({ ...p, displayType: 'product' }));

//     // if (currentCategory === 'room') return mappedRooms;
//     // if (currentCategory === 'product') return mappedProducts;

//     // return [...mappedRooms, ...mappedProducts];


//     const currentHouses = this.houses().map(h => ({ ...h, displayType: 'room' }));
//     const currentProducts = this.products().map(p => ({ ...p, displayType: 'product' }));

//     if (category === 'room') {
//       return currentHouses;
//     } else if (category === 'product') {
//       return currentProducts;
//     } else {
//       return [...currentHouses, ...currentProducts];
//     }
//   });

//   rentalItemCount = computed(() => this.displayedItems().length);

//   constructor(private rentalMatchingService: RentalMatchingService, private router: Router) { }

//   ngOnInit(): void {
//     // 1. 串接真實資料庫：房屋列表
//     this.rentalMatchingService.getRentals().subscribe({
//       next: (data) => {
//         this.houses.set(data);
//         console.log('成功從資料庫抓取房屋資料！', data);
//       },
//       error: (err) => console.error('抓取房屋資料失敗', err)
//     });

//     // 2. 串接真實資料庫：工具與技能列表
//     this.rentalMatchingService.getProducts().subscribe({
//       next: (data: any) => {
//         this.products.set(data); // 💡 直接把資料庫捞出來的 5 筆長輩資料塞入 Signal
//         console.log('成功從資料庫抓取工具/技能資料！', data);
//       },
//       error: (err: any) => console.error('抓取工具/技能資料失敗', err)
//     });
//   }

//   // this.RentalMatchingService.getProducts().subscribe ({
//   //   next: (data) => this.products.set(data),
//   //   error: (err) => console.error('抓取工具/工具資料失敗', err)
//   // });


//   navigateToDetail(id: number | undefined, displayType: string): void {
//     if (!id) {
//       console.warn('找不到該項目的 ID');
//       return;
//     }
//     this.router.navigate(['/rental-matching-detail', displayType, id]);
//   }

//   formatPrice(value: number): string {
//     return value.toLocaleString();
//   }

//   onToggleChange() {
//     console.log('智慧配對狀態：', this.isSmartMatch);

//     //在此呼叫後端 C# API 重新計算或篩選 Match_Score
//   }

// }







// import { RentalMatchingService } from './../../@service/rental-matching-service';
// import { MatSliderModule } from '@angular/material/slider';
// import { Component, signal, OnInit, computed } from '@angular/core';
// import { Router } from '@angular/router';
// import { MatchHouseDto } from '../../@interface/match-house';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms'
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { MatchProduct } from '../../@interface/match-product';


// @Component({
//   selector: 'app-rental-matching-component',
//   standalone: true,
//   imports: [CommonModule, MatSliderModule, FormsModule, MatSlideToggleModule, MatExpansionModule],
//   templateUrl: './rental-matching-component.html',
//   styleUrl: './rental-matching-component.scss',
// })


// export class RentalMatchingComponent implements OnInit {

//   selectedCategory = signal<'all' | 'room' | 'product'>('all');

//   houses = signal<MatchHouseDto[]>([]);
//   products = signal<MatchProduct[]>([]);


//   city: string = '';
//   // rentalItemCount: number = 0;
//   viewMode: 'grid' | 'map' = 'grid';

//   priceMin = 5000;
//   priceMax = 25000;

//   isSmartMatch: boolean = false;

//   readonly panelOpenState = signal(false);


//   // 動態綜合計算屬性
//   displayedItems = computed<any[]>(() => {
//     const category = this.selectedCategory();
//     const roomData = this.houses() || [];       // 假設你原本存房屋的叫 houses
//     const productData = this.products() || [];   // 假設你原本存工具的叫 products

//     // 確保你在合併資料時，有幫它們加上 displayType 分流標記
//   const mappedRooms = roomData.map((h: any) => ({ ...h, displayType: 'room' }));
//   const mappedProducts = productData.map((p: any) => ({ ...p, displayType: 'product' }));

//   // if (currentCategory === 'room') return mappedRooms;
//   // if (currentCategory === 'product') return mappedProducts;

//   // return [...mappedRooms, ...mappedProducts];


//     const currentHouses = this.houses().map(h => ({ ...h, displayType: 'room' }));
//     const currentProducts = this.products().map(p => ({ ...p, displayType: 'product' }));

//     if (category === 'room') {
//       return currentHouses;
//     } else if (category === 'product') {
//       return currentProducts;
//     } else {
//       return [...currentHouses, ...currentProducts];
//     }
//   });

//   rentalItemCount = computed(() => this.displayedItems().length);

//   constructor(private rentalMatchingService: RentalMatchingService, private router: Router) { }

//   ngOnInit(): void {
//     // 1. 串接真實資料庫：房屋列表
//     this.rentalMatchingService.getRentals().subscribe({
//       next: (data) => {
//         this.houses.set(data);
//         console.log('成功從資料庫抓取房屋資料！', data);
//       },
//       error: (err) => console.error('抓取房屋資料失敗', err)
//     });

//     // 2. 串接真實資料庫：工具與技能列表
//     this.rentalMatchingService.getProducts().subscribe({
//       next: (data: any) => {
//         this.products.set(data); // 💡 直接把資料庫捞出來的 5 筆長輩資料塞入 Signal
//         console.log('成功從資料庫抓取工具/技能資料！', data);
//       },
//       error: (err: any) => console.error('抓取工具/技能資料失敗', err)
//     });
//   }

//   // this.RentalMatchingService.getProducts().subscribe ({
//   //   next: (data) => this.products.set(data),
//   //   error: (err) => console.error('抓取工具/工具資料失敗', err)
//   // });


//   navigateToDetail(id: number | undefined, displayType: string): void {
//     if (!id) {
//       console.warn('找不到該項目的 ID');
//       return;
//     }
//     this.router.navigate(['/rental-matching-detail', displayType, id]);
//   }


//   // 放大狀態 (裝放大照片的網址)
//   lightboxImage = signal<string | null>(null);

//   // 啟動放大魔法
//   openLightbox(imageUrl: string) {
//     this.lightboxImage.set(imageUrl);
//   }

//   // 關閉放大
//   closeLightbox() {
//     this.lightboxImage.set(null);
//   }

// }
