import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Log } from '../@interface/log';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://localhost:7215/api/Log';
  getLogs(): Observable<Log[]> {
    return this.http.get<Log[]>(this.baseUrl);
  }
  getUserIdLogs(userId: number): Observable<Log[]> {
    return this.http.get<Log[]>(`${this.baseUrl}/${userId}`);
  }
  postLog(log: any) : Observable<any> {
    return this.http.post(this.baseUrl, log);
  }
}
