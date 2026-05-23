import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facility, HouseFacilityUpdateDto } from '../@interface/house-facility';


@Injectable({
  providedIn: 'root',
})
export class HouseFacilityService {

  private apiUrl = 'https://localhost:7215/api/HouseFacility';

  constructor(private http: HttpClient) { }

  // 取得所有設施列表
  getAllFacilities(): Observable<Facility[]> {
    return this.http.get<Facility[]>(`${this.apiUrl}/all`);
  }

  // 儲存房屋設施
  saveHouseFacilities(dto: HouseFacilityUpdateDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/save-house`, dto);
  }

  // 取得特定房屋擁有的設施清單
  getHouseFacilities(houseId: number): Observable<Facility[]> {
    return this.http.get<Facility[]>(`${this.apiUrl}/${houseId}`);
  }

}
