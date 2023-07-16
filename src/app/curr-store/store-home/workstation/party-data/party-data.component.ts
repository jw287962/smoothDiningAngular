import { Component, Input } from '@angular/core';
import { partyInterface } from 'src/store/service/types';

@Component({
  selector: 'app-party-data',
  templateUrl: './party-data.component.html',
  styleUrls: ['./party-data.component.css'],
})
export class PartyDataComponent {
  @Input() party!: partyInterface;
  @Input() index!: number;
  displayToggle: boolean = false;
  displayPartyData(boolean: boolean = false) {
    this.displayToggle = boolean;
  }

  convertToLocalTime(string: any) {
    const time = new Date(string).toLocaleTimeString();
    return time.substring(0, time.length - 6) + time.substring(time.length - 2);
  }
}
