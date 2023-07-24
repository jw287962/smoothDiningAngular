import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  loadingPage,
  loginFalse,
  loginTrue,
  setActiveStore,
} from '../actions/auth.action';
import { CookieService } from 'ngx-cookie-service';
import { activeStore } from '../reducers/auth.reducer';

@Injectable({
  providedIn: 'root',
})
export class Helper {
  constructor(private _store: Store, private _cookieService: CookieService) {}

  getStoreCookie() {
    return this._cookieService.get('storeid');
  }

  getUserCookie() {
    return this._cookieService.get('user');
  }

  getAuthBearer() {
    return this._cookieService.get('Authorization');
  }

  getHeaders(extra: {} = {}) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getAuthBearer()}`,
      ...extra,
    };
  }

  dispatchStore(data: activeStore) {
    this._store.dispatch(setActiveStore({ storeData: data }));
  }

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

  manageError(responseBody: any, result: any, logout: boolean = false) {
    const value =
      responseBody.error || responseBody.message || responseBody.result;

    this.dispatchLoading(false);
    // console.log(result);
    // console.log(responseBody);
    if (!result.ok || responseBody.error) {
      console.log(result);
      console.log(responseBody);
      if (result.status === 401) this.dispatchLoginFalse();
      return value;
    } else {
      if (logout) {
        this.dispatchLoginFalse();
      } else {
        this.dispatchLoginTrue();
      }
      return responseBody;
    }
  }
}
