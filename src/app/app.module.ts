import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    NavigationBarComponent,
    ProductsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
