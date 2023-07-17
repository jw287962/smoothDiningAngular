import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addHours, format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subscription } from 'rxjs';
import { setActiveDate } from 'src/store/actions/auth.action';
import {
  State,
  activeStore,
  selectStoreData,
} from 'src/store/reducers/auth.reducer';
import { StoreApiService } from 'src/store/service/store.service';
import { formatYYYYMMDD } from 'src/store/service/types';

@Component({
  selector: 'app-store-home',
  templateUrl: './store-home.component.html',
  styleUrls: ['./store-home.component.css'],
})
export class StoreHomeComponent {
  private _date: string = format(new Date(), 'yyyy-MM-dd');
  storeData$: Observable<activeStore> = this._store.select(selectStoreData);
  storeDataSubscription: Subscription;
  toggleMini: boolean = false;
  lastStoreData: activeStore = { storeId: '', storeName: '' };

  routerLink: string = '/store/home';
  constructor(
    private _store: Store<State>,
    private _storeService: StoreApiService,
    private router: Router
  ) {
    this.toggleMini = false;

    this.storeDataSubscription = this.storeData$.subscribe(async (data) => {
      this.lastStoreData = data;
      // I can check data bfore dispatch for change.
      // console.log(result);
    });
  }
  async ngOnInit() {
    if (this.lastStoreData.storeId === '') {
      // on refresh it should be empty
      const result = await this._storeService.fetchStore();
      this.lastStoreData = result;
    }
  }
  ngOnDestroy() {
    this.storeDataSubscription.unsubscribe();
  }
  date() {
    return this._date;
  }

  handleDateUpdate(e: any) {
    this._date = formatYYYYMMDD(e.target.value);
    this._store.dispatch(setActiveDate.updateDate({ date: this._date }));
  }

  processView() {
    this.toggleMini = !this.toggleMini;
  }

  onStoreHome() {
    this.toggleMini = false;
    let string = '';
    if (this.router.url != '/store/home') {
      string = '/store/home';
    } else {
      string = '/home';
    }

    this.router.navigate([string]);
    // this.onRouterLinkActive();
  }
  // onRouterLinkActive(e: boolean) {
  //   console.log(e);
  //   if (!e) {
  //     this.toggleMini = true;
  //   } else {
  //     this.toggleMini = false;
  //   }
  // }
  updateToggleMini() {
    this.toggleMini = true;
  }
}
