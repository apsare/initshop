import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Products } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  products: Products[];
  productSub: Subscription;
  constructor(private route: ActivatedRoute,
              private productService: ProductsService,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (request) => {
        console.log(request.id);
        this.productSub = this.productService.prodSubject.subscribe(
          (data: Products[]) => {
             //const prod = data
          }
        )
      }
    )
  }

}
