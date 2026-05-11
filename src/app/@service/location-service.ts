import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { City, District } from '../@interface/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private baseUrl = 'https://localhost:7215/api/Location/';
  private readonly http = inject(HttpClient);
  cities = signal<City[]>([]);
  districts = signal<District[]>([]);

  loadCities() {
    this.http.get<City[]>(this.baseUrl + "cities")
      .subscribe(res => {
        this.cities.set(res)});
  }

  loadDistricts(cityId: number) {
    this.http.get<District[]>(this.baseUrl + `districts?cityId=${cityId}`)
      .subscribe(res => {
        this.districts.set(res)});
  }

  clearDistricts() {
    this.districts.set([]);
  }

  getUserLocation(userId: number) {
    return this.http.get<any>(this.baseUrl + `user-location/${userId}`);
  }

}
