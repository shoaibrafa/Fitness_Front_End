import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AppRoutingModule} from './app.routing.module';
import {LoginService} from './components/login/login.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
  constructor(private authService: LoginService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn){
      return true;
    }
    return this.router.createUrlTree(['login']);
  }
}
