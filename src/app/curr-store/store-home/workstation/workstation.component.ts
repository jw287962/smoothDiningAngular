import { Component, SimpleChange, SimpleChanges } from '@angular/core';
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
  handleResponseBody,
  partyInterface,
  shiftInterface,
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

  nextParties: partyInterface[] = [];

  currentShiftData: [] = [];
  showParty: boolean = false;
  constructor(private _store: Store, private _storeAPI: StoreApiService) {
    // this._store
  }

  ngOnInit() {
    this.date.subscribe(async (date) => {
      this.activeDate = date;
    });
    this.shiftNumber.subscribe((num) => {
      this.activeShiftNumber = num || 0;

      this.activeWaiter = getActiveWaiterFromShiftNumber(
        this.currentShiftData,
        this.activeShiftNumber
      );
    });
    this.getPartyData();
    this.getActiveWaiters();
  }
  ngDoCheck() {}
  ngOnDestroy() {
    this._store.dispatch(shiftNumber({ shiftNumber: this.activeShiftNumber }));
  }
  async getPartyData() {
    const result = await this._storeAPI.getParties(this.activeDate);
    this.nextParties = handleResponseBody(result);
  }
  async getActiveWaiters() {
    this.currentShiftData = await this._storeAPI.getCurrentShift(
      fixDateTimeOffset(this.activeDate)
    );
    // console.log('resut', this.currentShiftData);

    this.activeWaiter = getActiveWaiterFromShiftNumber(
      this.currentShiftData,
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
    if (this.activeShiftNumber === 5) {
      return;
    }
    this._store.dispatch(
      shiftNumber({ shiftNumber: this.activeShiftNumber + 1 })
    );
  }
  decreaseShiftNumber() {
    if (this.activeShiftNumber === 0) {
      return;
    }
    this._store.dispatch(
      shiftNumber({ shiftNumber: this.activeShiftNumber - 1 })
    );
  }

  displayPartyData() {
    console.log(
      'will display party data  | maybe a new component with @input of data'
    );
  }

  convertToLocalTime(string: any) {
    const time = new Date(string).toLocaleTimeString();
    return time.substring(0, time.length - 6) + time.substring(time.length - 2);
  }
}
