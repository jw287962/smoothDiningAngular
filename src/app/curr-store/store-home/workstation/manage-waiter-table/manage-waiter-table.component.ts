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
  @Output() toggleView = new EventEmitter<boolean>();
  @Input() activeParties!: partyInterface[];
  @Input() shiftDataID!: identifierShift;
  loading: boolean = false;
  constructor(private _storeAPI: StoreApiService) {}

  processUpdateShifttable() {
    this.toggleView.emit(false);
  }

  async addPartytoShift(party: partyInterface) {
    return await this._storeAPI.addPartytoShiftID({
      shiftID: this.shiftDataID._id,
      partyID: party._id,
    });
  }
  async processPartyChoiceMain(event: partyInterface) {
    const result = await this.addPartytoShift(event);

    this.loading = true;
    // toggle loading screen
    setTimeout(() => this.processUpdateShifttable(), 1000);
    // this.processUpdateShifttable();
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
