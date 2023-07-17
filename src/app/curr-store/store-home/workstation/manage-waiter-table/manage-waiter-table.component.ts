import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
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
  constructor() {}

  processUpdateShifttable() {
    this.toggleView.emit(false);
  }

  processPartyChoiceMain(event: partyInterface) {
    console.log('identifier', this.shiftDataID);
    console.log(event, 'party choice');
    this.loading = true;
    setTimeout(() => this.processUpdateShifttable(), 1000);
    // this.processUpdateShifttable();
  }
}
