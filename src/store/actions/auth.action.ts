import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';

export const loginTrue = createAction('[auth Component] loginTrue');
export const loginFalse = createAction('[auth Component] loginFalse');

export const setActiveStore = createAction(
  '[Click Store] setActiveStore',
  props<{ storeData: { storeId: string; storeName: string } }>()
);

export const increment = createAction('[counter Component] increment');
// export const  = createAction('[Auth Component] loginFalse');
export const loadingPage = createActionGroup({
  source: 'Loading Component',
  events: {
    // defining an event without payload using the `emptyProps` function
    Opened: emptyProps(),

    // defining an event with payload using the `props` function
    'Update Loading': props<{ loading: boolean }>(),

    // defining an event with payload using the props factory
  },
});

export const setActiveDate = createActionGroup({
  source: 'Date Component',
  events: {
    // defining an event without payload using the `emptyProps` function
    Opened: emptyProps(),

    // defining an event with payload using the `props` function
    'Update Date': props<{ date: string }>(),

    // defining an event with payload using the props factory
  },
});
