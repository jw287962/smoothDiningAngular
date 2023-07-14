import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  shiftNumber,
  toggleBackgroundHidden,
} from 'src/store/actions/auth.action';
import {
  selectShiftNumber,
  selectStoreDate,
} from 'src/store/reducers/auth.reducer';
import { StoreApiService } from 'src/store/service/store.service';
import {
  fixDateTimeOffset,
  getActiveWaiterFromShiftNumber,
  partyInterface,
  shiftInterface,
  waiterInterface,
} from 'src/store/service/types';

@Component({
  selector: 'app-workstation',
  templateUrl: './workstation.component.html',
  styleUrls: ['./workstation.component.css'],
})
export class WorkstationComponent {
  activeWaiter: shiftInterface[] = [];
  date: Observable<string> = this._store.select(selectStoreDate);
  activeDate: string = '';
  shiftNumber: Observable<number> = this._store.select(selectShiftNumber);
  activeShiftNumber: number = 0;

  showParty: boolean = false;
  constructor(private _store: Store, private _storeAPI: StoreApiService) {
    this.date.subscribe(async (date) => {
      this.activeDate = date;
    });
    this.shiftNumber.subscribe((num) => {
      this.activeShiftNumber = num;
    });

    // this._store
  }

  ngOnInit() {
    this.getActiveWaiters();
  }

  ngOnDestroy() {
    this._store.dispatch(shiftNumber({ shiftNumber: this.activeShiftNumber }));
  }

  async getActiveWaiters() {
    const result = await this._storeAPI.getCurrentShift(
      fixDateTimeOffset(this.activeDate)
    );
    console.log('resut', result);

    this.activeWaiter = getActiveWaiterFromShiftNumber(
      result,
      this.activeShiftNumber
    );
  }

  dispatchBackground = () => {
    if (this.showParty) {
      this._store.dispatch(toggleBackgroundHidden.setTrue());
    } else {
      this._store.dispatch(toggleBackgroundHidden.setFalse());
    }
  };
  togglePartyForm = () => {
    this.showParty = !this.showParty;

    this.dispatchBackground();
  };

  increaseShiftNumber() {
    if (this.activeWaiter.length === 0) {
      return;
    }
    console.log('increase');
  }
  decreaseShiftNumber() {
    if (this.activeShiftNumber === 0) {
      return;
    }

    console.log('decreaseShift');
  }
}
