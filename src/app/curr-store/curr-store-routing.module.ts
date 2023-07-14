import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreViewComponent } from './store-home/store-view/store-view.component';
import { DayViewComponent } from './store-home/day-view/day-view.component';
import { StoreHomeComponent } from './store-home/store-home.component';
import { WorkstationComponent } from './store-home/workstation/workstation.component';

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
      {
        path: 'workstation',
        component: WorkstationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrStoreRoutingModule {}
