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
  setActiveDate,
  setActiveStore,
  shiftNumber,
} from '../actions/auth.action';
import { addHours, format } from 'date-fns';

export type activeStore = {
  storeId: string;
  storeName: string;
};
// export type activeWaiters = {
//   waiters:
// };
export interface State {
  login: boolean;
  activeStore: activeStore;
  // activeWaiters: any[];
  shiftNumber: number;
  counter: number;
  loading: boolean;
  selectedDate: string;
}
export const initialState: State = {
  login: false,
  activeStore: { storeId: '', storeName: '' },
  selectedDate: format(new Date(), 'yyyy-MM-dd'),
  counter: 0,
  loading: false,
  shiftNumber: 0,
  // activeWaiters: [],
};

//

export const AuthReducer = createReducer(
  initialState,
  on(loginTrue, (state) => ({ ...state, login: true })),
  on(loginFalse, (state) => ({ ...state, login: false })),
  on(setActiveStore, (state, { storeData }) => {
    if (state.activeStore?.storeId === storeData?.storeId) {
      return state;
    }
    return {
      ...state,
      activeStore: storeData,
    };
  }),
  on(increment, (state) => ({ ...state, counter: state.counter + 1 })),
  on(loadingPage.updateLoading, (state, { loading }) => ({
    ...state,
    loading: loading,
  })),
  on(setActiveDate.updateDate, (state, { date }) => ({
    ...state,
    selectedDate: date,
  })),
  on(shiftNumber, (state, { shiftNumber }) => ({
    ...state,
    shiftNumber: shiftNumber,
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
export const selectStoreDate = createSelector(selectState, (state: State) => {
  return state.selectedDate;
});
export const selectShiftNumber = createSelector(selectState, (state: State) => {
  return state.shiftNumber;
});
