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

  // openPhoneModal() {
  //   this.tempPhone = this.data().phone;
  // }

  saveEmail() {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.tempEmail)) {
      alert('請輸入正確的 Email 格式');
      return;
    }

    this.usersev.changeEmail(this.userId,this.tempEmail).subscribe(() => {
      alert('信箱更新成功');

      this.data.update((u: any) => ({
        ...u,
        email: this.tempEmail
      }));

      this.closeModal('emailModal');
      this.authsev.logout();
    });
  }

  // savePhone() {
  //   this.usersev.changePhone(this.tempPhone).subscribe(() => {
  //     alert('手機更新成功');

  //     this.data.update((u: any) => ({
  //       ...u,
  //       phone: this.tempPhone
  //     }));

  //     this.closeModal('phoneModal');
  //   });
  // }

  savePwd() {

    const pwdRegex = /^(?=.*[A-Za-z]).{4,}$/;

    if(this.newPwd != null && (this.newPwd != this.newPwd2) ){
      alert("wrong");
      return;
    }
    if(!pwdRegex.test(this.newPwd)){
      alert("至少4碼且包含英文字母");
      return;
    }
    this.usersev.changePwd(this.userId,this.newPwd).subscribe(() => {
      alert('密碼更新成功');
      this.newPwd = '';
      this.newPwd2 = '';
      this.closeModal('phoneModal');
      this.authsev.logout();
    });
  }

  confirmDelete() {
    this.usersev.deleteUser(this.userId).subscribe(() => {
      alert('帳號已刪除');
      this.closeModal('deleteModal');
      this.authsev.logout();
    });
  }
  closeModal(id: string) {
    const modalEl = document.getElementById(id);
    const modal = (window as any).bootstrap.Modal.getInstance(modalEl);

    modal?.hide();
  }
}
