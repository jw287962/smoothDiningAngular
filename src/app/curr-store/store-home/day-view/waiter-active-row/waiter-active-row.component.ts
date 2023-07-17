import { Component, Input } from '@angular/core';
import {
  partyInterface,
  shiftInterface,
  waiterInterface,
} from 'src/store/service/types';

@Component({
  selector: 'app-waiter-active-row',
  templateUrl: './waiter-active-row.component.html',
  styleUrls: ['./waiter-active-row.component.css'],
})
export class WaiterActiveRowComponent {
  @Input() waiter!: shiftInterface;
  @Input() showShifts: boolean = false;

  shiftID: string = '';

  viewCurrentPartyDetail: partyInterface = {
    name: '',
    partySize: 0,
    phoneNumber: '',
    reservationDate: '',
  };
  constructor() {}

  ngOnInit() {
    this.shiftID = this.waiter._id;

    // this.waiter.shiftTables.fill(1, this.waiter.shiftTables.length, 20);
    const currLength = this.waiter.shiftTables.length;
    for (let i = currLength; i < 24; i++) {
      // if (i < 5) {
      //   this.waiter.shiftTables.push({
      //     name: 'test',
      //     partySize: 5,
      //     phoneNumber: '',
      //     reservationDate: '07-15-2023',
      //   });
      // } else
      this.waiter.shiftTables.push({});
    }
  }

  set setCurrentParty(party: partyInterface) {
    this.viewCurrentPartyDetail = party;
  }

  processWaiterClick(reservation: partyInterface) {
    if (!reservation?.partySize) {
      console.log('add new party to waiter on shiftNumber:', this.shiftID);
    } else {
      console.log(reservation);

      console.log('edit the party data');
    }
  }
}
