import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';

const routes: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: 'auth-user', loadChildren: () => import('./auth-user/auth-user.module').then(m => m.AuthUserModule) },
  { path: 'wish-list', loadChildren: () => import('./wish-list/wish-list.module').then(m => m.WishListModule) },
  { path: 'order-history-new', loadChildren: () => import('./order-history-new/order-history-new.module').then(m => m.OrderHistoryNewModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
