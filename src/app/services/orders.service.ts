import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resolve } from 'dns';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart';
import { HttpResult } from '../models/http-result';
import { Users } from '../models/users';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor( private http: HttpClient,
               private cartService: CartService,

    ) { }

    createOrder(user:Users, cart: Cart[]){
      return new Promise(
        (resolve,reject)=>{
          cart.forEach(
            (element) => {
              const price = element.number * element.product.price;
              const url = `${environment.API+ 'createOrders.php?API_KEY='+ environment.API_KEY}`
        + '&idUser='+user.idUser
        + '&idProduct=' +element.product.idProduct
        + '&quantity='+element.number
        + '&price=' + price;

        this.http.get(url).subscribe(
          (response: HttpResult) => {

          },
          (error) => {
            reject("Error :")
          }
        )

            }
          ); //end foreach
        }
      )
    }

}
