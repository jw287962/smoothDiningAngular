import { Component } from '@angular/core';
import { EventType } from '@angular/router';
import { StoreApiService } from 'src/store/service/store.service';
import { waiterInterface } from 'src/store/service/types';
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

  dailyActiveWaiter: waiterInterface[] = [];
  constructor(private _storeService: StoreApiService) {
    this.fetchWaiters();
  }

  async fetchWaiters() {
    const result = await this._storeService.fetchWaiters();
    this.waiters = result;
    this.filteredWaiter = result;
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

  addActiveToday() {
    if (
      this.dailyActiveWaiter.some((ele) => {
        return ele.name === ele.name;
      })
    ) {
      console.log('repeat');
      return;
    }
    const found = this.filteredWaiter?.find((ele) => {
      return ele.name === this.searchName;
    });

    if (found) {
      this.dailyActiveWaiter.push(found);
      // and make a post request to create new shift for person .
    }
  }
}
