import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductBookingService } from '../../@service/product-booking-service';
import { CalendarLinkService } from '../../@service/calendar-link-service';

type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'rejected'
  | 'rescheduled'
  | 'matched'
  | 'closed';

type BookingTabStatus = Exclude<BookingStatus, 'matched'>;

// type BookingStatus = 'pending' | 'confirmed' | 'rejected' | 'rescheduled' | 'closed';
type BookingType = 'tool' | 'skill';

interface ProductBookingApplication {
  id: string;
  orderNumber: string;
  status: BookingStatus;
  type: BookingType;
  productId: number;
  itemName: string;
  coverUrl: string;
  priceInfo: string;
  bookingPeriod: string;
  method: string;
  extraNote: string;
  message: string;
  matchScore: number;
  provider: {
    name: string;
    avatar: string;
    phone: string;
    lineId: string;
  };
  rescheduleInfo?: {
    proposedTime: string;
    message: string;
    count?: number;
  } | null;
}

@Component({
  selector: 'app-product-booking-application-tracking-component',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-booking-application-tracking-component.html',
  styleUrl: './product-booking-application-tracking-component.scss',
})
export class ProductBookingApplicationTrackingComponent implements OnInit {
  private bookingService = inject(ProductBookingService);
  private calendarLinkService = inject(CalendarLinkService);

  activeTab = signal<BookingTabStatus>('pending');

  applications = signal<ProductBookingApplication[]>([]);

  isLoading = signal(false);
  errorMessage = signal('');
  readonly loadingCards = Array.from({ length: 3 });

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
      label: '待回覆改期',
      count: this.applications().filter(x => x.status === 'rescheduled').length
    },
    {
      id: 'rejected' as const,
      label: '已婉拒',
      count: this.applications().filter(x => x.status === 'rejected').length
    },
    {
      id: 'closed' as const,
      label: '已關閉',
      count: this.applications().filter(x => x.status === 'closed').length
    }
  ]);

  ngOnInit(): void {
    this.fetchApplications();
  }

  fetchApplications(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.bookingService.getMyApplications().subscribe({
      next: (data: any[]) => {
        console.log('工具 / 技能預約紀錄 API 回傳：', data);

        const normalizedData: ProductBookingApplication[] = (data || []).map(item => {
          const provider = item.provider ?? item.Provider ?? {};

          return {
            id: String(item.id ?? item.Id ?? ''),
            orderNumber: item.orderNumber ?? item.OrderNumber ?? '',
            status: this.normalizeStatus(item.status ?? item.Status),
            type: this.normalizeType(item.type ?? item.Type),
            productId: Number(item.productId ?? item.ProductId ?? 0),
            itemName: item.itemName ?? item.ItemName ?? '未知項目',
            coverUrl: this.normalizeImageUrl(item.coverUrl ?? item.CoverUrl),
            priceInfo: item.priceInfo ?? item.PriceInfo ?? '',
            bookingPeriod: item.bookingPeriod ?? item.BookingPeriod ?? '',
            method: item.method ?? item.Method ?? '',
            extraNote: item.extraNote ?? item.ExtraNote ?? '',
            message: item.message ?? item.Message ?? '',
            matchScore: Number(item.matchScore ?? item.MatchScore ?? 0),
            provider: {
              name: provider.name ?? provider.Name ?? '未知提供者',
              avatar: provider.avatar ?? provider.Avatar ?? 'images/mr_chen.jpg',
              phone: provider.phone ?? provider.Phone ?? '未填寫',
              lineId: provider.lineId ?? provider.LineId ?? '未填寫'
            },
            rescheduleInfo: item.rescheduleInfo ?? item.RescheduleInfo ?? null
          };
        });

        this.applications.set(normalizedData);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('無法取得工具 / 技能預約紀錄：', err);
        this.applications.set([]);
        this.errorMessage.set('無法取得工具 / 技能預約紀錄，請稍後再試。');
        this.isLoading.set(false);
      }
    });
  }

  selectTab(tabId: BookingTabStatus): void {
    this.activeTab.set(tabId);
  }

  getStatusLabel(status: BookingStatus): string {
    switch (status) {
      case 'pending':
        return '提供者確認中';
      case 'confirmed':
        return '預約已確認';
      case 'rescheduled':
        return '提供者提議改期';
      case 'rejected':
        return '已婉拒';
      case 'closed':
        return '已關閉';
      default:
        return '未知狀態';
    }
  }

  getEmptyStateText(): string {
    switch (this.activeTab()) {
      case 'pending':
        return '目前沒有審核中的工具 / 技能預約。';
      case 'confirmed':
        return '目前沒有已確認的工具 / 技能預約。';
      case 'rescheduled':
        return '目前沒有待回覆改期的工具 / 技能預約。';
      case 'rejected':
        return '目前沒有已婉拒的工具 / 技能預約。';
      case 'closed':
        return '目前沒有已關閉的工具 / 技能預約。';
      default:
        return '目前沒有預約紀錄。';
    }
  }

  canShowFullContact(item: ProductBookingApplication): boolean {
    return item.status === 'confirmed' || item.status === 'rescheduled';
  }

  displayProviderPhone(item: ProductBookingApplication): string {
    const phone = item.provider?.phone || '';

    if (this.canShowFullContact(item)) {
      return phone || '未填寫';
    }

    return this.maskPhone(phone);
  }

  displayProviderLineId(item: ProductBookingApplication): string {
    const lineId = item.provider?.lineId || '';

    if (this.canShowFullContact(item)) {
      return lineId || '未填寫';
    }

    return this.maskText(lineId);
  }

  contactProviderByLine(item: ProductBookingApplication): void {
    if (!this.canShowFullContact(item)) {
      alert('此預約尚未確認，暫時無法開放提供者聯絡資訊');
      return;
    }

    const lineId = item.provider?.lineId?.trim();

    if (!lineId || lineId === '未填寫') {
      alert('提供者尚未提供 LINE ID');
      return;
    }

    const lineUrl = lineId.startsWith('@')
      ? `https://line.me/R/ti/p/${encodeURIComponent(lineId)}`
      : `https://line.me/R/ti/p/~${encodeURIComponent(lineId)}`;

    window.open(lineUrl, '_blank');
  }

  viewProduct(item: ProductBookingApplication): void {
    if (!item.productId) {
      alert('找不到此工具 / 技能項目');
      return;
    }

    window.open(`/rental-matching-detail/product/${item.productId}`, '_blank');
  }

  openGoogleCalendar(item: ProductBookingApplication): void {
    const event = this.buildCalendarEvent(item);

    if (!event) {
      alert('這筆預約缺少可加入日曆的日期時間');
      return;
    }

    this.calendarLinkService.openGoogleCalendar(event);
  }

  private normalizeStatus(value: any): BookingStatus {
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

  private normalizeType(value: any): BookingType {
    const type = String(value ?? '').trim();

    return type === 'skill' ? 'skill' : 'tool';
  }

  private maskPhone(phone: string): string {
    if (!phone || phone === '未填寫') {
      return '未填寫';
    }

    const pure = phone.replace(/\s+/g, '');

    if (pure.length >= 8) {
      return `${pure.slice(0, 4)}***${pure.slice(-3)}`;
    }

    return this.maskText(pure);
  }

  private maskText(text: string): string {
    if (!text || text === '未填寫') {
      return '未填寫';
    }

    if (text.length <= 4) {
      return `${text.slice(0, 1)}***`;
    }

    return `${text.slice(0, 2)}***${text.slice(-2)}`;
  }

  private normalizeImageUrl(url: string | null | undefined): string {
    if (!url) {
      return 'https://via.placeholder.com/800x600/EFEFEF/999999?text=No+Image';
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

  canAddToCalendar(item: ProductBookingApplication): boolean {
    return item.status === 'confirmed' || item.status === 'rescheduled';
  }

  filteredApplications = computed(() => {
    return this.applications().filter(x =>
      x.status !== 'matched' &&
      x.status === this.activeTab()
    );
  });

  isSchedulePanelOpen = signal(false);

  calendarAvailableItems = computed(() => {
    return this.applications().filter(item => this.canAddToCalendar(item));
  });

  calendarAvailableCount = computed(() => {
    return this.calendarAvailableItems().length;
  });

  toggleSchedulePanel(): void {
    this.isSchedulePanelOpen.set(!this.isSchedulePanelOpen());
  }

  private buildCalendarEvent(item: ProductBookingApplication) {
    const range = this.parseBookingPeriod(item.bookingPeriod, item.type);

    if (!range) {
      return null;
    }

    const typeText = item.type === 'tool' ? '工具借用' : '技能預約';

    return {
      title: `${typeText}｜${item.itemName}`,
      startAt: range.startAt,
      endAt: range.endAt,
      location: item.method || '',
      details: [
        `預約單號：${item.orderNumber}`,
        `項目：${item.itemName}`,
        `類型：${typeText}`,
        `費用：${item.priceInfo}`,
        `方式：${item.method || '尚未填寫'}`,
        `提供者：${item.provider?.name || '未知提供者'}`,
        `電話：${this.canShowFullContact(item) ? item.provider?.phone : '確認後開放聯絡'}`,
        `LINE ID：${this.canShowFullContact(item) ? item.provider?.lineId : '確認後開放聯絡'}`,
        `備註：${item.message || '無'}`
      ].join('\n')
    };
  }

  private parseBookingPeriod(
    bookingPeriod: string,
    type: BookingType
  ): { startAt: string; endAt: string } | null {
    const text = String(bookingPeriod || '').trim();

    if (!text) {
      return null;
    }

    if (type === 'tool') {
      const match = text.match(
        /(\d{4})\/(\d{1,2})\/(\d{1,2}).*?(\d{4})\/(\d{1,2})\/(\d{1,2})/
      );

      if (!match) {
        return null;
      }

      const startAt = `${match[1]}-${this.pad(match[2])}-${this.pad(match[3])}T09:00:00`;
      const endAt = `${match[4]}-${this.pad(match[5])}-${this.pad(match[6])}T18:00:00`;

      return { startAt, endAt };
    }

    const skillMatch = text.match(
      /(\d{4})\/(\d{1,2})\/(\d{1,2}).*?(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/
    );

    if (!skillMatch) {
      return null;
    }

    const date = `${skillMatch[1]}-${this.pad(skillMatch[2])}-${this.pad(skillMatch[3])}`;
    const startAt = `${date}T${this.pad(skillMatch[4])}:${skillMatch[5]}:00`;
    const endAt = `${date}T${this.pad(skillMatch[6])}:${skillMatch[7]}:00`;

    return { startAt, endAt };
  }

  private pad(value: string): string {
    return String(value).padStart(2, '0');
  }

}
