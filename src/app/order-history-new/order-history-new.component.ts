import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SessionServiceService } from '../services/session-service.service';
import type { orderitem } from '../interfaces/order-item-interface';

@Component({
  selector: 'app-order-history-new',
  templateUrl: './order-history-new.component.html',
  styleUrl: './order-history-new.component.css'
})
export class OrderHistoryNewComponent {

  orderHistoryDetails: orderitem[] = [];

  displayedColumns: string[] = ['ID', 'image', 'product', 'price', 'date'];

  constructor(private http: HttpClient, private sessionService: SessionServiceService) { 

    let userId = this.sessionService.userLoggedId;

    this.http.get<any[]>(`http://localhost:8080/shoppingcart/v2/products/${ userId }/order-details`)
    .subscribe( (response) => {

      const mappedOrderHistoryDetails: any[] = response.map( item => {

        return {

          order_id: item[0],
          order_date: item[1],
          product_name: item[2],
          product_price: item[3],
          product_image: item[4]

        }

      });

      this.orderHistoryDetails = mappedOrderHistoryDetails;

    });

  }

  searchRegistryById(){

    let element: HTMLInputElement = (document.getElementById('idinput') as HTMLInputElement);

    let userId = this.sessionService.userLoggedId;

    if(element.value != ''){

      let id = element.value;

      this.http.get<any[]>(`http://localhost:8080/shoppingcart/v2/products/${ userId }/order-details-specific?orderId=${id}`)
      .subscribe( (response) => {
  
        const mappedOrderHistoryDetails: any[] = response.map( item => {
  
          return {
  
            order_id: item[0],
            order_date: item[1],
            product_name: item[2],
            product_price: item[3],
            product_image: item[4]
  
          }
  
        });
  
        this.orderHistoryDetails = mappedOrderHistoryDetails;
  
      });

    }

  }

}
