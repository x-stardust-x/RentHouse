import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RentalMatchingService {
  city: string = '';
  rentalItemCount: number = 0;

  constructor(private http: HttpClient) {
    this.http.get('api/rental/info').subscribe((data: any) => {
      this.city = data.city;
      this.rentalItemCount = data.rentalItemCount;
    });
  }
}
