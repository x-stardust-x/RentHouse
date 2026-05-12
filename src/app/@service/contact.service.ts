import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactRequest } from '../@interface/contact.interface'; 

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // 記得門牌號碼要用剛才在 C# 看到的 44304
  private apiUrl = 'https://localhost:44304/api/Contact'; 

  constructor(private http: HttpClient) { }

  // 送出表單的方法
  sendContactMessage(data: ContactRequest): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}