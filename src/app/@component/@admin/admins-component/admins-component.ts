import { Component, inject, signal } from '@angular/core';
import { AdminService } from '../../../@service/admin-service';
import { FormsModule } from '@angular/forms';
import { AdminDto } from '../../../@interface/admin';
import { Authservice } from '../../../@service/authservice';
import { LogService } from '../../../@service/log-service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-admins-component',
  imports: [FormsModule],
  templateUrl: './admins-component.html',
  styleUrl: './admins-component.scss',
})
export class AdminsComponent {
  public adminservice = inject(AdminService);
  public authsev = inject(Authservice);
  private logsev = inject(LogService);

  now_adminid: number = this.authsev.getAdminId() ?? 0;
  isSuper = signal(this.authsev.getRole() === 'super');
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

    const actionText = `新增管理員: ${this.newAdmin.username}`;

    this.adminservice.createAdmin(this.newAdmin).pipe(
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
    const adminName = this.adminservice.admins().find(a => a.id === adminId)?.username ?? adminId;
    if (confirm("確定要重置密碼嗎？")) {
      const actionText = `重置管理員密碼: ${adminName}`;
      this.adminservice.resetpwd(adminId).pipe(
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
    const adminName = this.adminservice.admins().find(a => a.id === adminId)?.username ?? adminId;
    if (confirm("確定要刪除該管理員嗎？")) {
      const actionText = `刪除管理員: ${adminName}`;
      this.adminservice.deleteAdmin(adminId).pipe(
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
  SuperChange(adminId:number){
    const adminName = this.adminservice.admins().find(a => a.id === adminId)?.username ?? adminId;
    if (confirm("確定要變更管理員權限嗎？")) {
      const actionText = `變更管理員權限: ${adminName}`;
      this.adminservice.SuperOc(adminId).pipe(
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
        next: (res) => {
          this.loadAdmin();
          alert("管理員權限已變更");
        },
        error: (err) => {
          console.error(err);
          alert("變更失敗");
        }
      });
    }
  }
  changePwd(id : number){

  }
}
