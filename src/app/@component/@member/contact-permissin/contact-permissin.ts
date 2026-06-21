import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserService } from '../../../@service/user-service';
import { Authservice } from '../../../@service/authservice';
import { NotificationSetting } from '../../../@interface/notification-setting';
import { AlertService } from '../../../@service/alert-service';

@Component({
  selector: 'app-contact-permissin',
  imports: [FormsModule, MatIconModule, MatSlideToggleModule],
  templateUrl: './contact-permissin.html',
  styleUrl: './contact-permissin.scss',
})
export class ContactPermissin {
  private readonly usersev = inject(UserService)
  private readonly authsev = inject(Authservice);
  private readonly alert = inject(AlertService);
  userId = this.authsev.getUserId();
  accountId = this.authsev.getAccountId();
  data: any = signal("");

  setting = signal<NotificationSetting>({
    phone:false,
    email:true,
    line:false
  })


  constructor() {
    this.usersev.getAccountSettings(this.userId).subscribe(res => {
      this.data.set(res);
    })
    this.loadData();
  }

  loadData(){
    this.usersev.GetNotificationSetting(this.accountId).subscribe((res)=>{
      this.setting.set(res);
    })
  }

  saveSetting() {
    this.usersev.SaveNotificationSetting(this.accountId, this.setting()).subscribe({
      next: (res) => {
        this.alert.successTime("更新成功");
        this.loadData();
      },
      error: (err) => {
        this.alert.warning(err.error?.message ?? "更新失敗");
      }
    });
  }
  undoSetting(){
    this.alert.toastInfo("變回原本設定","#ffc400");
    this.loadData();
  }
}
