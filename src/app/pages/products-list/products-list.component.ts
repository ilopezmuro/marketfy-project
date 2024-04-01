import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { product } from '../../interfaces/product-interface';
import { SessionServiceService } from '../../services/session-service.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent {

  products: product[] = [];

  constructor(private http: HttpClient){

    this.getProducts();

  }

  getProducts(){

    this.http.get<product[]>('http://localhost:8080/shoppingcart/v2/products')
    .subscribe( (data) => {

      this.products = data;

    });

  }

}
