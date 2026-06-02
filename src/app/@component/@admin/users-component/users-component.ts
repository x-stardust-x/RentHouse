import { Component, inject } from '@angular/core';
import { UserService } from '../../../@service/user-service';
import { DatePipe } from '@angular/common';
import { Authservice } from '../../../@service/authservice';
import { LogService } from '../../../@service/log-service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-users-component',
  imports: [DatePipe],
  templateUrl: './users-component.html',
  styleUrl: './users-component.scss',
})
export class UsersComponent {
  public userservice = inject(UserService);
  public authsev = inject(Authservice);
  private logsev = inject(LogService);

  constructor() {
    this.userservice.loadAllUsers();
    console.log(this.userservice.users());
  }

  changeStatus(userId: number, status: boolean) {
    const userName = this.userservice.users().find(u => u.accountId === userId)?.realName ?? userId;
    if (confirm(`確定要${status ? '停權' : '啟用'}嗎？`)) {
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
          alert(`使用者已${status ? '停權' : '啟用'}`);
          this.userservice.loadAllUsers();
        },
        error: (err) => {
          console.error(err);
          alert("更新失敗");
        }
      });
    }
  }
  deleteUser(userId: number) {
    const userName = this.userservice.users().find(u => u.accountId === userId)?.realName ?? userId;
    if (confirm('確定要刪除嗎？')) {
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
          alert("使用者已刪除");
          this.userservice.loadAllUsers();
        },
        error: (err) => {
          console.error(err);
          alert("刪除失敗");
        }
      });
    }
  }
}
