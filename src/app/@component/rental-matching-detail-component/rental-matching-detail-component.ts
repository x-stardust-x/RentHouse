import { Schema } from './../../../../node_modules/hono/dist/types/types.d';
import { RentalMatchingService } from './../../@service/rental-matching-service';
import { Component, OnInit, inject, signal, computed, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatchHouseDto } from '../../@interface/match-house';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { register } from 'swiper/element/bundle';


@Component({
  selector: 'app-rental-matching-detail-component',
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

  // 建立一個 Signal 或屬性存取資料
  house = signal<any>(null);

  // 使用 computed 動態生成安全的 Google 地圖網址
  mapUrl = computed<SafeResourceUrl | null>(() => {
    const address = this.house()?.address;
    if (!address) return null;

    // 將地址進行編碼，避免中文字或特殊符號在網址中壞掉
    const encodedAddress = encodeURIComponent(address);

    // Google 官方提供免費嵌入網址格式
    const rawUrl = `https://maps.google.com/maps?q=${encodedAddress}&output=embed&z=16`;

    // 透過 sanitizer 轉換成安全網址
    return this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);

  })

  ngOnInit() {

    // alert('有成功進入這個組件！');

    const id = this.route.snapshot.paramMap.get('id');

    // this.http.get(`https://localhost:7215/api/RentalMatching/${id}`)
    //   .subscribe(data => {
    //     this.house.set(data);
    //   })

    console.log('【除錯】網址上抓到的 id 是：', id);

    if (id) {
      const houseId = Number(id);

      // \確保有寫這段，主動發送 API 請求給後端詳情頁
      this.rentalMatchingService.getRentalById(houseId).subscribe({
        next: (data: any) => {
          console.log('詳情頁成功抓到最新資料：', data);
          this.house.set(data); // 寫入 Signal，這時候網頁畫面才會更新
        },
        error: (err: any) => {
          console.error('詳情頁抓取資料失敗：', err);
        }
      });

    }

  }

  // constructor() {}

}
