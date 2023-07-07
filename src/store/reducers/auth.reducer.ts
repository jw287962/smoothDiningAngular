import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  increment,
  loginFalse,
  loginTrue,
  setActiveStore,
} from '../actions/auth.action';

export interface State {
  login: boolean;
  storeId: string;
  counter: number;
}
export const initialState: State = {
  login: false,
  storeId: '',
  counter: 0,
};

//

export const AuthReducer = createReducer(
  initialState,
  on(loginTrue, (state) => ({ ...state, login: true })),
  on(loginFalse, (state) => ({ ...state, login: false })),
  on(setActiveStore, (state, { storeId }) => ({ ...state, storeId: storeId })),
  on(increment, (state) => ({ ...state, counter: state.counter + 1 }))
);
// const selectState = (state: State) => state;
// export const selectState = (state: State) => state;
export const selectState = createFeatureSelector<State>('state');
export const selectCounter = createSelector(selectState, (state: State) => {
  console.log(state);
  return state.counter;
});
// export const selectLogin = createFeatureSelector<State>('login');
export const selectStoreId = createFeatureSelector<State>('counter');
// Selector to get the login property from the auth state

export const selectLoginBoolean = createSelector(
  selectState,
  (state: State) => {
    console.log(state);
    return state.login;
  }
);

// selectLoginBoolean(initialState);
