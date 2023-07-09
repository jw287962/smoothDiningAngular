import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  increment,
  loadingPage,
  loginFalse,
  loginTrue,
  setActiveStore,
} from '../actions/auth.action';

export type activeStore = {
  storeId: string;
  storeName: string;
};
export interface State {
  login: boolean;
  activeStore: activeStore;
  counter: number;
  loading: boolean;
}
export const initialState: State = {
  login: false,
  activeStore: { storeId: '', storeName: '' },

  counter: 0,
  loading: false,
};

//

export const AuthReducer = createReducer(
  initialState,
  on(loginTrue, (state) => ({ ...state, login: true })),
  on(loginFalse, (state) => ({ ...state, login: false })),
  on(setActiveStore, (state, { storeData }) => ({
    ...state,
    activeStore: storeData,
  })),
  on(increment, (state) => ({ ...state, counter: state.counter + 1 })),
  on(loadingPage.updateLoading, (state, { loading }) => ({
    ...state,
    loading: loading,
  }))
);
// const selectState = (state: State) => state;
// export const selectState = (state: State) => state;
export const selectState = createFeatureSelector<State>('state');
export const selectCounter = createSelector(selectState, (state: State) => {
  console.log(state);
  return state.counter;
});
// export const selectLogin = createFeatureSelector<State>('login');
// export const selectStoreId = createFeatureSelector<State>('counter');
// Selector to get the login property from the auth state

export const selectLoginBoolean = createSelector(
  selectState,
  (state: State) => {
    return state.login;
  }
);
export const selectLoadingBoolean = createSelector(
  selectState,
  (state: State) => {
    return state.loading;
  }
);

export const selectStoreData = createSelector(selectState, (state: State) => {
  return state.activeStore;
});
// selectLoginBoolean(initialState);
