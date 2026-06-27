import { Component, signal, computed, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HouseViewingService } from '../../@service/house-viewing-service';
import { FormsModule } from '@angular/forms';
import { CalendarLinkService } from '../../@service/calendar-link-service';
import { AlertService } from '../../@service/alert-service';

export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'rejected'
  | 'rescheduled'
  | 'matched'
  | 'closed';

type ReviewTabStatus = Exclude<ReservationStatus, 'matched'>;

export interface Reservation {
  id: string;
  orderNumber: string;
  status: ReservationStatus;
  roomName: string;
  roomAddress?: string;
  applicant: {
    name: string;
    avatar: string;
    profiles: string[];
    moveInDate: string;
    phone: string;
    lineId: string;
  };
  viewingDate: string;
  viewingDateTime: string;
  preferredTimeSlots: string[];
  message: string;
  matchScore: number;
  rescheduleInfo?: {
    proposedViewingDateTime: string;
    message: string;
    count?: number;
  };
  applicationFlowType?: 'new' | 'reapply' | 'reselect_time';
  attemptNo?: number;
  maxAttemptCount?: number;

  matchedAt?: string | null;
  matchNote?: string;
  closedReason?: string;
}

@Component({
  selector: 'app-house-viewing-approval-component',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './house-viewing-approval-component.html',
  styleUrl: './house-viewing-approval-component.scss',
})
export class HouseViewingApprovalComponent implements OnInit, OnDestroy {

  isRescheduleModalOpen = signal(false);
  selectedReservation = signal<Reservation | null>(null);

  rescheduleDate = signal('');
  rescheduleStartTime = signal('');
  rescheduleEndTime = signal('');
  rescheduleMessage = signal('');

  isConfirmMatchModalOpen = signal(false);
  selectedMatchReservation = signal<Reservation | null>(null);

  markHouseAsMatched = signal(true);
  closeOtherReservations = signal(true);
  matchNote = signal('');
  isConfirmingMatch = signal(false);

  // ===================================================================
  // 注入 Services
  // ===================================================================
  // 預留給後續與 C# 後端 API 串接使用
  private viewingService = inject(HouseViewingService);
  private calendarLinkService = inject(CalendarLinkService);
  private alert = inject(AlertService);
  private router = inject(Router);

  // ===================================================================
  // 狀態管理 (Signals)
  // ===================================================================
  activeTab = signal<ReviewTabStatus>('pending');
  // activeTab = signal<'pending' | 'confirmed' | 'rejected' | 'rescheduled' | 'matched' | 'closed'>('pending');

  // 模擬後端回傳的預約資料 (未來這裡會由 ngOnInit 呼叫 API 覆寫)

  reservations = signal<Reservation[]>([]);

  isLoading = signal(true);
  errorMessage = signal('');
  readonly loadingCards = Array.from({ length: 3 });

  private refreshTimerId: number | null = null;

  isSchedulePanelOpen = signal(false);

  calendarAvailableItems = computed(() => {
    return this.reservations().filter(item => this.canAddViewingToCalendar(item));
  });

  calendarAvailableCount = computed(() => {
    return this.calendarAvailableItems().length;
  });

  toggleSchedulePanel(): void {
    this.isSchedulePanelOpen.set(!this.isSchedulePanelOpen());
  }

  canAddViewingToCalendar(item: Reservation): boolean {
    return item.status === 'confirmed' || item.status === 'rescheduled';
  }

  openGoogleCalendar(item: any): void {
    const range = this.parseViewingCalendarTime(item);

    if (!range) {
      this.alert.warning('這筆看房預約缺少可加入日曆的日期時間');
      return;
    }

    this.calendarLinkService.openGoogleCalendar({
      title: `看房預約｜${item.roomName || item.RoomName || '房源'}`,
      startAt: range.startAt,
      endAt: range.endAt,
      location: item.roomAddress || item.RoomAddress || '',
      details: [
        `預約單號：${item.orderNumber || item.OrderNumber || ''}`,
        `房源：${item.roomName || item.RoomName || ''}`,
        `申請人：${item.applicant?.name || item.Applicant?.Name || '未知申請人'}`,
        `電話：${this.displayPhone ? this.displayPhone(item) : (item.applicant?.phone || item.Applicant?.Phone || '')}`,
        `LINE ID：${this.displayLineId ? this.displayLineId(item) : (item.applicant?.lineId || item.Applicant?.LineId || '')}`,
        `備註：${item.message || item.Message || '無'}`
      ].join('\n')
    });
  }

  // ===================================================================
  // 動態計算屬性 (Computed)
  // ===================================================================

  // 依據當前頁籤過濾出對應的預約清單
  filteredReservations = computed(() => {
    return this.reservations().filter(r =>
      r.status !== 'matched' &&
      r.status === this.activeTab()
    );
  });

  // 動態計算各狀態的數量，取代原本寫死的 count
  tabs = computed(() => [
    {
      id: 'pending' as const,
      label: '待審核',
      count: this.reservations().filter(r => r.status === 'pending').length
    },
    {
      id: 'confirmed' as const,
      label: '已確認',
      count: this.reservations().filter(r => r.status === 'confirmed').length
    },
    {
      id: 'rejected' as const,
      label: '已婉拒',
      count: this.reservations().filter(r => r.status === 'rejected').length
    },
    {
      id: 'rescheduled' as const,
      label: '待回覆改期',
      count: this.reservations().filter(r => r.status === 'rescheduled').length
    },
    {
      id: 'closed' as const,
      label: '已關閉',
      count: this.reservations().filter(r => r.status === 'closed').length
    }
  ]);

  // ===================================================================
  // 生命週期與 API 讀取
  // ===================================================================
  ngOnInit(): void {
    this.fetchReservations(true);

    this.refreshTimerId = window.setInterval(() => {
      this.fetchReservations(false);
    }, 30000);
  }

  ngOnDestroy(): void {
    if (this.refreshTimerId !== null) {
      window.clearInterval(this.refreshTimerId);
    }
  }

  private fetchReservations(showLoading = true) {
    if (showLoading) {
      this.isLoading.set(true);
    }

    this.errorMessage.set('');

    this.viewingService.getMyApprovals().subscribe({
      next: (data) => {
        console.log('看房預約審核 API 回傳：', data);
        console.table(data);

        this.reservations.set(data as unknown as Reservation[]);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('無法取得預約資料：', err);

        this.isLoading.set(false);

        if (this.reservations().length === 0) {
          this.errorMessage.set('無法取得看房預約資料，請稍後再試。');
        }
      }
    });
  }

  private buildGoogleCalendarDateRange(item: Reservation): string | null {
    const startDate = this.getConfirmedViewingStartDate(item);

    if (!startDate) {
      return null;
    }

    const endDate = this.getConfirmedViewingEndDate(item, startDate);

    return `${this.formatGoogleCalendarDate(startDate)}/${this.formatGoogleCalendarDate(endDate)}`;
  }

  private getConfirmedViewingStartDate(item: Reservation): Date | null {
    const fromViewingDateTime = this.parseTaiwanDateTime(item.viewingDateTime);

    if (fromViewingDateTime) {
      return fromViewingDateTime;
    }

    if (item.viewingDate && item.preferredTimeSlots?.length > 0) {
      const firstSlot = item.preferredTimeSlots[0];
      const startTime = this.extractStartTime(firstSlot);

      if (startTime) {
        return this.parseTaiwanDateTime(`${item.viewingDate} ${startTime}`);
      }
    }

    return null;
  }

  private getConfirmedViewingEndDate(item: Reservation, startDate: Date): Date {
    if (item.viewingDate && item.preferredTimeSlots?.length > 0) {
      const firstSlot = item.preferredTimeSlots[0];
      const endTime = this.extractEndTime(firstSlot);

      if (endTime) {
        const endDate = this.parseTaiwanDateTime(`${item.viewingDate} ${endTime}`);

        if (endDate && endDate.getTime() > startDate.getTime()) {
          return endDate;
        }
      }
    }

    return new Date(startDate.getTime() + 60 * 60 * 1000);
  }

  private parseTaiwanDateTime(value?: string | null): Date | null {
    if (!value || value.includes('尚未')) {
      return null;
    }

    const normalized = value
      .trim()
      .replace(/\//g, '-')
      .replace('T', ' ');

    const match = normalized.match(
      /^(\d{4})-(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{2})/
    );

    if (!match) {
      return null;
    }

    const [, year, month, day, hour, minute] = match;

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      0
    );
  }

  private extractStartTime(slotText: string): string | null {
    const match = slotText.match(/(\d{1,2}:\d{2})/);
    return match ? match[1] : null;
  }

  private extractEndTime(slotText: string): string | null {
    const matches = slotText.match(/\d{1,2}:\d{2}/g);
    return matches && matches.length >= 2 ? matches[1] : null;
  }

  private formatGoogleCalendarDate(date: Date): string {
    const yyyy = date.getFullYear().toString();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return `${yyyy}${mm}${dd}T${hh}${min}${ss}`;
  }

  private copyText(text: string): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {
        this.fallbackCopyText(text);
      });

      return;
    }

    this.fallbackCopyText(text);
  }

  private fallbackCopyText(text: string): void {
    const input = document.createElement('input');
    input.value = text;
    input.style.position = 'fixed';
    input.style.opacity = '0';

    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
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
  selectTab(tabId: ReviewTabStatus): void {
    this.activeTab.set(tabId);
  }

  // 動作：婉拒
  decline(item: Reservation) {
    this.viewingService.updateReservationStatus({
      reservationId: Number(item.id),
      status: 'rejected'
    }).subscribe({
      next: () => {
        this.updateReservationStatus(item.id, 'rejected');
        this.alert.success(`已婉拒預約單號: ${item.orderNumber}`);
      },
      error: (err) => {
        console.error('婉拒預約失敗：', err);

        const backendMessage =
          err.error?.details ||
          err.error?.message ||
          err.message ||
          '未知錯誤';

        this.alert.error(`婉拒預約失敗：${backendMessage}`);
      }
    });
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
    this.viewingService.updateReservationStatus({
      reservationId: Number(item.id),
      status: 'confirmed'
    }).subscribe({
      next: () => {
        this.updateReservationStatus(item.id, 'confirmed');
        this.alert.success(`已接受預約單號: ${item.orderNumber}`);
      },
      error: (err) => {
        console.error('接受預約失敗：', err);

        const backendMessage =
          err.error?.details ||
          err.error?.message ||
          err.message ||
          '未知錯誤';

        this.alert.error(`接受預約失敗：${backendMessage}`);
      }
    });
  }

  openViewingGoogleCalendar(item: any): void {
    const range = this.parseViewingCalendarTime(item);

    if (!range) {
      this.alert.warning('這筆看房預約缺少可加入日曆的日期時間');
      return;
    }

    this.calendarLinkService.openGoogleCalendar({
      title: `看房預約｜${item.roomName || item.RoomName || '房源'}`,
      startAt: range.startAt,
      endAt: range.endAt,
      location: item.roomAddress || item.RoomAddress || '',
      details: [
        `預約單號：${item.orderNumber || item.OrderNumber || ''}`,
        `房源：${item.roomName || item.RoomName || ''}`,
        `申請人：${item.applicant?.name || item.Applicant?.Name || '未知申請人'}`,
        `電話：${this.displayPhone ? this.displayPhone(item) : (item.applicant?.phone || item.Applicant?.Phone || '')}`,
        `LINE ID：${this.displayLineId ? this.displayLineId(item) : (item.applicant?.lineId || item.Applicant?.LineId || '')}`,
        `備註：${item.message || item.Message || '無'}`
      ].join('\n')
    });
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
        return '待回覆改期';
      case 'rejected':
        return '已婉拒';
      case 'matched':
        return '媒合成功';
      case 'closed':
        return '已關閉';
      default:
        return '未知';
    }
  }

  getEmptyStateText(): string {
    switch (this.activeTab()) {
      case 'pending':
        return '目前沒有待審核的預約紀錄。';
      case 'confirmed':
        return '目前沒有已確認的預約紀錄。';
      case 'rescheduled':
        return '目前沒有待回覆改期的預約紀錄。';
      case 'rejected':
        return '目前沒有已婉拒的預約紀錄。';
      case 'closed':
        return '目前沒有已關閉的預約紀錄。';
      default:
        return '目前沒有預約紀錄。';
    }
  }


  // 核准後顯示的聯絡資訊，包含電話和 LINE ID
  canShowFullContact(item: Reservation): boolean {
    return item.status === 'confirmed' || item.status === 'rescheduled';
  }

  getContactHint(item: Reservation): string {
    return this.canShowFullContact(item) ? '(已開放聯絡資訊)' : '(核准後顯示)';
  }

  displayPhone(item: Reservation): string {
    const phone = item.applicant.phone || '';

    if (this.canShowFullContact(item)) {
      return phone || '未填寫';
    }

    return this.maskPhone(phone);
  }

  displayLineId(item: Reservation): string {
    const lineId = item.applicant.lineId || '';

    if (this.canShowFullContact(item)) {
      return lineId || '未填寫';
    }

    return this.maskText(lineId);
  }

  private maskPhone(phone: string): string {
    if (!phone || phone === '未填寫') {
      return '未填寫';
    }

    const pure = phone.replace(/\s+/g, '');

    // 台灣手機常見 10 碼：0980632541 → 0980***541
    if (pure.length >= 8) {
      return `${pure.slice(0, 4)}***${pure.slice(-3)}`;
    }

    return this.maskText(pure);
  }

  openConfirmMatchModal(item: Reservation): void {
    this.selectedMatchReservation.set(item);
    this.markHouseAsMatched.set(true);
    this.closeOtherReservations.set(true);
    this.matchNote.set('');
    this.isConfirmMatchModalOpen.set(true);
  }

  closeConfirmMatchModal(): void {
    this.isConfirmMatchModalOpen.set(false);
    this.selectedMatchReservation.set(null);
    this.markHouseAsMatched.set(true);
    this.closeOtherReservations.set(true);
    this.matchNote.set('');
    this.isConfirmingMatch.set(false);
  }

  async confirmMatch(){
    const item = this.selectedMatchReservation();

    if (!item) return;

    const confirmMessage =
      `確認將此預約標記為媒合成功嗎？\n\n` +
      `房源：${item.roomName}\n` +
      `承租人：${item.applicant.name}\n` +
      `預約單號：${item.orderNumber}`;

    this.closeConfirmMatchModal();

    if ((await this.alert.confirm(confirmMessage)).isDismissed) {
      return;
    }

    this.isConfirmingMatch.set(true);

    this.viewingService.confirmMatch({
      reservationId: Number(item.id),
      markHouseAsMatched: this.markHouseAsMatched(),
      closeOtherReservations: this.closeOtherReservations(),
      matchNote: this.matchNote().trim()
    }).subscribe({
      next: () => {
        this.alert.success('已確認媒合成功，這筆資料已移至「當前媒合名單」。');
        this.router.navigate(['/user-center/lessor-current-matches']);
      },
      error: (err) => {
        console.error('確認媒合失敗：', err);

        const backendMessage =
          err.error?.details ||
          err.error?.message ||
          err.message ||
          '未知錯誤';

        this.alert.error(`確認媒合失敗：${backendMessage}`);
        this.isConfirmingMatch.set(false);
      }
    });
  }

  private maskText(value: string): string {
    if (!value || value === '未填寫') {
      return '未填寫';
    }

    if (value.length <= 2) {
      return `${value[0] ?? ''}*`;
    }

    if (value.length <= 5) {
      return `${value.slice(0, 1)}***${value.slice(-1)}`;
    }

    return `${value.slice(0, 2)}***${value.slice(-2)}`;
  }

  addToGoogleCalendar(item: Reservation): void {
    const calendarRange = this.buildGoogleCalendarDateRange(item);

    if (!calendarRange) {
      this.alert.warning('目前缺少有效的看房時間，無法加入 Google 行事曆');
      return;
    }

    const title = `厚厝味看房預約：${item.roomName}`;
    const details = [
      `預約單號：${item.orderNumber}`,
      `承租人：${item.applicant.name}`,
      `承租人電話：${item.applicant.phone || '未填寫'}`,
      `承租人 LINE ID：${item.applicant.lineId || '未填寫'}`,
      `備註：${item.message || '無'}`
    ].join('\n');

    const location = item.roomAddress || '';

    const url =
      'https://calendar.google.com/calendar/render?action=TEMPLATE' +
      `&text=${encodeURIComponent(title)}` +
      `&dates=${calendarRange}` +
      `&details=${encodeURIComponent(details)}` +
      `&location=${encodeURIComponent(location)}` +
      '&ctz=Asia/Taipei';

    window.open(url, '_blank');
  }

  async contactLesseeByLine(item: Reservation): Promise<void> {
    if (!this.canShowFullContact(item)) {
      this.alert.warning('此預約尚未確認或改期，暫時不開放完整聯絡資訊');
      return;
    }

    const lineId = item.applicant.lineId?.trim();

    if (!lineId || lineId === '未填寫') {
      this.alert.info('承租人尚未提供 LINE ID，請改用電話或等待承租人更新聯絡資訊');
      return;
    }

    this.copyText(lineId);

    const openLine = await this.alert.confirm( `已複製承租人 LINE ID：${lineId}\n\n是否嘗試開啟 LINE？`);

    if (openLine.isConfirmed) {
      window.open(`https://line.me/R/ti/p/~${encodeURIComponent(lineId)}`, '_blank');
    }
  }


  confirmReschedule() {
    const item = this.selectedReservation();

    if (!item) return;

    if (!this.rescheduleDate()) {
      this.alert.warning('請選擇改期日期');
      return;
    }

    if (!this.rescheduleStartTime()) {
      this.alert.warning('請選擇開始時間');
      return;
    }

    if (!this.rescheduleEndTime()) {
      this.alert.warning('請選擇結束時間');
      return;
    }

    if (this.rescheduleEndTime() <= this.rescheduleStartTime()) {
      this.alert.warning('結束時間必須晚於開始時間');
      return;
    }

    if (!this.rescheduleMessage().trim()) {
      this.alert.warning('請填寫給承租人的改期訊息');
      return;
    }

    const proposedStartTime = `${this.rescheduleDate()}T${this.rescheduleStartTime()}:00`;
    const proposedEndTime = `${this.rescheduleDate()}T${this.rescheduleEndTime()}:00`;

    this.viewingService.proposeReschedule({
      reservationId: Number(item.id),
      proposedStartTime,
      proposedEndTime,
      message: this.rescheduleMessage().trim()
    }).subscribe({
      next: () => {
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
                  message: this.rescheduleMessage().trim(),
                  count: (res.rescheduleInfo?.count ?? 0) + 1
                }
              }
              : res
          )
        );

        this.activeTab.set('rescheduled');

        this.alert.success(`已提出改期，預約單號：${item.orderNumber}`);

        this.closeRescheduleModal();
      },
      error: (err) => {
        console.error('提議改期失敗：', err);

        const backendMessage =
          err.error?.details ||
          err.error?.message ||
          err.message ||
          '未知錯誤';

        this.alert.error(`提議改期失敗：${backendMessage}`);
      }
    });
  }

  private parseViewingCalendarTime(item: any): { startAt: string; endAt: string } | null {
    const raw =
      item.viewingDateTime ??
      item.ViewingDateTime ??
      '';

    if (!raw) {
      return null;
    }

    const text = String(raw).trim();

    // 格式例如：2026/06/25 10:00 - 12:00
    const rangeMatch = text.match(
      /(\d{4})\/(\d{1,2})\/(\d{1,2}).*?(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/
    );

    if (rangeMatch) {
      const date = `${rangeMatch[1]}-${this.padCalendarNumber(rangeMatch[2])}-${this.padCalendarNumber(rangeMatch[3])}`;

      return {
        startAt: `${date}T${this.padCalendarNumber(rangeMatch[4])}:${rangeMatch[5]}:00`,
        endAt: `${date}T${this.padCalendarNumber(rangeMatch[6])}:${rangeMatch[7]}:00`
      };
    }

    // 格式如果是 ISO，例如：2026-06-25T10:00:00
    const fallbackDate = new Date(text);

    if (Number.isNaN(fallbackDate.getTime())) {
      return null;
    }

    const endDate = new Date(fallbackDate);
    endDate.setHours(endDate.getHours() + 1);

    return {
      startAt: this.toLocalDateTimeString(fallbackDate),
      endAt: this.toLocalDateTimeString(endDate)
    };
  }

  private padCalendarNumber(value: string | number): string {
    return String(value).padStart(2, '0');
  }

  private toLocalDateTimeString(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = this.padCalendarNumber(date.getMonth() + 1);
    const dd = this.padCalendarNumber(date.getDate());
    const hh = this.padCalendarNumber(date.getHours());
    const min = this.padCalendarNumber(date.getMinutes());

    return `${yyyy}-${mm}-${dd}T${hh}:${min}:00`;
  }



}
