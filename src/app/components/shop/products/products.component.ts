import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products = [];
  urlImage = "http://localhost:8080/ecommerce/backend/images/products/";
  prodSub: Subscription;

  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    this.prodSub = this.prodService.prodSubject.subscribe(
      (data) => {
        this.products = data;
      }
    )
    this.prodService.emitProduct()
  }

  ngOnDestroy(): void {
    this.prodSub.unsubscribe()
  }

}
