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
  private housesev = inject(HouseService);
  accountId = Number(this.authsev.getAccountId());
  userId = this.authsev.getUserId();
  myHouses = signal<any[]>([]);
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
    })
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
    { title: '共享工具/技能', count: 8, icon: 'build', link: '../products-list' },
    { title: '待審核預約', count: 5, icon: 'calendar_today', hasDot: true, link: '' },
    { title: '當前租客總數', count: 24, icon: 'groups', link: '' }
  ]);

  recentActivities = signal([
    {
      type: 'booking',
      title: '看房預約申請：測試豪華套房',
      time: '2小時前',
      detail: '申請人：林小美 (年輕上班族)',
      icon: 'calendar_today',
      iconBg: '#e8f0fe'
    },
    {
      type: 'tool',
      title: '工具借用申請：電鑽組',
      time: '5小時前',
      detail: '申請人：陳大同 (302房客)',
      icon: 'build',
      iconBg: '#e8f0fe'
    }
  ]);

  systemNotifications = signal([
    {
      type: 'warning',
      text: '您的「實名認證」即將在30天後到期，請盡速更新。',
      icon: 'info'
    },
    {
      type: 'tip',
      text: '新增「生活公約」標籤可提升配對準確率達 15%。',
      icon: 'lightbulb'
    }
  ]);

  // 互動事件處理
  onApprove(activity: any) {
    console.log('核准:', activity);
  }

  onReject(activity: any) {
    console.log('婉拒:', activity);
  }
}
