import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SessionServiceService } from '../../services/session-service.service';
import { Router } from '@angular/router';
import { CheckoutServiceService } from '../../services/checkout-service.service';
import { ProductCheckout } from '../../classes/ProductCheckout';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  shoppingCart: ProductCheckout[] = [];
  totalPrice: number = 0;

  clicked: boolean = false;

  constructor(private http: HttpClient, private sessionService: SessionServiceService, private route: Router, private checkooutService: CheckoutServiceService) {
    this.shoppingCart = this.checkooutService.shoppingCart;
    this.totalPrice = this.checkooutService.totalPrice;
  }

  proceedPayout(){

    let interval = 1000;
    let routerInterval = 0;

    this.checkooutService.shoppingCart.forEach( (item, index, object) => {

      routerInterval = interval * index;

      setTimeout(() => {

        let userId = this.sessionService.userLoggedId;
  
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