import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Products } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit, OnDestroy {

  product: Products;
  productSub: Subscription;
  urlImage = `${environment.urlImage}`;


  constructor(private route: ActivatedRoute, // pour lire les parametres de l'url
              private prodService: ProductsService,
              private cartService: CartService,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    const id = this.route.snapshot.params["id"];

    this.productSub = this.prodService.prodSubject.subscribe(
      (data: Products[]) => {
        this.product = this.prodService.getProductById(+id); // + = forcer comme entier
      }
    );
    this.prodService.emitProduct();

  }

  addToCart(product: Products): void{
    this.cartService.addProductToCart(product);
  }

  ngOnDestroy():void{
    this.productSub.unsubscribe();
  }
}
