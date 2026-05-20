import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '../@interface/login-response';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})



export class Authservice {
  private http = inject(HttpClient);
  private router = inject(Router);
  private api = 'https://localhost:7215/api/Auth';

  login(data: { email: string; pwd: string }, isAdmin: boolean) {
    if (isAdmin) {
      return this.http.post<LoginResponse>(this.api + "/login/admin", data);
    }
    else {
      return this.http.post<LoginResponse>(this.api + "/login/member", data);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decoded = this.decodeToken(token);

    const exp = decoded.exp;
    const now = Math.floor(Date.now() / 1000);

    if (exp < now) {
      console.log("Token已過期");
      this.logout();
    }
    return exp > now;
  }

  register(payload: any) {
    return this.http.post(this.api + "/register", payload);
  }

  decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);

    // ⚠️ .NET 預設 role key 可能是這個
    return decoded.role || null
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);

    return decoded.UserId || null
  }

  test() {
    return this.http.get("https://localhost:7215/api/Auth/getalladmin");
  }

  getClientIPAddress() {
    return this.http
      .get<{ ip: string }>('https://api.ipify.org/?format=json')
      .pipe(
        map(res => res.ip),
        catchError((err: HttpErrorResponse) => {
          console.error(err);
          return of('');
        })
      );
  }
}
