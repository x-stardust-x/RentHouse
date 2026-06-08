import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateViewingOrderRequest } from '../@interface/create-viewing-order-request';
import { ViewingOrderResponse } from '../@interface/viewing-order-response';
import { AvailableViewingSlot } from '../@interface/available-viewing-slot';
import { LesseeProfileTag } from '../@interface/lessee-profile-tag';

export interface UpsertViewingSlotRequest {
  // availableDate: string;
  startTime: string;
  endTime: string;
  isEnabled: boolean;
}

export interface UpdateReservationStatusRequest {
  reservationId: number;
  status: 'confirmed' | 'rejected';
  rejectReason?: string;
}

export interface ProposeRescheduleRequest {
  reservationId: number;
  proposedStartTime: string;
  proposedEndTime?: string | null;
  message: string;
}

export interface LesseeViewingApplication {
  id: string;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'rescheduled';

  roomName: string;
  roomAddress: string;
  coverUrl: string;
  rentPrice: number;

  lessorName: string;
  lessorPhone: string;
  lessorLineId: string;

  viewingDate: string;
  viewingDateTime: string;
  preferredTimeSlots: string[];

  message: string;
  matchScore: number;
  rejectReason?: string;

  rescheduleInfo?: {
    proposedViewingDateTime: string;
    message: string;
    count?: number;
  };
}


@Injectable({
  providedIn: 'root',
})
export class HouseViewingService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7215/api/HouseViewing'; // 替換為你的 C# API 網址


  getMyLesseeProfileTags() {
    return this.http.get<LesseeProfileTag[]>(
      `${this.apiUrl}/my-lessee-profile-tags`
    );
  }

  getAvailableSlotsByHouse(houseId: number) {
    return this.http.get<AvailableViewingSlot[]>(
      `${this.apiUrl}/house/${houseId}/available-slots`
    );
  }


  replaceAvailableSlotsByHouse(houseId: number, data: UpsertViewingSlotRequest[]) {
    const token = localStorage.getItem('token');

    return this.http.put(
      `${this.apiUrl}/house/${houseId}/available-slots`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  // replaceAvailableSlotsByHouse(houseId: number, data: UpsertViewingSlotRequest[]) {
  //   return this.http.put(
  //     `${this.apiUrl}/house/${houseId}/available-slots`,
  //     data
  //   );
  // }


  // 送出預約
  submitApplication(data: CreateViewingOrderRequest) {
    const token = localStorage.getItem('token');

    return this.http.post(`${this.apiUrl}/apply`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // 取得出租人的審核列表
  getLessorApprovals(lessorId: number): Observable<ViewingOrderResponse[]> {
    return this.http.get<ViewingOrderResponse[]>(`${this.apiUrl}/lessor/${lessorId}/approvals`);
  }

  getMyApprovals(): Observable<ViewingOrderResponse[]> {
    const token = localStorage.getItem('token');

    return this.http.get<ViewingOrderResponse[]>(
      `${this.apiUrl}/my-approvals`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  getReservationsByLessor(lessorId: number) {
    return this.http.get<ViewingOrderResponse[]>(
      `${this.apiUrl}/lessor/${lessorId}/approvals`
    );
  }

  getApplicationsByLessee(lesseeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/lessee/${lesseeId}/applications`);
  }

  updateReservationStatus(data: UpdateReservationStatusRequest) {
    const token = localStorage.getItem('token');

    return this.http.put(
      `${this.apiUrl}/status`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  proposeReschedule(data: ProposeRescheduleRequest) {
    const token = localStorage.getItem('token');

    return this.http.put(
      `${this.apiUrl}/reschedule`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  getMyApplications(): Observable<LesseeViewingApplication[]> {
    const token = localStorage.getItem('token');

    return this.http.get<LesseeViewingApplication[]>(
      `${this.apiUrl}/my-applications`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

}
