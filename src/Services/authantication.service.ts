import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthanticationService {
  constructor(private _httpClient: HttpClient, private _router: Router) {}

  login(adminData: object): Observable<any> {
    return this._httpClient.post(
      'https://news-api.runasp.net/api/v1/account/login',
      adminData
    );
  }

  getAccessToken(): string | undefined {
    const value: string = `; ${document.cookie}`;
    const parts: string[] = value.split(`; accessToken=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift()?.trim();
    return undefined;
  }

  logout(): any {
    let accessToken = this.getAccessToken();
    if (accessToken !== undefined) {
      const cookies = document.cookie.split(';');

      for (const cookie of cookies) {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        if (name != 'accessToken') continue;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;';
      }

      this._router.navigate(['/home']);
    }
  }
}
