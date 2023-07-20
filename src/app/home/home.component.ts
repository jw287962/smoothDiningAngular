import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { setActiveStore } from 'src/store/actions/auth.action';
import {
  State,
  selectCounter,
  selectLoadingBoolean,
  selectLoginBoolean,
} from 'src/store/reducers/auth.reducer';
import { Helper } from 'src/store/service/helpers';
import { StoreApiService } from 'src/store/service/store.service';
import { cookieOptions, handleResponseBody } from 'src/store/service/types';
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
  loading: Observable<boolean> = this._store.select(selectLoadingBoolean);

  constructor(
    private _storeService: StoreApiService,
    private _store: Store<State>,
    private _cookieService: CookieService,
    private _helper: Helper
  ) {
    this.fetchStores();
  }

  // this.state$ = this._store.pipe(select((state) => state));
  ngOnInit() {}
  ngOnDestroy() {
    console.log('ngondestroy');
  }
  async fetchStores() {
    this._helper.dispatchLoading(true);
    const result = await this._storeService.fetchStores();
    this._helper.dispatchLoading(false);
    this.stores = handleResponseBody(result);
  }

  async createStore() {
    console.log('MAKE STORE');
  }

  clickStore(storeID: string, storeName: string) {
    const data = { storeId: storeID, storeName: storeName };
    this._store.dispatch(setActiveStore({ storeData: data }));
    this._cookieService.set('storeid', storeID);
  }
}
