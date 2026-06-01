import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Authservice } from '../../@service/authservice';
import { Admin } from '../../@interface/admin';
import { AdminService } from '../../@service/admin-service';

@Component({
  selector: 'app-admin-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.scss',
})
export class AdminSidebar {
  authsev = inject(Authservice);
  adminsev = inject(AdminService);
  AdminId = this.authsev.getAdminId() ?? 0;
  adminData = signal<Admin | null>(null);
  constructor() {
    this.adminsev.getAdminById(this.AdminId).subscribe((admin) => {
      this.adminData.set(admin);
    });
  }
}
