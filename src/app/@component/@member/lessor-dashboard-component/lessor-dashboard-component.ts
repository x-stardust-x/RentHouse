import { UserProfile } from './../../../@interface/user-profile';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { UserService } from '../../../@service/user-service';
import { LocationService } from '../../../@service/location-service';
import { Authservice } from '../../../@service/authservice';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HouseService } from '../../../@service/house.service';
import { HouseViewingService } from '../../../@service/house-viewing-service';
import { Reservation } from '../../house-viewing-approval-component/house-viewing-approval-component';

@Component({
  selector: 'app-lessor-dashboard-component',
  imports: [RouterLink, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './lessor-dashboard-component.html',
  styleUrl: './lessor-dashboard-component.scss',
})
export class LessorDashboardComponent {
  private readonly authsev = inject(Authservice);
  public usersev = inject(UserService);
  public locsev = inject(LocationService);
  public housesev = inject(HouseService);
  private viewingService = inject(HouseViewingService);
  accountId = Number(this.authsev.getAccountId());
  userId = this.authsev.getUserId();
  myHouses = signal<any[]>([]);
  myProducts = signal<any[]>([]);
  reservations = signal<Reservation[]>([]);
  constructor() {
    this.usersev.loadProfile(this.userId);
    this.locsev.getUserLocation(this.userId);
    this.housesev.getMyHouses(this.accountId).subscribe({
      next: (data) => {
        console.log('【Signal】後端傳來的資料：', data);
        this.myHouses.set(data);
      },
      error: (err) => {
        console.error('讀取失敗', err);
      }
    });
    this.housesev.getProductsByAccountId(this.accountId).subscribe({
      next: (data) => {
        console.log('【Signal】後端傳來的資料：', data);
        this.myProducts.set(data);
      },
      error: (err) => {
        console.error('讀取失敗', err);
      }
    });
    this.viewingService.getMyApprovals().subscribe({
      next: (data) => {
        console.log('看房預約審核 API 回傳：', data);
        // console.table(data);
        this.reservations.set(data as unknown as Reservation[]);
      },
      error: (err) => {
        console.error('無法取得預約資料：', err);
      }
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  // computed 自動同步
  // 模擬資料，便於未來與 API 對接
  // userName = this.usersev.profile()?.realName;
  role = '房東';

  stats = computed(() => [
    { title: '活躍房源', count: this.myHouses().filter(x=>x.status === 1).length, icon: 'home', badge: '上架中', link: '../houses' },
    { title: '共享工具/技能', count: this.myProducts().filter(x=>x.status === 1).length, icon: 'build', link: '../products-list' },
    { title: '待審核預約', count: this.reservations().filter(x => x.status == "pending").length, icon: 'calendar_today', hasDot: (this.reservations().filter(x => x.status == "pending").length != 0) , link: "../house-viewing-approval" },
    { title: '當前租客總數', count: this.reservations().filter(x => x.status == "matched").length, icon: 'groups', link: '' }
  ]);

  recentActivities = computed(() =>
  this.reservations()
    .filter(item => item.status === 'pending')
    .map(item => ({
      type: 'booking',
      title: `看房預約申請：${item.roomName}`,
      time: item.viewingDateTime, // 或改成相對時間
      detail: `申請人：${item.applicant.name} (${item.applicant.profiles.join('、')})`,
      icon: 'calendar_today',
      iconBg: '#e8f0fe'
    }))
);

systemNotifications = computed(() => {
  const notifications = [];

  if (this.reservations().filter(x => x.status == "pending").length > 0) {
    notifications.push({
      type: 'warning',
      text: '您有新的待審核預約，請盡快處理。',
      icon: 'info'
    });
  }

  notifications.push({
    type: 'tip',
    text: '新增「生活公約」標籤可提升配對準確率達 15%。',
    icon: 'lightbulb'
  });

  return notifications;
});

  // 互動事件處理
  onApprove(activity: any) {
    console.log('核准:', activity);
  }

  onReject(activity: any) {
    console.log('婉拒:', activity);
  }
  getRelativeTime(date: string): string {
    const now = new Date().getTime();
    const target = new Date(date).getTime();

    const diff = Math.floor((now - target) / 1000);

    if (diff < 60) return `${diff}秒前`;
    if (diff < 3600) return `${Math.floor(diff / 60)}分鐘前`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}小時前`;

    return `${Math.floor(diff / 86400)}天前`;
  }
}
