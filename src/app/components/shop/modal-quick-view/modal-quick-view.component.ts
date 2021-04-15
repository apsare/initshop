import { Component, Input, OnInit } from '@angular/core';
import { Products } from 'src/app/models/products';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-quick-view',
  templateUrl: './modal-quick-view.component.html',
  styleUrls: ['./modal-quick-view.component.css']
})
export class ModalQuickViewComponent implements OnInit {
  urlImage = `${environment.urlImage}`;
  @Input() products: Products[];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart(product: Products):void{
    this.cartService.addProductToCart(product);
  }

}
