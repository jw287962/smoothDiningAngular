import { Component } from '@angular/core';
import { StoreApiService } from 'src/store/service/store.service';
import { waiterInterface } from 'src/store/service/types';
@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css'],
})
export class DayViewComponent {
  waiters?: waiterInterface[];
  constructor(private _storeService: StoreApiService) {
    this.fetchWaiters();
  }

  async fetchWaiters() {
    const result = await this._storeService.fetchWaiters();
    this.waiters = result;
  }

  async ngOnInit() {}
}
