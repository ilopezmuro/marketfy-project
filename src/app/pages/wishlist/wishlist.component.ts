import { Component } from '@angular/core';
import { SessionServiceService } from '../../services/session-service.service';
import { HttpClient } from '@angular/common/http';
import type { usersession } from '../../interfaces/session-interface';
import { wishlistitem } from '../../interfaces/wishlist-item-interface';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {

  userId: number;
  userData:  usersession | null;
  
  wishlistItems: wishlistitem[] = [];

  displayedColumns: string[] = ['ID', 'name', 'price', 'description'];

  constructor(private sessionService: SessionServiceService, private http: HttpClient) {
    
    this.userData = this.sessionService.userLoggedData;
    this.userId = this.sessionService.userLoggedId;

    // TODO
    // Pending to cleanup the any array in here

    this.http.get<any[]>(`http://localhost:8080/shoppingcart/v2/wishlist/${ this.userId }/details`)
    .subscribe( (response) => {

      const mappedWishlistItems: any[] = response.map( item => {

        return {

          wish_id: item[0],
          product_name: item[1],
          product_price: item[2],
          product_description: item[3]

        };

      });

      //console.log(mappedWishlistItems);
      this.wishlistItems = mappedWishlistItems;

    });

  }

}
