import { UserProfile } from './../@interface/user-profile';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private router = inject(Router);
  profile = signal<UserProfile | null>(null);
  private readonly baseUrl = 'https://localhost:7215/api/User/';

  // 🟢 用來記錄目前的身分：'lessor' (出租人) 或 'lessee' (承租人)
  currentRole = signal<'lessor' | 'lessee'>('lessor');

  public users = signal<any[]>([]);

  loadAllUsers(){
    this.http.get<any>(this.baseUrl).subscribe((res) => {
      this.users.set(res);
    });
  }

  loadProfile(userId : number | null) {
    this.http.get<UserProfile>(this.baseUrl + `profile/${userId}`).subscribe((res) => {
      this.profile.set(res)
    });
  }

  updateProfile(dto: UserProfile) {
    this.http.put<UserProfile>(this.baseUrl + `profile/update`, dto).subscribe(res => {
      console.log(res);
      alert("更新完成")

      this.router.navigate(['/member/dashboard']);
    });
  }

  updateUserStatus(userId: number) {
    return this.http.put(this.baseUrl + `status/${userId}`, null);
  }

  deleteUser(userId: number) {
    return this.http.put(this.baseUrl + `delete/${userId}`,null);
  }

  getLessorProfile(accountId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + `public-profile/${accountId}`);
  }

  getAccountSettings(userId: number | null) {
    return this.http.get(this.baseUrl + `account-setting/${userId}`);
  }

  changeEmail(userId : number | null ,email: string) {
    return this.http.put(this.baseUrl + `update-email/${userId}`,{email});
  }

  changePwd(userId : number | null , pwd: string) {
    return this.http.put(this.baseUrl + `update-pwd/${userId}`,{pwd});
  }
  switchRole(role: 'lessor' | 'lessee') {
    this.currentRole.set(role);
  }
}
