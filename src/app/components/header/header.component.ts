import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Products } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cart: Cart[] = [];
  cartData;


  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    console.log("cartdata = "+this.cartService.cartData);
    this.cartData = this.cartService.cartData;
  }



}
