import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IToken } from '../interfaces/IToken.interface';
import { IUser } from '../interfaces/IUser.interface';
import { AuthService } from './auth.service';
import { IUserLogin } from '../interfaces/IUserLogin.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

private readonly apiUrl = "http://localhost:8080"
private readonly _loginUrl = this.apiUrl.concat("/login")
private readonly _usersUrl = this.apiUrl.concat("/api/users")
private readonly _http = inject(HttpClient)
private readonly _authService = new AuthService()

  private getAuthHeaders(): HttpHeaders{
    let optionHeaders = new HttpHeaders();
    optionHeaders = optionHeaders.set("Authorization", `Bearer ${this._authService.getAuthToken()}`);
    optionHeaders = optionHeaders.set("Content-Type", "application/json")
    return optionHeaders;
  }

  postLogin(user : IUserLogin):Observable<IToken>{
   return this._http.post<IToken>(this.apiUrl+'/login',user,)
  }

  postNewUser(user : IUser):Observable<any>{
    return this._http.post<any>(this.apiUrl+'/users',user)
  }

  putUpdateUser(user: IUser):Observable<any> {
    return this._http.put<any>(this._usersUrl,user,{headers: this.getAuthHeaders()})
  }

  deleteUser(user: IUser):Observable<any> {
    let deleteUrl = this._usersUrl.concat(`?name=${user.name}`)
    return this._http.delete<any>(deleteUrl,{headers: this.getAuthHeaders()})
  }

  getUsersList(name: string,email: string):Observable<IUser[]>{

    let searchUrl = this._usersUrl.concat(`/search?name=${name}&email=${email}`)
    return this._http.get<IUser[]>(searchUrl,{headers: this.getAuthHeaders()})

  }

  getCurrentUserInfo(): Observable<IUser>{
    let userUrl = this._usersUrl.concat("/info")
    return this._http.get<any>(userUrl,{headers: this.getAuthHeaders()})
  }

}
