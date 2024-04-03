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