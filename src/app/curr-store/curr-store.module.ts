import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreViewComponent } from './store-home/store-view/store-view.component';
import { DayViewComponent } from './store-home/day-view/day-view.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { CurrStoreRoutingModule } from './curr-store-routing.module';
import { StoreHomeComponent } from './store-home/store-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WaiterActiveRowComponent } from './store-home/day-view/waiter-active-row/waiter-active-row.component';
import { WorkstationComponent } from './store-home/workstation/workstation.component';
import { PartyFormComponent } from './store-home/workstation/party-form/party-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    StoreViewComponent,
    DayViewComponent,
    StoreHomeComponent,
    WaiterActiveRowComponent,
    WorkstationComponent,
    PartyFormComponent,
  ],
  imports: [
    CommonModule,
    CurrStoreRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class CurrStoreModule {}
