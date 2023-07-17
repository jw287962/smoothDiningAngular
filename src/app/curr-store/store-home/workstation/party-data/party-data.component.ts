import { Component, EventEmitter, Input, Output } from '@angular/core';
import { partyInterface } from 'src/store/service/types';

@Component({
  selector: 'app-party-data',
  templateUrl: './party-data.component.html',
  styleUrls: ['./party-data.component.css'],
})
export class PartyDataComponent {
  @Input() party!: partyInterface;
  @Input() index!: number;
  @Input() minimum: number = 10;
  @Input() buttonValue: string = 'Edit';

  @Output() partyChoice = new EventEmitter<partyInterface>();
  displayToggle: boolean = false;
  ngOnInit() {}
  displayPartyData(e: MouseEvent, boolean: boolean = false) {
    // console.log(e);
    // const ele = e.target as HTMLElement;
    // // ele.scrollIntoView({
    // // behavior: 'smooth',
    // // block: 'start',
    // // inline: 'center',
    // // });
    // // ele.scroll({
    // //   top: 0,
    // //   left: 1000,
    // //   behavior: 'smooth',
    // // });
    this.displayToggle = boolean;
  }

  convertToLocalTime(string: any) {
    const time = new Date(string).toLocaleTimeString();
    return time.substring(0, time.length - 6) + time.substring(time.length - 2);
  }

  updateStatusCancel(e: MouseEvent) {
    console.log('Status Update: Canceled!');
  }

  processPartyChoiceEmit() {
    if (this.buttonValue === 'Edit') {
      console.log('edit');
    } else if (this.buttonValue === 'Choose') {
      console.log('Choose');
      this.partyChoice.emit(this.party);
    }
  }
}
