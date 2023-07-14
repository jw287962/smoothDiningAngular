import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectShiftNumber,
  selectStoreDate,
} from 'src/store/reducers/auth.reducer';
import { StoreApiService } from 'src/store/service/store.service';
import {
  fixDateTimeOffset,
  getActiveWaiterFromShiftNumber,
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
}
