import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SessionServiceService } from '../../services/session-service.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {

  orderHistoryDetails: any;

  constructor(private http: HttpClient, private sessionService: SessionServiceService) { 

    let userId = this.sessionService.userLoggedId;

    this.http.get<any[]>(`http://localhost:8080/shoppingcart/v2/products/${ userId }/order-details`)
    .subscribe( (response) => {

      const mappedOrderHistoryDetails: any[] = response.map( item => {

        return {

          order_id: item[0],
          order_date: item[1],
          product_name: item[2],
          product_price: item[3]

        }

      });

      this.orderHistoryDetails = mappedOrderHistoryDetails;

    });

  }

}
