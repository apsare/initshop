import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Products } from 'src/app/models/products';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  products: Products[];
  productSub: Subscription;
  category: Category;
  categoriesSub: Subscription;


  constructor(private route: ActivatedRoute,
              private productService: ProductsService,
              private categoryService: CategoryService,
    ) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (request) => {
        this.productSub = this.productService.prodSubject.subscribe(
          (data: Products[]) => {
             const prod = data.filter(element => {
               return element.Category == +request.id
             });
             this.products = prod;
          }
        );
        this.productService.emitProduct();


        this.categoriesSub = this.categoryService.categorySubject.subscribe(
          (data: Category[]) => {
            this.category = this.categoryService.getCategoryById(+request.id); // + = forcer comme entier
          }
        );
        this.categoryService.emitCategories();
      }
    );

  }

    ngOnDestroy():void{
      this.productSub.unsubscribe();
      this.categoriesSub.unsubscribe();
    }
}
