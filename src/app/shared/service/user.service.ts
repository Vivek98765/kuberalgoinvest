import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private ROOT_URL=environment.Api_Url+"/api";
  
  constructor(private http:HttpClient,private router:Router) { }

  OnPostMethod(config, nodepage, url) {
    return this.http.post<any>(this.ROOT_URL + nodepage + url, config);
  }

  userLogin(config, nodepage, url) {
    return this.http.post<any>(this.ROOT_URL + nodepage + url, config);
  }
  userLoggedIn(){
    return !!localStorage.getItem("token");
  }

  userForgotPass(config, nodepage, url){
    return this.http.post<any>(this.ROOT_URL + nodepage + url, config);
  }

  userChangePass(config, nodepage, url){
    return this.http.post<any>(this.ROOT_URL + nodepage + url, config);
  }

  userDetail(config, nodepage, url){
    return this.http.get<any>(this.ROOT_URL + nodepage + url, config);
  }

  userUpdate(config, nodepage, url){
    return this.http.post<any>(this.ROOT_URL + nodepage + url, config );
  }

  userConfirm(url){
    //console.log(this.ROOT_URL + url)
    return this.http.get<any>(this.ROOT_URL + url);
  }

  userLogOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    this.router.navigate(["/"]);
  }


  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  setuserDetailsToken(userDetails: string) {
    
   return localStorage.setItem('userDetails', userDetails);
    
  }
  getuserDetailsToken() {
    return JSON.parse(localStorage.getItem('userDetails'));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }
  
  adminLogin(admin){
    //console.log(admin);
    return this.http.post<any>(this.ROOT_URL+"/adminauth/login",admin);
  }

  adminLogOut(){
    localStorage.removeItem("Admintoken");
    this.router.navigate(["/"]);
  }
  adminloggedIn(){
      return !!localStorage.getItem("Admintoken");
  }
}
