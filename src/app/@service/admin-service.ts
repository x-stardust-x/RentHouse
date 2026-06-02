import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Admin, AdminDto } from '../@interface/admin';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://localhost:7215/api/Admin/'
  admins = signal<Admin[]>([]);

  getAllAdmins(){
    this.http.get<Admin[]>(this.baseUrl).subscribe((res) => {
      this.admins.set(res);
    });
  }
  getAdminById(adminId : number){
    return this.http.get<Admin>(this.baseUrl + `${adminId}`);
  }
  createAdmin(dto : AdminDto){
    return this.http.post<AdminDto>(this.baseUrl, dto);
  }
  resetpwd(adminId : number){
    return this.http.put(this.baseUrl + `reset-password/${adminId}`, null);
  }
  deleteAdmin(adminId : number){
    return this.http.delete(this.baseUrl + `${adminId}`);
  }
}
