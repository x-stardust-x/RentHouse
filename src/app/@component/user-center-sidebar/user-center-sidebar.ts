import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../@service/user-service';

@Component({
  selector: 'app-user-center-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './user-center-sidebar.html',
  styleUrl: './user-center-sidebar.scss',
})
export class UserCenterSidebar {

  public roleService = inject(UserService);

}
