import { Component } from '@angular/core';
import { getBackEndHref } from 'base-href';
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
    // const sid = this.cookieService.get('sid');
    // console.log(sid);
    // if (!sid) {
    //   return;
    // }
    const userId = this.cookieService.get('user');
    console.log(userId);
    const result = await fetch(`${getBackEndHref()}/api/account/stores`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `user="${userId}"`,
      },

      method: 'GET',
    });

    console.log(result);
    console.log(await result.json());
  }
}
