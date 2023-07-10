import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addHours, format } from 'date-fns';
import { Observable, Subscription } from 'rxjs';
import {
  State,
  activeStore,
  selectStoreData,
} from 'src/store/reducers/auth.reducer';
import { StoreApiService } from 'src/store/service/store.service';

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

  constructor(
    private _store: Store<State>,
    private _storeService: StoreApiService
  ) {
    this.storeDataSubscription = this.storeData$.subscribe(async (data) => {
      if (data.storeId === '') {
        const result = await this._storeService.fetchStore();

        // console.log(result);
      }
    });
  }

  date() {
    return this._date;
  }

  handleDateUpdate(e: any) {
    this._date = format(
      addHours(new Date(`${e.target.value}`), 5),
      'yyyy-MM-dd'
    );
  }

  processView() {
    this.toggleMini = !this.toggleMini;
  }
}