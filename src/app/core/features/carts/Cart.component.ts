import {
  addItem,
  clearCart,
  decrementItem,
  removeItem,
} from '@/core/stores/carts/cart.actions';
import {
  selectCartItems,
  selectCartTotal,
} from '@/core/stores/carts/cart.selectors';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartItem } from '@/core/stores/carts/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RouterLink,
  ],
  templateUrl: './Cart.component.html',
  styleUrls: ['./Cart.component.scss'],
})
export class CartComponent {
  readonly cartItems$;
  readonly cartTotal$;
  protected readonly clearCart = clearCart;
  private readonly store = inject(Store);

  constructor() {
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartTotal$ = this.store.select(selectCartTotal);
  }

  addProductToCart(item: CartItem) {
    this.store.dispatch(addItem({ item: { ...item, quantity: 1 } }));
  }

  clearCard() {
    this.store.dispatch(clearCart());
  }

  decrementItemFromCart(item: CartItem) {
    console.log('je suis là');
    this.store.dispatch(decrementItem({ id: item.id }));
  }

  clearItemCard(item: CartItem) {
    console.log('item : ', item);
    this.store.dispatch(removeItem({ id: item.id }));
  }
}
