import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {

  products = [];

  prodSub: Subscription;

  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    this.prodSub = this.prodService.prodSubject.subscribe(
      (data) => {
       this.products = this.prodService.getProductByPage(0);
       console.log(this.products)
      }
    )
    this.prodService.emitProduct()
  }

  ngOnDestroy(): void {
    this.prodSub.unsubscribe()
  }

}
