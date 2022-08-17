import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private _authService: AuthService,
    private router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this._authService.verifyAuthentication());

    return this._authService.verifyAuthentication()
      .pipe(
        tap(isAuthenticated => {
          console.log(isAuthenticated);
          
          if (!isAuthenticated) {
            this.router.navigate(['./auth'])
          }
        })
      );

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    // return this._authService.auth.token != null || this._authService.auth.token != undefined;
    return this._authService.verifyAuthentication()
      .pipe(
        tap(isAuthenticated => {

          console.log(isAuthenticated);

          if (!isAuthenticated) {
            this.router.navigate(['./auth'])
          }
        })
      );
  }
}
