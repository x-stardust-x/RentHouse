import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Authservice } from '../../@service/authservice';

@Component({
  selector: 'app-register-component',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.scss',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authsev = inject(Authservice);
  message = signal("");
  registerForm = this.fb.nonNullable.group({
    username: '',
    password: '',
    identity: 'young', // 預設
    nickname: '',
    email: '',
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
        password: formValue.password,
        identity: formValue.identity
      },
      user: {
        nickname: formValue.nickname,
        email: formValue.email,
        address: formValue.address
      }
    };

    console.log(payload);
    this.authsev.register(payload).subscribe({
      next: (res: any) => {
        this.message.set("註冊成功");
        console.log(res);

        // 🔥 可選：跳轉登入頁
        // this.router.navigate(['/login']);
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
