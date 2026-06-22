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
      this.admins.set(res.filter(x => x.isDelete == false));
    });
  }
  getAdminById(adminId : number){
    return this.http.get<Admin>(this.baseUrl + `${adminId}`);
  }
  createAdmin(dto : AdminDto){
    return this.http.post<AdminDto>(this.baseUrl, dto);
  }
  SuperOc(adminId : number){
    return this.http.put(this.baseUrl + `SuperOc/${adminId}`, null);
  }
  resetpwd(adminId : number){
    return this.http.put(this.baseUrl + `reset-password/${adminId}`, null);
  }
  deleteAdmin(adminId : number){
    return this.http.put(this.baseUrl + `delete/${adminId}`, null);
  }
  changePwdByMe(adminId : number, pwd: string){
    return this.http.put(this.baseUrl + `edit-password/${adminId},`,pwd)
  }
}
