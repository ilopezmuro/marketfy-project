import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../../interfaces/product-interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent {

  parameterTest!: number;
  productDetails: Product = new Product();

  constructor(private route: ActivatedRoute, private http: HttpClient){

    this.route.params.subscribe( (values) => {
      this.parameterTest = values['id'];
    });

    this.http.get<product>(`http://localhost:8080/shoppingcart/v2/products/${this.parameterTest}`)
    .subscribe( (data) => {

      this.productDetails.product_id = data.product_id;
      this.productDetails.name = data.name;
      this.productDetails.description = data.description;
      this.productDetails.price = data.price;
      this.productDetails.total_products_inventory = data.total_products_inventory;

    });

  }

}

export class Product {
  product_id: number;
  name: string;
  price: number;
  description: string;
  total_products_inventory: number;

  constructor(){
    this.product_id = 0;
    this.name = '';
    this.price = 0;
    this.description = '';
    this.total_products_inventory = 0;
  }
}