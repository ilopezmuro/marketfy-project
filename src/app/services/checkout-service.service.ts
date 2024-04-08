import { Injectable, OnInit } from '@angular/core';
import { ProductCheckout } from '../classes/ProductCheckout';

@Injectable({
  providedIn: 'root'
})
export class CheckoutServiceService implements OnInit {

  shoppingCart: ProductCheckout[] = [];
  totalPrice: number = 0;

  constructor() { 

    this.checkoutInitializer();

  }

  addToCart(id: number, name: string, price: number, image: string){

    let product: ProductCheckout = new ProductCheckout(id, name, price, image);
    this.totalPrice += product.product_price;
    this.shoppingCart!.push(product); // Reminder: "!" means never null, making the compiling error go away

    this.storeCartLocally();

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

    this.storeCartLocally();

  }

  storeCartLocally(){

    localStorage.setItem('storedCart', JSON.stringify(this.shoppingCart));

  }

  retrieveCartLocal(){

    let retrievedItems = localStorage.getItem('storedCart');
    if(retrievedItems != null){

      let prepareParseData = String(retrievedItems);

      this.shoppingCart = JSON.parse(prepareParseData);

      this.shoppingCart.forEach( (item) => {

        this.totalPrice += item.product_price;

      });

    }

  }

  checkoutInitializer() {

    this.retrieveCartLocal();

  }

  ngOnInit(){

    this.checkoutInitializer();
    
  }

}