import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getBackEndHref } from 'base-href';
import { CookieService } from 'ngx-cookie-service';
import { Helper } from './helpers';
import { setActiveStore } from '../actions/auth.action';
import { activeStore, selectStoreData } from '../reducers/auth.reducer';
import { Observable, Subscription } from 'rxjs';
import { partyInterface } from './types';

@Injectable({
  providedIn: 'root',
})
export class StoreApiService {
  myHeaders = new Headers();
  currentStore: activeStore = { storeName: '', storeId: '' };

  storeDataSub: Subscription;
  activeStore$: Observable<activeStore> = this._store.select(selectStoreData);
  constructor(private _helper: Helper, private _store: Store) {
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

  getHeaders(extra: {} = {}) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this._helper.getAuthBearer()}`,
      ...extra,
    };
  }

  createHeaderWithStore() {
    const store = this._helper.getStoreCookie();
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

  async createStore(body: any) {
    try {
      const bodyData = JSON.stringify({ body });
      console.log(body);
      // this.activeStore$.subscribe((data) => {
      //   data;
      // });
      // const userId = this.getStoreCookie();
      const result = await fetch(`${getBackEndHref()}/api/account/store`, {
        credentials: 'include',

        headers: this.getHeaders(),
        method: 'post',
        body: JSON.stringify(body),
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
          this.currentStore.storeId || this._helper.getStoreCookie()
        }`,
        {
          credentials: 'include',
          headers: this.getHeaders(),

          method: 'GET',
        }
      );
      const responseBody = await result.json();
      if (this.currentStore.storeId === '') {
        this._helper.dispatchStore({
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
    const store = this._helper.getStoreCookie() || this.currentStore.storeId;
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
        this._helper.dispatchStore({
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
    shiftSection: number,
    date: Date | undefined = undefined
  ) {
    try {
      const body = JSON.stringify({
        shiftNumber: shiftNumber,
        section: shiftSection,
      });
      console.log(date);

      const result = await fetch(
        `${getBackEndHref()}/api/account/store/shifts/${waiterID}${
          date ? `/${date.toISOString()}` : ''
        }`,
        {
          credentials: 'include',
          method: 'post',

          headers: this.getHeaders({ storeid: this._helper.getStoreCookie() }),
          body: body,
        }
      );
      const responseBody = await result.json();
      return this._helper.manageError(responseBody, result);
    } catch (e) {
      console.log({ error: e });
    }
  }

  async getCurrentShift(date: Date) {
    try {
      console.log(date);
      const dateFinal = date || new Date();
      // console.log(date);
      console.log(dateFinal.toDateString());
      // const body = JSON.stringify({});
      const result = await fetch(
        `${getBackEndHref()}/api/account/store/shifts/${dateFinal.toISOString()}`,
        {
          credentials: 'include',
          method: 'get',

          headers: this.getHeaders(),
          // body: body,
        }
      );
      const responseBody = await result.json();
      return this._helper.manageError(responseBody, result);
    } catch (e) {
      console.log({ error: e });
    }
  }

  async createParty(generic: boolean = false, partyData: partyInterface) {
    try {
      console.log(generic);
      // const dateFinal = date || new Date();
      const body = JSON.stringify(partyData);
      const result = await fetch(
        `${getBackEndHref()}/api/account/store/party${
          generic ? '/generic' : ''
        }`,
        {
          credentials: 'include',
          method: 'post',

          headers: this.getHeaders({ storeid: this._helper.getStoreCookie() }),
          body: body,
        }
      );
      const responseBody = await result.json();
      return this._helper.manageError(responseBody, result);
    } catch (e) {
      console.log({ error: e });
    }
  }

  async getParties(date: string | undefined = undefined) {
    // console.log('get Parties', date);
    try {
      const result = await fetch(
        `${getBackEndHref()}/api/account/store/party/${date ? `${date}` : ''}`,
        {
          credentials: 'include',
          method: 'get',

          headers: this.getHeaders({ storeid: this._helper.getStoreCookie() }),
        }
      );

      const responseBody = await result.json();
      // console.log(responseBody, result);
      return this._helper.manageError(responseBody, result);
    } catch (e) {}
  }

  async addPartytoShiftID(identifier: any) {
    try {
      console.log(identifier);
      const body = JSON.stringify(identifier);

      // party/:waiterID/:shiftNumber",
      const result = await fetch(
        `${getBackEndHref()}/api/account/store/shifts/party`,
        {
          credentials: 'include',
          method: 'put',

          headers: this.getHeaders({ storeid: this._helper.getStoreCookie() }),
          body: body,
        }
      );

      const responseBody = await result.json();
      console.log(responseBody, result);
      return this._helper.manageError(responseBody, result);
    } catch (e) {}
  }
}
