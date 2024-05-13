import { Component } from '@angular/core';
import { HomeService } from '../../Services/home.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { AuthorService } from '../../Services/author.service';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule],
  providers: [HomeService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private homeService: HomeService,
    private authorService: AuthorService
  ) {}

  homeArticles: any;
  paginatedArticles: any;
  articlesAuthors: any;

  pagesCounter: number = 1;

  showLoadMoreButton: number = 0;

  ngOnInit() {
    this.homeService.GetArticlesPaginated(this.pagesCounter, 3).subscribe({
      next: (data: any) => {
        this.homeArticles = data;
        this.pagesCounter++;

        this.homeService.GetArticlesPaginated(this.pagesCounter, 3).subscribe({
          next: (data: any) => {
            this.paginatedArticles = data;
            this.pagesCounter++;

            this.showLoadMoreButton = 1;
          },
          error: (err: any) => {},
        });
      },
      error: (err: any) => {},
    });

    this.authorService.getAll(true).subscribe({
      next: (data: any) => {
        this.articlesAuthors = this.listToDict(data, (item: any) => item.id);
      },
      error: (err: any) => {},
    });
  }

  private listToDict<T>(
    list: T[],
    idGen: (arg: T) => string
  ): { [key: string]: T } {
    const dict: { [key: string]: T } = {};

    list.forEach((element) => {
      const dictKey = idGen(element);
      dict[dictKey] = element;
    });

    return dict;
  }

  loadMoreContent() {
    this.homeService.GetArticlesPaginated(this.pagesCounter, 3).subscribe({
      next: (data: any) => {
        if (data.length == 0) {
          this.showLoadMoreButton = 2;
        }

        this.paginatedArticles.push(...data);
        this.pagesCounter++;
      },
      error: (err: any) => {},
    });
  }
}
