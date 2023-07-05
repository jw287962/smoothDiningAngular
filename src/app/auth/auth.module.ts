import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, AppRoutingModule, ReactiveFormsModule],
})
export class AuthModule {}
