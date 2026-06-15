import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductBookingService } from '../../@service/product-booking-service';

type BookingStatus = 'pending' | 'confirmed' | 'rejected' | 'rescheduled' | 'closed';
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

  activeTab = signal<BookingStatus>('pending');

  applications = signal<ProductBookingApplication[]>([]);

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

  filteredApplications = computed(() => {
    return this.applications().filter(x => x.status === this.activeTab());
  });

  ngOnInit(): void {
    this.fetchApplications();
  }

  fetchApplications(): void {
    this.isLoading.set(true);

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
        this.isLoading.set(false);
        alert('無法取得工具 / 技能預約紀錄');
      }
    });
  }

  selectTab(tabId: BookingStatus): void {
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

  private normalizeStatus(value: any): BookingStatus {
    const status = String(value ?? '').trim();

    if (
      status === 'pending' ||
      status === 'confirmed' ||
      status === 'rejected' ||
      status === 'rescheduled' ||
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
}
