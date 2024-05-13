import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthanticationService } from '../../Services/authantication.service';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterModule],
  providers: [AuthanticationService],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css',
})
export class AdminHeaderComponent {
  constructor(private authService: AuthanticationService) {}

  logOut() {
    this.authService.logout();
  }
}
