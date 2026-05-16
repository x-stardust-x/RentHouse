import { MatchHouseDto } from './../@interface/match-house';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class RentalMatchingService {
  private apiUrl = 'https://localhost:44304/api/RentalMatching';

  // city: string = '';
  // rentalItemCount: number = 0;

  constructor(private http: HttpClient) {
    // this.http.get('api/rental/info').subscribe((data: any) => {
    //   this.city = data.city;
    //   this.rentalItemCount = data.rentalItemCount;
    // });
  }

  // 取得全部上架房屋
  getRentals(): Observable<MatchHouseDto[]> {
    return this.http.get<MatchHouseDto[]>(this.apiUrl);
  }

  // 依 ID 取得單一房屋
  getRentalById(id: number): Observable<MatchHouseDto> {
    return this.http.get<MatchHouseDto>(`${this.apiUrl}/${id}`);
  }
}
