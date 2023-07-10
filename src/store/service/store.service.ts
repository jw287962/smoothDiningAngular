import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getBackEndHref } from 'base-href';
import { CookieService } from 'ngx-cookie-service';
import { Helper } from './helpers';
import { setActiveStore } from '../actions/auth.action';
import { activeStore } from '../reducers/auth.reducer';

@Injectable({
  providedIn: 'root',
})
export class StoreApiService {
  constructor(
    private _cookieService: CookieService,
    private _helper: Helper,
    private _store: Store
  ) {}

  getStoreCookie() {
    return this._cookieService.get('storeid');
  }

  getUserCookie() {
    return this._cookieService.get('user');
  }
  dispatchStore(data: activeStore) {
    this._store.dispatch(setActiveStore({ storeData: data }));
  }
  async fetchStores() {
    try {
      const userId = this.getStoreCookie();
      const result = await fetch(`${getBackEndHref()}/api/account/stores`, {
        credentials: 'include',

        headers: {
          'Content-Type': 'application/json',
          Cookie: `user="${userId}"`,
        },

        method: 'GET',
      });
      const responseBody = await result.json();
      return this._helper.manageError(responseBody, result);
    } catch (e) {
      console.log({ error: e });
    }
  }

  async fetchStore() {
    try {
      const storeID = this.getStoreCookie();
      const result = await fetch(
        `${getBackEndHref()}/api/account/store/${storeID}`,
        {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            // Cookie: `user="${userId}"`,
          },

          method: 'GET',
        }
      );
      const responseBody = await result.json();
      this.dispatchStore({
        storeName: responseBody.store.name,
        storeId: responseBody.store._id,
      });
      return this._helper.manageError(responseBody, result) || responseBody;
    } catch (e) {
      console.log({ error: e });
    }
  }
  // WAITERS
  async fetchWaiters() {
    try {
      const store = this.getStoreCookie();
      const result = await fetch(
        `${getBackEndHref()}/api/account/store/waiters`,
        {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Cookie: `'storeid'='${store}'`,
          },
          mode: 'cors',
          method: 'GET',
        }
      );
      const responseBody = await result.json();
      if (responseBody.ok) {
        this.dispatchStore({
          storeName: responseBody.store.name,
          storeId: responseBody.store._id,
        });
      }
      return this._helper.manageError(responseBody, result) || responseBody;
    } catch (e) {
      console.log({ error: e });
    }
  }

  async addWaiters(name: string, birth?: Date, maxTable?: number) {
    try {
      const store = this.getStoreCookie();
      const body = JSON.stringify({
        name: name,
        birthdate: birth || undefined,
        maxActiveTableForPermission: maxTable || undefined,
      });
      const result = await fetch(
        `${getBackEndHref()}/api/account/store/waiters`,
        {
          credentials: 'include',
          method: 'post',

          headers: {
            'Content-Type': 'application/json',
            Cookie: `storeid=${store}`,
          },
          body: body,
        }
      );
      const responseBody = await result.json();
      return this._helper.manageError(responseBody, result);
    } catch (e) {
      console.log({ error: e });
    }
  }
}
