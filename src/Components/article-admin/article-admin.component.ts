import { Component } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { FooterComponent } from '../footer/footer.component';
import { ArticleService } from '../../Services/article.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { ReplaySubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthorService } from '../../Services/author.service';
import { QuillModule } from 'ngx-quill';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-article-admin',
  standalone: true,
  imports: [
    AdminHeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    QuillModule,
    NgxPaginationModule,
  ],
  templateUrl: './article-admin.component.html',
  styleUrl: './article-admin.component.css',
})
export class ArticleAdminComponent {
  constructor(
    private articleService: ArticleService,
    private authorService: AuthorService
  ) {}

  pageSize = 5;
  pageNumber = 1;

  apiError: string = '';

  addForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    publicationDate: new FormControl(null, [Validators.required]),
    authorId: new FormControl(null, [Validators.required]),
  });

  editForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
    image: new FormControl(),
    publicationDate: new FormControl(null, [Validators.required]),
    authorId: new FormControl(null, [Validators.required]),
  });

  imagePreviewSrc: string = '';
  articlesList: any;
  authorsList: any;
  articlesAuthors: any;

  ngOnInit() {
    this.articleService.getAll().subscribe({
      next: (data: any) => {
        this.articlesList = data;
      },
      error: (err: any) => {},
    });

    this.authorService.getAll().subscribe({
      next: (data: any) => {
        this.authorsList = data;
        this.articlesAuthors = this.listToDict(data, (item: any) => item.id);
      },
      error: (err: any) => {},
    });
  }

  handlePageChange(event: any) {
    this.pageNumber = event;
  }

  InitAddFields() {
    this.addForm.reset();
    this.imagePreviewSrc = '';
  }

  InitEditFields(id: string) {
    this.articleService.getOne(id).subscribe({
      next: (data: any) => {
        this.editForm.patchValue({
          id: data.id,
          title: data.title,
          content: data.content,
          publicationDate: data.publicationDate,
          authorId: data.authorId,
        });
        this.imagePreviewSrc = 'data:image/png;base64,' + data.image;
      },
    });
  }

  uploadImage(event: any) {
    console.log(event.target.files[0]);

    this.convertImage(event.target.files[0]).subscribe((base64: string) => {
      this.imagePreviewSrc = 'data:image/png;base64,' + base64;
    });
  }

  private convertImage(file: File): any {
    const result = new ReplaySubject<string>(1);

    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event: any) =>
      result.next(btoa(event.target.result.toString()));

    return result;
  }

  addArticle(addForm: FormGroup) {
    if (addForm.valid) {
      let addedArticle = addForm.value;
      addedArticle.image = this.imagePreviewSrc.split(
        'data:image/png;base64,'
      )[1];

      this.articleService.addArticle(addedArticle).subscribe({
        next: () => {
          this.articleService.getAll().subscribe({
            next: (data: any) => {
              this.articlesList = data;
              console.log(this.articlesList);
            },
            error: (err: any) => {},
          });
        },
      });
    }
  }

  editArticle(editForm: FormGroup) {
    if (editForm.valid) {
      let editedArticle = editForm.value;
      editedArticle.image = this.imagePreviewSrc.split(
        'data:image/png;base64,'
      )[1];

      this.articleService.editArticle(editedArticle).subscribe({
        next: () => {
          this.articleService.getAll().subscribe({
            next: (data: any) => {
              this.articlesList = data;
              console.log(this.articlesList);
            },
            error: (err: any) => {},
          });
        },
      });
    }
  }

  deleteArticle(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.articleService.deleteArticle(id).subscribe({
          next: () => {
            this.articleService.getAll().subscribe({
              next: (data: any) => {
                this.articlesList = data;
                console.log(this.articlesList);
              },
              error: (err: any) => {},
            });
          },
        });

        Swal.fire('Deleted!', 'Author has been deleted.', 'success');
      }

      if (result.isDismissed) {
        Swal.fire('Cancelled', 'Author has not been deleted.', 'error');
      }
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
}
