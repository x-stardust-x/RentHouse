import { LoginResponse } from './../../@interface/login-response';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Authservice } from '../../@service/authservice';
import { Router, RouterLink } from '@angular/router';

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
  Message = signal("");
  role: 'member' | 'admin' = 'member';
  loginForm = this.fb.nonNullable.group({
    email: ['',[Validators.required]],
    pwd: ['',[Validators.required]],
  });

  onSumbit() {
    // this.Message.set("");
    console.log(this.loginForm.value);
    const formValue = this.loginForm.getRawValue();
    this.authsev.login(formValue,this.isAdmin).subscribe({
      next: (res : LoginResponse) =>{
        console.log(res);

        localStorage.setItem('token',res.token);
        if(!this.isAdmin){
          const currentTier = res.subscriptionTier ? res.subscriptionTier.toString() : '1';
          localStorage.setItem('subscriptionTier', currentTier);
        }
        this.Message.set("登入成功");
        if(this.isAdmin){
          this.router.navigate(['/admin']);
        }
        else{
          this.router.navigate(['/user-center/dashboard']);
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
