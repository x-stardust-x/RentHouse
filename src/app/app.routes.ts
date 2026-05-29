import { Routes } from '@angular/router';
import { authGuard } from './@guard/auth-guard';
import { loginGuard } from './@guard/login-guard';
import { ContactComponent } from './@component/contact-component/contact';
import { AdminReviewComponent } from './@component/admin-review-component/admin-review-component';

import { PublicLayout } from './@layouts/public-layout/public-layout';
import { AdminLayout } from './@layouts/admin-layout/admin-layout';


export const routes: Routes = [


  {

    // 前端公版
    path: '',
    component: PublicLayout,
    children: [

      // 首頁
      {
        path: 'home',
        // redirectTo: 'home',
        loadComponent: () => import('./@component/home-component/home-component').then(c => c.HomeComponent),
        pathMatch: 'full'
      },

      // 登入
      {
        path: 'login',
        loadComponent: () => import('./@component/login-component/login-component').then(c => c.LoginComponent),
        // canActivate : [loginGuard]
      },

      // 註冊
      {
        path: 'register',
        loadComponent: () => import('./@component/register-component/register-component').then(c => c.RegisterComponent),
        canActivate: [loginGuard]
      },

      // 關於我們
      {
        path: 'about-homiefun',
        loadComponent: () => import('./@component/about-homiefun-component/about-homiefun-component').then(c => c.AboutHomiefunComponent),
      },

      // 會員中心
      {
        path: 'member',
        // loadComponent: () => import('./@component/member-component/member-component').then(c => c.MemberComponent),
        // canActivate : [authGuard],
        data: { roles: ['young', 'old'] },
        children: [{
          path: 'dashboard',
          loadComponent: () => import('./@component/@member/member-dashborad-component/member-dashborad-component').then(c => c.MemberDashboradComponent),
        }, {
          path: 'info',
          loadComponent: () => import('./@component/@member/member-info-component/member-info-component').then(c => c.MemberInfoComponent),
        }, {
          path: 'edit',
          loadComponent: () => import('./@component/@member/member-edit-component/member-edit-component').then(c => c.MemberEditComponent),
        }],
      },

      // 租賃物媒合 列表頁
      {
        path: 'rental-matching-component',
        loadComponent: () => import('./@component/rental-matching-component/rental-matching-component').then(c => c.RentalMatchingComponent),
      },

      // 租賃物媒合 詳情頁
      {
        path: 'rental-matching-detail/:type/:id',
        loadComponent: () => import('./@component/rental-matching-detail-component/rental-matching-detail-component').then(c => c.RentalMatchingDetailComponent),
      },

      // 出租人個人公開主頁
      {
        path: 'lessor-profile/:id',
        loadComponent: () => import('./@component/lessor-profile-component/lessor-profile-component').then(c => c.LessorProfileComponent),
      },

      // 租屋管理
      {
        path: 'rent',
        loadComponent: () => import('./@component/rent-house-component/rent-house-component').then(c => c.RentHouseComponent)
      },

      // 個人專區
      {
        path: 'user-center',
        loadComponent: () => import('./@layouts/user-center-layout/user-center-layout').then(c => c.UserCenterLayout),
        // canActivate : [authGuard],
        data: { roles: ['young', 'old'] },
        children: [
          // { path: '', redirectTo: 'rent', pathMatch: 'full' },
          // 發布新房源
          {
            path: 'rent',
            loadComponent: () => import('./@component/rent-house-component/rent-house-component').then(c => c.RentHouseComponent),
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
          }
        ],
      },

      // 聯絡我們
      {
        path: 'contact', component: ContactComponent
      },

    ]
  },




  // 後端管理公版
  {
    path: 'admin',
    component: AdminLayout,
    // canActivate : [authGuard],
    data: { roles: ['admin'] },
    children: [

      // 管理員
      {
        path: 'dashboard',
        loadComponent: () => import('./@component/admin-component/admin-component').then(c => c.AdminComponent),
      },
      {
        path: 'news',
        loadComponent: () => import('./@component/@admin/news-component/news-component').then(c => c.NewsComponent),
      },
      {
        path: 'news/create',
        loadComponent: () => import('./@component/@admin/news-form-component/news-form-component').then(c => c.NewsFormComponent),
      }, {
        path: 'news/edit/:id',
        loadComponent: () => import('./@component/@admin/news-form-component/news-form-component').then(c => c.NewsFormComponent),
      }, {
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

      // 租賃物管理
      {
        path: 'admin-review',
        component: AdminReviewComponent,
      },

    ]
  },
  {
    path: '**',
    // loadComponent :() => import('./@component/login-component/login-component').then(c => c.LoginComponent),
    redirectTo: 'home'
  },
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



