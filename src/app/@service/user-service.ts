import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UpdateProfileDto, UserProfile } from '../@interface/user-profile';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  profile = signal<UserProfile | null>(null);
  private readonly baseUrl = 'https://localhost:7215/api/User/'
  loadProfile(userId: number) {
    this.http.get<UserProfile>(this.baseUrl + `profile/${userId}`)
      .subscribe(res => {
        this.profile.set(res);
      });
  }
  updateProfile(userId: number, dto: UpdateProfileDto) {
  return this.http.put(
    `/api/user/profile/${userId}`,
    dto
  );
}
}
