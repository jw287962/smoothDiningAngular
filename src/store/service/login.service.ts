import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getBackEndHref } from 'base-href';
import { CookieService } from 'ngx-cookie-service';
import { loginFalse, loginTrue } from '../actions/auth.action';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  constructor(private cookieService: CookieService, private store: Store) {}

  dispatchLoginTrue() {
    // if(this.store.select())
    this.store.dispatch({ type: '[auth Component] loginTrue' });
  }
  dispatchLoginFalse() {
    this.store.dispatch(loginFalse());
  }
  async tryLogin(
    string: string,
    username: string,
    password: string,
    repeatPassword: string = ''
  ) {
    try {
      let body;

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
      return this.manageError(responseBody, result);
      // if (!result.ok) {
      //   console.log(result);
      //   console.log(responseBody);

      //   throw new Error(responseBody.message);
      // } else {
      //   this.dispatchLoginTrue();
      //   if (string === 'login')
      //     this.cookieService.set('user', responseBody.userID);
      //   return responseBody.message;
      // }
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
      return this.manageError(responseBody, result);
      // if (!result.ok) {
      //   console.log(result);
      //   console.log(responseBody);
      //   throw new Error(responseBody.message);
      // } else {
      //   this.dispatchLoginFalse();
      //   return responseBody.message;
      // }
    } catch (e: any) {
      console.log({ error: e });
      return e.message;
    }
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
      return this.manageError(responseBody, result);
    } catch (e) {
      console.log({ error: e });
    }
  }

  

  manageError(responseBody: any, result: any) {
    if (!result.ok) {
      console.log(responseBody.message);
      console.log(responseBody);
      this.dispatchLoginFalse();
      throw new Error(responseBody.message);
    } else {
      this.dispatchLoginTrue();
      return responseBody.result;
    }
  }
}
