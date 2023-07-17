import { Component, EventEmitter, Input } from '@angular/core';
import { identifierShift, partyInterface } from 'src/store/service/types';

@Component({
  selector: 'app-manage-waiter-table',
  templateUrl: './manage-waiter-table.component.html',
  styleUrls: ['./manage-waiter-table.component.css'],
})
export class ManageWaiterTableComponent {
  toggleView = new EventEmitter<boolean>();
  @Input() activeParties!: partyInterface[];
  @Input() shiftDataID!: identifierShift;
  constructor() {}

  processUpdateShifttable() {
    this.toggleView.emit(false);
  }

  processPartyChoiceMain(event: partyInterface) {
    console.log('identifier', this.shiftDataID);
    console.log(event, 'party choice');
  }
}
