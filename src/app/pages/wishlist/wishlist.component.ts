import { Component } from '@angular/core';
import { SessionServiceService } from '../../services/session-service.service';
import { HttpClient } from '@angular/common/http';
import type { usersession } from '../../interfaces/session-interface';
import { wishlistitem } from '../../interfaces/wishlist-item-interface';
import { CheckoutServiceService } from '../../services/checkout-service.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {

  userId: number = 0;
  userData:  usersession | null = null;
  
  wishlistItems: wishlistitem[] = [];

  displayedColumns: string[] = ['ID', 'name', 'price', 'description', 'action'];

  constructor(private sessionService: SessionServiceService, private http: HttpClient, private checkooutService: CheckoutServiceService) {
    
    this.fetchWishData();

  }

  fetchWishData(){

    this.userData = this.sessionService.userLoggedData;
    this.userId = this.sessionService.userLoggedId;

    // TODO
    // Pending to cleanup the any array in here

    this.http.get<any[]>(`http://localhost:8080/shoppingcart/v2/wishlist/${ this.userId }/details`)
    .subscribe( (response) => {

      const mappedWishlistItems: any[] = response.map( item => {

        return {

          wish_id: item[0],
          product_id: item[1],
          product_name: item[2],
          product_price: item[3],
          product_description: item[4]

        };

      });

      this.wishlistItems = mappedWishlistItems;

    });

  }

  sendProductToCart(product_id: number, product_name: string, product_price: number){

    this.checkooutService.addToCart(product_id, product_name, product_price);

  }

  deleteWishListItem(wish_id: number){

    this.http.get(`http://localhost:8080/shoppingcart/v2/wishlist/delete-product/${ wish_id }`, { responseType: 'text' })
    .subscribe( (response) => {

      this.wishlistItems = [];
      console.log(response);

      this.fetchWishData();
      
    });

  }

}
