import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { FormErrorComponent } from '../form-error/form-error.component';
@NgModule({
  declarations: [LoginComponent, FormErrorComponent],
  imports: [CommonModule, AppRoutingModule, ReactiveFormsModule],
})
export class AuthModule {}
