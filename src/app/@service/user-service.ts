import { UserProfile } from './../@interface/user-profile';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationSetting } from '../@interface/notification-setting';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private router = inject(Router);
  profile = signal<UserProfile | null>(null);
  private readonly baseUrl = 'https://localhost:7215/api/User/';


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
    return this.http.put<UserProfile>(this.baseUrl + `profile/update`, dto);
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

  getProfileObservable(userId: number) {
  return this.http.get<UserProfile>(this.baseUrl + `profile/${userId}`);
  }


  upgradeUserTier(userId: number, tier: number) {
  return this.http.put(`${this.baseUrl}upgrade/${userId}/${tier}`, {});
  }
  GetNotificationSetting(userId : number | null){
    return this.http.get<NotificationSetting>(this.baseUrl + `get-notification/${userId}`);
  }
  SaveNotificationSetting(userId : number | null,setting: NotificationSetting){
    return this.http.put(this.baseUrl + `update-notification/${userId}`,setting);
  }
}

