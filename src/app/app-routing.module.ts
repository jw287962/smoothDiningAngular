import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { StoreViewComponent } from './curr-store/store-home/store-view/store-view.component';
import { DayViewComponent } from './curr-store/store-home/day-view/day-view.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: '', // Empty path, this will be the new default route
    redirectTo: 'home', // Redirect to the original '/home' route
    pathMatch: 'full', // Make sure the path matches exactly
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
