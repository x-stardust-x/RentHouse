import { Component, inject } from '@angular/core';
import { UserService } from '../../../@service/user-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-users-component',
  imports: [DatePipe],
  templateUrl: './users-component.html',
  styleUrl: './users-component.scss',
})
export class UsersComponent {
  public userservice = inject(UserService);
  constructor() {
    this.userservice.loadAllUsers();
    console.log(this.userservice.users());
  }
  changeStatus(userId: number, status: boolean) {
    if (confirm(`確定要${status ? '停權' : '啟用'}嗎？`)) {
      // 這裡應該呼叫 API 更新使用者狀態
      this.userservice.updateUserStatus(userId).subscribe({
        next: () => {
          alert(`使用者已${status ? '停權' : '啟用'}`);
          // 更新完成後重新載入使用者列表
          this.userservice.loadAllUsers();
        },
        error: (err) => {
          console.error(err);
          alert("更新失敗");
        }
      });
    }
  }
}
