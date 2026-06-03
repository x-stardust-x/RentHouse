import { Routes } from '@angular/router';
import { authGuard } from './@guard/auth-guard';
import { loginGuard } from './@guard/login-guard';
import { ContactComponent } from './@component/contact-component/contact';
import { AdminReviewComponent } from './@component/admin-review-component/admin-review-component';
import { PublicLayout } from './@layouts/public-layout/public-layout';
import { AdminLayout } from './@layouts/admin-layout/admin-layout';

export const routes: Routes = [
  {
    // ==========================================
    // 🌐 前端公版 (Public Layout)
    // ==========================================
    path: '',
    component: PublicLayout,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./@component/home-component/home-component').then(c => c.HomeComponent),
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () => import('./@component/login-component/login-component').then(c => c.LoginComponent),
        canActivate: [loginGuard]
      },
      {
        path: 'register',
        loadComponent: () => import('./@component/register-component/register-component').then(c => c.RegisterComponent),
        canActivate: [loginGuard]
      },
      {
        path: 'about-homiefun',
        loadComponent: () => import('./@component/about-homiefun-component/about-homiefun-component').then(c => c.AboutHomiefunComponent),
      },
      {
        path: 'contact',
        component: ContactComponent
      },

      // --- 租賃媒合相關 ---
      {
        path: 'rental-matching-component',
        loadComponent: () => import('./@component/rental-matching-component/rental-matching-component').then(c => c.RentalMatchingComponent),
      },
      {
        path: 'rental-matching-detail/:type/:id',
        loadComponent: () => import('./@component/rental-matching-detail-component/rental-matching-detail-component').then(c => c.RentalMatchingDetailComponent),
      },
      {
        path: 'lessor-profile/:id',
        loadComponent: () => import('./@component/lessor-profile-component/lessor-profile-component').then(c => c.LessorProfileComponent),
      },
      {
        path: 'rent',
        loadComponent: () => import('./@component/rent-house-component/rent-house-component').then(c => c.RentHouseComponent)
      },

      // --- 會員中心 ---
      // {
      //   path: 'member',
      //   data: { roles: ['young', 'old'] },
      //   children: [
      //     {
      //       path: 'dashboard',
      //       loadComponent: () => import('./@component/@member/member-dashborad-component/member-dashborad-component').then(c => c.MemberDashboradComponent),
      //     },
      //     {
      //       path: 'info',
      //       loadComponent: () => import('./@component/@member/member-info-component/member-info-component').then(c => c.MemberInfoComponent),
      //     },
      //     {
      //       path: 'edit',
      //       loadComponent: () => import('./@component/@member/member-edit-component/member-edit-component').then(c => c.MemberEditComponent),
      //     }
      //   ],
      // },

      // ==========================================
      // 🏠 個人專區 (User Center Layout)
      // ==========================================
      {
        path: 'user-center',
        loadComponent: () => import('./@layouts/user-center-layout/user-center-layout').then(c => c.UserCenterLayout),
        canActivate : [authGuard],
        data: { roles: ['young', 'old'] },
        children: [
          // { path: '', redirectTo: 'rent', pathMatch: 'full' },
          // 發布新房源
          {
            path: 'dashboard',
            loadComponent: () => import('./@component/@member/member-dashborad-component/member-dashborad-component').then(c => c.MemberDashboradComponent),
          },
          // { path: '', redirectTo: 'rent', pathMatch: 'full' },

          { path: '', redirectTo: 'rent', pathMatch: 'full' },
          {
            path: 'rent',
            loadComponent: () => import('./@component/rent-house-component/house-form/house-form.component').then(c => c.HouseFormComponent),
          },
          // 看房預約審核
          {
            path: 'house-viewing-approval',
            loadComponent: () => import('./@component/house-viewing-approval-component/house-viewing-approval-component').then(c => c.HouseViewingApprovalComponent),
          },
          // 工具借用 / 技能預約審核
          {
            path: 'product-booking-approval-component',
            loadComponent: () => import('./@component/product-booking-approval-component/product-booking-approval-component').then(c => c.ProductBookingApprovalComponent),
          },
            {
            path: 'edit',
            loadComponent: () => import('./@component/@member/member-edit-component/member-edit-component').then(c => c.MemberEditComponent),
          },
          {
            path: 'product',
            loadComponent: () => import('./@component/rent-house-component/product-form/product-form.component').then(c => c.ProductFormComponent),
          },
          {
            path: 'houses',
            loadComponent: () => import('./@component/house-management/house-management').then(c => c.HouseManagementComponent),
          },
          {
            path: 'products-list',
            loadComponent: () => import('./@component/product-management/product-management').then(c => c.ProductManagementComponent),
          },
          {
            path: 'contact-permission',
            loadComponent: () => import('./@component/@member/contact-permissin/contact-permissin').then(c => c.ContactPermissin),
          },
          {
            path: 'account-setting',
            loadComponent: () => import('./@component/@member/account-setting/account-setting').then(c => c.AccountSetting),
          }
        ],
      },
    ]
  },

  {
    // ==========================================
    // ⚙️ 後端管理公版 (Admin Layout)
    // ==========================================
    path: 'admin',
    component: AdminLayout,
    canActivate : [authGuard],
    data: { roles: ['admin'] },
    children: [
      { path: '', redirectTo: 'admin-review', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./@component/admin-component/admin-component').then(c => c.AdminComponent),
        data: { roles: ['admin'] },
      },
      {
        path: 'news',
        loadComponent: () => import('./@component/@admin/news-component/news-component').then(c => c.NewsComponent),
      },
      {
        path: 'news/create',
        loadComponent: () => import('./@component/@admin/news-form-component/news-form-component').then(c => c.NewsFormComponent),
      },
      {
        path: 'news/edit/:id',
        loadComponent: () => import('./@component/@admin/news-form-component/news-form-component').then(c => c.NewsFormComponent),
      },
      {
        path: 'logs',
        loadComponent: () => import('./@component/@admin/logs-component/logs-component').then(c => c.LogsComponent),
      },
      {
        path: 'faqs',
        loadComponent: () => import('./@component/@admin/faqs-component/faqs-component').then(c => c.FAQsComponent),
      },
      {
        path: 'users',
        loadComponent: () => import('./@component/@admin/users-component/users-component').then(c => c.UsersComponent),
      },
      {
        path: 'admins',
        loadComponent: () => import('./@component/@admin/admins-component/admins-component').then(c => c.AdminsComponent),
      },
      {
        path: 'admin-review',
        component: AdminReviewComponent,
      },
      {
        path: 'contact-messages',
        loadComponent: () => import('./@component/admin-contact/admin-contact').then(c => c.AdminContactComponent)
      }
    ]
  },

  {
    // 🪤 捕捉所有未知的網址，導回首頁
    path: '**',
    redirectTo: 'home'
  }
];





  // {
  //   path: 'home',
  //   // redirectTo: 'home',
  //   loadComponent: () => import('./@component/home-component/home-component').then(c => c.HomeComponent),
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'login',
  //   loadComponent: () => import('./@component/login-component/login-component').then(c => c.LoginComponent),
  //   // canActivate : [loginGuard]
  // },
  // {
  //   path: 'member',
  //   // loadComponent: () => import('./@component/member-component/member-component').then(c => c.MemberComponent),
  //   // canActivate : [authGuard],
  //   data: { roles: ['young', 'old'] },
  //   children: [{
  //     path: 'dashboard',
  //     loadComponent: () => import('./@component/@member/member-dashborad-component/member-dashborad-component').then(c => c.MemberDashboradComponent),
  //   }, {
  //     path: 'info',
  //     loadComponent: () => import('./@component/@member/member-info-component/member-info-component').then(c => c.MemberInfoComponent),
  //   }, {
  //     path: 'edit',
  //     loadComponent: () => import('./@component/@member/member-edit-component/member-edit-component').then(c => c.MemberEditComponent),
  //   }],
  // },
  // {
  //   path: 'admin',
  //   loadComponent: () => import('./@component/admin-component/admin-component').then(c => c.AdminComponent),
  //   // canActivate : [authGuard],
  //   data: { roles: ['admin'] },
  //   children: [{
  //     path: 'news',
  //     loadComponent: () => import('./@component/@admin/news-component/news-component').then(c => c.NewsComponent),
  //   },
  //   {
  //     path: 'news/create',
  //     loadComponent: () => import('./@component/@admin/news-form-component/news-form-component').then(c => c.NewsFormComponent),
  //   }, {
  //     path: 'news/edit/:id',
  //     loadComponent: () => import('./@component/@admin/news-form-component/news-form-component').then(c => c.NewsFormComponent),
  //   }, {
  //     path: 'logs',
  //     loadComponent: () => import('./@component/@admin/logs-component/logs-component').then(c => c.LogsComponent),
  //   }],
  // },
  // {
  //   path: 'register',
  //   loadComponent: () => import('./@component/register-component/register-component').then(c => c.RegisterComponent),
  //   canActivate: [loginGuard]
  // },
  // {
  //   path: 'rental-matching-component',
  //   loadComponent: () => import('./@component/rental-matching-component/rental-matching-component').then(c => c.RentalMatchingComponent),
  // },
  // {
  //   path: 'rental-matching-detail/:type/:id',
  //   loadComponent: () => import('./@component/rental-matching-detail-component/rental-matching-detail-component').then(c => c.RentalMatchingDetailComponent),
  // },
  // {
  //   path: 'admin-review',
  //   component: AdminReviewComponent,
  // },
  // {
  //   path: 'rent',
  //   loadComponent: () => import('./@component/rent-house-component/rent-house-component').then(c => c.RentHouseComponent)
  // },
  // {
  //   path: 'contact', component: ContactComponent
  // },










// {
//   path: 'home',
//   // redirectTo: 'home',
//   loadComponent: () => import('./@component/home-component/home-component').then(c => c.HomeComponent),
//   pathMatch: 'full'
// },
// {
//   path: 'login',
//   loadComponent: () => import('./@component/login-component/login-component').then(c => c.LoginComponent),
//   // canActivate : [loginGuard]
// },
// {
//   path: 'member',
//   // loadComponent: () => import('./@component/member-component/member-component').then(c => c.MemberComponent),
//   // canActivate : [authGuard],
//   data: { roles: ['young', 'old'] },
//   children: [{
//     path: 'dashboard',
//     loadComponent: () => import('./@component/@member/member-dashborad-component/member-dashborad-component').then(c => c.MemberDashboradComponent),
//   }, {
//     path: 'info',
//     loadComponent: () => import('./@component/@member/member-info-component/member-info-component').then(c => c.MemberInfoComponent),
//   }, {
//     path: 'edit',
//     loadComponent: () => import('./@component/@member/member-edit-component/member-edit-component').then(c => c.MemberEditComponent),
//   }],
// },
// {
//   path: 'admin',
//   loadComponent: () => import('./@component/admin-component/admin-component').then(c => c.AdminComponent),
//   // canActivate : [authGuard],
//   data: { roles: ['admin'] },
//   children: [{
//     path: 'news',
//     loadComponent: () => import('./@component/@admin/news-component/news-component').then(c => c.NewsComponent),
//   },
//   {
//     path: 'news/create',
//     loadComponent: () => import('./@component/@admin/news-form-component/news-form-component').then(c => c.NewsFormComponent),
//   }, {
//     path: 'news/edit/:id',
//     loadComponent: () => import('./@component/@admin/news-form-component/news-form-component').then(c => c.NewsFormComponent),
//   }, {
//     path: 'logs',
//     loadComponent: () => import('./@component/@admin/logs-component/logs-component').then(c => c.LogsComponent),
//   }],
// },
// {
//   path: 'register',
//   loadComponent: () => import('./@component/register-component/register-component').then(c => c.RegisterComponent),
//   canActivate: [loginGuard]
// },
// {
//   path: 'rental-matching-component',
//   loadComponent: () => import('./@component/rental-matching-component/rental-matching-component').then(c => c.RentalMatchingComponent),
// },
// {
//   path: 'rental-matching-detail/:type/:id',
//   loadComponent: () => import('./@component/rental-matching-detail-component/rental-matching-detail-component').then(c => c.RentalMatchingDetailComponent),
// },
// {
//   path: 'admin-review',
//   component: AdminReviewComponent,
// },
// {
//   path: 'rent',
//   loadComponent: () => import('./@component/rent-house-component/rent-house-component').then(c => c.RentHouseComponent)
// },
// {
//   path: 'contact', component: ContactComponent
// },



