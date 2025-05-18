import { cartReducer, type CartState } from '@/core/stores/carts/cart.reducer';
import type { ActionReducerMap } from '@ngrx/store';

export type AppState = {
  cart: CartState;
};

export const reducers: ActionReducerMap<AppState> = {
  cart: cartReducer,
};
