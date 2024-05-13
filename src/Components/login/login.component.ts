import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthanticationService } from '../../Services/authantication.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { routes } from '../../app/app.routes';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  apiError: string = '';
  constructor(
    private _authentication: AuthanticationService,
    private _router: Router
  ) {}

  ngOnInit() {
    document.querySelector('html')?.setAttribute('data-bs-theme', 'light');
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*/d)(?=.*[#$^+=!*()@%&]).{8,}$'),
    ]),
  });

  clearApiErrorMessage() {
    this.apiError = '';
  }

  handleLogin(loginForm: FormGroup) {
    if (loginForm.valid) {
      this._authentication.login(loginForm.value).subscribe({
        next: (Response) => {
          console.log(Response);
          if (Response.accessToken) {
            const date = new Date();
            date.setTime(date.getTime + Response.expiresIn);
            document.cookie =
              'accessToken' +
              '=' +
              Response.accessToken +
              '; expires=' +
              date.toUTCString() +
              '; path=/';
            this._router.navigate(['/authors-admin']);
          } else {
            console.log(Response);
          }
        },
        error: (err) => {
          console.log(err);
          this.apiError = 'Email or password is not correct';
        },
      });
    }
  }
}
