import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Authservice } from '../../@service/authservice';
import { Router, RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AlertService } from '../../@service/alert-service';

@Component({
  selector: 'app-register-component',
  imports: [ReactiveFormsModule, FormsModule, RouterLink, MatDatepickerModule, NativeDateModule, MatInputModule, MatFormFieldModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.scss',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authsev = inject(Authservice);
  private readonly router = inject(Router);
  private alert = inject(AlertService);
  isSubmitting = signal(false);
  maxDate = new Date();
  message = signal("");
  iden = signal('');
  registerForm = this.fb.nonNullable.group({
    username: ["", [Validators.required]],
    pwd: ['',
      [Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z]).{4,}$/)
      ]],
    pwdcheck: ['', Validators.required],
    email: ['',
      [Validators.required,
      Validators.email
      ]],
    birthday: [this.maxDate, Validators.required],
    age: [0, Validators.required],
    address: ''
  });

  ngOnInit(): void {

    this.registerForm.get('birthday')?.valueChanges.subscribe(value => {

      if (!value) return;

      const birthday = new Date(value);
      const today = new Date();

      let age = today.getFullYear() - birthday.getFullYear();

      const monthDiff = today.getMonth() - birthday.getMonth();
      const dayDiff = today.getDate() - birthday.getDate();

      // 還沒過生日
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }
      this.iden.set(age < 65 ? '青年' : '長者');
      this.registerForm.patchValue({
        age: age
      });
    });
  }

  onSubmit() {

    if (this.isSubmitting()) return;

    this.message.set("");

    const formValue = this.registerForm.getRawValue();

    if (formValue.pwd !== formValue.pwdcheck) {
      this.alert.warning('密碼錯誤', '兩次輸入的密碼不一致');
      return;
    }

    if (this.registerForm.invalid) {
      this.alert.warning('資料未填寫完整');
      return;
    }

    this.isSubmitting.set(true);

    const payload = {
      account: {
        username: formValue.username,
        pwd: formValue.pwd,
        email: formValue.email,
        birthday: formValue.birthday,
        age: formValue.age,
      },
      user: {
        address: formValue.address
      }
    };

    this.authsev.register(payload).subscribe({

      next: async (res: any) => {


        await this.alert.success('註冊成功');

        this.router.navigate(['/login']);

      },

      error: (err) => {

        this.isSubmitting.set(false);

        this.alert.error(
          '註冊失敗',
          err.error?.message ?? '請稍後再試'
        );

      }

    });

  }

  clear() {
    this.registerForm.reset();
    this.alert.toastInfo('已清空表單');

  }
}
