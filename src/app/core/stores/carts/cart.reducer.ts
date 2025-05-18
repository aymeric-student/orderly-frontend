import {
  createEntityAdapter,
  type EntityAdapter,
  type EntityState,
} from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import type { CartItem } from './cart.model';

export interface CartState extends EntityState<CartItem> {}

export const adapter: EntityAdapter<CartItem> = createEntityAdapter<CartItem>();

export const initialState: CartState = adapter.getInitialState();

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addItem, (state, { item }) => {
    const existing = state.entities[item.id];
    return existing
      ? adapter.updateOne(
          {
            id: item.id,
            changes: { quantity: existing.quantity + item.quantity },
          },
          state,
        )
      : adapter.addOne(item, state);
  }),
  on(CartActions.decrementItem, (state, { id }) => {
    const existing = state.entities[id];
    if (!existing) return state;
    if (existing.quantity <= 1) {
      return adapter.removeOne(id, state);
    } else {
      return adapter.updateOne(
        {
          id,
          changes: { quantity: existing.quantity - 1 },
        },
        state,
      );
    }
  }),

  on(CartActions.removeItem, (state, { id }) => adapter.removeOne(id, state)),
  on(CartActions.clearCart, () => adapter.getInitialState()),
);
