import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { Category } from 'src/app/models/category';
import { Products } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cart: Cart[] = [];
  cartData;
  categories: Category[];
  categoriesSub: Subscription;

  constructor(private cartService: CartService,
              private categoryService: CategoryService,
    ) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    console.log("cartdata = "+this.cartService.cartData);
    this.cartData = this.cartService.cartData;
    this.categoriesSub = this.categoryService.categorySubject.subscribe(
      (data: Category[]) => {
        this.categories = data;
      }
    );
    this.categoryService.emitCategories();
  }



}
