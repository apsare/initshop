import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  product: Products;

  urlImage = `${environment.urlImage}`;


  constructor(private route: ActivatedRoute, // pour lire les parametres de l'url
              private prodService: ProductsService,
              private cartService: CartService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    this.product = this.prodService.getProductById(+id); // + = forcer comme entier
  }

  addToCart(product: Products): void{
    this.cartService.addProductToCart(product);
  }
}
