import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  State,
  activeStore,
  selectStoreData,
} from 'src/store/reducers/auth.reducer';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-store-view',
  templateUrl: './store-view.component.html',
  styleUrls: ['./store-view.component.css'],
})
export class StoreViewComponent {
  private _date: string = moment().format('yyyy-MM-DD');
  storeData$: Observable<activeStore> = this._store.select(selectStoreData);

  constructor(private _store: Store<State>) {}

  date() {
    return this._date;
  }
  handleViewDate() {
    console.log(this._date);
    this._date;
  }

  handleDateUpdate(e: any) {
    this._date = moment(`${e.target.value}`).format('yyyy-MM-DD');
  }
}
