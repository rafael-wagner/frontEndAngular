import { HttpClient } from '@angular/common/http';
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
private readonly _authService = new AuthService()


  getFirst():Observable<string> {
    return this._http.get<string>(this.apiUrl+'/first');
  }

  postLogin(user : IUser):Observable<IToken>{
   return this._http.post<IToken>(this.apiUrl+'/login',user,)
  }

  postNewUser(user : IUser):Observable<any>{
    return this._http.post<any>(this.apiUrl+'/users',user)
  }

  putUpdateUser(user: IUser):Observable<any> {

    const authHeader = { 'Authorization': 'Bearer ' + this._authService.getAuthToken }
    return this._http.put<any>(this.apiUrl+'/update-user',user,{headers: authHeader})
  }

  getListUsers(name : string | null):Observable<IUser[]>{

    name = name? "" : name
    const searchItems = {
      userName: name
      ,name: name
    }

    const authHeader = { 'Authorization': 'Bearer ' + this._authService.getAuthToken }
    
    return this._http.post<IUser[]>(this.apiUrl+'/users',searchItems,{headers: authHeader})

  }


}
