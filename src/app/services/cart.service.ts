import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart[] = [];
  cartData = {len:0, cost:0};

  constructor() {
    //this.cartData = {len:0, cost:0};
  }


  updateDataCart(){
    let len = 0;
    let cost = 0;
    this.cart.forEach(element => {
      len += element.number;
      cost += element.product.price * element.number;
    });
    this.cartData.len = len;
    this.cartData.cost = cost;
  }


  addProductToCart(newProduct: Products): void{
    const checkedProduct = this.cart.find(element => element.product == newProduct);
    if (checkedProduct) {
      checkedProduct.number++;
    } else {
      const newProductToAdd = {
        number: 1,
        product: newProduct
      };
      this.cart.push(newProductToAdd);
    }
    this.updateDataCart();
  }

  deleteFromCart(productToDelete: Products): void{
    const indexProduct = this.cart.findIndex(element => element.product == productToDelete);
    if(indexProduct){
      if(this.cart[indexProduct].number > 1){
        this.cart[indexProduct].number--;
      } else {
        this.cart.splice(indexProduct,1);
      }
      this.updateDataCart();
    }
  }

}
