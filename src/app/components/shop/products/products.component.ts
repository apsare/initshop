import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Products } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Products[] = [];
  urlImage = `${environment.urlImage}`;
  prodSub: Subscription;

  constructor(private prodService: ProductsService, private cartService: CartService) { }

  ngOnInit(): void {
    this.prodSub = this.prodService.prodSubject.subscribe(
      (data) => {
        this.products = data;
      }
    )
    this.prodService.emitProduct()
  }

  addToCart(product:Products):void{
    this.cartService.addProductToCart(product);
  }

  deleteFromCart(product:Products):void{
    this.cartService.deleteFromCart(product);
  }

  ngOnDestroy(): void {
    this.prodSub.unsubscribe()
  }

}
