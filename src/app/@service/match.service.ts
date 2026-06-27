import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// 📝 定義：一對一回傳的資料格式
export interface MatchResult {
  score: number;
  basis: string;
  risk: string;
  suggestion: string;
}


export interface HouseMatchResult {
  houseId: number;
  name: string;
  rentPrice: number;
  houseType: string;
  score: number;
  basis: string;
  risk: string;
  suggestion: string;
}

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  // 記得確認這個 Port 號 (7215) 跟你的 C# 後端一致喔！
  private apiUrl = 'https://localhost:7215/api/Match';

  constructor(private http: HttpClient) { }

  // 🚀 原本的技能：發送「一對一」配對請求
  calculateMatchScore(user: any, house: any): Observable<MatchResult> {
    const payload = { user: user, house: house };
    return this.http.post<MatchResult>(this.apiUrl, payload);
  }

  // 🌟 升級的新技能：發送「一對多」全台房源配對請求
  matchAllHouses(user: any): Observable<HouseMatchResult[]> {
    // 這裡的網址會自動組合出 https://localhost:7215/api/Match/match-all
    return this.http.post<HouseMatchResult[]>(`${this.apiUrl}/match-all`, user);
  }
}


