import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavComponent } from './nav/nav.component';
import { AuthModule } from './auth/auth.module';

import { getBaseHref } from 'base-href';
import { APP_BASE_HREF } from '@angular/common';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [AppComponent, NavComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule],
  providers: [{ provide: APP_BASE_HREF, useValue: getBaseHref() }],
  bootstrap: [AppComponent],
})
export class AppModule {}
