import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  FormAuth: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _storeService: StoreApiService,
    private _store: Store<State>,
    private _cookieService: CookieService,
    private _helper: Helper
  ) {
    this.fetchStores();

    this.FormAuth = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });
  }
  get nameStore() {
    return this.FormAuth?.get('name');
  }
  get address() {
    return this.FormAuth?.get('address');
  }
  get state() {
    return this.FormAuth?.get('state');
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

  async createStore(e: MouseEvent) {
    e.preventDefault();
    const body = {
      name: this.nameStore?.value,
      address: this.address?.value,
      state: this.state?.value,
    };
    this._helper.dispatchLoading(true);
    this._storeService.createStore(body);
    // this._helper.dispatchLoading(false);
    this.fetchStores();
  }

  clickStore(storeID: string, storeName: string) {
    const data = { storeId: storeID, storeName: storeName };
    this._store.dispatch(setActiveStore({ storeData: data }));
    this._cookieService.set('storeid', storeID);
  }
}
