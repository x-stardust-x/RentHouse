import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Authservice } from '../../../@service/authservice';
import { UserService } from '../../../@service/user-service';

@Component({
  selector: 'app-account-setting',
  imports: [FormsModule, MatIconModule, MatSlideToggleModule],
  templateUrl: './account-setting.html',
  styleUrl: './account-setting.scss',
})
export class AccountSetting {
  private readonly usersev = inject(UserService)
  private readonly authsev = inject(Authservice);
  userId = this.authsev.getUserId();
  data: any = signal("");

  constructor() {
    this.usersev.getAccountSettings(this.userId).subscribe(res => {
      this.data.set(res);
      console.log(res);
    })
  }
}
