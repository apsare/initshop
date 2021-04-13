import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpResult } from '../models/http-result';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products = [];
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

}
