import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserService } from '../../../@service/user-service';
import { Authservice } from '../../../@service/authservice';

@Component({
  selector: 'app-contact-permissin',
  imports: [FormsModule, MatIconModule, MatSlideToggleModule],
  templateUrl: './contact-permissin.html',
  styleUrl: './contact-permissin.scss',
})
export class ContactPermissin {
  private readonly usersev = inject(UserService)
  private readonly authsev = inject(Authservice);
  userId = this.authsev.getUserId();
  data: any = signal("");

  phoneEnabled = true;

  emailEnabled = true;

  lineEnabled = false;

  constructor() {
    this.usersev.getAccountSettings(this.userId).subscribe(res => {
      this.data.set(res);
    })
  }
}
