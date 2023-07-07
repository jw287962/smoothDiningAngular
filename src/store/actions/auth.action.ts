import { createAction, props } from '@ngrx/store';

export const loginTrue = createAction('[auth Component] loginTrue');
export const loginFalse = createAction('[auth Component] loginFalse');

export const setActiveStore = createAction(
  '[Click Store] setActiveStore',
  props<{ store: string }>()
);

export const increment = createAction('[counter Component] increment');
// export const  = createAction('[Auth Component] loginFalse');
