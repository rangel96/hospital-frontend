import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private auth: AuthService, private router: Router) {
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return this.auth.validToken()
      .pipe(tap(
        (isAuthValid: boolean) => {
          (isAuthValid)
            ? console.log('Login successful')
            : this.router.navigateByUrl('/login');
        }
      ));
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.auth.validToken()
      .pipe(tap(
        (isAuthValid: boolean) => {
          (isAuthValid)
            ? console.log('Login successful')
            : this.router.navigateByUrl('/login');
        }
      ));
  }

}
