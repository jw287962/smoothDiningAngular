import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { setActiveStore } from 'src/store/actions/auth.action';
import {
  State,
  selectCounter,
  selectLoginBoolean,
} from 'src/store/reducers/auth.reducer';
import { StoreApiService } from 'src/store/service/store.service';
import { cookieOptions } from 'src/store/service/types';
interface StoreInterface {
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
  login$: Observable<Boolean> = this._store.select(selectLoginBoolean);
  // state$: Observable<State>;
  count$: Observable<number> = this._store.select(selectCounter);
  stores: StoreInterface[] | undefined;
  // login: boolean = false;

  constructor(
    private _storeService: StoreApiService,
    private _store: Store<State>,
    private _cookieService: CookieService
  ) {
    this.fetchStores();
  }

  // this.state$ = this._store.pipe(select((state) => state));
  ngOnInit() {}
  ngOnDestroy() {
    console.log('ngondestroy');
  }
  async fetchStores() {
    this.stores = await this._storeService.fetchStores();
  }

  async createStore() {
    console.log('MAKE STORE');
  }

  clickStore(storeID: string, storeName: string) {
    const data = { storeId: storeID, storeName: storeName };
    this._store.dispatch(setActiveStore({ storeData: data }));
  }
}
