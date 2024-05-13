import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'https://news-api.runasp.net';

  GetArticlesPaginated(pageNumber: number, pageSize: number): any {
    return this.http.get(
      this.BASE_URL +
        `/api/v1/Articles?sorts=creationDate&page=${pageNumber}&pageSize=${pageSize}`
    );
  }

  GetFilteredArticlesPaginated(
    pageNumber: number,
    pageSize: number,
    q: string
  ): any {
    return this.http.get(
      this.BASE_URL +
        `/api/v1/Articles?&filters=title@=*${q}&sorts=creationDate&page=${pageNumber}&pageSize=${pageSize}`
    );
  }

  GetArticle(id: string): any {
    return this.http.get(this.BASE_URL + `/api/v1/Articles/${id}`);
  }

  GetAuthor(id: string): any {
    return this.http.get(this.BASE_URL + `/api/v1/Authors/${id}`);
  }

  GetSummary(id: string): any {
    return this.http.get(this.BASE_URL + `/api/v1/Articles/${id}/Summarize`);
  }
}
