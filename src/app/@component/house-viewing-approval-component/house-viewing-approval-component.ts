import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HouseViewingService } from '../../@service/house-viewing-service';
import { FormsModule } from '@angular/forms';

export interface Reservation {
  id: string;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'rescheduled';
  roomName: string;
  applicant: {
    name: string;
    avatar: string;
    profiles: string[];
    moveInDate: string;
    phone: string;
    lineId: string;
  };
  viewingDateTime: string;
  message: string;
  matchScore: number;
  rescheduleInfo?: {
    proposedViewingDateTime: string;
    message: string;
  };
}

@Component({
  selector: 'app-house-viewing-approval-component',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './house-viewing-approval-component.html',
  styleUrl: './house-viewing-approval-component.scss',
})
export class HouseViewingApprovalComponent implements OnInit {

  isRescheduleModalOpen = signal(false);
  selectedReservation = signal<Reservation | null>(null);

  rescheduleDate = signal('');
  rescheduleStartTime = signal('');
  rescheduleEndTime = signal('');
  rescheduleMessage = signal('');

  // ===================================================================
  // 注入 Services
  // ===================================================================
  // 預留給後續與 C# 後端 API 串接使用
  private viewingService = inject(HouseViewingService);

  // ===================================================================
  // 狀態管理 (Signals)
  // ===================================================================
  activeTab = signal<'pending' | 'confirmed' | 'rejected' | 'rescheduled'>('pending');

  // 模擬後端回傳的預約資料 (未來這裡會由 ngOnInit 呼叫 API 覆寫)

  reservations = signal<Reservation[]>([]);

  // ===================================================================
  // 動態計算屬性 (Computed)
  // ===================================================================

  // 依據當前頁籤過濾出對應的預約清單
  filteredReservations = computed(() => {
    return this.reservations().filter(r => r.status === this.activeTab());
  });

  // 動態計算各狀態的數量，取代原本寫死的 count
  tabs = computed(() => [
    { id: 'pending', label: '待審核', count: this.reservations().filter(r => r.status === 'pending').length },
    { id: 'confirmed', label: '已確認', count: this.reservations().filter(r => r.status === 'confirmed').length },
    { id: 'rejected', label: '已婉拒', count: this.reservations().filter(r => r.status === 'rejected').length },
    { id: 'rescheduled', label: '已改期', count: this.reservations().filter(r => r.status === 'rescheduled').length }
  ] as const);

  // ===================================================================
  // 生命週期與 API 讀取
  // ===================================================================
  ngOnInit(): void {
    // 這裡預留給取得資料庫真實訂單的邏輯
    this.fetchReservations();
  }

  private fetchReservations() {
    this.viewingService.getMyApprovals().subscribe({
      next: (data) => {
        console.log('看房預約審核 API 回傳：', data);
        this.reservations.set(data as unknown as Reservation[]);
      },
      error: (err) => {
        console.error('無法取得預約資料：', err);
      }
    });
  }

  // private fetchReservations() {
  //   // 範例：從資料庫拉取房東的預約單
  //   // this.viewingService.getReservationsByLessor().subscribe({
  //   //   next: (data) => this.reservations.set(data),
  //   //   error: (err) => console.error('無法取得預約資料', err)
  //   // });
  // }

  // ===================================================================
  // 互動邏輯方法
  // ===================================================================

  // 切換頁籤
  selectTab(tabId: 'pending' | 'confirmed' | 'rejected' | 'rescheduled') {
    this.activeTab.set(tabId);
  }

  // 動作：婉拒
  decline(item: Reservation) {
    this.updateReservationStatus(item.id, 'rejected');
    alert(`已婉拒預約單號: ${item.orderNumber}`);
  }

  // 動作：提議改期
  proposeReschedule(item: Reservation) {
    this.selectedReservation.set(item);

    this.rescheduleDate.set('');
    this.rescheduleStartTime.set('');
    this.rescheduleEndTime.set('');
    this.rescheduleMessage.set('');

    this.isRescheduleModalOpen.set(true);
  }

  closeRescheduleModal() {
    this.isRescheduleModalOpen.set(false);
    this.selectedReservation.set(null);

    this.rescheduleDate.set('');
    this.rescheduleStartTime.set('');
    this.rescheduleEndTime.set('');
    this.rescheduleMessage.set('');
  }

  // 動作：接受
  accept(item: Reservation) {
    this.updateReservationStatus(item.id, 'confirmed');
    alert(`已接受預約單號: ${item.orderNumber}`);
  }

  /**
   * 輔助方法：在前端即時更新預約單的狀態 (讓 UI 自動響應)
   */
  private updateReservationStatus(
    id: string,
    newStatus: 'pending' | 'confirmed' | 'rejected' | 'rescheduled'
  ) {
    this.reservations.update(currentReservations =>
      currentReservations.map(res =>
        res.id === id ? { ...res, status: newStatus } : res
      )
    );
  }

  getStatusLabel(status: Reservation['status']) {
    switch (status) {
      case 'pending':
        return '待審核';
      case 'confirmed':
        return '已確認';
      case 'rescheduled':
        return '已改期';
      case 'rejected':
        return '已婉拒';
      default:
        return '未知';
    }
  }

  getEmptyStateText() {
    switch (this.activeTab()) {
      case 'pending':
        return '目前沒有待審核的預約紀錄。';
      case 'confirmed':
        return '目前沒有已確認的預約紀錄。';
      case 'rescheduled':
        return '目前沒有已改期的預約紀錄。';
      case 'rejected':
        return '目前沒有已婉拒的預約紀錄。';
      default:
        return '目前沒有預約紀錄。';
    }
  }

  confirmReschedule() {
    const item = this.selectedReservation();

    if (!item) return;

    if (!this.rescheduleDate()) {
      alert('請選擇改期日期');
      return;
    }

    if (!this.rescheduleStartTime()) {
      alert('請選擇開始時間');
      return;
    }

    if (!this.rescheduleEndTime()) {
      alert('請選擇結束時間');
      return;
    }

    if (this.rescheduleEndTime() <= this.rescheduleStartTime()) {
      alert('結束時間必須晚於開始時間');
      return;
    }

    if (!this.rescheduleMessage().trim()) {
      alert('請填寫給承租人的改期訊息');
      return;
    }

    const proposedViewingDateTime =
      `${this.rescheduleDate()} ${this.rescheduleStartTime()} - ${this.rescheduleEndTime()}`;

    this.reservations.update(current =>
      current.map(res =>
        res.id === item.id
          ? {
            ...res,
            status: 'rescheduled',
            rescheduleInfo: {
              proposedViewingDateTime,
              message: this.rescheduleMessage()
            }
          }
          : res
      )
    );

    this.activeTab.set('rescheduled');

    alert(`已提出改期，預約單號：${item.orderNumber}`);

    this.closeRescheduleModal();
  }
}
