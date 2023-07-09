import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreViewComponent } from './store-view/store-view.component';
import { ActiveWaiterComponent } from './active-waiter/active-waiter.component';
import { DayViewComponent } from './day-view/day-view.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { CurrStoreRoutingModule } from './curr-store-routing.module';
import { StoreHomeComponent } from './store-home/store-home.component';

@NgModule({
  declarations: [StoreViewComponent, ActiveWaiterComponent, DayViewComponent, StoreHomeComponent],
  imports: [CommonModule, CurrStoreRoutingModule],
})
export class CurrStoreModule {}
