import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadingPage, loginFalse, loginTrue } from '../actions/auth.action';

@Injectable({
  providedIn: 'root',
})
export class Helper {
  constructor(private store: Store) {}

  dispatchLoginTrue() {
    // if(this.store.select())
    this.store.dispatch({ type: '[auth Component] loginTrue' });
  }
  dispatchLoginFalse() {
    this.store.dispatch(loginFalse());
  }
  dispatchLoading(state: boolean) {
    this.store.dispatch(loadingPage.updateLoading({ loading: state }));
  }

  manageError(responseBody: any, result: any, logout: boolean = false) {
    const value =
      responseBody.result || responseBody.message || responseBody.error;
    this.dispatchLoading(false);
    // console.log(result);
    // console.log(responseBody);
    if (!result.ok) {
      if (result.status === 401) this.dispatchLoginFalse();
      throw new Error(value);
    } else {
      if (logout) {
        this.dispatchLoginFalse();
      } else {
        this.dispatchLoginTrue();
      }
      return value;
    }
  }
}
