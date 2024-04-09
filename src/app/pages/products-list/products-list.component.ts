import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { product } from '../../interfaces/product-interface';
import { SessionServiceService } from '../../services/session-service.service';
import { CheckoutServiceService } from '../../services/checkout-service.service';

@Component({
  selector: 'app-products-list',
  styleUrl: 'product-list.component.css',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent {

  products: product[] = [];

  pageLimit: number = 0;
  currentPage: number = 0;

  disableNextIfSinglePage: boolean = false;

  constructor(private http: HttpClient, private sessionService: SessionServiceService, private checkooutService: CheckoutServiceService){

    this.getProducts();

  }
  /*getIfFavorite(id: number){
    let user_id = this.sessionService.userLoggedId;

    this.http.get<boolean>(`http://localhost:8080/shoppingcart/v2/wishlist/exists-user-favorite/${user_id}/${id}`)
    .subscribe( (exists) => {

      console.log(exists);

    });

  }*/

  sendToWishList(product_id: number){
    let userId = this.sessionService.userLoggedId;

    let bodyRequest = {
      wish_id: 1,
      user_id: userId,
      product_id: product_id
    };

    this.http.post('http://localhost:8080/shoppingcart/v2/wishlist/add', bodyRequest, { responseType: 'text' })
    .subscribe( (response) => {

      console.log(response);

    });

  }

  getProductsPageTotalNumber(){

    this.http.get<number>('http://localhost:8080/shoppingcart/v2/products/total-pages')
    .subscribe( (data) => {

      this.pageLimit = data;

    });

  }

  getProducts(){

    this.http.get<product[]>(`http://localhost:8080/shoppingcart/v2/products/paged?pageNumber=${ this.currentPage }`)
    .subscribe( (data) => {

      this.products = data;

      this.getProductsPageTotalNumber();

    });

  }

  sendProductToCart(product_id: number, product_name: string, product_price: number, product_image: string){

    this.checkooutService.addToCart(product_id, product_name, product_price, product_image);

  }

  turnToNext(){

    this.currentPage += 1;
    console.log(this.currentPage);
    this.getProducts();

  }

  turnToPrevious(){

    this.currentPage -= 1;
    console.log(this.currentPage);
    this.getProducts();

  }

  searchProduct(e: Event){

    let valueOfEvent = (e.target as HTMLInputElement).value;

    this.currentPage = 0;

    if(valueOfEvent != ''){

      console.log(valueOfEvent);

      this.http.get<number>(`http://localhost:8080/shoppingcart/v2/products/search-total-pages?searchQuery=${ valueOfEvent }`)
      .subscribe( (newData) => {

        if(newData == 1){

          this.disableNextIfSinglePage = true;

        }
        else{

          this.disableNextIfSinglePage = false;

        }

        this.pageLimit = newData;
  
      });

      this.http.get<product[]>(`http://localhost:8080/shoppingcart/v2/products/search?searchQuery=${ valueOfEvent }&pageNumber=${ this.currentPage }`)
      .subscribe( (data) => {
  
        this.products = data;

      });

    }
    else{

      console.log("text was set back to empty");

      this.pageLimit = 0;
      this.currentPage = 0;
      this.disableNextIfSinglePage = false;

      this.getProducts();

    }

  }

}
