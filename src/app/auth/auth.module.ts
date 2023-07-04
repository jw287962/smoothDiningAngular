import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';

import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AppRoutingModule],
})
export class AuthModule {}
