import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getBackEndHref } from 'base-href';
import { CookieService } from 'ngx-cookie-service';
import { Helper } from './helpers';
import { setActiveStore } from '../actions/auth.action';
import { activeStore, selectStoreData } from '../reducers/auth.reducer';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreApiService {
  myHeaders = new Headers();
  currentStore: activeStore = { storeName: '', storeId: '' };

  storeDataSub: Subscription;
  activeStore$: Observable<activeStore> = this._store.select(selectStoreData);
  constructor(
    private _cookieService: CookieService,
    private _helper: Helper,
    private _store: Store
  ) {
    this.createHeaderWithStore();
    this.storeDataSub = this.activeStore$.subscribe(async (data) => {
      this.currentStore = data;
      return data;
      // console.log(result);
    });
  }
  ngOnDestroy() {
    this.storeDataSub.unsubscribe();
  }
  getStoreCookie() {
    return this._cookieService.get('storeid');
  }

  getUserCookie() {
    return this._cookieService.get('user');
  }
  dispatchStore(data: activeStore) {
    this._store.dispatch(setActiveStore({ storeData: data }));
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

  createHeaderWithStore() {
    const store = this.getStoreCookie();
    this.myHeaders.append('Content-Type', 'application/json');
    this.myHeaders.append('storeid', store);
  }
  async fetchStores() {
    try {
      // this.activeStore$.subscribe((data) => {
      //   data;
      // });
      // const userId = this.getStoreCookie();
      const result = await fetch(`${getBackEndHref()}/api/account/stores/`, {
        credentials: 'include',

        headers: this.getHeaders(),

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
      // const storeID = this.getStoreCookie();
      const result = await fetch(
        `${getBackEndHref()}/api/account/store/${
          this.currentStore.storeId || this.getStoreCookie()
        }`,
        {
          credentials: 'include',
          headers: this.getHeaders(),

          method: 'GET',
        }
      );
      const responseBody = await result.json();
      if (this.currentStore.storeId === '') {
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
  // WAITERS
  async fetchWaiters() {
    const store = this.getStoreCookie() || this.currentStore.storeId;
    try {
      const result = await fetch(
        `${getBackEndHref()}/api/account/store/waiters`,
        {
          credentials: 'include',
          headers: this.getHeaders({ storeid: store }),
          mode: 'cors',
          method: 'GET',
          // cache: 'no-store',
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
      const body = JSON.stringify({
        name: name,
        birthdate: birth || undefined,
        maxActiveTableForPermission: maxTable || undefined,
      });
      const result = await fetch(
        `${getBackEndHref()}/api/account/store/waiters/`,
        {
          credentials: 'include',
          method: 'post',

          headers: this.getHeaders(),
          body: body,
        }
      );
      const responseBody = await result.json();
      return this._helper.manageError(responseBody, result);
    } catch (e) {
      console.log({ error: e });
    }
  }

  async createWaiterShift(
    waiterID: string,
    shiftNumber: number,
    shiftSection: number
  ) {
    try {
      const body = JSON.stringify({
        section: shiftSection,
        shiftNumber: shiftNumber,
      });
      const result = await fetch(
        `${getBackEndHref()}/api/account/store/shifts/${waiterID}`,
        {
          credentials: 'include',
          method: 'post',

          headers: this.getHeaders({ storeid: this.getStoreCookie() }),
          body: body,
        }
      );
      const responseBody = await result.json();
      return this._helper.manageError(responseBody, result);
    } catch (e) {}
  }

  async getCurrentShift() {
    try {
      const date = new Date();
      console.log(date.toISOString());
      // console.log(date);
      // const body = JSON.stringify({});
      const result = await fetch(
        `${getBackEndHref()}/api/account/store/shifts/${date.toISOString()}`,
        {
          credentials: 'include',
          method: 'get',

          headers: this.getHeaders(),
          // body: body,
        }
      );
      const responseBody = await result.json();
      console.log(result, responseBody);
      return this._helper.manageError(responseBody, result);
    } catch (e) {}
  }
}
