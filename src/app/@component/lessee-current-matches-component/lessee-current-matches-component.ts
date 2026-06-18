import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { HouseViewingService, LesseeViewingApplication } from '../../@service/house-viewing-service';
import { ProductBookingService } from '../../@service/product-booking-service';
import { CalendarLinkService } from '../../@service/calendar-link-service';

type CurrentMatchTab = 'house' | 'tool' | 'skill';

type CurrentMatchStatus =
  | 'pending'
  | 'confirmed'
  | 'rejected'
  | 'rescheduled'
  | 'matched'
  | 'closed';

interface LesseeProductCurrentMatch {
  id: string;
  orderNumber: string;
  status: CurrentMatchStatus;
  type: 'tool' | 'skill';
  productId: number;
  itemName: string;
  coverUrl: string;
  priceInfo: string;
  bookingPeriod: string;
  method: string;
  message: string;
  matchScore: number;

  provider: {
    name: string;
    avatar: string;
    phone: string;
    lineId: string;
  };
}

@Component({
  selector: 'app-lessee-current-matches-component',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lessee-current-matches-component.html',
  styleUrl: './lessee-current-matches-component.scss',
})
export class LesseeCurrentMatchesComponent implements OnInit {
  private viewingService = inject(HouseViewingService);
  private productBookingService = inject(ProductBookingService);
  private calendarLinkService = inject(CalendarLinkService);

  activeTab = signal<CurrentMatchTab>('house');

  houseMatches = signal<LesseeViewingApplication[]>([]);
  productMatches = signal<LesseeProductCurrentMatch[]>([]);

  isLoading = signal(false);
  errorMessage = signal('');

  toolMatches = computed(() =>
    this.productMatches().filter(item => item.type === 'tool')
  );

  skillMatches = computed(() =>
    this.productMatches().filter(item => item.type === 'skill')
  );

  tabs = computed(() => [
    {
      id: 'house' as const,
      label: '承租房源',
      count: this.houseMatches().length
    },
    {
      id: 'tool' as const,
      label: '借用工具',
      count: this.toolMatches().length
    },
    {
      id: 'skill' as const,
      label: '技能預約',
      count: this.skillMatches().length
    }
  ]);

  ngOnInit(): void {
    this.fetchCurrentMatches();
  }

  selectTab(tabId: CurrentMatchTab): void {
    this.activeTab.set(tabId);
  }

  fetchCurrentMatches(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    forkJoin({
      house: this.viewingService.getMyApplications(),
      product: this.productBookingService.getMyApplications()
    }).subscribe({
      next: ({ house, product }) => {
        this.houseMatches.set(
          (house || []).filter(item => item.status === 'matched')
        );

        this.productMatches.set(
          (product || [])
            .map(item => this.normalizeProductMatch(item))
            .filter(item => this.isCurrentProductMatch(item.status))
        );

        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('無法取得承租人當前媒合名單：', err);
        this.errorMessage.set('無法取得當前媒合名單，請稍後重試。');
        this.isLoading.set(false);
      }
    });
  }

  private normalizeProductMatch(item: any): LesseeProductCurrentMatch {
    const provider = item.provider ?? item.Provider ?? {};

    return {
      id: String(item.id ?? item.Id ?? ''),
      orderNumber: item.orderNumber ?? item.OrderNumber ?? '',
      status: this.normalizeStatus(item.status ?? item.Status),
      type: this.normalizeType(item.type ?? item.Type),
      productId: Number(item.productId ?? item.ProductId ?? 0),
      itemName: item.itemName ?? item.ItemName ?? '未知項目',
      coverUrl: this.normalizeImageUrl(item.coverUrl ?? item.CoverUrl, 'cover'),
      priceInfo: item.priceInfo ?? item.PriceInfo ?? '尚未填寫',
      bookingPeriod: item.bookingPeriod ?? item.BookingPeriod ?? '尚未填寫',
      method: item.method ?? item.Method ?? '尚未填寫',
      message: item.message ?? item.Message ?? '',
      matchScore: Number(item.matchScore ?? item.MatchScore ?? 0),
      provider: {
        name: provider.name ?? provider.Name ?? '未知提供者',
        avatar: this.normalizeImageUrl(provider.avatar ?? provider.Avatar, 'avatar'),
        phone: provider.phone ?? provider.Phone ?? '未填寫',
        lineId: provider.lineId ?? provider.LineId ?? '未填寫'
      }
    };
  }

  private isCurrentProductMatch(status: CurrentMatchStatus): boolean {
    return status === 'matched' || status === 'confirmed' || status === 'rescheduled';
  }

  private normalizeStatus(value: any): CurrentMatchStatus {
    const status = String(value ?? '').trim();

    if (
      status === 'pending' ||
      status === 'confirmed' ||
      status === 'rejected' ||
      status === 'rescheduled' ||
      status === 'matched' ||
      status === 'closed'
    ) {
      return status;
    }

    return 'pending';
  }

  private normalizeType(value: any): 'tool' | 'skill' {
    return String(value ?? '').trim() === 'skill' ? 'skill' : 'tool';
  }

  private normalizeImageUrl(url: string | null | undefined, type: 'cover' | 'avatar'): string {
    if (!url) {
      return type === 'avatar'
        ? 'images/mr_chen.jpg'
        : 'https://via.placeholder.com/800x600/EFEFEF/999999?text=No+Image';
    }

    const value = String(url).trim().replace(/\\/g, '/');

    if (
      value.startsWith('http://') ||
      value.startsWith('https://') ||
      value.startsWith('assets/') ||
      value.startsWith('images/')
    ) {
      return value;
    }

    if (value.startsWith('/')) {
      return `https://localhost:7215${value}`;
    }

    return `https://localhost:7215/${value}`;
  }

  getStatusLabel(status: CurrentMatchStatus): string {
    switch (status) {
      case 'matched':
        return '媒合中';
      case 'confirmed':
        return '已確認';
      case 'rescheduled':
        return '待回覆改期';
      case 'closed':
        return '已關閉';
      default:
        return '媒合中';
    }
  }

  getEmptyStateText(): string {
    switch (this.activeTab()) {
      case 'house':
        return '目前沒有正在承租的房源。';
      case 'tool':
        return '目前沒有借用中的工具。';
      case 'skill':
        return '目前沒有即將進行的技能預約。';
      default:
        return '目前沒有當前媒合資料。';
    }
  }

  getImageUrl(url: string | null | undefined): string {
    return this.normalizeImageUrl(url, 'cover');
  }

  getLessorAvatarUrl(item: LesseeViewingApplication): string {
    return this.normalizeImageUrl(item.lessorAvatar, 'avatar');
  }

  contactByLine(lineId: string | undefined): void {
    if (!lineId || lineId === '未填寫') {
      alert('對方尚未提供 LINE ID');
      return;
    }

    const value = lineId.trim();
    const lineUrl = value.startsWith('@')
      ? `https://line.me/R/ti/p/${encodeURIComponent(value)}`
      : `https://line.me/R/ti/p/~${encodeURIComponent(value)}`;

    window.open(lineUrl, '_blank');
  }

  viewHouse(item: LesseeViewingApplication): void {
    if (!item.houseId) {
      alert('找不到此房源');
      return;
    }

    window.open(`/rental-matching-detail/room/${item.houseId}`, '_blank');
  }

  viewProduct(item: LesseeProductCurrentMatch): void {
    if (!item.productId) {
      alert('找不到此工具 / 技能項目');
      return;
    }

    window.open(`/rental-matching-detail/product/${item.productId}`, '_blank');
  }

  openGoogleCalendarForHouse(item: LesseeViewingApplication): void {
    if (!item.viewingDateTime) {
      alert('這筆房源媒合缺少日期時間');
      return;
    }

    const range = this.parseDateTimeText(item.viewingDateTime);

    if (!range) {
      alert('無法解析看房時間');
      return;
    }

    this.calendarLinkService.openGoogleCalendar({
      title: `房源媒合｜${item.roomName}`,
      startAt: range.startAt,
      endAt: range.endAt,
      location: item.roomAddress || '',
      details: [
        `媒合單號：${item.orderNumber}`,
        `房源：${item.roomName}`,
        `出租人：${item.lessorName}`,
        `電話：${item.lessorPhone}`,
        `LINE ID：${item.lessorLineId}`,
        `備註：${item.matchNote || item.message || '無'}`
      ].join('\n')
    });
  }

  private parseDateTimeText(text: string): { startAt: Date; endAt: Date } | null {
    const match = text.match(/^(\d{4})\/(\d{2})\/(\d{2})\s+(\d{2}):(\d{2})/);

    if (!match) {
      return null;
    }

    const [, y, m, d, hh, mm] = match;
    const startAt = new Date(Number(y), Number(m) - 1, Number(d), Number(hh), Number(mm));
    const endAt = new Date(startAt.getTime() + 60 * 60 * 1000);

    return { startAt, endAt };
  }
}
