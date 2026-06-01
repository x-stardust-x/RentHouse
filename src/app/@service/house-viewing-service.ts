import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateViewingOrderRequest } from '../@interface/create-viewing-order-request';
import { ViewingOrderResponse } from '../@interface/viewing-order-response';

@Injectable({
  providedIn: 'root',
})
export class HouseViewingService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7215/api/HouseViewing'; // 替換為你的 C# API 網址

  // 送出預約
  submitApplication(data: CreateViewingOrderRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/apply`, data);
  }

  // 取得出租人的審核列表
  getLessorApprovals(lessorId: number): Observable<ViewingOrderResponse[]> {
    return this.http.get<ViewingOrderResponse[]>(`${this.apiUrl}/lessor/${lessorId}/approvals`);
  }
}
