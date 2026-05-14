import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../@interface/news';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private http = inject(HttpClient);
  private baseUrl = `https://localhost:7215/api/news`

  newsData = signal<News[]>([]);

  getAll(){
    this.http.get<News[]>(this.baseUrl).subscribe(res =>{
      this.newsData.set(res);
    });
  }

  // 取得單筆
  getById(id: number): Observable<News> {
    return this.http.get<News>(`${this.baseUrl}/${id}`);
  }

  // 新增
  create(data: News): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // 修改
  update(id: number, data: News): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // 刪除
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  uploadImage(formData: FormData) {
    return this.http.post('https://localhost:7215/api/upload', formData);
  }
}
