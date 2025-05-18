import { createFeatureSelector } from "@ngrx/store";
import { type CartState, adapter } from "./cart.reducer";

export const selectCartState = createFeatureSelector<CartState>("cart");

export const {
    selectAll: selectCartItems,
    selectTotal: selectCartTotal,
    selectEntities: selectCartEntities,
} = adapter.getSelectors(selectCartState);
