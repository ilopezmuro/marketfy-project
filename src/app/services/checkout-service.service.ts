import { Injectable } from '@angular/core';
import { ProductCheckout } from '../classes/ProductCheckout';

@Injectable({
  providedIn: 'root'
})
export class CheckoutServiceService {

  shoppingCart: ProductCheckout[] = [];
  totalPrice: number = 0;

  constructor() { }

  addToCart(id: number, name: string, price: number, image: string){

    let product: ProductCheckout = new ProductCheckout(id, name, price, image);
    this.totalPrice += product.product_price;
    this.shoppingCart!.push(product); // Reminder: "!" means never null, making the compiling error go away

    console.log(this.shoppingCart);

  }

  unsetCart(){
    this.shoppingCart = [];
    this.totalPrice = 0;
  }

  deleteShoppingCartItemById(index: number){

    this.shoppingCart.splice(index, 1);
    
    let newCount = 0;
    this.shoppingCart.forEach( (item) => {

      newCount += item.product_price;

    });
    
    this.totalPrice = newCount;

  }

}