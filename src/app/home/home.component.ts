import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  userStores: any;

  constructor(private cookieService: CookieService) {
    this.fetchStores();
  }

  async fetchStores() {
    const sid = this.cookieService.get('sid');
    console.log(sid);
    if (!sid) {
      return;
    }
    const result = await fetch(
      'https://smoothdining.azurewebsites.net/api/account/stores',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sid}`,
        },
        method: 'GET',
      }
    );

    console.log(result);
    console.log(await result.json());
  }
}
