import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Authservice } from '../../@service/authservice';
import { Router, RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-register-component',
  imports: [ReactiveFormsModule, FormsModule, RouterLink, MatDatepickerModule,NativeDateModule,MatInputModule,MatFormFieldModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.scss',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authsev = inject(Authservice);
  private readonly router = inject(Router);
  maxDate = new Date();
  message = signal("");
  registerForm = this.fb.nonNullable.group({
    username: ["",[Validators.required]],
    pwd: ['',
      [Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z]).{4,}$/)
      ]],
    pwdcheck:['',Validators.required],
    email: ['',
      [Validators.required,
        Validators.email
      ]],
    birthday:[this.maxDate,Validators.required],
    age:[0,Validators.required],
    identity: [0,[Validators.required]], // 預設
    address: ''
  });
  identityOptions = [
    { label: '年輕', value: 0 },
    { label: '老人', value: 1 }
  ];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
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

    this.registerForm.patchValue({
      age: age
      });
    });
  }

  onSubmit() {
    this.message.set("");
    const formValue = this.registerForm.getRawValue();
    if(formValue.pwd != formValue.pwdcheck){
      this.message.set("密碼不同");
      return;
    }
    const payload = {
      account: {
        username: formValue.username,
        pwd: formValue.pwd,
        email : formValue.email,
        birthday : formValue.birthday,
        age : formValue.age,
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
