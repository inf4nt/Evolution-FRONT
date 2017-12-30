import {
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";
import {Injectable, Injector} from "@angular/core";
import 'rxjs/add/operator/do';
import {AuthenticationService} from "../security/authentication.service";
declare var NProgress: any;

@Injectable()
export class ResponseStatusInterceptor implements HttpInterceptor {

  private authService: AuthenticationService;

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(event => {

    }, err => {
      console.log(err);
      if (err instanceof HttpErrorResponse) {
        NProgress.done();
        if (err.status === 401) {
          this.router.navigate(['/']);
        } else if (err.status === 403) {
          this.router.navigate(['/status-403']);
        } else if (err.status === 500) {
          this.router.navigate(['/status-500']);
        }
      }
    });
  }

}
