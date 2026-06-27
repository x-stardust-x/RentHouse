import { Component, inject, signal } from '@angular/core';
import { AdminService } from '../../../@service/admin-service';
import { FormsModule } from '@angular/forms';
import { AdminDto } from '../../../@interface/admin';
import { Authservice } from '../../../@service/authservice';
import { LogService } from '../../../@service/log-service';
import { switchMap } from 'rxjs';
import { AlertService } from '../../../@service/alert-service';

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
  private alert = inject(AlertService);
  newPwd = '';
  newPwd2 = '';

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
        this.alert.successTime("管理員已新增");
        this.loadAdmin();
      },
      error: (err) => {
        this.alert.warning(`新增失敗`,err.error?.meesage);
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
  async resetPwd(adminId: number) {
    const adminName = this.adminservice.admins().find(a => a.id === adminId)?.username ?? adminId;

    const res = await this.alert.confirm("確定要重置密碼嗎？");

    if (res.isConfirmed) {
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
          this.alert.successTime("密碼已重置為預設密碼0000");
        },
        error: (err) => {
          this.alert.warning(`密碼重置失敗`,err.error?.meesage);
        }
      });
    }
  }
  async deleteAdmin(adminId: number) {
    const adminName = this.adminservice.admins().find(a => a.id === adminId)?.username ?? adminId;
    const res = await this.alert.confirm("確定要刪除該管理員嗎？");
    if (res.isConfirmed) {
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
          this.alert.successTime("管理員已刪除");
          this.loadAdmin();
        },
        error: (err) => {
          this.alert.warning(`刪除失敗`,err.error?.meesage);
        }
      });
    }
  }
  async SuperChange(adminId:number){
    const adminName = this.adminservice.admins().find(a => a.id === adminId)?.username ?? adminId;
    const res = await this.alert.confirm(`要讓此管理員變更為${this.isSuper() ? '一般' : '超級'}管理員嗎？`);
    if (res.isConfirmed) {
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
          this.alert.successTime(`管理員已變為${this.isSuper() ? '一般' : '超級'}管理員`);
          this.loadAdmin();
        },
        error: (err) => {
          this.alert.warning(`變更失敗`,err.error?.meesage);
        }
      });
    }
  }
  changePwd(id : number){

  }
  closeModal(id: string) {
    const modalEl = document.getElementById(id);
    const modal = (window as any).bootstrap.Modal.getInstance(modalEl);

    modal?.hide();
  }
}
