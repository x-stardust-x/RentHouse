import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface CreateProductBookingRequest {
  productId: number;
  bookingType: 'tool' | 'skill';
  startTime: string | null;
  endTime: string | null;
  method: string;
  message: string;
  extraNote?: string;
  matchScore: number;
  shippingAddress?: string | null;
  meetingUrl?: string | null;
  meetingLocation?: string | null;
}

export interface UpdateProductBookingStatusRequest {
  reservationId: number;
  bookingKind: 'tool' | 'skill';
  status: 'pending' | 'confirmed' | 'rejected' | 'rescheduled' | 'closed';
  rejectReason?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductBookingService {
  private apiUrl = 'https://localhost:7215/api/ProductBooking';

  constructor(private http: HttpClient) { }

  private getAuthOptions() {
    const token = localStorage.getItem('token');

    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  apply(request: CreateProductBookingRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/apply`, request, this.getAuthOptions());
  }

  getMyApprovals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/my-approvals`, this.getAuthOptions());
  }

  getMyApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/my-applications`, this.getAuthOptions());
  }

  updateReservationStatus(request: UpdateProductBookingStatusRequest): Observable<any> {
    return this.http.patch(`${this.apiUrl}/UpdateStatus`, request, this.getAuthOptions());
  }
}
