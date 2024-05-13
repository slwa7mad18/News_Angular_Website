import { Component } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthorService } from '../../Services/author.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-authors-admin',
  standalone: true,
  imports: [
    AdminHeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    NgxPaginationModule,
  ],
  providers: [AuthorService],
  templateUrl: './authors-admin.component.html',
  styleUrl: './authors-admin.component.css',
})
export class AuthorsAdminComponent {
  constructor(private authorService: AuthorService) {}

  pageSize = 5;
  pageNumber = 1;

  apiError: string = '';

  addForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    bio: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
  });

  editForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required]),
    bio: new FormControl(null, [Validators.required]),
    image: new FormControl(),
  });

  imagePreviewSrc: string = '';
  authorsList: any;

  ngOnInit() {
    this.authorService.getAll().subscribe({
      next: (data: any) => {
        this.authorsList = data;
        console.log(this.authorsList);
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
    this.authorService.getOne(id).subscribe({
      next: (data: any) => {
        this.editForm.patchValue({
          id: data.id,
          name: data.name,
          bio: data.bio,
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

  addAuthor(addForm: FormGroup) {
    if (addForm.valid) {
      let addedAuther = addForm.value;
      addedAuther.image = this.imagePreviewSrc.split(
        'data:image/png;base64,'
      )[1];

      this.authorService.addAuthor(addedAuther).subscribe({
        next: () => {
          this.authorService.getAll().subscribe({
            next: (data: any) => {
              this.authorsList = data;
              console.log(this.authorsList);
            },
            error: (err: any) => {},
          });
        },
      });
    }
  }

  editAuthor(editForm: FormGroup) {
    if (editForm.valid) {
      let editedAuther = editForm.value;
      editedAuther.image = this.imagePreviewSrc.split(
        'data:image/png;base64,'
      )[1];

      this.authorService.editAuthor(editedAuther).subscribe({
        next: () => {
          this.authorService.getAll().subscribe({
            next: (data: any) => {
              this.authorsList = data;
              console.log(this.authorsList);
            },
            error: (err: any) => {},
          });
        },
      });
    }
  }

  deleteAuthor(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authorService.deleteAuthor(id).subscribe({
          next: () => {
            this.authorService.getAll().subscribe({
              next: (data: any) => {
                this.authorsList = data;
                console.log(this.authorsList);
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
}
