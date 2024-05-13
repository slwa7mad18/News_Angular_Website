import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeService } from '../../Services/home.service';
import { AuthorService } from '../../Services/author.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  providers: [HomeService],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  constructor(
    private homeService: HomeService,
    private authorService: AuthorService
  ) {}

  searchIcon = faMagnifyingGlass;

  searchString: string = '';
  paginatedArticles: any;
  articlesAuthors: any;

  pagesCounter: number = 1;

  showLoadMoreButton: number = 0;

  ngOnInit() {
    this.homeService
      .GetFilteredArticlesPaginated(this.pagesCounter, 3, this.searchString)
      .subscribe({
        next: (data: any) => {
          this.paginatedArticles = data;
          this.pagesCounter++;

          this.showLoadMoreButton = 1;

          console.log(this.searchString);
          console.log(this.paginatedArticles);
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

  search(event: any) {
    this.searchString = event.target.value;
    this.pagesCounter = 1;

    this.homeService
      .GetFilteredArticlesPaginated(this.pagesCounter, 3, this.searchString)
      .subscribe({
        next: (data: any) => {
          this.paginatedArticles = data;
          this.pagesCounter++;

          this.showLoadMoreButton = 1;

          console.log(this.searchString);
          console.log(this.paginatedArticles);
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
    this.homeService
      .GetFilteredArticlesPaginated(this.pagesCounter, 3, this.searchString)
      .subscribe({
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
