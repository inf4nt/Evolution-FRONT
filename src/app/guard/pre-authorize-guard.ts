import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../service/authentication.service';
import {Injectable} from '@angular/core';

@Injectable()
export class PreAuthorizeGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log(activatedRouteSnapshot);
    console.log(state);

    if (!this.authService.isAuth()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
    // return confirm('Вы уверены, что хотите перейти?');
  }
}
