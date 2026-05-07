import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Authservice } from '../../@service/authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-component',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.scss',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authsev = inject(Authservice);
  private readonly router = inject(Router);
  message = signal("");
  registerForm = this.fb.nonNullable.group({
    email: ['',
      [Validators.required,
        Validators.email
      ]],
    pwd: ['',
      [Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z]).{4,}$/)
      ]],
    username: ["",[Validators.required]],
    identity: [0,[Validators.required]], // 預設
    address: ''
  });
  identityOptions = [
    { label: '年輕', value: 0 },
    { label: '老人', value: 1 }
  ];

  onSubmit() {
    this.message.set("");
    const formValue = this.registerForm.getRawValue();
    const payload = {
      account: {
        username: formValue.username,
        pwd: formValue.pwd,
        email : formValue.email,
        identity: formValue.identity
      },
      user: {
        address: formValue.address
      }
    };

    console.log(payload);
    this.authsev.register(payload).subscribe({
      next: (res: any) => {
        this.message.set("註冊成功");
        console.log(res);

         setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);

      },
      error: (err) => {
        this.message.set(err.error?.message ??
          '註冊失敗')
      }
    });
  }

  clear() {
    this.registerForm.reset();
  }
}
