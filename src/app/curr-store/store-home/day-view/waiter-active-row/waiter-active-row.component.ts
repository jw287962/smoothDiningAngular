import { Component, Input } from '@angular/core';
import { shiftInterface } from 'src/store/service/types';

@Component({
  selector: 'app-waiter-active-row',
  templateUrl: './waiter-active-row.component.html',
  styleUrls: ['./waiter-active-row.component.css'],
})
export class WaiterActiveRowComponent {
  @Input() waiter: any;
  constructor() {}

  ngInIt() {}
}
