import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { FormErrorComponent } from './form-error/form-error.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [LoginComponent, FormErrorComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
})
export class AuthModule {}
