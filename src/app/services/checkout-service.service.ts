import { Injectable } from '@angular/core';
import { ProductCheckout } from '../classes/ProductCheckout';

@Injectable({
  providedIn: 'root'
})
export class CheckoutServiceService {

  shoppingCart: ProductCheckout[] = [];
  totalPrice: number = 0;

  constructor() { }

  addToCart(id: number, name: string, price: number){

    let product: ProductCheckout = new ProductCheckout(id, name, price);
    this.totalPrice += product.product_price;
    this.shoppingCart.push(product);

    console.log(this.shoppingCart);

  }

}