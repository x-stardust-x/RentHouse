import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Authservice } from '../../../@service/authservice';
import { UserService } from '../../../@service/user-service';
import { A11yModule } from "@angular/cdk/a11y";

@Component({
  selector: 'app-account-setting',
  imports: [FormsModule, MatIconModule, MatSlideToggleModule, A11yModule],
  templateUrl: './account-setting.html',
  styleUrl: './account-setting.scss',
})
export class AccountSetting {
  private readonly usersev = inject(UserService);
  private readonly authsev = inject(Authservice);
  userId = Number(this.authsev.getUserId());
  data: any = signal("");
  tempEmail = '';
  tempPhone = '';
  newPwd = '';
  newPwd2 = '';

  constructor() {
    this.usersev.getAccountSettings(this.userId).subscribe(res => {
      this.data.set(res);
      console.log(res);
    })
  }

  openEmailModal() {
    this.tempEmail = this.data().email;
  }

  openPhoneModal() {
    this.tempPhone = this.data().phone;
  }

  saveEmail() {
    this.authsev.changeEmail(this.tempEmail).subscribe(() => {
      alert('信箱更新成功');

      this.data.update((u: any) => ({
        ...u,
        email: this.tempEmail
      }));

      this.closeModal('emailModal');
    });
  }

  savePhone() {
    this.usersev.changePhone(this.tempPhone).subscribe(() => {
      alert('手機更新成功');

      this.data.update((u: any) => ({
        ...u,
        phone: this.tempPhone
      }));

      this.closeModal('phoneModal');
    });
  }

  savePwd() {
    this.authsev.changePwd(this.tempPhone).subscribe(() => {
      alert('手機更新成功');

      this.data.update((u: any) => ({
        ...u,
        phone: this.tempPhone
      }));

      this.closeModal('phoneModal');
    });
  }

  confirmDelete() {
    if(confirm("test")){
      this.usersev.deleteUser(this.userId).subscribe(() => {
        alert('帳號已刪除');
        this.closeModal('deleteModal');
      });
    }
  }
  closeModal(id: string) {
    const modalEl = document.getElementById(id);
    const modal = (window as any).bootstrap.Modal.getInstance(modalEl);

    modal?.hide();
  }
}
