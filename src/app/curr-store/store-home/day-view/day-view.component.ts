import { ChangeDetectorRef, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { shiftNumber } from 'src/store/actions/auth.action';
import { selectStoreDate } from 'src/store/reducers/auth.reducer';
import { StoreApiService } from 'src/store/service/store.service';
import {
  fixDateTimeOffset,
  getActiveWaiterFromShiftNumber,
  handleResponseBody,
  shiftInterface,
  waiterInterface,
} from 'src/store/service/types';
@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css'],
})
export class DayViewComponent {
  // maybe I can make key value pairs of name: {waiterInterface}
  waiters?: waiterInterface[];
  filteredWaiter?: waiterInterface[];
  dailyActiveWaiter: shiftInterface[] = [];

  activeWaiterShiftData = [];

  timeout?: any;

  searchName: string = '';
  shiftNumber: number = 0;
  sectionNumber: number = 1;
  displayShiftNumber: number = 0;

  activeDate: Observable<string> = this._store.select(selectStoreDate);
  formError: string = '';

  activeDateCopy: string = '';
  constructor(
    private _store: Store,
    private _storeService: StoreApiService,
    private cdr: ChangeDetectorRef
  ) {
    this.fetchWaiters();
    this.getActiveWaiters();
  }
  getActiveWaiters() {
    this.activeDate.subscribe(async (date) => {
      this.activeWaiterShiftData = await this._storeService.getCurrentShift(
        fixDateTimeOffset(date)
      );
      this.activeDateCopy = date;
      this.dailyActiveWaiter = getActiveWaiterFromShiftNumber(
        this.activeWaiterShiftData,
        this.displayShiftNumber
      );
      // try {
      //   this.dailyActiveWaiter = [...result.result?.[this.shiftNumber]];
      // } catch (e) {
      //   this.dailyActiveWaiter = [];
      // }

      this.displayShiftNumber = this.shiftNumber;
    });

    // this.cdr.detectChanges();
  }

  handleValue(e: any) {
    console.log(e);
    this.sectionNumber = e;
  }
  async fetchWaiters() {
    try {
      const result = await this._storeService.fetchWaiters();
      if (result.error) {
        console.log(result);
      } else {
        this.waiters = handleResponseBody(result);
        this.filteredWaiter = handleResponseBody(result);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async ngOnInit() {}

  processChangeSearchName(e: Event) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    const search = (e?.target as HTMLInputElement).value.toLowerCase();

    this.timeout = setTimeout(() => {
      this.filteredWaiter = this.waiters?.filter((ele) => {
        return ele.name.toLowerCase().indexOf(search) != -1;
      });
    }, 300);
  }

  clickPerson(name: string) {
    this.searchName = name;
  }

  // updateSectionNumber(e: any) {
  //   this.sectionNumber = e.target.value;
  // }

  async addActiveToday(e: Event, sectionNumber: number) {
    e.preventDefault();
    console.log('add active today', sectionNumber);
    // }
    const found = this.filteredWaiter?.find((ele) => {
      return ele.name === this.searchName;
    });

    if (found) {
      // this.dailyActiveWaiter.push(found);
      const result = await this._storeService.createWaiterShift(
        found._id,
        this.shiftNumber,
        sectionNumber,
        fixDateTimeOffset(this.activeDateCopy)
      );
      console.log('result', result);

      this.formError = handleResponseBody(result, true);

      // and make a post request to create new shift for person .
    }
    this.getActiveWaiters();
  }

  subtractShiftNumber() {
    if (this.shiftNumber <= 0) {
      return;
    }
    this.shiftNumber--;
  }
  addSectionNumber(number: number) {
    if (this.sectionNumber === 0 && number === -1) {
      return;
    }
    this.sectionNumber += number;
  }
  addShiftNumber() {
    this.shiftNumber++;
  }

  updateShift() {
    this.displayShiftNumber = this.shiftNumber;
    this.dailyActiveWaiter = getActiveWaiterFromShiftNumber(
      this.activeWaiterShiftData,
      this.displayShiftNumber
    );
    this._store.dispatch(shiftNumber({ shiftNumber: this.displayShiftNumber }));
  }

  minimize() {}
}
