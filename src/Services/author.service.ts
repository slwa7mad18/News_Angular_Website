import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthanticationService } from './authantication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(
    private http: HttpClient,
    private authService: AuthanticationService,
    private _router: Router
  ) {}

  BASE_URL = 'https://news-api.runasp.net';

  getAll(skip: boolean = false): any {
    let accessToken = this.authService.getAccessToken();

    if (!skip) {
      if (accessToken === undefined) {
        this._router.navigate(['/login']);
      }
    }

    const HttpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + accessToken,
      }),
    };

    return this.http.get(this.BASE_URL + '/api/v1/Authors', HttpOptions);
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

    return this.http.get(this.BASE_URL + `/api/v1/Authors/${id}`, HttpOptions);
  }

  addAuthor(author: any) {
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
      this.BASE_URL + `/api/v1/Authors`,
      author,
      HttpOptions
    );
  }

  editAuthor(author: any) {
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
      this.BASE_URL + `/api/v1/Authors?authorId=${author.id}`,
      author,
      HttpOptions
    );
  }

  deleteAuthor(id: string) {
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
      this.BASE_URL + `/api/v1/Authors?id=${id}`,
      HttpOptions
    );
  }
}
