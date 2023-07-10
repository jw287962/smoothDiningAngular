import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  State,
  activeStore,
  selectStoreData,
} from 'src/store/reducers/auth.reducer';
// import { format, addHours } from 'date-fns';
import { StoreApiService } from 'src/store/service/store.service';

@Component({
  selector: 'app-store-view',
  templateUrl: './store-view.component.html',
  styleUrls: ['./store-view.component.css'],
})
export class StoreViewComponent {
  // private _date: string = format(new Date(), 'yyyy-MM-dd');
  // storeData$: Observable<activeStore> = this._store.select(selectStoreData);
  // storeDataSubscription: Subscription;
  constructor(
    private _store: Store<State>,
    private _storeService: StoreApiService
  ) {}
}
