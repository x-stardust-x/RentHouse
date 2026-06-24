import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user-center-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './user-center-sidebar.html',
  styleUrl: './user-center-sidebar.scss',
})
export class UserCenterSidebar {

  private router = inject(Router);

  currentRole = signal<'lessor' | 'lessee'>('lessor');

  switchRole(role: 'lessor' | 'lessee'): void {
    this.currentRole.set(role);

    const dashboardUrl =
      role === 'lessor'
        ? '/user-center/lessor_dashboard'
        : '/user-center/lessee_dashboard';

    this.router.navigateByUrl(dashboardUrl);
  }

}
