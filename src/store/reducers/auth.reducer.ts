import { createReducer, on } from '@ngrx/store';
import { loginFalse, loginTrue, setActiveStore } from '../actions/auth.action';

export interface State {
  login: boolean;
  storeId: string;
}
export const initialState: State = {
  login: false,
  storeId: '',
};

//

export const counterReducer = createReducer(
  initialState,
  on(loginTrue, (state) => ({ ...state, login: true })),
  on(loginFalse, (state) => ({ ...state, login: false })),
  on(setActiveStore, (state, { storeId }) => ({ ...state, storeId: storeId }))
);
