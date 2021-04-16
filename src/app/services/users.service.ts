import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { resolve } from 'dns';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpResult } from '../models/http-result';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user: Users;
  userSubject = new Subject<Users>();
  isAuth: boolean = false;

  constructor(private http: HttpClient) { }

  emitUser():void{
    this.userSubject.next(this.user);
  }

  authentifier(newUser: Users){
    return new Promise(
      (resolve,reject) => {
        const url = `${environment.API+ 'authentifier.php?API_KEY='+ environment.API_KEY+ '&email='+newUser.email + '&password=' +newUser.password}` ;
        console.log(url)
        this.http.get(url).subscribe(
          (result: HttpResult) => {
            if(result.status == 200){
              this.user = result.result;
              this.isAuth = true;
              this.emitUser();
              resolve(result.result);
            } else {
              reject(result.message);
            }
          },
          (error) => {
            reject(error);
          }
        )
      }
    )
  }

  createUser(newUser: Users){
    return new Promise(
      (resolve,reject) => {
        const url = `${environment.API+ 'createUsers.php?API_KEY='+ environment.API_KEY}`
        + '&email='+newUser.email
        + '&password=' +newUser.password
        + '&sexe='+newUser.sexe
        + '&firstname=' +newUser.firstname
        + '&lastname=' +newUser.lastname
        + '&dateBirth='+newUser.dateBirth
        + '&pseudo=' +newUser.pseudo;
        this.http.get(url).subscribe(
          (data: HttpResult) => {
              if(data.status == 200) {
                this.user = data.args;
                this.isAuth = true;
                this.emitUser();
                  resolve(data.result);
              } else {
                reject(data.message);
              }
          },
          (error) => {
            reject(error);
          }
        )
      }
    )
  }



  logOut():void{
    this.user = null;
    this.isAuth = false;
    this.userSubject = new Subject<Users>();
  }

}
