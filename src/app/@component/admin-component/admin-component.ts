import { Component, computed, inject, signal } from '@angular/core';
import { Authservice } from '../../@service/authservice';
import { NewsService } from '../../@service/news-service';
import { RouterLink, RouterOutlet } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';
import { HouseService } from '../../@service/house.service';
import { Reservation } from '../house-viewing-approval-component/house-viewing-approval-component';
import { HouseViewingService } from '../../@service/house-viewing-service';
import { UserService } from '../../@service/user-service';
import { LogService } from '../../@service/log-service';
import { Log } from '../../@interface/log';

interface StatCard {
  title: string;
  value: number;
  subText?: string;
  trend?: string;
  icon: string;
  type: 'default' | 'warning' | 'success';
}

interface Activity {
  id: number;
  title: string;
  desc: string;
  time: string;
  icon: string;
  type: 'default' | 'warning' | 'success' | 'info' | 'error';
}

@Component({
  selector: 'app-admin-component',
  imports: [MatIconModule, FormsModule, DecimalPipe, CommonModule, RouterLink],
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.scss',
})

export class AdminComponent {
  authsev = inject(Authservice);
  usersev = inject(UserService);
  housesev = inject(HouseService);
  logsev = inject(LogService);
  private viewingService = inject(HouseViewingService);


  rawHouses = signal<any[]>([]);
  rawProducts = signal<any[]>([]);
  reservations = signal<Reservation[]>([]);
  my_reservation = signal<any[]>([]);
  LogData = signal<Log[]>([]);
  constructor() {
    this.usersev.loadAllUsers();
    this.logsev.getLogs().subscribe(res => {
      this.LogData.set(res);
    });
    this.housesev.getHouses().subscribe({
      next: (data) => {
        // 去除已被刪除/永久下架的 (status = 3)
        const reviewList = data.filter(house => house.status !== 3);

        // 🌟 4. 把資料存進「原始資料庫」
        this.rawHouses.set(reviewList);
      },
      error: (err) => console.error('取得待審核清單失敗', err)
    });
    this.housesev.getAllProductsForAdmin().subscribe({
      next: (data) => {
        // 去除已被刪除/永久下架的 (status = 3)
        const reviewList = data.filter(p => p.status !== 3);

        // 🌟 4. 把資料存進「原始資料庫」
        this.rawProducts.set(reviewList);
      },
      error: (err) => console.error('取得待審核清單失敗', err)
    });
    // this.viewingService.getMyApprovals().subscribe({
    //   next: (data) => {
    //     // console.log('看房預約審核 API 回傳：', data);
    //     // console.table(data);
    //     this.reservations.set(data as unknown as Reservation[]);
    //   },
    //   error: (err) => {
    //     console.error('無法取得預約資料：', err);
    //   }
    // });
    this.viewingService.getAllApprovals().subscribe({
      next:(data) =>{
        this.my_reservation.set(data);
        console.log(this.my_reservation());

      },
      error:(err)=>{
        console.error('Mytest無法取得預約資料：', err);
      }
    })
  }

  userTrend = computed(() => {

    const now = new Date();

    // 本月
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // 上月
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    const thisMonthCount = this.countUsersInRange(this.usersev.users(), thisMonthStart, thisMonthEnd);
    const lastMonthCount = this.countUsersInRange(this.usersev.users(), lastMonthStart, lastMonthEnd);

    if (lastMonthCount === 0) {
      return thisMonthCount > 0 ? '+100% 較上月' : '0% 較上月';
    }

    const diff = ((thisMonthCount - lastMonthCount) / lastMonthCount) * 100;

    const sign = diff >= 0 ? '+' : '';

    return `${sign}${diff.toFixed(1)}% 較上月`;
});


  stats = computed<StatCard[]>(() => [
    {
      title: '總會員數',
      value: this.usersev.users().length,
      trend: this.userTrend(),
      icon: 'group',
      type: 'default'
    },
    {
      title: '待審核房源和資產',
      value: this.rawHouses().filter(x => x.status == 0).length + this.rawProducts().filter(x => x.status == 0).length,
      subText: '需即時處理',
      icon: 'home',
      type: 'warning'
    },
    {
      title: '本月媒合成功數',
      value: this.my_reservation().filter(x => x.status == 4).length,
      subText: this.MatchPercent(this.my_reservation().filter(x => x.status == 4).length),
      icon: 'handshake',
      type: 'success'
    }
  ]);

 activities = computed<Activity[]>(() => {
    return this.LogData()
      .sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 3)
      .map(log => {
        const isCreate = log.action.includes('新增');
        const isUpdate = log.action.includes('修改');
        const isDelete = log.action.includes('刪除');

        return {
          id: log.id,
          title: log.action,
          desc: `管理員 ${log.name} ${log.action}（IP: ${log.ipAddress}）`,
          time: this.formatTime(log.createdAt),
          icon: isCreate ? 'add'
              : isUpdate ? 'edit'
              : isDelete ? 'delete'
              : 'info',
          type: isCreate ? 'warning'
              : isUpdate ? 'info'
              : isDelete ? 'error'
              : 'default'
        };
      });
  });

  private getMonthRange(date = new Date()) {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return { start, end };
  }
  private countUsersInRange(users: any[], start: Date, end: Date) {
    return users.filter(u => {
      const d = new Date(u.createdAt);
      return d >= start && d <= end;
    }).length;
  }
  formatTime(date: Date | string): string {
    const d = new Date(date);

    const diff = Date.now() - d.getTime();

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) return `${minutes} 分鐘前`;
    if (hours < 24) return `${hours} 小時前`;

    return d.toLocaleString('zh-TW');
  }
  MatchPercent(num : number):string{
    return `達成目標 ${num}%`;
  }
}
