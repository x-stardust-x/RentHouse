import { UserService } from './../../../@service/user-service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-member-info-component',
  imports: [],
  templateUrl: './member-info-component.html',
  styleUrl: './member-info-component.scss',
})
export class MemberInfoComponent {
  public readonly usersev = inject(UserService);
  constructor(){
    this.usersev.loadProfile(1);
  }
}
