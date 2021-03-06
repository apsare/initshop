import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { Category } from 'src/app/models/category';
import { Products } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { UsersService } from 'src/app/services/users.service';

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
  //isAuth: boolean = false;

  get isAuth():boolean{
    return this.userService.isAuth;
  }

  constructor(private cartService: CartService,
              private categoryService: CategoryService,
              private userService: UsersService,
    ) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    this.cartData = this.cartService.cartData;
    this.categoriesSub = this.categoryService.categorySubject.subscribe(
      (data: Category[]) => {
        this.categories = data;
      }
    );
    this.categoryService.emitCategories();
  }

  logOut():void{
    console.log("avant="+this.isAuth);
    this.userService.logOut();
  }

}
