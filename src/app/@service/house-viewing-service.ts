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
  status: ViewingStatus;
  // status: 'pending' | 'confirmed' | 'rejected' | 'rescheduled' | 'matched' | 'closed';

  applicationFlowType?: 'new' | 'reapply' | 'reselect_time' | 'reschedule_accepted';
  attemptNo?: number;
  maxAttemptCount?: number;

  roomName: string;
  roomAddress: string;
  coverUrl: string;
  rentPrice: number;

  lessorId: number;
  lessorAccountId?: number | null;
  lessorProfileId: number;

  lessorName: string;
  lessorAvatar: string;
  lessorPhone: string;
  lessorLineId: string;

  viewingDate: string;
  viewingDateTime: string;
  preferredTimeSlots: string[];

  expectedMoveInText: string;
  lesseeProfileTags: string[];

  message: string;
  matchScore: number;
  rejectReason?: string;

  rescheduleInfo?: {
    proposedViewingDateTime: string;
    message: string;
    count?: number;
  };

  houseId: number;
  matchedAt?: string | null;
  matchNote?: string;
  closedReason?: string;
}

export interface ReselectViewingTimeRequest {
  reservationId: number;
  viewingSlotId?: number | null;
  viewingTime: string;
  expectedMoveIn?: string | null;
  expectedMoveInText?: string | null;
  preferredTimeSlots: string[];
  lesseeProfileTags: {
    label: string;
    source: string;
  }[];
  message?: string;
  matchScore?: number;
}

export interface ReapplyViewingOrderRequest {
  reservationId: number;
  viewingSlotId?: number | null;
  viewingTime: string;
  expectedMoveIn?: string | null;
  expectedMoveInText?: string | null;
  preferredTimeSlots: string[];
  lesseeProfileTags: {
    label: string;
    source: string;
  }[];
  message?: string;
  matchScore?: number;
}

export interface ConfirmMatchRequest {
  reservationId: number;
  markHouseAsMatched: boolean;
  closeOtherReservations: boolean;
  matchNote?: string;
}

export type ViewingStatus =
  | 'pending'
  | 'confirmed'
  | 'rejected'
  | 'rescheduled'
  | 'matched'
  | 'closed';

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

  reselectViewingTime(data: ReselectViewingTimeRequest) {
    const token = localStorage.getItem('token');

    return this.http.put(`${this.apiUrl}/reselect-time`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  acceptReschedule(reservationId: number) {
    const token = localStorage.getItem('token');

    return this.http.put(
      `${this.apiUrl}/accept-reschedule/${reservationId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  reapplyViewingOrder(data: ReapplyViewingOrderRequest) {
    const token = localStorage.getItem('token');

    return this.http.put(`${this.apiUrl}/reapply`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  confirmMatch(data: ConfirmMatchRequest) {
    const token = localStorage.getItem('token');

    return this.http.put(`${this.apiUrl}/confirm-match`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getAllApprovals() {
    const token = localStorage.getItem('token');

    return this.http.get<ViewingOrderResponse[]>(
      `${this.apiUrl}/getallapplications`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}
