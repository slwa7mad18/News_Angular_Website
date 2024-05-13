import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private _router: Router) {}

  searchIcon = faMagnifyingGlass;
  modeIcon = faMoon;

  search() {
    this._router.navigate(['/search']);
  }

  DarkMode(): void {
    let theme = document.querySelector('html')?.getAttribute('data-bs-theme');
    if (theme === 'light') {
      document.querySelector('html')?.setAttribute('data-bs-theme', 'dark');
      this.modeIcon = faSun;
    } else {
      document.querySelector('html')?.setAttribute('data-bs-theme', 'light');
      this.modeIcon = faMoon;
    }
  }
}
