import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavComponent } from './nav/nav.component';
import { AuthModule } from './auth/auth.module';

import { getBaseHref } from 'base-href';
import { APP_BASE_HREF } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthReducer } from 'src/store/reducers/auth.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CurrStoreModule } from './curr-store/curr-store.module';
@NgModule({
  declarations: [AppComponent, NavComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    StoreModule.forRoot({ state: AuthReducer }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    CurrStoreModule,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: getBaseHref() }],
  bootstrap: [AppComponent],
})
export class AppModule {}
// {
//   metaReducers,
// }
