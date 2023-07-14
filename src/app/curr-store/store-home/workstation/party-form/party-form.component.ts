import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectStoreDate } from 'src/store/reducers/auth.reducer';
import { StoreApiService } from 'src/store/service/store.service';
import { formatYYYYMMDD } from 'src/store/service/types';

@Component({
  selector: 'app-party-form',
  templateUrl: './party-form.component.html',
  styleUrls: ['./party-form.component.css'],
})
export class PartyFormComponent {
  @Input() togglePartyForm!: () => void;
  showInfo: boolean = false;
  date: Observable<string> = this._store.select(selectStoreDate);
  activeDate: string = '';
  // shiftNumber: Observable<number> = this._store.select(selectShiftNumber);
  activeShiftNumber: number = 0;
  showParty: boolean = false;
  partyFormGroup: FormGroup;

  constructor(
    private _store: Store,
    private _storeAPI: StoreApiService,
    private formBuilder: FormBuilder
  ) {
    this.date.subscribe(async (date) => {
      this.activeDate = date;
    });

    this.partyFormGroup = this.formBuilder.group({
      name: [''],
      size: [4, Validators.required],
      phone: [''],
      date: [formatYYYYMMDD()],
      datetime: [formatYYYYMMDD()],
    });

    // this.shiftNumber.subscribe((num) => {
    //   this.activeShiftNumber = num;
    // });

    // this._store
  }
  addPartySize(number: number) {
    const value = this.partyFormGroup.get('size')?.value || 0;
    const update = value + number;

    if (value != undefined && update >= 1) {
      this.partyFormGroup.patchValue({
        size: update,
      });
    }
  }
  updatePartySize(number: number) {
    this.partyFormGroup.patchValue({ size: number });
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
    this.togglePartyForm();
  }
}
