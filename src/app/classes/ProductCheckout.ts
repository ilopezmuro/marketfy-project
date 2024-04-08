export class ProductCheckout {
    product_id: number;
    product_name: string;
    product_price: number;
    product_image: string;
  
    constructor(id: number, name: string, price: number, image: string){
  
      this.product_id = id;
      this.product_name = name;
      this.product_price = price;
      this.product_image = image;
  
    }
}