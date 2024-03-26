import { Component } from '@angular/core';
import { SessionServiceService } from '../../services/session-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {

  userId: number;
  userData: any;
  
  wishlistItems: any;

  constructor(private sessionService: SessionServiceService, private http: HttpClient) {
    
    this.userData = sessionService.getUserSession();
    this.userId = JSON.parse(this.userData)['id'];
    console.log(this.userId);

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
