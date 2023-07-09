import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getBackEndHref } from 'base-href';
import { CookieService } from 'ngx-cookie-service';
import { loadingPage, loginFalse, loginTrue } from '../actions/auth.action';
import { Helper } from './helpers';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  constructor(
    private _cookieService: CookieService,
    private _store: Store,
    private _helper: Helper
  ) {}

  dispatchLoginTrue() {
    // if(this.store.select())
    this._store.dispatch({ type: '[auth Component] loginTrue' });
  }
  dispatchLoginFalse() {
    this._store.dispatch(loginFalse());
  }
  dispatchLoading(state: boolean) {
    this._store.dispatch(loadingPage.updateLoading({ loading: state }));
  }
  async tryLogin(
    string: string,
    username: string,
    password: string,
    repeatPassword: string = ''
  ) {
    try {
      let body;
      this.dispatchLoading(true);

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
      return this._helper.manageError(responseBody, result);
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
      return this._helper.manageError(responseBody, result, true);
    } catch (e: any) {
      console.log({ error: e });
      return e.message;
    }
  }
}
