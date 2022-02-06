import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {AppService} from '../../app-service/app.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string = null;
  exp: Date = null;
  isLoggedIn = false;

  constructor(private http: HttpClient, private server: AppService) {
    this.checkToken();
  }

  checkLogin(credentials: string): any {
    console.log(credentials);
    return this.http.post(this.server.SERVER + '/users/authenticate', credentials, {responseType: 'text' as 'json'}).
    pipe(tap(resource => {
      const response = resource.toString();
      window.localStorage.setItem('response', response);
      this.checkToken();
    }));
  }

  checkToken(): void {
    const response = window.localStorage.getItem('response');
    if (response){
      const jwtData = response.split('.')[1];
      const decodedData = JSON.parse(window.atob(jwtData));
      const exp = new Date(decodedData.exp * 1000);
      if (exp > new Date()){
        this.isLoggedIn = true;
        this.token = response.split(('"'))[3];
        window.localStorage.setItem('exp', exp.toString());
      }else{
        window.localStorage.clear();
      }
    }
  }
}
