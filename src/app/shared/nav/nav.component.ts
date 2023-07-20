import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-nav',

  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  themeToggle: boolean = false;
  private _currentTheme = document.documentElement;
  constructor(private _cookie: CookieService) {
    if (this._cookie.get('theme') === '') {
      this.themeToggle = false;
    } else {
      console.log('click toggledata');
      this.toggleDataTheme();
    }
  }

  toggleDataTheme() {
    this.themeToggle = !this.themeToggle;

    const newTheme = this.themeToggle === false ? '' : 'dark';

    // Set the new theme using the setAttribute method
    this._currentTheme.setAttribute('data-theme', newTheme);
    this._cookie.set('theme', `${newTheme}`, new Date().getDate() + 30);
  }
}
