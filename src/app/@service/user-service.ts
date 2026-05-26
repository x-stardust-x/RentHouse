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
  private readonly baseUrl = 'https://localhost:7215/api/User/'

  public users = signal<any[]>([]);

  loadAllUsers(){
    this.http.get<any>(this.baseUrl).subscribe((res) => {
      this.users.set(res);
    });
  }

  loadProfile(userId : number){
    this.http.get<UserProfile>(this.baseUrl + `profile/${userId}`).subscribe((res) => {
      this.profile.set(res)
    });
  }

  updateProfile(dto: UserProfile) {
    this.http.put<UserProfile>(this.baseUrl + `profile/update`, dto).subscribe(res => {
      console.log(res);
      alert("更新完成")

      this.router.navigate(['../']);
    });
  }

  updateUserStatus(userId: number) {
    return this.http.put(`https://localhost:7215/status/${userId}`, null);
  }
  getLessorProfile(accountId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + `public-profile/${accountId}`);
  }

}
