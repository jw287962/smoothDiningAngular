import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { toggleBackgroundHidden } from 'src/store/actions/auth.action';
import { selectStoreDate } from 'src/store/reducers/auth.reducer';
import { StoreApiService } from 'src/store/service/store.service';

@Component({
  selector: 'app-party-form',
  templateUrl: './party-form.component.html',
  styleUrls: ['./party-form.component.css'],
})
export class PartyFormComponent {
  showInfo: boolean = false;

  date: Observable<string> = this._store.select(selectStoreDate);
  activeDate: string = '';
  // shiftNumber: Observable<number> = this._store.select(selectShiftNumber);
  activeShiftNumber: number = 0;

  showParty: boolean = false;
  constructor(private _store: Store, private _storeAPI: StoreApiService) {
    this.date.subscribe(async (date) => {
      this.activeDate = date;
    });
    // this.shiftNumber.subscribe((num) => {
    //   this.activeShiftNumber = num;
    // });

    // this._store
  }
  toggleInfo(show: boolean) {
    this.showInfo = show;
  }

  addParty(generic: boolean = false) {
    const partyData = {
      name: ',',
      partySize: 1,
      phoneNumber: '1',
      reservationDate: '',
    };
    this._storeAPI.createParty(generic, partyData);
  }
}
