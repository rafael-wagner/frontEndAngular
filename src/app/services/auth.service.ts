import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getAuthToken(): String | null {
    return window.localStorage.getItem("token")
  }

  setAuthToken(token: string | null) {
    if(token !== null){
      window.localStorage.setItem("auth-token",token)
    } else {
      window.localStorage.removeItem("auth-token")
    }
  }
}
