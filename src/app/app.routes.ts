import { CartComponent } from '@/core/features/carts/Cart.component';
import { MenuComponent } from '@/core/features/menu/menu.component';
import { NotFoundComponent } from '@/core/features/notFound/NotFound.component';
import { RestaurantSetupComponent } from '@/core/features/setupRestaurant/RestaurantSetup.component';
import type { Routes } from '@angular/router';

export class AppRoutes {
  static readonly ROOT = '';
  static readonly MENU = 'menu';
  static readonly MENU_CREATE = 'menu/create';
  static readonly CART = 'cart';
  static readonly NOT_FOUND = 'not-found';
  static readonly WILDCARD = '**';
}

export const routes: Routes = [
  { path: AppRoutes.ROOT, redirectTo: `/${AppRoutes.MENU}`, pathMatch: 'full' },
  { path: AppRoutes.MENU, component: MenuComponent },
  { path: AppRoutes.MENU_CREATE, component: RestaurantSetupComponent },
  { path: AppRoutes.CART, component: CartComponent },
  { path: AppRoutes.NOT_FOUND, component: NotFoundComponent },
  { path: AppRoutes.WILDCARD, redirectTo: `/${AppRoutes.NOT_FOUND}` },
];
