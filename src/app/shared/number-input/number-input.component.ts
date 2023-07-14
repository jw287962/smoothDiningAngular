import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.css'],
})
export class NumberInputComponent {
  @Input() label: string = '';
  @Input() for: string = '';

  @Input() minimum: number = 0;

  @Output() numberEmit = new EventEmitter<number>();
  number: number = 1;

  constructor() {
    this.numberEmit.emit(this.number);
  }

  addNumberValue(number: number) {
    if (this.number === this.minimum && number === -1) {
      return;
    }
    this.number += number;
    this.numberEmit.emit(this.number);
  }
}
