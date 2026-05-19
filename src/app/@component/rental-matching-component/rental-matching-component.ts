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

  city: string = '';
  // rentalItemCount: number = 0;
  viewMode: 'grid' | 'map' = 'grid';

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
