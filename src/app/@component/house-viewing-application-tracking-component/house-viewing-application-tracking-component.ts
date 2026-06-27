import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HouseViewingService, LesseeViewingApplication } from '../../@service/house-viewing-service';
import { AvailableViewingSlot } from '../../@interface/available-viewing-slot';
import { LesseeProfileTag } from '../../@interface/lessee-profile-tag';
import { CalendarLinkService } from '../../@service/calendar-link-service';


type ApplicationStatus =
  | 'pending'
  | 'confirmed'
  | 'rejected'
  | 'rescheduled'
  | 'matched'
  | 'closed';

type ApplicationTabStatus = Exclude<ApplicationStatus, 'matched'>;

// type ApplicationStatus = 'pending' | 'confirmed' | 'rejected' | 'rescheduled' | 'matched' | 'closed';

@Component({
  selector: 'app-house-viewing-application-tracking-component',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './house-viewing-application-tracking-component.html',
  styleUrl: './house-viewing-application-tracking-component.scss',
})
export class HouseViewingApplicationTrackingComponent implements OnInit {
  private router = inject(Router);
  private viewingService = inject(HouseViewingService);
  private calendarLinkService = inject(CalendarLinkService);


  activeTab = signal<ApplicationTabStatus>('pending');

  applications = signal<LesseeViewingApplication[]>([]);

  isLoading = signal(false);
  errorMessage = signal('');
  readonly loadingCards = Array.from({ length: 3 });

  isReselectModalOpen = signal(false);
  selectedReselectApplication = signal<LesseeViewingApplication | null>(null);

  reselectDate = signal('');
  reselectMoveInTime = signal('一週內');
  reselectIntro = signal('');

  moveInTimes = signal(['一週內', '半個月內', '一個月後']);

  reselectAvailableViewingSlots = signal<AvailableViewingSlot[]>([]);
  reselectSelectedViewingSlotIds = signal<number[]>([]);
  reselectLesseeProfileTags = signal<LesseeProfileTag[]>([]);

  isReselectSlotsLoading = signal(false);
  reselectSlotsLoadError = signal('');
  isSubmittingReselect = signal(false);

  isSchedulePanelOpen = signal(false);

  calendarAvailableItems = computed(() => {
    return this.applications().filter(item => this.canAddViewingToCalendar(item));
  });

  calendarAvailableCount = computed(() => {
    return this.calendarAvailableItems().length;
  });

  toggleSchedulePanel(): void {
    this.isSchedulePanelOpen.set(!this.isSchedulePanelOpen());
  }


  // ===================================================================
  // 重新申請 Modal 狀態
  // ===================================================================
  isReapplyModalOpen = signal(false);
  selectedReapplyApplication = signal<LesseeViewingApplication | null>(null);

  reapplyDate = signal('');
  reapplyMoveInTime = signal('一週內');
  reapplyIntro = signal('');

  reapplyAvailableViewingSlots = signal<AvailableViewingSlot[]>([]);
  reapplySelectedViewingSlotIds = signal<number[]>([]);
  reapplyLesseeProfileTags = signal<LesseeProfileTag[]>([]);

  isReapplySlotsLoading = signal(false);
  reapplySlotsLoadError = signal('');
  isSubmittingReapply = signal(false);


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
    return this.applications().filter(x =>
      x.status !== 'matched' &&
      x.status === this.activeTab()
    );
  });

  ngOnInit(): void {
    this.fetchApplications();
  }

  fetchApplications(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.viewingService.getMyApplications().subscribe({
      next: (data: LesseeViewingApplication[]) => {
        console.log('看房申請追蹤 API 回傳：', data);
        console.table(data);

        const normalizedData = (data || []).map(item => ({
          ...item,

          houseId: Number(
            item.houseId ??
            (item as any).HouseId ??
            0
          ),

          attemptNo: Number(
            item.attemptNo ??
            (item as any).AttemptNo ??
            1
          ),

          maxAttemptCount: Number(
            item.maxAttemptCount ??
            (item as any).MaxAttemptCount ??
            3
          ),

          applicationFlowType:
            item.applicationFlowType ??
            (item as any).ApplicationFlowType ??
            'new'
        }));

        console.log('整理後的看房申請追蹤資料：', normalizedData);

        this.applications.set(normalizedData);
        this.isLoading.set(false);
      },
      error: (err: unknown) => {
        console.error('無法取得看房申請追蹤：', err);

        this.applications.set([]);
        this.errorMessage.set('無法取得看房申請追蹤資料，請稍後再試。');
        this.isLoading.set(false);
      }
    });
  }

  selectTab(tabId: ApplicationTabStatus): void {
    this.activeTab.set(tabId);
  }

  getStatusLabel(status: ApplicationStatus): string {
    switch (status) {
      case 'pending':
        return '房東確認中';
      case 'confirmed':
        return '預約已確認';
      case 'matched':
        return '媒合成功';
      case 'rescheduled':
        return '房東提議改期';
      case 'rejected':
        return '已取消 / 已婉拒';
      case 'closed':
        return '申請已關閉';
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
        return '目前沒有待回覆改期的看房申請。';
      case 'rejected':
        return '目前沒有已婉拒的看房申請。';
      case 'closed':
        return '目前沒有已關閉的看房申請。';
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

  // prepareContract(item: LesseeViewingApplication): void {
  //   alert(`之後可進入簽約或聯絡流程，預約單號：${item.orderNumber}`);
  // }

  addToGoogleCalendar(item: LesseeViewingApplication): void {
    const calendarRange = this.buildGoogleCalendarDateRange(item);

    if (!calendarRange) {
      alert('目前缺少有效的看房時間，無法加入 Google 行事曆');
      return;
    }

    const title = `厚厝味看房預約：${item.roomName}`;
    const details = [
      `預約單號：${item.orderNumber}`,
      `出租人：${item.lessorName}`,
      `出租人 LINE ID：${item.lessorLineId || '未填寫'}`,
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

  contactLessorByLine(item: LesseeViewingApplication): void {
    if (!this.canShowFullLessorContact(item)) {
      alert('此預約尚未確認，暫時無法開放出租人聯絡資訊');
      return;
    }

    const lineId = item.lessorLineId?.trim();

    if (!lineId || lineId === '未填寫') {
      alert('出租人尚未提供 LINE ID，請改用電話或等待出租人更新聯絡資訊');
      return;
    }

    this.copyText(lineId);

    const openLine = confirm(
      `已複製出租人 LINE ID：${lineId}\n\n是否嘗試開啟 LINE？`
    );

    if (openLine) {
      window.open(`https://line.me/R/ti/p/~${encodeURIComponent(lineId)}`, '_blank');
    }
  }

  acceptReschedule(item: LesseeViewingApplication): void {
    const message =
      `確認接受出租人提出的改期時間嗎？\n\n` +
      `預約單號：${item.orderNumber}\n` +
      `改期時間：${item.rescheduleInfo?.proposedViewingDateTime || '未提供'}`;

    if (!confirm(message)) {
      return;
    }

    this.viewingService.acceptReschedule(Number(item.id)).subscribe({
      next: () => {
        alert('已接受改期，預約已確認');

        this.applications.update(current =>
          current.map(application =>
            application.id === item.id
              ? {
                ...application,
                status: 'confirmed',
                viewingDateTime:
                  item.rescheduleInfo?.proposedViewingDateTime ||
                  item.viewingDateTime
              }
              : application
          )
        );

        this.activeTab.set('confirmed');

        // 保險：重新抓一次資料庫最新狀態
        this.fetchApplications();
      },
      error: (err) => {
        console.error('接受改期失敗：', err);

        const backendMessage =
          err.error?.details ||
          err.error?.message ||
          err.message ||
          '未知錯誤';

        alert(`接受改期失敗：${backendMessage}`);
      }
    });
  }

  chooseAnotherTime(item: LesseeViewingApplication): void {
    this.selectedReselectApplication.set(item);

    this.reselectDate.set(this.toDateInputValue(item.viewingDate));
    this.reselectMoveInTime.set(item.expectedMoveInText || '一週內');
    this.reselectIntro.set(item.message || '');

    this.reselectSelectedViewingSlotIds.set([]);
    this.reselectAvailableViewingSlots.set([]);
    this.reselectLesseeProfileTags.set([]);

    this.loadReselectAvailableViewingSlots(item);
    this.loadReselectLesseeProfileTags(item);

    this.isReselectModalOpen.set(true);
  }

  closeReselectModal(): void {
    this.isReselectModalOpen.set(false);
    this.selectedReselectApplication.set(null);

    this.reselectDate.set('');
    this.reselectMoveInTime.set('一週內');
    this.reselectIntro.set('');

    this.reselectAvailableViewingSlots.set([]);
    this.reselectSelectedViewingSlotIds.set([]);
    this.reselectLesseeProfileTags.set([]);

    this.reselectSlotsLoadError.set('');
    this.isSubmittingReselect.set(false);
  }

  isReselectViewingSlotSelected(slotId: number | string | null | undefined): boolean {
    const id = Number(slotId);

    if (!Number.isFinite(id)) {
      return false;
    }

    return this.reselectSelectedViewingSlotIds().includes(id);
  }

  toggleReselectViewingSlot(slotId: number | string | null | undefined): void {
    const id = Number(slotId);

    if (!Number.isFinite(id)) {
      console.warn('無效的時段 ID：', slotId);
      return;
    }

    this.reselectSelectedViewingSlotIds.update(current => {
      if (current.includes(id)) {
        return current.filter(currentId => currentId !== id);
      }

      return [...current, id];
    });
  }

  private loadReselectAvailableViewingSlots(item: LesseeViewingApplication): void {
    const houseId = this.getApplicationHouseId(item);

    console.log('重新選擇時段使用的 houseId：', houseId, item);

    if (!houseId || houseId <= 0) {
      this.reselectAvailableViewingSlots.set([]);
      this.reselectSlotsLoadError.set('無法取得房源 ID，請重新整理後再試');
      return;
    }

    this.isReselectSlotsLoading.set(true);
    this.reselectSlotsLoadError.set('');

    this.viewingService.getAvailableSlotsByHouse(houseId).subscribe({
      next: (slots: any[]) => {
        const normalizedSlots = (slots || [])
          .map(slot => {
            const id = Number(slot.id ?? slot.Id);
            const startTime = slot.startTime ?? slot.StartTime ?? '';
            const endTime = slot.endTime ?? slot.EndTime ?? '';

            return {
              id,
              houseId: slot.houseId ?? slot.HouseId,
              lessorId: slot.lessorId ?? slot.LessorId,
              availableDate: slot.availableDate ?? slot.AvailableDate ?? null,
              startTime,
              endTime,
              label: slot.label ?? slot.Label ?? `${startTime} - ${endTime}`,
              isEnabled: slot.isEnabled ?? slot.IsEnabled ?? true
            };
          })
          .filter(slot =>
            Number.isFinite(slot.id) &&
            slot.startTime &&
            slot.endTime
          );

        this.reselectAvailableViewingSlots.set(normalizedSlots);

        const previousLabels = item.preferredTimeSlots ?? [];
        const preselectedIds = normalizedSlots
          .filter(slot => previousLabels.includes(slot.label))
          .map(slot => Number(slot.id));

        this.reselectSelectedViewingSlotIds.set(preselectedIds);

        if (normalizedSlots.length === 0) {
          this.reselectSlotsLoadError.set('出租人目前尚未設定可預約看房時段');
        }

        if (previousLabels.length > 0 && preselectedIds.length === 0 && normalizedSlots.length > 0) {
          this.reselectSlotsLoadError.set('上次選擇的時段目前已不開放，請重新選擇可預約時段');
        }

        this.isReselectSlotsLoading.set(false);
      },
      error: (err) => {
        console.error('取得重新選擇時段失敗：', err);

        this.reselectAvailableViewingSlots.set([]);
        this.reselectSlotsLoadError.set('取得可預約時段失敗，請稍後再試');
        this.isReselectSlotsLoading.set(false);
      }
    });
  }

  private loadReselectLesseeProfileTags(item: LesseeViewingApplication): void {
    const previousLabels = item.lesseeProfileTags ?? [];

    this.viewingService.getMyLesseeProfileTags().subscribe({
      next: (tags: LesseeProfileTag[]) => {
        const baseTags = tags.map(tag => ({
          ...tag,
          checked: previousLabels.includes(tag.label),
          isEditing: false
        }));

        const existingLabels = baseTags.map(tag => tag.label);

        const customTags = previousLabels
          .filter(label => !existingLabels.includes(label))
          .map(label => ({
            label,
            source: 'custom',
            icon: 'sell',
            checked: true,
            isEditing: false
          } as LesseeProfileTag));

        this.reselectLesseeProfileTags.set([
          ...baseTags,
          ...customTags,
          {
            label: '更多偏好',
            source: 'custom',
            icon: 'add',
            checked: false,
            isEditing: false
          }
        ]);
      },
      error: (err) => {
        console.error('取得承租人微檔案失敗：', err);

        const fallbackTags = previousLabels.map(label => ({
          label,
          source: 'custom',
          icon: 'sell',
          checked: true,
          isEditing: false
        } as LesseeProfileTag));

        this.reselectLesseeProfileTags.set([
          ...fallbackTags,
          {
            label: '更多偏好',
            source: 'custom',
            icon: 'add',
            checked: false,
            isEditing: false
          }
        ]);
      }
    });
  }

  handleReselectProfileTagClick(index: number): void {
    const tags = [...this.reselectLesseeProfileTags()];
    const target = tags[index];

    if (!target) return;

    if (target.label === '更多偏好') {
      tags[index] = {
        label: '',
        source: 'custom',
        icon: 'edit',
        checked: false,
        isEditing: true
      };

      tags.push({
        label: '更多偏好',
        source: 'custom',
        icon: 'add',
        checked: false,
        isEditing: false
      });

      this.reselectLesseeProfileTags.set(tags);
      return;
    }

    target.checked = !target.checked;
    this.reselectLesseeProfileTags.set(tags);
  }

  finishReselectCustomTag(index: number): void {
    const tags = [...this.reselectLesseeProfileTags()];
    const target = tags[index];

    if (!target) return;

    const value = target.label.trim();

    if (!value) {
      tags.splice(index, 1);
      this.reselectLesseeProfileTags.set(tags);
      return;
    }

    tags[index] = {
      ...target,
      label: value,
      source: 'custom',
      icon: 'sell',
      checked: true,
      isEditing: false
    };

    const hasAddMore = tags.some(tag => tag.label === '更多偏好');

    if (!hasAddMore) {
      tags.push({
        label: '更多偏好',
        source: 'custom',
        icon: 'add',
        checked: false,
        isEditing: false
      });
    }

    this.reselectLesseeProfileTags.set(tags);
  }

  confirmReselectTime(): void {
    const item = this.selectedReselectApplication();

    if (!item) return;

    if (!this.reselectDate()) {
      alert('請選擇新的看房日期');
      return;
    }

    if (this.reselectAvailableViewingSlots().length === 0) {
      alert('出租人目前尚未設定可預約時段，暫時無法重新送出');
      return;
    }

    const selectedSlots = this.reselectAvailableViewingSlots()
      .filter(slot => this.reselectSelectedViewingSlotIds().includes(Number(slot.id)));

    if (selectedSlots.length === 0) {
      alert('請至少選擇一個出租人開放的看房時段');
      return;
    }

    const firstSelectedSlot = selectedSlots[0];

    const selectedTimes = selectedSlots.map(slot => slot.label);

    const selectedLesseeProfileTags = this.reselectLesseeProfileTags()
      .filter(tag => tag.checked && tag.label !== '更多偏好')
      .map(tag => ({
        label: tag.label,
        source: tag.source
      }));

    const viewingTime = `${this.reselectDate()}T${firstSelectedSlot.startTime}:00`;

    const requestData = {
      reservationId: Number(item.id),
      viewingSlotId: firstSelectedSlot.id,
      viewingTime,
      expectedMoveIn: new Date().toISOString(),
      expectedMoveInText: this.reselectMoveInTime(),
      preferredTimeSlots: selectedTimes,
      lesseeProfileTags: selectedLesseeProfileTags,
      message: this.reselectIntro(),
      matchScore: item.matchScore
    };

    console.log('重新選擇時段 requestData：', requestData);

    this.isSubmittingReselect.set(true);

    this.viewingService.reselectViewingTime(requestData).subscribe({
      next: () => {
        alert('已重新送出看房時段，等待出租人審核');

        this.closeReselectModal();

        // 重新拉資料，確保畫面與資料庫同步
        this.activeTab.set('pending');
        this.fetchApplications();
      },
      error: (err) => {
        console.error('重新選擇時段失敗：', err);

        const backendMessage =
          err.error?.details ||
          err.error?.message ||
          err.message ||
          '未知錯誤';

        alert(`重新選擇時段失敗：${backendMessage}`);
        this.isSubmittingReselect.set(false);
      }
    });
  }

  private toDateInputValue(value?: string | null): string {
    if (!value || value.includes('尚未')) {
      return '';
    }

    const normalized = value.trim().replace(/\//g, '-');

    const match = normalized.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);

    if (!match) {
      return '';
    }

    const [, year, month, day] = match;

    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  viewOtherRooms(): void {
    this.router.navigate(['/rental-matching-component'], {
      queryParams: { category: 'room' }
    });
  }

  reapply(item: LesseeViewingApplication): void {
    if (!this.canReapply(item)) {
      alert('此預約已達重新申請上限，無法再次申請');
      return;
    }

    this.selectedReapplyApplication.set(item);

    this.reapplyDate.set(this.toDateInputValue(item.viewingDate));
    this.reapplyMoveInTime.set(item.expectedMoveInText || '一週內');

    const defaultMessage =
      item.message && item.message !== '無留言'
        ? item.message
        : '您好，我想再次申請看房，這次已調整可配合的時段，謝謝您。';

    this.reapplyIntro.set(defaultMessage);

    this.reapplySelectedViewingSlotIds.set([]);
    this.reapplyAvailableViewingSlots.set([]);
    this.reapplyLesseeProfileTags.set([]);

    this.loadReapplyAvailableViewingSlots(item);
    this.loadReapplyLesseeProfileTags(item);

    this.isReapplyModalOpen.set(true);
  }

  private readonly apiBaseUrl = 'https://localhost:7215';

  getImageUrl(url?: string | null): string {
    const fallback = '/assets/default-room.jpg';

    if (!url || !url.trim()) {
      return fallback;
    }

    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    return `${this.apiBaseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  }

  getLessorAvatarUrl(item: LesseeViewingApplication): string {
    return this.getImageUrl(item.lessorAvatar || null);
  }

  getLessorProfileLink(item: LesseeViewingApplication): any[] {
    return ['/lessor-profile', item.lessorProfileId || item.lessorAccountId || item.lessorId];
  }

  canShowFullLessorContact(item: LesseeViewingApplication): boolean {
    return item.status === 'confirmed' || item.status === 'rescheduled';
  }

  displayLessorLineId(item: LesseeViewingApplication): string {
    const lineId = item.lessorLineId || '';

    if (this.canShowFullLessorContact(item)) {
      return lineId || '未填寫';
    }

    return '確認後開放聯絡';
  }

  displayLessorPhone(item: LesseeViewingApplication): string {
    const phone = item.lessorPhone || '';

    if (this.canShowFullLessorContact(item)) {
      return phone || '未填寫';
    }

    return '確認後開放聯絡';
  }

  hasLesseeProfileTags(item: LesseeViewingApplication): boolean {
    return Array.isArray(item.lesseeProfileTags) && item.lesseeProfileTags.length > 0;
  }

  private buildGoogleCalendarDateRange(item: LesseeViewingApplication): string | null {
    const startDate = this.getConfirmedViewingStartDate(item);

    if (!startDate) {
      return null;
    }

    const endDate = this.getConfirmedViewingEndDate(item, startDate);

    return `${this.formatGoogleCalendarDate(startDate)}/${this.formatGoogleCalendarDate(endDate)}`;
  }

  private getConfirmedViewingStartDate(item: LesseeViewingApplication): Date | null {
    // 優先使用已確認的 viewingDateTime
    const fromViewingDateTime = this.parseTaiwanDateTime(item.viewingDateTime);

    if (fromViewingDateTime) {
      return fromViewingDateTime;
    }

    // fallback：用 viewingDate + 第一個 preferredTimeSlot 的開始時間
    if (item.viewingDate && item.preferredTimeSlots?.length > 0) {
      const firstSlot = item.preferredTimeSlots[0];
      const startTime = this.extractStartTime(firstSlot);

      if (startTime) {
        return this.parseTaiwanDateTime(`${item.viewingDate} ${startTime}`);
      }
    }

    return null;
  }

  private getConfirmedViewingEndDate(item: LesseeViewingApplication, startDate: Date): Date {
    // 如果 preferredTimeSlots 有結束時間，就使用結束時間
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

    // fallback：預設 1 小時
    return new Date(startDate.getTime() + 60 * 60 * 1000);
  }

  private parseTaiwanDateTime(value?: string | null): Date | null {
    if (!value || value.includes('尚未')) {
      return null;
    }

    // 支援：
    // 2026/06/12 14:00
    // 2026-06-12T14:00:00
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

  private getApplicationHouseId(item: LesseeViewingApplication): number {
    const rawHouseId =
      item.houseId ??
      (item as any).HouseId ??
      (item as any).houseID ??
      0;

    const houseId = Number(rawHouseId);

    return Number.isFinite(houseId) ? houseId : 0;
  }

  canReapply(item: LesseeViewingApplication): boolean {
    const attemptNo = item.attemptNo ?? 1;
    const maxAttemptCount = item.maxAttemptCount ?? 3;

    return item.status === 'rejected' && attemptNo < maxAttemptCount;
  }

  getReapplyButtonText(item: LesseeViewingApplication): string {
    const attemptNo = item.attemptNo ?? 1;
    const maxAttemptCount = item.maxAttemptCount ?? 3;

    if (attemptNo >= maxAttemptCount) {
      return '已達申請上限';
    }

    return `重新申請（剩餘 ${maxAttemptCount - attemptNo} 次）`;
  }

  closeReapplyModal(): void {
    this.isReapplyModalOpen.set(false);
    this.selectedReapplyApplication.set(null);

    this.reapplyDate.set('');
    this.reapplyMoveInTime.set('一週內');
    this.reapplyIntro.set('');

    this.reapplyAvailableViewingSlots.set([]);
    this.reapplySelectedViewingSlotIds.set([]);
    this.reapplyLesseeProfileTags.set([]);

    this.reapplySlotsLoadError.set('');
    this.isSubmittingReapply.set(false);
  }

  isReapplyViewingSlotSelected(slotId: number | string | null | undefined): boolean {
    const id = Number(slotId);

    if (!Number.isFinite(id)) {
      return false;
    }

    return this.reapplySelectedViewingSlotIds().includes(id);
  }

  toggleReapplyViewingSlot(slotId: number | string | null | undefined): void {
    const id = Number(slotId);

    if (!Number.isFinite(id)) {
      console.warn('無效的時段 ID：', slotId);
      return;
    }

    this.reapplySelectedViewingSlotIds.update(current => {
      if (current.includes(id)) {
        return current.filter(currentId => currentId !== id);
      }

      return [...current, id];
    });
  }

  private loadReapplyAvailableViewingSlots(item: LesseeViewingApplication): void {
    const houseId = this.getApplicationHouseId(item);

    console.log('重新申請使用的 houseId：', houseId, item);

    if (!houseId || houseId <= 0) {
      this.reapplyAvailableViewingSlots.set([]);
      this.reapplySlotsLoadError.set('無法取得房源 ID，請重新整理後再試');
      return;
    }

    this.isReapplySlotsLoading.set(true);
    this.reapplySlotsLoadError.set('');

    this.viewingService.getAvailableSlotsByHouse(houseId).subscribe({
      next: (slots: any[]) => {
        const normalizedSlots = (slots || [])
          .map(slot => {
            const id = Number(slot.id ?? slot.Id);
            const startTime = slot.startTime ?? slot.StartTime ?? '';
            const endTime = slot.endTime ?? slot.EndTime ?? '';

            return {
              id,
              houseId: slot.houseId ?? slot.HouseId,
              lessorId: slot.lessorId ?? slot.LessorId,
              availableDate: slot.availableDate ?? slot.AvailableDate ?? null,
              startTime,
              endTime,
              label: slot.label ?? slot.Label ?? `${startTime} - ${endTime}`,
              isEnabled: slot.isEnabled ?? slot.IsEnabled ?? true
            };
          })
          .filter(slot =>
            Number.isFinite(slot.id) &&
            slot.startTime &&
            slot.endTime
          );

        this.reapplyAvailableViewingSlots.set(normalizedSlots);

        const previousLabels = item.preferredTimeSlots ?? [];
        const preselectedIds = normalizedSlots
          .filter(slot => previousLabels.includes(slot.label))
          .map(slot => Number(slot.id));

        this.reapplySelectedViewingSlotIds.set(preselectedIds);

        if (normalizedSlots.length === 0) {
          this.reapplySlotsLoadError.set('出租人目前尚未設定可預約看房時段');
        }

        if (previousLabels.length > 0 && preselectedIds.length === 0 && normalizedSlots.length > 0) {
          this.reapplySlotsLoadError.set('上次選擇的時段目前已不開放，請重新選擇可預約時段');
        }

        this.isReapplySlotsLoading.set(false);
      },
      error: (err) => {
        console.error('取得重新申請可預約時段失敗：', err);

        this.reapplyAvailableViewingSlots.set([]);
        this.reapplySlotsLoadError.set('取得可預約時段失敗，請稍後再試');
        this.isReapplySlotsLoading.set(false);
      }
    });
  }

  private loadReapplyLesseeProfileTags(item: LesseeViewingApplication): void {
    const previousLabels = item.lesseeProfileTags ?? [];

    this.viewingService.getMyLesseeProfileTags().subscribe({
      next: (tags: LesseeProfileTag[]) => {
        const baseTags = tags.map(tag => ({
          ...tag,
          checked: previousLabels.includes(tag.label),
          isEditing: false
        }));

        const existingLabels = baseTags.map(tag => tag.label);

        const customTags = previousLabels
          .filter(label => !existingLabels.includes(label))
          .map(label => ({
            label,
            source: 'custom',
            icon: 'sell',
            checked: true,
            isEditing: false
          } as LesseeProfileTag));

        this.reapplyLesseeProfileTags.set([
          ...baseTags,
          ...customTags,
          {
            label: '更多偏好',
            source: 'custom',
            icon: 'add',
            checked: false,
            isEditing: false
          }
        ]);
      },
      error: (err) => {
        console.error('取得重新申請承租人微檔案失敗：', err);

        const fallbackTags = previousLabels.map(label => ({
          label,
          source: 'custom',
          icon: 'sell',
          checked: true,
          isEditing: false
        } as LesseeProfileTag));

        this.reapplyLesseeProfileTags.set([
          ...fallbackTags,
          {
            label: '更多偏好',
            source: 'custom',
            icon: 'add',
            checked: false,
            isEditing: false
          }
        ]);
      }
    });
  }

  handleReapplyProfileTagClick(index: number): void {
    const tags = [...this.reapplyLesseeProfileTags()];
    const target = tags[index];

    if (!target) return;

    if (target.label === '更多偏好') {
      tags[index] = {
        label: '',
        source: 'custom',
        icon: 'edit',
        checked: false,
        isEditing: true
      };

      tags.push({
        label: '更多偏好',
        source: 'custom',
        icon: 'add',
        checked: false,
        isEditing: false
      });

      this.reapplyLesseeProfileTags.set(tags);
      return;
    }

    target.checked = !target.checked;
    this.reapplyLesseeProfileTags.set(tags);
  }

  finishReapplyCustomTag(index: number): void {
    const tags = [...this.reapplyLesseeProfileTags()];
    const target = tags[index];

    if (!target) return;

    const value = target.label.trim();

    if (!value) {
      tags.splice(index, 1);
      this.reapplyLesseeProfileTags.set(tags);
      return;
    }

    tags[index] = {
      ...target,
      label: value,
      source: 'custom',
      icon: 'sell',
      checked: true,
      isEditing: false
    };

    const hasAddMore = tags.some(tag => tag.label === '更多偏好');

    if (!hasAddMore) {
      tags.push({
        label: '更多偏好',
        source: 'custom',
        icon: 'add',
        checked: false,
        isEditing: false
      });
    }

    this.reapplyLesseeProfileTags.set(tags);
  }

  confirmReapply(): void {
    const item = this.selectedReapplyApplication();

    if (!item) return;

    if (!this.canReapply(item)) {
      alert('此預約已達重新申請上限');
      return;
    }

    if (!this.reapplyDate()) {
      alert('請選擇新的看房日期');
      return;
    }

    if (this.reapplyAvailableViewingSlots().length === 0) {
      alert('出租人目前尚未設定可預約時段，暫時無法重新申請');
      return;
    }

    const selectedSlots = this.reapplyAvailableViewingSlots()
      .filter(slot => this.reapplySelectedViewingSlotIds().includes(Number(slot.id)));

    if (selectedSlots.length === 0) {
      alert('請至少選擇一個出租人開放的看房時段');
      return;
    }

    const firstSelectedSlot = selectedSlots[0];
    const selectedTimes = selectedSlots.map(slot => slot.label);

    const selectedLesseeProfileTags = this.reapplyLesseeProfileTags()
      .filter(tag => tag.checked && tag.label !== '更多偏好')
      .map(tag => ({
        label: tag.label,
        source: tag.source
      }));

    const viewingTime = `${this.reapplyDate()}T${firstSelectedSlot.startTime}:00`;

    const requestData = {
      reservationId: Number(item.id),
      viewingSlotId: firstSelectedSlot.id,
      viewingTime,
      expectedMoveIn: new Date().toISOString(),
      expectedMoveInText: this.reapplyMoveInTime(),
      preferredTimeSlots: selectedTimes,
      lesseeProfileTags: selectedLesseeProfileTags,
      message: this.reapplyIntro(),
      matchScore: item.matchScore
    };

    console.log('重新申請 requestData：', requestData);

    this.isSubmittingReapply.set(true);

    this.viewingService.reapplyViewingOrder(requestData).subscribe({
      next: () => {
        alert('已重新送出申請，等待出租人審核');

        this.closeReapplyModal();

        this.activeTab.set('pending');
        this.fetchApplications();
      },
      error: (err) => {
        console.error('重新申請失敗：', err);

        const backendMessage =
          err.error?.details ||
          err.error?.message ||
          err.message ||
          '未知錯誤';

        alert(`重新申請失敗：${backendMessage}`);
        this.isSubmittingReapply.set(false);
      }
    });
  }

  canAddViewingToCalendar(item: LesseeViewingApplication): boolean {
    return item.status === 'confirmed' || item.status === 'rescheduled';
  }

  openViewingGoogleCalendar(item: any): void {
    const range = this.parseViewingDateTime(item);

    if (!range) {
      alert('這筆看房申請缺少可加入日曆的日期時間');
      return;
    }

    this.calendarLinkService.openGoogleCalendar({
      title: `看房預約｜${item.roomName}`,
      startAt: range.startAt,
      endAt: range.endAt,
      location: item.roomAddress || '',
      details: [
        `預約單號：${item.orderNumber}`,
        `房源：${item.roomName}`,
        `出租人：${item.lessorName || '未知出租人'}`,
        `電話：${item.lessorPhone || '確認後開放聯絡'}`,
        `LINE ID：${item.lessorLineId || '確認後開放聯絡'}`,
        `備註：${item.message || '無'}`
      ].join('\n')
    });
  }

  private parseViewingDateTime(item: any): { startAt: string; endAt: string } | null {
    const raw =
      item.viewingDateTime ??
      item.ViewingDateTime ??
      '';

    if (!raw) {
      return null;
    }

    const text = String(raw).trim();

    const match = text.match(
      /(\d{4})\/(\d{1,2})\/(\d{1,2}).*?(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/
    );

    if (match) {
      const date = `${match[1]}-${String(match[2]).padStart(2, '0')}-${String(match[3]).padStart(2, '0')}`;

      return {
        startAt: `${date}T${String(match[4]).padStart(2, '0')}:${match[5]}:00`,
        endAt: `${date}T${String(match[6]).padStart(2, '0')}:${match[7]}:00`
      };
    }

    const fallbackDate = new Date(text);

    if (Number.isNaN(fallbackDate.getTime())) {
      return null;
    }

    const endDate = new Date(fallbackDate);
    endDate.setHours(endDate.getHours() + 1);

    return {
      startAt: fallbackDate.toISOString(),
      endAt: endDate.toISOString()
    };
  }

  openGoogleCalendar(item: any): void {
    const range = this.parseViewingCalendarTime(item);

    if (!range) {
      alert('這筆看房申請缺少可加入日曆的日期時間');
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
        `出租人：${item.lessorName || item.LessorName || '未知出租人'}`,
        `電話：${item.lessorPhone || item.LessorPhone || '確認後開放聯絡'}`,
        `LINE ID：${item.lessorLineId || item.LessorLineId || '確認後開放聯絡'}`,
        `備註：${item.message || item.Message || '無'}`
      ].join('\n')
    });
  }

  private parseViewingCalendarTime(item: any): { startAt: string; endAt: string } | null {
    const dateText =
      item.viewingDate ??
      item.ViewingDate ??
      '';

    const slots =
      item.preferredTimeSlots ??
      item.PreferredTimeSlots ??
      [];

    if (dateText && Array.isArray(slots) && slots.length > 0) {
      const firstSlot = String(slots[0]);

      const slotMatch = firstSlot.match(
        /(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/
      );

      const dateMatch = String(dateText).match(
        /(\d{4})\/(\d{1,2})\/(\d{1,2})/
      );

      if (slotMatch && dateMatch) {
        const date = `${dateMatch[1]}-${this.padCalendarNumber(dateMatch[2])}-${this.padCalendarNumber(dateMatch[3])}`;

        return {
          startAt: `${date}T${this.padCalendarNumber(slotMatch[1])}:${slotMatch[2]}:00`,
          endAt: `${date}T${this.padCalendarNumber(slotMatch[3])}:${slotMatch[4]}:00`
        };
      }
    }

    const raw =
      item.viewingDateTime ??
      item.ViewingDateTime ??
      '';

    if (!raw) {
      return null;
    }

    const text = String(raw).trim();

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

    const fallbackDate = new Date(text.replace(/\//g, '-').replace(' ', 'T'));

    if (Number.isNaN(fallbackDate.getTime())) {
      return null;
    }

    const endDate = new Date(fallbackDate);
    endDate.setHours(endDate.getHours() + 1);

    return {
      startAt: this.toLocalCalendarDateTime(fallbackDate),
      endAt: this.toLocalCalendarDateTime(endDate)
    };
  }

  private padCalendarNumber(value: string | number): string {
    return String(value).padStart(2, '0');
  }

  private toLocalCalendarDateTime(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = this.padCalendarNumber(date.getMonth() + 1);
    const dd = this.padCalendarNumber(date.getDate());
    const hh = this.padCalendarNumber(date.getHours());
    const min = this.padCalendarNumber(date.getMinutes());

    return `${yyyy}-${mm}-${dd}T${hh}:${min}:00`;
  }
}
