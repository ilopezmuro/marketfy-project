import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';

const routes: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
