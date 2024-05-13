import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthanticationService } from './authantication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(
    private http: HttpClient,
    private authService: AuthanticationService,
    private _router: Router
  ) {}

  BASE_URL = 'https://news-api.runasp.net';

  getAll(): any {
    let accessToken = this.authService.getAccessToken();
    if (accessToken === undefined) {
      this._router.navigate(['/login']);
    }

    const HttpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + accessToken,
      }),
    };

    return this.http.get(this.BASE_URL + '/api/v1/Articles', HttpOptions);
  }

  getOne(id: string): any {
    let accessToken = this.authService.getAccessToken();
    if (accessToken === undefined) {
      this._router.navigate(['/login']);
    }

    const HttpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + accessToken,
      }),
    };

    return this.http.get(this.BASE_URL + `/api/v1/Articles/${id}`, HttpOptions);
  }

  addArticle(article: any) {
    let accessToken = this.authService.getAccessToken();
    if (accessToken === undefined) {
      this._router.navigate(['/login']);
    }

    const HttpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + accessToken,
      }),
    };

    return this.http.post(
      this.BASE_URL + `/api/v1/Articles`,
      article,
      HttpOptions
    );
  }

  editArticle(article: any) {
    let accessToken = this.authService.getAccessToken();
    if (accessToken === undefined) {
      this._router.navigate(['/login']);
    }

    const HttpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + accessToken,
      }),
    };

    return this.http.put(
      this.BASE_URL + `/api/v1/Articles?articleId=${article.id}`,
      article,
      HttpOptions
    );
  }

  deleteArticle(id: string) {
    let accessToken = this.authService.getAccessToken();
    if (accessToken === undefined) {
      this._router.navigate(['/login']);
    }

    const HttpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + accessToken,
      }),
    };

    return this.http.delete(
      this.BASE_URL + `/api/v1/Articles?id=${id}`,
      HttpOptions
    );
  }
}
