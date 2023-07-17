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
  identifierShift,
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

  activeParties: partyInterface[] = [];

  currentShiftData: [] = [];
  showParty: boolean = false;

  createPartyError: string = '';
  currentTime: string = new Date().toLocaleTimeString();

  toggleAddPartyView: boolean = false;

  shiftDataID!: identifierShift;
  private _timer: any;
  constructor(private _store: Store, private _storeAPI: StoreApiService) {
    this._timer = setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString();
    }, 1000);
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
    clearInterval(this._timer);
    this._store.dispatch(shiftNumber({ shiftNumber: this.activeShiftNumber }));
  }
  async getPartyData() {
    const result = await this._storeAPI.getParties(this.activeDate);
    this.activeParties = handleResponseBody(result);
  }
  async getActiveWaiters() {
    this.currentShiftData = await this._storeAPI.getCurrentShift(
      fixDateTimeOffset(this.activeDate)
    );
    console.log('resut', this.currentShiftData);

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

  getTime() {
    return this.currentTime;
  }

  processError(e: string) {
    // error emite from post form

    this.createPartyError = e;
    this.getPartyData();
  }

  processEmitShift(e: any) {
    this.shiftDataID = e;
    this.toggleAddPartyView = true;
    this._store.dispatch(toggleBackgroundHidden.setTrue());

    console.log(e, 'use this emit shift');
  }

  emitShiftProcessFinish(e: any) {
    console.log('false now');
    this.toggleAddPartyView = false;
    this._store.dispatch(toggleBackgroundHidden.setFalse());
  }
}
