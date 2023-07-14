import { Component, Input } from '@angular/core';
import { shiftInterface, waiterInterface } from 'src/store/service/types';

@Component({
  selector: 'app-waiter-active-row',
  templateUrl: './waiter-active-row.component.html',
  styleUrls: ['./waiter-active-row.component.css'],
})
export class WaiterActiveRowComponent {
  @Input() waiter!: shiftInterface;
  @Input() showShifts: boolean = false;
  constructor() {
    // console.log(this.waiter);
    // console.log(this.waiter?.waiter?.[0]);
  }

  ngOnInit() {
    console.log(this.showShifts);
    // this.waiter.shiftTables.fill(1, this.waiter.shiftTables.length, 20);
    const currLength = this.waiter.shiftTables.length;
    for (let i = currLength; i < 30; i++) {
      this.waiter.shiftTables.push({});
    }

    console.log(this.waiter);
  }
}