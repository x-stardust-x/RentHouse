import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Authservice } from '../../../@service/authservice';
import { UserService } from '../../../@service/user-service';
import { A11yModule } from "@angular/cdk/a11y";
import { AlertService } from '../../../@service/alert-service';

@Component({
  selector: 'app-account-setting',
  imports: [FormsModule, MatIconModule, MatSlideToggleModule, A11yModule],
  templateUrl: './account-setting.html',
  styleUrl: './account-setting.scss',
})
export class AccountSetting {
  private readonly usersev = inject(UserService);
  private readonly authsev = inject(Authservice);
  private readonly alert = inject(AlertService);

  userId = Number(this.authsev.getUserId());
  data: any = signal("");
  tempEmail = '';
  newPwd = '';
  newPwd2 = '';
  changedat = signal("");

  constructor() {
    this.usersev.getAccountSettings(this.userId).subscribe(res => {
      this.data.set(res);
      console.log(res);
      this.changedat.set(this.getRelativeTime(this.data().pwdchangedat));
    })
  }

  openEmailModal() {
    this.tempEmail = this.data().email;
  }


  saveEmail() {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.tempEmail)) {
      this.alert.warning('Email 格式錯誤');
      return;
    }

    this.usersev.changeEmail(this.userId, this.tempEmail)
      .subscribe({

        next: async () => {

          this.data.update((u: any) => ({
            ...u,
            email: this.tempEmail
          }));

          this.closeModalAndThen('emailModal', async () => {

            await this.alert.toastSuccess('信箱更新成功');

            this.authsev.logoutNoMessage();

          });

        },

        error: (err) => {

          this.alert.error(
            '更新失敗',
            err.error?.message ?? '請稍後再試'
          );

        }

      });

  }

  savePwd() {

    const pwdRegex = /^(?=.*[A-Za-z]).{4,}$/;

    if (this.newPwd !== this.newPwd2) {
      this.alert.warning('密碼不一致');
      return;
    }

    if (!pwdRegex.test(this.newPwd)) {
      this.alert.warning('密碼至少 4 碼且包含英文字母');
      return;
    }

    this.usersev.changePwd(this.userId, this.newPwd)
      .subscribe({

        next: async () => {

          this.newPwd = '';
          this.newPwd2 = '';

          this.closeModalAndThen('PwdModal', async () => {

            await this.alert.toastSuccess('密碼更新成功');

            this.authsev.logoutNoMessage();

          });

        },

        error: (err) => {

          this.alert.error(
            '更新失敗',
            err.error?.message ?? '請稍後再試'
          );

        }

      });

  }

  async confirmDelete() {

    const result = await this.alert.confirm(
      '確定要刪除帳號嗎？',
      '此動作無法復原，所有資料將永久刪除',
      '刪除帳號',
      '取消'
    );

    if (!result.isConfirmed) return;

    this.usersev.deleteUser(this.userId)
      .subscribe({

        next: async () => {

          await this.alert.toastSuccess('帳號已刪除');

          this.authsev.logoutNoMessage();

        },

        error: (err) => {

          this.alert.error(
            '刪除失敗',
            err.error?.message ?? '請稍後再試'
          );

        }

      });

  }
  closeModalAndThen(modalId: string, callback: () => void) {

    const modalEl = document.getElementById(modalId);
    const modal = (window as any).bootstrap.Modal.getInstance(modalEl);

    if (!modal) {
      callback();
      return;
    }

    modalEl?.addEventListener('hidden.bs.modal', () => {
      callback();
    }, { once: true });

    modal.hide();
  }
  getRelativeTime(date: string): string {
    console.log(date);

    const now = new Date().getTime();
    const target = new Date(date).getTime();

    const diff = Math.floor((now - target) / 1000);

    if (diff < 60) return `${diff}秒前`;
    if (diff < 3600) return `${Math.floor(diff / 60)}分鐘前`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}小時前`;

    return `${Math.floor(diff / 86400)}天前`;
  }
}
