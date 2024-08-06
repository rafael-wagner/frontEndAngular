import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IToken } from '../interfaces/IToken.interface';
import { IUser } from '../interfaces/IUser.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
private readonly apiUrl = "http://localhost:8080"
private readonly _http = inject(HttpClient)


  getFirst():Observable<string> {
    return this._http.get<string>(this.apiUrl+'/first');
  }

  postLogin(user : IUser):Observable<IToken>{

  const response = this._http.post<IToken>(this.apiUrl+'/login',user,)
  return response
  }

  postNewUser(user : IUser):Observable<IToken>{
    return this._http.post<IToken>(this.apiUrl+'/newUser',user,)
  }

  getListUsers(name : string | null):Observable<IUser[]>{

  name = name? "" : name
  const searchItems = {
    userName: name
    ,name: name
  }

  const authService = new AuthService()
  const authHeader = { 'Authorization': 'Bearer ' + authService.getAuthToken }
  
  return this._http.post<IUser[]>(this.apiUrl+'/users',searchItems,{headers: authHeader})

  }


}
