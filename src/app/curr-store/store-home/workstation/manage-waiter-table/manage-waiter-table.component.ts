import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { StoreApiService } from 'src/store/service/store.service';
import { identifierShift, partyInterface } from 'src/store/service/types';

@Component({
  selector: 'app-manage-waiter-table',
  templateUrl: './manage-waiter-table.component.html',
  styleUrls: ['./manage-waiter-table.component.css'],
})
export class ManageWaiterTableComponent {
  @Output() toggleView = new EventEmitter<string>();
  @Input() activeParties!: partyInterface[];
  @Input() shiftDataID!: identifierShift;
  loading: boolean = false;
  constructor(private _storeAPI: StoreApiService) {}

  toggleDisplayShifts(string: string) {
    this.loading = false;
    this.toggleView.emit(string);
  }

  async addPartytoShift(party: partyInterface) {
    return await this._storeAPI.addPartytoShiftID({
      shiftID: this.shiftDataID._id,
      partyID: party._id,
      partySize: party.partySize,
    });
  }
  async processPartyChoiceMain(event: partyInterface) {
    this.loading = true;

    const result = await this.addPartytoShift(event);
    this.toggleDisplayShifts('success');
  }
  async processPartyId(party: partyInterface) {
    const result = await this.addPartytoShift(party);

    console.log(
      party._id,
      'use the party and the shiftId from input ' + this.shiftDataID
    );
  }
  processError(e: string) {
    console.log(e, 'this is the error or sucess messages');
  }
}
