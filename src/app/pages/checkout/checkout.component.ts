import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SessionServiceService } from '../../services/session-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  shoppingCart: ProductCheckout[] = [];
  totalPrice: number = 0;

  clicked: boolean = false;

  constructor(private http: HttpClient, private sessionService: SessionServiceService, private route: Router) {}

  addToCart(){

    let product: ProductCheckout = new ProductCheckout(1, "rasuradora", 429);
    this.totalPrice += product.product_price;
    this.shoppingCart.push(product);

  }

  proceedPayout(){

    let interval = 1000;
    let routerInterval = 0;

    this.shoppingCart.forEach( (item, index, object) => {

      routerInterval = interval * index;

      setTimeout(() => {

        let userData =  this.sessionService.getUserSession();
        let userId = userData['id'];
  
        let dateObject = new Date();
        let yyyy = dateObject.getFullYear();
        let mm = dateObject.getMonth() + 1;
        let dd = dateObject.getDate();
        let formattedDateNow = yyyy + '-' + mm + '-' + dd;
  
        let bodyRequest = {
          "order_id": 1,
          "order_date": formattedDateNow,
          "user_id": userId,
          "product_id": item.product_id
        };

        this.http.post('http://localhost:8080/shoppingcart/v2/products/buy', bodyRequest,  { responseType: 'text' })
        .subscribe( (response) => {

          console.log(response);
  
        });

      }, interval * index);

    });

    setTimeout( () => {

      this.route.navigate(['/']);

    }, routerInterval + 1000);

  }

}

export class ProductCheckout {
  product_id: number;
  product_name: string;
  product_price: number;

  constructor(id: number, name: string, price: number){

    this.product_id = id;
    this.product_name = name;
    this.product_price = price;

  }
}