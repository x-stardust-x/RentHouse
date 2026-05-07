import { LoginResponse } from './../../@interface/login-response';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Authservice } from '../../@service/authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authsev = inject(Authservice);
  private readonly router = inject(Router);
  Message = signal("");
  is_admin = false;
  loginForm = this.fb.nonNullable.group({
    email: ['',[Validators.required]],
    pwd: ['',[Validators.required]],
  });

  onSumbit() {
    // this.Message.set("");
    console.log(this.loginForm.value);
    const formValue = this.loginForm.getRawValue();
    this.authsev.login(formValue,this.is_admin).subscribe({
      next: (res : LoginResponse) =>{
        console.log(res);

        localStorage.setItem('token',res.token);

        this.Message.set("登入成功");
        if(this.is_admin){
          this.router.navigate(['/admin']);
        }
        else{
          this.router.navigate(['/member']);
        }
      },
      error: (err) =>{
        this.Message.set(err.error?.message ?? '登入失敗');
        console.log(err);
      }
    })
  }
  clear() {
    this.loginForm.reset({
      email: '',
      pwd: ''
    });
      this.Message.set("");
  }
  changeAdmin(){
    this.clear();
    this.is_admin = true;
  }
  changeMember(){
    this.clear();
    this.is_admin = false;
  }

  // test(){
  //   this.authsev.test().subscribe(res =>{
  //     console.log(res);
  //   });
  // }
}
