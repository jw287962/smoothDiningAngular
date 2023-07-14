import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectBackgroundView } from 'src/store/reducers/auth.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'SmoothDiningAngular';
  toggleBackground: Observable<boolean> =
    this._store.select(selectBackgroundView);
  constructor(private _store: Store) {}
}
