import { Injectable } from '@angular/core';
import { getBackEndHref } from 'base-href';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private cookieService: CookieService) {}

  async tryLogin(
    string: string,
    username: string,
    password: string,
    repeatPassword: string = ''
  ) {
    let body;
    try {
      if (string === 'login') {
        body = JSON.stringify({
          username: username,
          password: password,
        });
      } else if (string === 'register') {
        body = JSON.stringify({
          username: username,
          password: password,
          repeatpassword: repeatPassword,
        });
      }
      const result = await fetch(`${getBackEndHref()}/api/${string}`, {
        credentials: 'include',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });
      const responseBody = await result.json();

      if (!result.ok) {
        console.log(result);
        console.log(responseBody);
        throw new Error(responseBody.message);
      } else {
        if (string === 'login')
          this.cookieService.set('user', responseBody.userID);

        return responseBody.message;
      }
    } catch (e: any) {
      console.log({ error: e });
      return e.message;
    }
  }

  async logout() {
    try {
      const result = await fetch(`${getBackEndHref()}/api/logout`, {
        credentials: 'include',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseBody = await result.json();

      if (!result.ok) {
        console.log(result);
        console.log(responseBody);
        throw new Error(responseBody.message);
      } else {
        return responseBody.message;
      }
    } catch (e: any) {
      console.log({ error: e });
      return e.message;
    }
  }
}
