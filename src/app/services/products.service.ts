import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { element } from 'protractor';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpResult } from '../models/http-result';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  ProductsPerPage = 6;
  products: Products[] = [];
  prodSubject = new Subject<any[]>();


  constructor(private http: HttpClient) {
    this.getProductFromServer()
  }

  emitProduct(){
    this.prodSubject.next(this.products)
  }

  getProductFromServer(){
    const url = `${environment.API+'products?API_KEY='+environment.API_KEY}`;
    this.http.get(url).subscribe(
      (reponse:HttpResult) => {
        if(reponse.status == 200){
          this.products = reponse.result;
          this.emitProduct();
        } else {
          console.log("erreur http: "+reponse.message)
        }

      }
    )
  }

  getProductById(id: number): Products{
    const product = this.products.find(element => element.idProduct == id);
    if (product){
      return product;
    }
    return null;
  }

  getProductByPage(numberPage: number): Products[]{
    const numberOfPages = this.products.length / this.ProductsPerPage;
    if(numberPage > 0 || numberPage < numberOfPages){
      const prodResult = this.products.slice(numberPage*this.ProductsPerPage,(numberPage+1)*this.ProductsPerPage);
      return prodResult;
    }
      return null
  }

}
