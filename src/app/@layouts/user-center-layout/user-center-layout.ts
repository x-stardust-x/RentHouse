import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { UserCenterSidebar } from '../../@component/user-center-sidebar/user-center-sidebar';
import { UserCenterTopbar } from '../../@component/user-center-topbar/user-center-topbar';

@Component({
  selector: 'app-user-center-layout',
  imports: [UserCenterSidebar, UserCenterTopbar, RouterOutlet],
  templateUrl: './user-center-layout.html',
  styleUrl: './user-center-layout.scss',
})
export class UserCenterLayout {}
