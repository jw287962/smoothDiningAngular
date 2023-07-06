import { Component, Input } from '@angular/core';
import { getBackEndHref } from 'base-href';
import { CookieService } from 'ngx-cookie-service';
interface Store {
  address: string;
  state: string;
  name: string;
  _id: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  @Input() stores: Store[] | undefined;

  constructor(private cookieService: CookieService) {
    this.fetchStores();
  }

  async fetchStores() {
    try {
      const userId = this.cookieService.get('user');
      const result = await fetch(`${getBackEndHref()}/api/account/stores`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `user="${userId}"`,
        },

        method: 'GET',
      });
      const responseBody = await result.json();
      if (!result.ok) {
        console.log(responseBody.message);
        throw new Error(responseBody.message);
      } else {
        console.log(responseBody);
        this.stores = responseBody.result;
      }
    } catch (e) {
      console.log({ error: e });
    }
  }
}
