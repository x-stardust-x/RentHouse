import { Component, inject, signal, computed } from '@angular/core';
import { UserService } from '../../../@service/user-service';
import { DatePipe } from '@angular/common';
import { Authservice } from '../../../@service/authservice';
import { LogService } from '../../../@service/log-service';
import { switchMap } from 'rxjs';
import { AlertService } from '../../../@service/alert-service';

@Component({
  selector: 'app-users-component',
  imports: [DatePipe],
  templateUrl: './users-component.html',
  styleUrl: './users-component.scss',
})
export class UsersComponent {
  currentPage = signal(1);
  pageSize = signal(5); // 每頁幾筆
  public userservice = inject(UserService);
  public authsev = inject(Authservice);
  private logsev = inject(LogService);
  private alert = inject(AlertService);

  constructor() {
    this.userservice.loadAllUsers();
    console.log(this.userservice.users());
  }

  pagedUsers = computed(() => {
    const allUsers = this.userservice.users();

    const filterUsers = allUsers.filter(x => x.isDelete === false);

    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();

    return filterUsers.slice(start, end);
  });

  totalPages = computed(() => {
    return Math.ceil(this.userservice.users().length / this.pageSize());
  });

  pages = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  });

  changePage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }

  async changeStatus(userId: number, status: boolean) {
    const userName = this.userservice.users().find(u => u.accountId === userId)?.realName ?? userId;

    const res = await this.alert.confirm(`確定要${status ? '停權' : '啟用'}嗎？`);

    if (res.isConfirmed) {
      const actionText = status
        ? `停權使用者: ${userName}`
        : `啟用使用者: ${userName}`;

      this.userservice.updateUserStatus(userId).pipe(
        switchMap(() => this.authsev.getClientIPAddress()),
        switchMap(ip => {
          const logData = {
            userId: this.authsev.getAdminId() ?? 0,
            action: actionText,
            ipAddress: ip,
          };
          return this.logsev.postLog(logData);
        })
      ).subscribe({
        next: () => {
          this.alert.successTime(`使用者已${status ? '停權' : '啟用'}`);
          this.userservice.loadAllUsers();
        },
        error: (err) => {
          this.alert.warning(`更新失敗`,err.error?.meesage);
        }
      });
    }
  }
  async deleteUser(userId: number) {
    const userName = this.userservice.users().find(u => u.accountId === userId)?.realName ?? userId;
    const res = await this.alert.confirm(`確定要刪除嗎`);
    if (res.isConfirmed) {
      this.userservice.deleteUser(userId).pipe(
        switchMap(() => this.authsev.getClientIPAddress()),
        switchMap(ip => {
          const logData = {
            userId: this.authsev.getAdminId() ?? 0,
            action: `刪除使用者: ${userName}`,
            ipAddress: ip,
          };
          return this.logsev.postLog(logData);
        })
      ).subscribe({
        next: () => {
          this.alert.successTime("使用者已刪除");
          this.userservice.loadAllUsers();
          this.currentPage.set(1);
          if (this.currentPage() > this.totalPages()) {
            this.currentPage.set(this.totalPages());
          }
        },
        error: (err) => {
          this.alert.warning(`刪除失敗`,err.error?.meesage);
        }
      });
    }
  }
}
