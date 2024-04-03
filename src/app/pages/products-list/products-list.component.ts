import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { product } from '../../interfaces/product-interface';
import { SessionServiceService } from '../../services/session-service.service';
import { CheckoutServiceService } from '../../services/checkout-service.service';

@Component({
  selector: 'app-products-list',
  styleUrl: 'product-list.component.css',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent {

  products: product[] = [];

  constructor(private http: HttpClient, private sessionService: SessionServiceService, private checkooutService: CheckoutServiceService){

    this.getProducts();

  }

  /*getIfFavorite(id: number){
    let user_id = this.sessionService.userLoggedId;

    this.http.get<boolean>(`http://localhost:8080/shoppingcart/v2/wishlist/exists-user-favorite/${user_id}/${id}`)
    .subscribe( (exists) => {

      console.log(exists);

    });

  }*/

  getProducts(){

    this.http.get<product[]>('http://localhost:8080/shoppingcart/v2/products')
    .subscribe( (data) => {

      this.products = data;

    });

  }

  sendProductToCart(product_id: number, product_name: string, product_price: number){

    this.checkooutService.addToCart(product_id, product_name, product_price);

  }

}
