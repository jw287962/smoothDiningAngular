import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectStoreDate } from 'src/store/reducers/auth.reducer';
import { StoreApiService } from 'src/store/service/store.service';
import {
  fixDateTimeOffset,
  formatYYYYMMDD,
  handleResponseBody,
} from 'src/store/service/types';

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

  errorMessage: string = '';
  @Output() error = new EventEmitter<string>();
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
      datetime: [''],
    });

    // this.shiftNumber.subscribe((num) => {
    //   this.activeShiftNumber = num;
    // });

    // this._store
  }

  get partySize() {
    return this.partyFormGroup.get('size')?.value;
  }
  get name() {
    return this.partyFormGroup.get('name')?.value;
  }
  get phone() {
    return this.partyFormGroup.get('phone')?.value;
  }
  get getDate() {
    return this.partyFormGroup.get('date')?.value;
  }
  get getDateTime() {
    return this.partyFormGroup.get('datetime')?.value;
  }
  updatePartySize(number: number) {
    this.partyFormGroup.patchValue({ size: number });
  }
  toggleInfo(show: boolean) {
    this.showInfo = show;
  }
  addPartySize(number: number) {
    // UPDATE FORM  DATA
    const value = this.partySize;
    const update = value + number;

    if (value != undefined && update >= 1) {
      this.partyFormGroup.patchValue({
        size: update,
      });
    }
  }

  async addParty(generic: boolean = false) {
    try {
      if (!(this.name || this.phone || this.getDate)) {
        generic = true;
      }
      const partyData = {
        name: this.name || undefined,
        partySize: this.partySize,
        phoneNumber: this.phone || undefined,
        reservationDate: formatYYYYMMDD(this.getDate) || undefined,
        reservationDateTime: new Date(),
      };
      if (this.getDateTime) {
        const time = this.getDateTime.split(':');
        // console.log(parseInt(time[0]), parseInt(time[1]));
        const date = fixDateTimeOffset(this.getDate);
        date.setHours(parseInt(time[0]), parseInt(time[1]));
        partyData.reservationDateTime = date;
        // console.log(partyData.reservationDateTime);
      }

      const result = await this._storeAPI.createParty(generic, partyData);
      const error = result.message || result['0'].msg;
      this.error.emit(result.message || '');
      setTimeout(() => {
        this.error.emit('');
      }, 5000);
      if ((result.message as string)?.includes('Created')) {
        this.togglePartyForm();
      } else {
        this.errorMessage = error;
      }
    } catch (e) {
      console.log(e);
    }
  }
}
