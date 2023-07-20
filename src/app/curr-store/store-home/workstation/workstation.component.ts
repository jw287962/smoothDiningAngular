import { Component, SimpleChange, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  loadingPage,
  shiftNumber,
  toggleBackgroundHidden,
} from 'src/store/actions/auth.action';
import {
  selectLoadingBoolean,
  selectShiftNumber,
  selectStoreDate,
} from 'src/store/reducers/auth.reducer';
import { Helper } from 'src/store/service/helpers';
import { StoreApiService } from 'src/store/service/store.service';
import {
  fixDateTimeOffset,
  getActiveWaiterFromShiftNumber,
  handleResponseBody,
  identifierShift,
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
  fillerData: shiftInterface;
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
  minTable: number = 0;
  loading: Observable<boolean> = this._store.select(selectLoadingBoolean);
  private _timer: any;
  constructor(
    private _store: Store,
    private _storeAPI: StoreApiService,
    private _helper: Helper
  ) {
    this.fillerData = {
      _id: '64b5942227f0001c460024',
      date: new Date(),
      section: 1,
      store: '649e05b1509a6fa8fe07ccd2',
      shiftNumber: 0,
      shiftTables: [],
      waiter: [
        {
          _id: '64ab8cfaee668a666d30442a',
          name: 'Add Waiter',
          birthdate: '1997-01-01T00:00:00.000Z',
          preferences: {
            maxActiveTableForPermission: 6,
          },
          store: '649e05b1509a6fa8fe07ccd2',
          status: true,
          __v: 0,
        },
      ],
    };
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

      // this.activeWaiter = getActiveWaiterFromShiftNumber(
      //   this.currentShiftData,
      //   this.activeShiftNumber
      // );
    });
    this.getPartyData();
    this.getActiveWaiters();
  }
  // ngDoCheck() {}
  ngOnDestroy() {
    clearInterval(this._timer);
    this._store.dispatch(shiftNumber({ shiftNumber: this.activeShiftNumber }));
  }
  async getPartyData() {
    try {
      this._helper.dispatchLoading(true);
      const result = await this._storeAPI.getParties(this.activeDate);
      this._helper.dispatchLoading(false);
      this.activeParties = handleResponseBody(result);
    } catch (e) {
      console.log('getPartyData @ workstation.component', e);
    }
  }
  async getActiveWaiters() {
    this._helper.dispatchLoading(true);
    this.currentShiftData = await this._storeAPI.getCurrentShift(
      fixDateTimeOffset(this.activeDate)
    );
    console.log(this.currentShiftData);

    this._helper.dispatchLoading(false);
    // console.log('resut', this.currentShiftData);

    this.activeWaiter = getActiveWaiterFromShiftNumber(
      this.currentShiftData,
      this.activeShiftNumber
    );
    // this.activeWaiter.forEach((ele) => {
    //   console.log(this.minTable);

    //   this.minArrayLength(ele);
    // });
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

  processClickedShiftBox(e: any) {
    // show the Form for adding party to shift User
    this.shiftDataID = e;
    this.toggleAddPartyView = true;
    this._store.dispatch(toggleBackgroundHidden.setTrue());
  }

  emitPartyClickedforShift(e: any) {
    if (e === 'success') {
      this.getActiveWaiters();
    }
    this.toggleAddPartyView = false;
    this._store.dispatch(toggleBackgroundHidden.setFalse());
  }

  minArrayLength(activeWorker: shiftInterface) {
    this.minTable = Math.min(activeWorker.shiftTables.length, this.minTable);
  }
  getShiftTablesLength(activeWorker: shiftInterface) {
    // console.log(activeWorker.shiftTables.length);
    return activeWorker.shiftTables.length;
  }
}
