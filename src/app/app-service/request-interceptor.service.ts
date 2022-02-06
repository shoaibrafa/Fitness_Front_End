import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginService} from '../components/login/login.service';
import {Router} from '@angular/router';
import {AppService} from './app.service';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor{

  constructor(private token: LoginService, private router: Router, private server: AppService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = this.token.token;
    if (req.url.search(this.server.SERVER + '/athletique/users/authenticate') === -1){
      const storedDate = window.localStorage.getItem('exp');
      if (new Date(storedDate) > new Date()){
        req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${userToken}`)});
      }else{
        this.router.navigateByUrl('');
        window.localStorage.clear();
      }
    }
    return next.handle(req);
  }
}
