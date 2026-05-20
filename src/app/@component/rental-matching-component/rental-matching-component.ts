<<<<<<< HEAD
import { RentalMatchingService } from './../../@service/rental-matching-service';
import { MatSliderModule } from '@angular/material/slider';
import { Component, signal, OnInit, computed } from '@angular/core';
import { Router } from '@angular/router';
import { MatchHouseDto } from '../../@interface/match-house';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatchProduct } from '../../@interface/match-product';


@Component({
  selector: 'app-rental-matching-component',
  standalone: true,
  imports: [CommonModule, MatSliderModule, FormsModule, MatSlideToggleModule, MatExpansionModule],
  templateUrl: './rental-matching-component.html',
  styleUrl: './rental-matching-component.scss',
})


export class RentalMatchingComponent implements OnInit {

  selectedCategory = signal<'all' | 'room' | 'product'>('all');

  houses = signal<MatchHouseDto[]>([]);
  products = signal<MatchProduct[]>([]);

=======
import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HouseService } from '../../@service/house.service';

@Component({
  selector: 'app-rental-matching-component',
  imports: [],
  templateUrl: './rental-matching-component.html',
  styleUrl: './rental-matching-component.scss',
})
export class RentalMatchingComponent implements OnInit {

>>>>>>> dev
  city: string = '';
  // rentalItemCount: number = 0;
  viewMode: 'grid' | 'map' = 'grid';

<<<<<<< HEAD
  priceMin = 5000;
  priceMax = 25000;

  isSmartMatch: boolean = false;

  readonly panelOpenState = signal(false);


  // 動態綜合計算屬性
  displayedItems = computed<any[]>(() => {
    const category = this.selectedCategory();
    const roomData = this.houses() || [];       // 假設你原本存房屋的叫 houses
    const productData = this.products() || [];   // 假設你原本存工具的叫 products

    // 確保你在合併資料時，有幫它們加上 displayType 分流標記
  const mappedRooms = roomData.map((h: any) => ({ ...h, displayType: 'room' }));
  const mappedProducts = productData.map((p: any) => ({ ...p, displayType: 'product' }));

  // if (currentCategory === 'room') return mappedRooms;
  // if (currentCategory === 'product') return mappedProducts;

  // return [...mappedRooms, ...mappedProducts];


    const currentHouses = this.houses().map(h => ({ ...h, displayType: 'room' }));
    const currentProducts = this.products().map(p => ({ ...p, displayType: 'product' }));

    if (category === 'room') {
      return currentHouses;
    } else if (category === 'product') {
      return currentProducts;
    } else {
      return [...currentHouses, ...currentProducts];
    }
  });

  rentalItemCount = computed(() => this.displayedItems().length);

  constructor(private rentalMatchingService: RentalMatchingService, private router: Router) { }

  ngOnInit(): void {
    // 1. 串接真實資料庫：房屋列表
    this.rentalMatchingService.getRentals().subscribe({
      next: (data) => {
        this.houses.set(data);
        console.log('成功從資料庫抓取房屋資料！', data);
      },
      error: (err) => console.error('抓取房屋資料失敗', err)
    });

    // 2. 串接真實資料庫：工具與技能列表
    this.rentalMatchingService.getProducts().subscribe({
      next: (data: any) => {
        this.products.set(data); // 💡 直接把資料庫捞出來的 5 筆長輩資料塞入 Signal
        console.log('成功從資料庫抓取工具/技能資料！', data);
      },
      error: (err: any) => console.error('抓取工具/技能資料失敗', err)
    });
  }

  // this.RentalMatchingService.getProducts().subscribe ({
  //   next: (data) => this.products.set(data),
  //   error: (err) => console.error('抓取工具/工具資料失敗', err)
  // });
=======

  activeHouses = signal<any[]>([]);


  constructor(
    private router: Router,
    private houseService: HouseService
  ) {}

  // 元件初始化的時候，自動去後端抓資料
  ngOnInit() {
    this.loadActiveHouses();
  }

  // 去後端抓資料，並且只過濾出 status === 2 的房屋
  loadActiveHouses() {
    this.houseService.getHouses().subscribe({
      next: (data) => {

        const approvedList = data.filter((house: any) => house.status === 2);


        this.activeHouses.set(approvedList);


        this.rentalItemCount = approvedList.length;
      },
      error: (err) => console.error('取得房屋列表失敗', err)
    });
  }

  // 取得首圖的輔助函式 (給 HTML 讀取圖片用的)
  getCoverUrl(house: any): string | null {
    if (house.coverUrl) return house.coverUrl;
    if (house.images && house.images.length > 0) {
      const coverImg = house.images.find((img: any) => img.isCover === true);
      return coverImg ? coverImg.url : house.images[0].url;
    }
    return null;
  }


  // 放大魔法狀態 (裝放大照片的網址)
  lightboxImage = signal<string | null>(null);

  // 啟動放大魔法
  openLightbox(imageUrl: string) {
    this.lightboxImage.set(imageUrl);
  }

  // 關閉放大魔法
  closeLightbox() {
    this.lightboxImage.set(null);
  }

  navigateToDetail(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/rental-matching-detail', id]);
    } else {
      console.warn('找不到該房屋的 ID');
    }
>>>>>>> dev





  navigateToDetail(id: number | undefined, displayType: string): void {
    if (!id) {
      console.warn('找不到該項目的 ID');
      return;
    }
    this.router.navigate(['/rental-matching-detail', displayType, id]);
  }

  formatPrice(value: number): string {
    return value.toLocaleString();
  }

  onToggleChange() {
    console.log('智慧配對狀態：', this.isSmartMatch);

    //在此呼叫後端 C# API 重新計算或篩選 Match_Score
  }

}
