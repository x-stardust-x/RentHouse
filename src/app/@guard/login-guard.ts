import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from '../@service/authservice';

export const loginGuard: CanActivateFn = () => {
  const auth = inject(Authservice);
  const router = inject(Router);

  const token = auth.getToken();

  // 🔥 已登入 → 導走
  if (auth.isLoggedIn()) {
    const role = auth.getRole();
    console.log(role);

    if (role === 'admin') {
      router.navigate(['/admin']);
    } else {
      router.navigate(['/user-center']);
    }

    return false;
  }

  return true;
};
