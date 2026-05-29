import { Component, signal, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface SharingReservation {
  id: string;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'rejected';
  type: 'tool' | 'skill'; // 區分 工具借用 或 技能學習
  itemName: string;        // 項目名稱 (例如：專業修繕工具組、全端開發入門諮詢)
  priceInfo: string;       // 費用說明 (例如：$150/天、$500/hr)
  applicant: {
    name: string;
    avatar: string;
    profiles: string[];    // 人格/身分特質標籤
    method: string;        // 交付或授課形式 (例如：面交自取、線上視訊)
    extraNote?: string;    // 特別注意事項 (例如：需自備項目：自備筆電)
    phone: string;
    lineId: string;
  };
  bookingPeriod: string;   // 預約期間/時段
  message: string;         // 學習背景需求 / 借用目的用途
  matchScore: number;      // 契合度評分
}

@Component({
  selector: 'app-product-booking-approval-component',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './product-booking-approval-component.html',
  styleUrl: './product-booking-approval-component.scss',
})
export class ProductBookingApprovalComponent {
  // 頁籤狀態管理
  activeTab = signal<'pending' | 'confirmed' | 'rejected'>('pending');

  // 頁籤清單與統計數量
  tabs = [
    { id: 'pending', label: '待審核', count: 2 },
    { id: 'confirmed', label: '已確認', count: 8 },
    { id: 'rejected', label: '已婉拒', count: 3 }
  ] as const;

  // 結合圖一與圖二彈窗規格的模擬預約清單資料
  reservations = signal<SharingReservation[]>([
    {
      id: '1',
      orderNumber: 'S-20261024-001',
      status: 'pending',
      type: 'skill',
      itemName: '全端開發入門諮詢',
      priceInfo: '$500 / 小時',
      applicant: {
        name: '林依晨',
        avatar: 'images/mr_chen.jpg', // 專案內預設頭像路徑
        profiles: ['完全零基礎', '想轉職', '積極型'],
        method: '線上視訊 (使用視訊軟體)',
        extraNote: '自備項目：自備筆電 (預設)',
        phone: '0912***678',
        lineId: 'yichen***'
      },
      bookingPeriod: '2026/10/24 (六) 14:00 - 15:00',
      message: '您好！我是完全零基礎的學生，目前想要跨領域學習。想請教傳統網頁全端開發打版的量身訣竅與合適的學習路徑，方便導師提早為我準備項目，非常期待！',
      matchScore: 95
    },
    {
      id: '2',
      orderNumber: 'T-20261025-002',
      status: 'pending',
      type: 'tool',
      itemName: '專業修繕工具組',
      priceInfo: '$150 / 天',
      applicant: {
        name: '張宇軒',
        avatar: 'images/mr_chen.jpg', // 專案內預設頭像路徑
        profiles: ['手作達人', '信用良好', '無損紀錄'],
        method: '面交自取 (與出租人約定地點)',
        phone: '0988***321',
        lineId: 'yuxuan***'
      },
      bookingPeriod: '2026/10/25 (日) ~ 2026/10/27 (二) (總共 2 天)',
      message: '預計將此工具用於微縮生態瓶場景加工與部分房間木工DIY組裝，操作過程會十分小心，承諾會愛惜使用，若有嚴重損壞願照價賠償，請出租人放心。',
      matchScore: 88
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
    alert(`已婉拒共享預約單號: ${id}`);
  }

  proposeReschedule(id: string) {
    alert(`已向預約單號 ${id} 發送提議改期通知`);
  }

  accept(id: string) {
    alert(`已接受共享預約單號: ${id}，聯絡資訊將正式解鎖顯示。`);
  }
}
