import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { LoginResponse } from './../../@interface/login-response';
import { Authservice } from '../../@service/authservice';
import { AlertService } from '../../@service/alert-service';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authsev = inject(Authservice);
  private readonly router = inject(Router);
  private readonly alert = inject(AlertService);
  isSubmitting = signal(false);

  role: 'member' | 'admin' = 'member';

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required]],
    pwd: ['', [Validators.required]],
  });

  onSumbit() {
    if (this.loginForm.invalid) {
      this.alert.warning(
        '請填寫完整資料',
        '電子郵件與密碼皆為必填'
      );
      return;
    }

    this.isSubmitting.set(true);

    const formValue = this.loginForm.getRawValue();

    this.authsev.login(formValue, this.isAdmin).subscribe({
      next: async (res: LoginResponse) => {
        localStorage.setItem('token', res.token);

        if (!this.isAdmin) {
          localStorage.setItem(
            'subscriptionTier',
            res.subscriptionTier.toString()
          );
        }

        await this.alert.successTime('登入成功');

        if (this.isAdmin) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user-center']);
        }
      },

      error: (err) => {
        this.alert.error(
          '登入失敗',
          err.error?.message ?? '帳號或密碼錯誤'
        );
        this.isSubmitting.set(false);
      },
    });
  }

  clear() {
    this.alert.toastInfo("已清除資料")
    this.loginForm.reset({
      email: '',
      pwd: '',
    });
  }

  setRole(role: 'member' | 'admin') {
    this.role = role;
  }

  get isAdmin() {
    return this.role === 'admin';
  }
  // test(){
  //   this.authsev.test().subscribe(res =>{
  //     console.log(res);
  //   });
  // }
}
