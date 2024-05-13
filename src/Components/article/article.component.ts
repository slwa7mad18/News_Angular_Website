import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { HomeService } from '../../Services/home.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FontAwesomeModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent {
  constructor(private router: Router, private homeService: HomeService) {}

  articleId: any;
  article: any;
  author: any;

  aiSummary: string = '';
  showAiLoadingIcon: number = 0;
  aiLoadingIcon = faSpinner;

  ngOnInit() {
    this.articleId = this.router.url.substring(
      this.router.url.lastIndexOf('/') + 1
    );

    this.homeService.GetArticle(this.articleId).subscribe({
      next: (data: any) => {
        this.article = data;

        this.homeService.GetAuthor(data.authorId).subscribe({
          next: (data: any) => {
            this.author = data;
          },
        });
      },
    });
  }

  SummarizeArticle(id: string) {
    this.showAiLoadingIcon = 1;
    this.homeService.GetSummary(id).subscribe({
      next: (data: any) => {
        this.aiSummary = data.summary;
        this.showAiLoadingIcon = 2;
      },
    });
  }
}
