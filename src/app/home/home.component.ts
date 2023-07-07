import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, setActiveStore } from 'src/store/actions/auth.action';
import {
  State,
  selectCounter,
  selectLoginBoolean,
} from 'src/store/reducers/auth.reducer';
import { LoginApiService } from 'src/store/service/login.service';
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
    // private cookieService: CookieService,
    private _loginApiService: LoginApiService,
    private _store: Store<State>
  ) {
    this.fetchStores();
  }

  increment() {
    this._store.dispatch(increment());
    // this._store.subscribe((state) => {
    //   console.log(state);
    //   this.count = state.counter;
    // });
  }
  // this.state$ = this._store.pipe(select((state) => state));
  ngOnInit() {}
  ngOnDestroy() {
    console.log('ngondestroy');
  }
  async fetchStores() {
    this.stores = await this._loginApiService.fetchStores();
  }

  async createStore() {
    console.log('MAKE STORE');
  }

  clickStore(storeID: string) {
    this._store.dispatch(setActiveStore({ store: storeID }));
  }
}
