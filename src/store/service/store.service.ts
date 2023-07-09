import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getBackEndHref } from 'base-href';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class storeApiService {
  constructor(private cookieService: CookieService, private store: Store) {}

  
}
