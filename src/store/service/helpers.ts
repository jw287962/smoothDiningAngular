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
    this.dispatchLoading(false);
    if (!result.ok) {
      // console.log(responseBody.message);
      // console.log(responseBody);
      this.dispatchLoginFalse();
      throw new Error(responseBody.message);
    } else {
      if (logout) {
        this.dispatchLoginFalse();
      } else {
        this.dispatchLoginTrue();
      }
      return responseBody.result || responseBody.message;
    }
  }
}
