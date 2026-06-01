import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HouseViewingService } from '../../@service/house-viewing-service';

export interface Reservation {
  id: string;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'rejected';
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
}

@Component({
  selector: 'app-house-viewing-approval-component',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './house-viewing-approval-component.html',
  styleUrl: './house-viewing-approval-component.scss',
})
export class HouseViewingApprovalComponent implements OnInit {

  // ===================================================================
  // 注入 Services
  // ===================================================================
  // 預留給後續與 C# 後端 API 串接使用
  private viewingService = inject(HouseViewingService);

  // ===================================================================
  // 狀態管理 (Signals)
  // ===================================================================
  activeTab = signal<'pending' | 'confirmed' | 'rejected'>('pending');

  // 模擬後端回傳的預約資料 (未來這裡會由 ngOnInit 呼叫 API 覆寫)
  reservations = signal<Reservation[]>([
    {
      id: '1',
      orderNumber: 'B-20261024-001',
      status: 'pending',
      roomName: '陽光雅房 A室 (高雄軟體園區附近)', // 稍微調整了一下地點作為範例
      applicant: {
        name: '林依晨',
        avatar: 'images/mr_chen.jpg',
        profiles: ['單人', '無寵', '不菸'],
        moveInDate: '2026/11/01',
        phone: '0912***678',
        lineId: 'yichen***'
      },
      viewingDateTime: '2026/10/24 (六) 14:00 - 14:30',
      message: '您好！作息正常不菸不酒，平常喜歡安靜看書或煮點簡單的料理。非常喜歡您提供的共居空間氛圍，希望能有機會現場看看環境！',
      matchScore: 95
    },
    {
      id: '2',
      orderNumber: 'B-20261025-002',
      status: 'pending',
      roomName: '獨立套房 B室 (高雄軟體園區附近)',
      applicant: {
        name: '張宇軒',
        avatar: 'images/mr_chen.jpg',
        profiles: ['單人', '無寵', '不菸'],
        moveInDate: '2026/11/15',
        phone: '0988***321',
        lineId: 'yuxuan***'
      },
      viewingDateTime: '2026/10/25 (日) 10:00 - 10:30',
      message: '目前在科技業上班，生活規律，週末偶爾會去寫生或騎車。個性隨和好相處，會主動維持公共區域整潔。希望能找個舒適安靜的地方長租。',
      matchScore: 78
    }
  ]);

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
    { id: 'rejected', label: '已婉拒', count: this.reservations().filter(r => r.status === 'rejected').length }
  ] as const);

  // ===================================================================
  // 生命週期與 API 讀取
  // ===================================================================
  ngOnInit(): void {
    // 這裡預留給取得資料庫真實訂單的邏輯
    // this.fetchReservations();
  }

  private fetchReservations() {
    // 範例：從資料庫拉取房東的預約單
    // this.viewingService.getReservationsByLessor().subscribe({
    //   next: (data) => this.reservations.set(data),
    //   error: (err) => console.error('無法取得預約資料', err)
    // });
  }

  // ===================================================================
  // 互動邏輯方法
  // ===================================================================

  // 切換頁籤
  selectTab(tabId: 'pending' | 'confirmed' | 'rejected') {
    this.activeTab.set(tabId);
  }

  // 動作：婉拒
  decline(id: string) {
    // TODO: 這裡放入呼叫後端更新狀態的 API
    this.updateReservationStatus(id, 'rejected');
    alert(`已婉拒預約單號: ${id}`);
  }

  // 動作：提議改期
  proposeReschedule(id: string) {
    // 實務上這裡可能會打開一個 Modal 讓房東選擇新時間
    alert(`提議改期預約單號: ${id}`);
  }

  // 動作：接受
  accept(id: string) {
    // TODO: 這裡放入呼叫後端更新狀態的 API
    this.updateReservationStatus(id, 'confirmed');
    alert(`已接受預約單號: ${id}`);
  }

  /**
   * 輔助方法：在前端即時更新預約單的狀態 (讓 UI 自動響應)
   */
  private updateReservationStatus(id: string, newStatus: 'pending' | 'confirmed' | 'rejected') {
    this.reservations.update(currentReservations =>
      currentReservations.map(res =>
        res.id === id ? { ...res, status: newStatus } : res
      )
    );
  }
}
