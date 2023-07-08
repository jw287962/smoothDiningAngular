import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreViewComponent } from './store-view/store-view.component';
import { ActiveWaiterComponent } from './active-waiter/active-waiter.component';



@NgModule({
  declarations: [
    StoreViewComponent,
    ActiveWaiterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CurrStoreModule { }
