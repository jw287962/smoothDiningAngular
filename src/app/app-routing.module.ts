import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home', // This is the original '/home' route
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
