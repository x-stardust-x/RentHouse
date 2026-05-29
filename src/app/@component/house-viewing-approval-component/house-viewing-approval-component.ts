import { Component, signal, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Reservation {
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
export class HouseViewingApprovalComponent {
  // 頁籤狀態管理
  activeTab = signal<'pending' | 'confirmed' | 'rejected'>('pending');

  // 頁籤清單與統計數量
  tabs = [
    { id: 'pending', label: '待審核', count: 3 },
    { id: 'confirmed', label: '已確認', count: 12 },
    { id: 'rejected', label: '已婉拒', count: 5 }
  ] as const;

  // 模擬後端回傳的預約資料
  reservations = signal<Reservation[]>([
    {
      id: '1',
      orderNumber: 'B-20261024-001',
      status: 'pending',
      roomName: '陽光雅房 A室 (台北市大安區)',
      applicant: {
        name: '林依晨',
        avatar: 'images/mr_chen.jpg', // 請替換為專案中實際的預設頭像路徑
        profiles: ['單人', '無寵', '不菸'],
        moveInDate: '2026/11/01',
        phone: '0912***678',
        lineId: 'yichen***'
      },
      viewingDateTime: '2026/10/24 (六) 14:00 - 14:30',
      message: '您好！我是政大的學生，作息正常不菸不酒，平常喜歡安靜看書或煮點簡單的料理。非常喜歡您提供的共居空間氛圍，希望能有機會現場看看環境！',
      matchScore: 95
    },
    {
      id: '2',
      orderNumber: 'B-20261025-002',
      status: 'pending',
      roomName: '獨立套房 B室 (台北市大安區)',
      applicant: {
        name: '張宇軒',
        avatar: 'images/mr_chen.jpg', // 請替換為專案中實際的預設頭像路徑
        profiles: ['單人', '無寵', '不菸'],
        moveInDate: '2026/11/15',
        phone: '0988***321',
        lineId: 'yuxuan***'
      },
      viewingDateTime: '2026/10/25 (日) 10:00 - 10:30',
      message: '目前在科技業上班，生活規律，週末偶爾會去爬山或騎車。個性隨和好相處，會主動維持公共區域整潔。希望能找個舒適安靜的地方長租。',
      matchScore: 78
    }
  ]);

  // 依據當前頁籤過濾資料
  filteredReservations = computed(() => {
    return this.reservations().filter(r => r.status === this.activeTab());
  });

  // 切換頁籤
  selectTab(tabId: 'pending' | 'confirmed' | 'rejected') {
    this.activeTab.set(tabId);
  }

  // 動作按鈕邏輯
  decline(id: string) {
    alert(`已婉拒預約單號: ${id}`);
  }

  proposeReschedule(id: string) {
    alert(`提議改期預約單號: ${id}`);
  }

  accept(id: string) {
    alert(`已接受預約單號: ${id}`);
  }
}
