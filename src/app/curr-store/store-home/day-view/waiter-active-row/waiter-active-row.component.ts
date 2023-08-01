import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  identifierShift,
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
  @Input() isMin: boolean = false;
  shiftTables: any = [];

  shiftID: string = '';
  @Output() clickedShiftID = new EventEmitter<identifierShift>();
  // @Output() sectionNumber = new EventEmitter<shift>();

  viewCurrentPartyDetail: partyInterface = {
    name: '',
    partySize: 0,
    phoneNumber: '',
    reservationDate: '',
  };
  constructor(private _router: Router) {}

  ngOnInit() {
    this.shiftID = this.waiter._id;
    this.shiftTables = [...this.waiter?.shiftTables];
    // this.waiter.shiftTables.fill(1, this.waiter.shiftTables.length, 20);
    const currLength = this.waiter.shiftTables.length;
    for (let i = currLength; i < 24; i++) {
      this.shiftTables.push({});
    }
  }

  set setCurrentParty(party: partyInterface) {
    this.viewCurrentPartyDetail = party;
  }

  processWaiterClick(reservation: partyInterface) {
    if (!reservation?.partySize) {
      const shift = { _id: this.waiter._id, section: this.waiter.section };
      this.clickedShiftID.emit(shift);
    } else {
      console.log(reservation);

      console.log('edit the party data');
    }
  }

  navigateAddWaiterRoute(name: string) {
    if (name.includes('Add Waiter')) this._router.navigate(['/store/day']);
  }
}
