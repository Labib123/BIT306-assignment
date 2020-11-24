import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import jwt_decode from "jwt-decode";

@Injectable ({providedIn:'root'})
export class AuthService{
  private token:string;
  public email:string ;
  public userName:string = " ";
  public userType:string = "" ; 
  private authStatusListener = new Subject<boolean>();

  constructor(private http:HttpClient, private router:Router){}
  getToken(){
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }
   getCurrentUser() {
    try {
      const jwt = localStorage.getItem(this.token);
      return jwt_decode(jwt);
    } catch (ex) {
      return null;
    }
  }

  createUser(name:string,email:string, password:string, position:string){
    const authData:AuthData = {name:name,email:email, password:password, position:position};
    this.http.post('http://localhost:3000/api/user/signup', authData)
      .subscribe(response =>{
        console.log(response);
      });
  }

  login(email: string, password: string){
    const authData = {email:email, password:password};
    this.http.post<{token:string, message:any}>('http://localhost:3000/api/user/login',authData)
    .subscribe(response => {
      const token = response.token;
      this.token= token;
      this.email = authData.email;
      this.userType = response.message.position ; 
      this.userName = response.message.name ; 


      this.authStatusListener.next(true);
      this.router.navigate(['/']);
      console.log(response);
    });
  }
  logout(){
    this.token=null;
    this.authStatusListener.next(false);
    this.router.navigate(['/login']);
  }
}
