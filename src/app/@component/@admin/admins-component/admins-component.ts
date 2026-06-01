import { Component, inject } from '@angular/core';
import { AdminService } from '../../../@service/admin-service';
import { FormsModule } from '@angular/forms';
import { AdminDto } from '../../../@interface/admin';
import { Authservice } from '../../../@service/authservice';

@Component({
  selector: 'app-admins-component',
  imports: [FormsModule],
  templateUrl: './admins-component.html',
  styleUrl: './admins-component.scss',
})
export class AdminsComponent {
  public adminservice = inject(AdminService);
  private authsev = inject(Authservice);

  now_adminid: number = this.authsev.getAdminId() ?? 0;
  constructor() {
    this.loadAdmin();
  }

  newAdmin : AdminDto = {
    username: '',
    pwd: '',
    email: '',
    phone: '',
  };

  // 新增
  createAdmin() {
    console.log('create admin:', this.newAdmin);

    // 呼叫 API
    this.adminservice.createAdmin(this.newAdmin).subscribe({
      next: (res) => {
        alert("管理員已新增");
        this.loadAdmin();
      },
      error: (err) => {
        console.error(err);
        alert("新增失敗");
      }
    });

    // reset form
    this.newAdmin = {
      username: '',
      email: '',
      phone: '',
      pwd: ''
    };
  }

  loadAdmin() {
    this.adminservice.getAllAdmins();
    console.log(this.adminservice.admins());

  }
  resetPwd(adminId: number) {
    if (confirm("確定要重置密碼嗎？")) {
      this.adminservice.resetpwd(adminId).subscribe({
        next: (res) => {
          alert("密碼已重置為預設密碼0000");
        },
        error: (err) => {
          console.error(err);
          alert("重置失敗");
        }
      });
    }
  }
  deleteAdmin(adminId: number) {
    if (confirm("確定要刪除該管理員嗎？")) {
      this.adminservice.deleteAdmin(adminId).subscribe({
        next: (res) => {
          alert("管理員已刪除");
          this.loadAdmin();
        },
        error: (err) => {
          console.error(err);
          alert("刪除失敗");
        }
      });
    }
  }
}
