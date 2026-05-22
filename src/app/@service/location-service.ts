import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { District } from '../@interface/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private baseUrl = 'https://localhost:7215/api/Location/';
  private readonly http = inject(HttpClient);

  // 🌟 保留這兩個核心的 signal 就夠了
  allDistricts = signal<District[]>([]); // 存全台灣 300 多筆原始資料
  usercity = signal<any>(null);          // 修正：使用者位置回傳的是一個物件物件，不是陣列喔！

  // 1. 核心：一次載入全台灣行政區
  loadAllDistricts() {
    this.http.get<District[]>(this.baseUrl + 'districts-all')
      .subscribe(res => {
        this.allDistricts.set(res);
      });
  }

  // 2. 取得特定使用者位置
  getUserLocation(userId: number) {
    this.http.get<any>(this.baseUrl + `user-location/${userId}`)
      .subscribe(res => {
        this.usercity.set(res);
      });
  }
}
