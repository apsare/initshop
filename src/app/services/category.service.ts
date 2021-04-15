import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { HttpResult } from '../models/http-result';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: Category[];
  categorySubject = new Subject<Category[]>();

  constructor(private http: HttpClient) {
    this.getCategoriesFromServer();
  }

  emitCategories():void{
    this.categorySubject.next(this.categories);
  }

  getCategoriesFromServer():void{
    const url = `${environment.API+'category?API_KEY='+environment.API_KEY}`;
    this.http.get(url).subscribe(
      (reponse: HttpResult) => {
        if(reponse.status == 200){
          this.categories = reponse.result;
          this.emitCategories();
        } else {
          console.log(reponse.message);
        }
      }
    )
  }

}
