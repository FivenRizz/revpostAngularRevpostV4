import { Injectable } from '@angular/core';

import { User } from './register/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private _httpService: HttpClient) { }

  addUser(user: User){
    let body = JSON.parse(JSON.stringify(user));
    
      return this._httpService.post("http://localhost:8080/Rev_SpringMVC_Hello/RegistrationController/register", body);

  }

  authenticate(username: string, password: string): Observable<any> {
    return this._httpService.get<boolean>("http://localhost:8080/Rev_SpringMVC_Hello/login/user/"+username+"/pass/"+password);
  }

  getUser(username: string, password: string): Observable<any> {
    return this._httpService.get("http://localhost:8080/Rev_SpringMVC_Hello/login/mylogin/"+username+"/pass/"+password);
  }

  logout(user: User) {

  }

}
