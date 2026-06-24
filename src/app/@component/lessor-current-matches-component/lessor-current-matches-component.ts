import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { HouseViewingService } from '../../@service/house-viewing-service';
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

interface LessorHouseCurrentMatch {
  id: string;
  orderNumber: string;
  status: CurrentMatchStatus;
  roomName: string;
  roomAddress?: string;
  viewingDateTime: string;
  viewingDate?: string;
  matchScore: number;
  matchedAt?: string | null;
  matchNote?: string;
  message?: string;

  applicant: {
    name: string;
    avatar: string;
    profiles: string[];
    moveInDate: string;
    phone: string;
    lineId: string;
  };
}

interface LessorProductCurrentMatch {
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

  applicant: {
    name: string;
    avatar: string;
    profiles?: string[];
    phone: string;
    lineId: string;
  };
}

@Component({
  selector: 'app-lessor-current-matches-component',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lessor-current-matches-component.html',
  styleUrl: './lessor-current-matches-component.scss',
})
export class LessorCurrentMatchesComponent implements OnInit {
  private viewingService = inject(HouseViewingService);
  private productBookingService = inject(ProductBookingService);
  private calendarLinkService = inject(CalendarLinkService);

  activeTab = signal<CurrentMatchTab>('house');

  houseMatches = signal<LessorHouseCurrentMatch[]>([]);
  productMatches = signal<LessorProductCurrentMatch[]>([]);

  isLoading = signal(false);
  errorMessage = signal('');

  readonly loadingCards = Array.from({ length: 3 });

  toolMatches = computed(() =>
    this.productMatches().filter(item => item.type === 'tool')
  );

  skillMatches = computed(() =>
    this.productMatches().filter(item => item.type === 'skill')
  );

  tabs = computed(() => [
    {
      id: 'house' as const,
      label: '房源租客',
      count: this.houseMatches().length
    },
    {
      id: 'tool' as const,
      label: '工具借用者',
      count: this.toolMatches().length
    },
    {
      id: 'skill' as const,
      label: '技能預約者',
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
      house: this.viewingService.getMyApprovals(),
      product: this.productBookingService.getMyApprovals()
    }).subscribe({
      next: ({ house, product }) => {
        const houseMatches = (house || [])
          .map(item => this.normalizeHouseMatch(item))
          .filter(item => item.status === 'matched');

        const productMatches = (product || [])
          .map(item => this.normalizeProductMatch(item))
          .filter(item => this.isCurrentProductMatch(item.status));

        this.houseMatches.set(houseMatches);
        this.productMatches.set(productMatches);

        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('無法取得出租人當前媒合名單：', err);
        this.errorMessage.set('無法取得當前媒合名單，請稍後重試。');
        this.isLoading.set(false);
      }
    });
  }

  private normalizeHouseMatch(item: any): LessorHouseCurrentMatch {
    const applicant = item.applicant ?? item.Applicant ?? {};

    return {
      id: String(item.id ?? item.Id ?? ''),
      orderNumber: item.orderNumber ?? item.OrderNumber ?? '',
      status: this.normalizeStatus(item.status ?? item.Status),
      roomName: item.roomName ?? item.RoomName ?? '未知房源',
      roomAddress: item.roomAddress ?? item.RoomAddress ?? '',
      viewingDateTime: item.viewingDateTime ?? item.ViewingDateTime ?? '',
      viewingDate: item.viewingDate ?? item.ViewingDate ?? '',
      matchScore: Number(item.matchScore ?? item.MatchScore ?? 0),
      matchedAt: item.matchedAt ?? item.MatchedAt ?? null,
      matchNote: item.matchNote ?? item.MatchNote ?? '',
      message: item.message ?? item.Message ?? '',
      applicant: {
        name: applicant.name ?? applicant.Name ?? '未知申請人',
        avatar: this.normalizeImageUrl(applicant.avatar ?? applicant.Avatar, 'avatar'),
        profiles: applicant.profiles ?? applicant.Profiles ?? [],
        moveInDate: applicant.moveInDate ?? applicant.MoveInDate ?? '尚未填寫',
        phone: applicant.phone ?? applicant.Phone ?? '未填寫',
        lineId: applicant.lineId ?? applicant.LineId ?? '未填寫'
      }
    };
  }

  private normalizeProductMatch(item: any): LessorProductCurrentMatch {
    const applicant = item.applicant ?? item.Applicant ?? {};

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
      applicant: {
        name: applicant.name ?? applicant.Name ?? '未知申請人',
        avatar: this.normalizeImageUrl(applicant.avatar ?? applicant.Avatar, 'avatar'),
        profiles: applicant.profiles ?? applicant.Profiles ?? [],
        phone: applicant.phone ?? applicant.Phone ?? '未填寫',
        lineId: applicant.lineId ?? applicant.LineId ?? '未填寫'
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

  getCurrentList() {
    if (this.activeTab() === 'house') {
      return this.houseMatches();
    }

    if (this.activeTab() === 'tool') {
      return this.toolMatches();
    }

    return this.skillMatches();
  }

  getEmptyStateText(): string {
    switch (this.activeTab()) {
      case 'house':
        return '目前沒有房源媒合中的租客。';
      case 'tool':
        return '目前沒有工具借用中的媒合。';
      case 'skill':
        return '目前沒有技能預約中的媒合。';
      default:
        return '目前沒有當前媒合資料。';
    }
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

  viewProduct(item: LessorProductCurrentMatch): void {
    if (!item.productId) {
      alert('找不到此工具 / 技能項目');
      return;
    }

    window.open(`/rental-matching-detail/product/${item.productId}`, '_blank');
  }

  openGoogleCalendarForHouse(item: LessorHouseCurrentMatch): void {
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
        `對象：${item.applicant.name}`,
        `電話：${item.applicant.phone}`,
        `LINE ID：${item.applicant.lineId}`,
        `備註：${item.matchNote || item.message || '無'}`
      ].join('\n')
    });
  }

  openGoogleCalendarForProduct(item: LessorProductCurrentMatch): void {
    alert('工具 / 技能預約已可在原預約頁加入 Google 日曆；此處可後續再接日期解析。');
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
