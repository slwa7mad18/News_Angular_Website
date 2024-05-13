import { Routes } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { NotFoundComponent } from '../Components/not-found/not-found.component';
import { ArticleComponent } from '../Components/article/article.component';
import { LoginComponent } from '../Components/login/login.component';
import { ForgetPasswordComponent } from '../Components/forget-password/forget-password.component';
import { AuthorsAdminComponent } from '../Components/authors-admin/authors-admin.component';
import { ArticleAdminComponent } from '../Components/article-admin/article-admin.component';
import { AdminHeaderComponent } from '../Components/admin-header/admin-header.component';
import { AuthorsComponent } from '../Components/authors/authors.component';
import { SearchComponent } from '../Components/search/search.component';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'authors-admin', component: AuthorsAdminComponent },
  { path: 'article-admin', component: ArticleAdminComponent },
  { path: 'admin-header', component: AdminHeaderComponent },
  { path: 'search', component: SearchComponent },

  { path: '**', component: NotFoundComponent },
];
