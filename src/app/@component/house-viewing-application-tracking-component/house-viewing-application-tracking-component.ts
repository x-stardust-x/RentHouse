import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HouseViewingService, LesseeViewingApplication } from '../../@service/house-viewing-service';

type ApplicationStatus = 'pending' | 'confirmed' | 'rejected' | 'rescheduled';

@Component({
  selector: 'app-house-viewing-application-tracking-component',
  imports: [CommonModule, RouterLink, ],
  templateUrl: './house-viewing-application-tracking-component.html',
  styleUrl: './house-viewing-application-tracking-component.scss',
})
export class HouseViewingApplicationTrackingComponent implements OnInit {
  private viewingService = inject(HouseViewingService);

  activeTab = signal<ApplicationStatus>('pending');

  applications = signal<LesseeViewingApplication[]>([]);

  isLoading = signal(false);

  tabs = computed(() => [
    {
      id: 'pending' as const,
      label: '審核中',
      count: this.applications().filter(x => x.status === 'pending').length
    },
    {
      id: 'confirmed' as const,
      label: '已確認',
      count: this.applications().filter(x => x.status === 'confirmed').length
    },
    {
      id: 'rescheduled' as const,
      label: '已改期',
      count: this.applications().filter(x => x.status === 'rescheduled').length
    },
    {
      id: 'rejected' as const,
      label: '已婉拒',
      count: this.applications().filter(x => x.status === 'rejected').length
    },
  ]);

  filteredApplications = computed(() => {
    return this.applications().filter(x => x.status === this.activeTab());
  });

  ngOnInit(): void {
    this.fetchApplications();
  }

  fetchApplications(): void {
    this.isLoading.set(true);

    this.viewingService.getMyApplications().subscribe({
      next: (data: LesseeViewingApplication[]) => {
        console.log('看房申請追蹤 API 回傳：', data);
        console.table(data);
        this.applications.set(data);
        this.isLoading.set(false);
      },
      error: (err: unknown) => {
        console.error('無法取得看房申請追蹤：', err);
        this.isLoading.set(false);
        alert('無法取得看房申請追蹤資料');
      }
    });
  }

  selectTab(tabId: ApplicationStatus): void {
    this.activeTab.set(tabId);
  }

  getStatusLabel(status: ApplicationStatus): string {
    switch (status) {
      case 'pending':
        return '房東確認中';
      case 'confirmed':
        return '預約已確認';
      case 'rescheduled':
        return '房東提議改期';
      case 'rejected':
        return '已取消 / 已婉拒';
      default:
        return '未知狀態';
    }
  }

  getEmptyStateText(): string {
    switch (this.activeTab()) {
      case 'pending':
        return '目前沒有審核中的看房申請。';
      case 'confirmed':
        return '目前沒有已確認的看房申請。';
      case 'rescheduled':
        return '目前沒有已改期的看房申請。';
      case 'rejected':
        return '目前沒有已婉拒的看房申請。';
      default:
        return '目前沒有看房申請紀錄。';
    }
  }

  getDisplayViewingTime(item: LesseeViewingApplication): string {
    if (item.preferredTimeSlots && item.preferredTimeSlots.length > 0) {
      return `${item.viewingDate} ${item.preferredTimeSlots.join('、')}`;
    }

    return item.viewingDateTime;
  }

  canShowFullContact(item: LesseeViewingApplication): boolean {
    return item.status === 'confirmed' || item.status === 'rescheduled';
  }

  getLessorContactText(item: LesseeViewingApplication): string {
    if (this.canShowFullContact(item)) {
      if (item.lessorLineId && item.lessorLineId !== '未填寫') {
        return `${item.lessorName}（LINE：${item.lessorLineId}）`;
      }

      if (item.lessorPhone && item.lessorPhone !== '未填寫') {
        return `${item.lessorName}（${item.lessorPhone}）`;
      }

      return item.lessorName;
    }

    return `${item.lessorName}（確認後開放聯絡）`;
  }

  viewMap(item: LesseeViewingApplication): void {
    if (!item.roomAddress || item.roomAddress === '尚未提供地址') {
      alert('此房源尚未提供地址');
      return;
    }

    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.roomAddress)}`;
    window.open(url, '_blank');
  }

  cancelApplication(item: LesseeViewingApplication): void {
    alert(`之後可串接取消申請 API，預約單號：${item.orderNumber}`);
  }

  prepareContract(item: LesseeViewingApplication): void {
    alert(`之後可進入簽約或聯絡流程，預約單號：${item.orderNumber}`);
  }

  reapply(item: LesseeViewingApplication): void {
    alert(`之後可導回房源詳情重新申請，預約單號：${item.orderNumber}`);
  }
}
