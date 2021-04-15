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
  currentPage = 0;
  pages = [0,1,2,3,4,5,6,7];

  constructor(private prodService: ProductsService, private cartService: CartService) { }

  ngOnInit(): void {
    this.prodSub = this.prodService.prodSubject.subscribe(
      (data) => {
       // this.products = data;
       this.products = this.prodService.getProductByPage(this.currentPage);
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

  changePage(numberPage: number):void{
    const prod = this.prodService.getProductByPage(numberPage);
    if(prod){
      this.products = prod;
      this.currentPage = numberPage;
    }
  }

  nextPage(): void{
    const newCurrentPage = this.currentPage + 1
    const prod = this.prodService.getProductByPage(newCurrentPage)
    if (prod) {
      this.products = prod;
      this.currentPage = newCurrentPage;
    }
  }
  prevPage(): void{
    const newCurrentPage = this.currentPage - 1
    const prod = this.prodService.getProductByPage(newCurrentPage)
    if (prod) {
      this.products = prod;
      this.currentPage = newCurrentPage;
    }
  }
  ngOnDestroy(): void {
    this.prodSub.unsubscribe()
  }

}
