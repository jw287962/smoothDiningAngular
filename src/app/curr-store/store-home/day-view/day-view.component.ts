import { ChangeDetectorRef, Component } from '@angular/core';
import { StoreApiService } from 'src/store/service/store.service';
import {
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
  searchName: string = '';
  timeout?: any;
  shiftNumber: number = 0;
  sectionNumber: number = 1;
  dailyActiveWaiter: shiftInterface[] = [];

  formError: string = '';

  constructor(
    private _storeService: StoreApiService,
    private cdr: ChangeDetectorRef
  ) {
    this.fetchWaiters();
    this.getActiveWaiters();
  }
  async getActiveWaiters() {
    const result = await this._storeService.getCurrentShift(new Date());
    console.log(result);
    this.dailyActiveWaiter = [...result.result[this.shiftNumber]];
    // this.cdr.detectChanges();
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

  updateSectionNumber(e: any) {
    this.sectionNumber = e.target.value;
  }

  async addActiveToday(e: Event, sectionNumber: number) {
    e.preventDefault();
    console.log('add active today');
    // }
    const found = this.filteredWaiter?.find((ele) => {
      return ele.name === this.searchName;
    });

    if (found) {
      // this.dailyActiveWaiter.push(found);
      const result = await this._storeService.createWaiterShift(
        found._id,
        this.shiftNumber,
        sectionNumber
      );
      console.log('result', result);
      this.formError = handleResponseBody(result);

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

  addShiftNumber() {
    this.shiftNumber++;
  }

  updateShift() {
    this.getActiveWaiters();
  }
}
