import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from '../@service/authservice';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(Authservice);
  const router = inject(Router);

  // 1️⃣ 先檢查登入
  if (!auth.isLoggedIn()) {
    console.log("未登入");
    router.navigate(['/login']);
    return false;
  }

  // 2️⃣ 取得角色
  const role = auth.getRole();

  // 3️⃣ 取得路由允許的角色（可能沒設定）
  const allowedRoles = route.data?.['roles'] as string[] | undefined;

  // ⭐ 如果沒有設定 roles → 代表「只要登入就能進」
  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  // 4️⃣ 檢查角色權限
  if (role && allowedRoles.includes(role)) {
    return true;
  }

  // 5️⃣ 沒權限
  console.log("權限不足", { role, allowedRoles });

  // 👉 建議不要導回 login，應該導去「無權限頁」
  // router.navigate(['/forbidden']); // 你可以自己做一頁
  return false;

};
