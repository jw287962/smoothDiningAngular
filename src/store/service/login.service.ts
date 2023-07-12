import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getBackEndHref } from 'base-href';
import { CookieService } from 'ngx-cookie-service';
import { loadingPage, loginFalse, loginTrue } from '../actions/auth.action';
import { Helper } from './helpers';
import { cookieOptions } from './types';

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
    isLogin: boolean,
    username: string,
    password: string,
    repeatPassword: string = ''
  ) {
    try {
      let body;
      this.dispatchLoading(true);
      let string = 'login';
      if (isLogin) {
        body = JSON.stringify({
          username: username,
          password: password,
        });
      } else {
        body = JSON.stringify({
          username: username,
          password: password,
          repeatpassword: repeatPassword,
        });
        string = 'register';
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

      const auth = result.headers.get('x-access-token') || '';
      this._cookieService.set('Authorization', auth, cookieOptions);

      return this._helper.manageError(responseBody, result, !isLogin);
    } catch (e: any) {
      console.log({ error: e });
      return e.message;
    }
  }

  async logout() {
    try {
      const token = this._cookieService.get('Authorization');
      this._cookieService.deleteAll();
      const result = await fetch(`${getBackEndHref()}/api/logout`, {
        credentials: 'include',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
