import { MatchHouseDto } from './../@interface/match-house';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatchProduct } from '../@interface/match-product';

@Injectable({
  providedIn: 'root',
})

export class RentalMatchingService {
  private apiUrl = 'https://localhost:7215/api/RentalMatching';

  // city: string = '';
  // rentalItemCount: number = 0;

  constructor(private http: HttpClient) {
    // this.http.get('api/rental/info').subscribe((data: any) => {
    //   this.city = data.city;
    //   this.rentalItemCount = data.rentalItemCount;
    // });
  }


  // 1. 取得所有房屋資料
  getRentals(): Observable<MatchHouseDto[]> {
    return this.http.get<MatchHouseDto[]>(`${this.apiUrl}/RentHouse`);
  }

  // 2. 💡 新增：取得所有工具/技能資料 (對應 C# RentProductController)
  getProducts(): Observable<MatchProduct[]> {
    return this.http.get<MatchProduct[]>(`${this.apiUrl}/RentProduct`);
  }

  // 🏠 取得單一房屋詳情
  getRentalById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/RentSingle/${id}`); // 確保網址與後端對齊
  }

  // 🔧 取得單一工具/技能詳情
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/RentProduct/${id}`); // 確保網址與後端對齊
  }


  // // 取得全部上架房屋
  // getRentals(): Observable<MatchHouseDto[]> {
  //   return this.http.get<MatchHouseDto[]>(this.apiUrl);
  // }

  // // 依 ID 取得單一房屋
  // getRentalById(id: number): Observable<MatchHouseDto> {
  //   return this.http.get<MatchHouseDto>(`${this.apiUrl}/${id}`);
  // }
}
