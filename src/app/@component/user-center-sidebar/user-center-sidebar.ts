import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user-center-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './user-center-sidebar.html',
  styleUrl: './user-center-sidebar.scss',
})
export class UserCenterSidebar {
  // 🟢 用來記錄目前的身分：'lessor' (出租人) 或 'lessee' (承租人)
  currentRole = signal<'lessor' | 'lessee'>('lessor');

  // 切換身分的方法
  switchRole(role: 'lessor' | 'lessee') {
    this.currentRole.set(role);
  }
}
