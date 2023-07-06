import { createAction, props } from '@ngrx/store';

export const loginTrue = createAction('[Auth Component] loginTrue');
export const loginFalse = createAction('[Auth Component] loginFalse');

export const setActiveStore = createAction(
  '[Click Store] setActiveStore',
  props<{ storeId: string }>()
);
// export const  = createAction('[Auth Component] loginFalse');
