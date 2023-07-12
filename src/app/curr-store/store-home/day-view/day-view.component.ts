import { Component } from '@angular/core';
import { EventType } from '@angular/router';
import { StoreApiService } from 'src/store/service/store.service';
import { handleResponseBody, waiterInterface } from 'src/store/service/types';
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
  currentShiftNumber: number = 0;
  sectionNumber: number = 0;
  dailyActiveWaiter: waiterInterface[] = [];

  formError: string = '';

  constructor(private _storeService: StoreApiService) {
    this.fetchWaiters();
    this.getActiveWaiters();
  }
  async getActiveWaiters() {
    const result = await this._storeService.getCurrentShift();
    console.log(result);
    this.dailyActiveWaiter.push(result[this.currentShiftNumber]);
  }
  async fetchWaiters() {
    try {
      const result = await this._storeService.fetchWaiters();
      if (result.error) {
        console.log(result);
      } else {
        this.waiters = result.result;
        this.filteredWaiter = result.result;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async ngOnInit() {}

  processChange(e: Event) {
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

  async addActiveToday(e: Event, shiftSection: number) {
    e.preventDefault();
    // if (
    //   this.dailyActiveWaiter.some((ele) => {
    //     return ele.name === this.searchName;
    //   })
    // ) {
    //   console.log('repeat');
    //   return;
    // }
    const found = this.filteredWaiter?.find((ele) => {
      return ele.name === this.searchName;
    });

    if (found) {
      // this.dailyActiveWaiter.push(found);
      const result = await this._storeService.createWaiterShift(
        found._id,
        this.currentShiftNumber,
        shiftSection
      );
      this.formError = handleResponseBody(result);

      // and make a post request to create new shift for person .
    }
    this.getActiveWaiters();
  }
}
