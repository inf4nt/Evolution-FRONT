import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {EvolutionJwtTokenService} from "../security/jwt-token.service";

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {


  constructor(private jwtService: EvolutionJwtTokenService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.jwtService.getToken()) {
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + this.jwtService.getToken()
        }
      });
    }
    return next.handle(request);
  }
}
