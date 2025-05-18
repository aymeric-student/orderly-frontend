import { menu } from '@/core/features/menu/menu.data';
import type { MenuItem } from '@/core/models/Menu';
import type { MenuSection } from '@/core/models/menu.model';
import { addItem } from '@/core/stores/carts/cart.actions';
import type { CartItem } from '@/core/stores/carts/cart.model';
import type { AppState } from '@/core/stores/carts/app.reducer';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatLine, MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatRippleModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatTooltipModule,
    MatChipsModule,
    MatSnackBarModule,
    TranslatePipe,
    MatLine,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  menuSections: MenuSection[] = menu;
  selectedSection: MenuSection = this.menuSections[0];
  private readonly snackBar = inject(MatSnackBar);
  private readonly store = inject(Store<AppState>);

  addToCart(item: MenuItem): void {
    const cartItem: CartItem = {
      id: item.id as string,
      name: item.name,
      price: item.price,
      quantity: 1,
    };

    this.store.dispatch(addItem({ item: cartItem }));

    this.snackBar.open('Ajouté au panier', 'Fermer', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
