import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreViewComponent } from './store-view/store-view.component';
import { DayViewComponent } from './day-view/day-view.component';
import { StoreHomeComponent } from './store-home/store-home.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  {
    path: 'store',
    component: StoreHomeComponent,
    children: [
      {
        path: 'day',
        component: DayViewComponent,
      },
      {
        path: 'home',
        component: StoreViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrStoreRoutingModule {}
