import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AdminSidebar } from '../../@component/admin-sidebar/admin-sidebar';
import { AdminTopbar } from '../../@component/admin-topbar/admin-topbar';

@Component({
  selector: 'app-admin-layout',
  imports: [AdminSidebar, AdminTopbar, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {}
