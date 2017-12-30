/**
 * Created by Infant on 15.08.2017.
 */
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {DataTransfer} from '../service/data-transfer.service';
import {User} from '../model/user.model';
import {serverUrl} from '../common/rest-url';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {AuthenticationRequestDto} from '../dto/authentication-request.dto';
import {Observable} from 'rxjs/Observable';
import {EvolutionJwtTokenService} from "./jwt-token.service";
import {UserDto} from "../dto/user.dto";

@Injectable()
export class AuthenticationService {

  private authUrl = serverUrl + 'auth';

  constructor(private httpClient: HttpClient,
              private jwtTokenService: EvolutionJwtTokenService,
              private transfer: DataTransfer) {
  }

  public login(authenticationRequest: AuthenticationRequestDto): Observable<boolean> {
    return this.httpClient
      .post(this.authUrl, authenticationRequest)
      .map((response: HttpResponse<any>) => {
        let json: any = response;
        const token = json && json.token;
        if (token) {
          let u: UserDto = this.transfer.jsonToModelUserDTO(json.user);
          u.username = authenticationRequest.username;
          this.setAuthUser(u);

          this.jwtTokenService.setToken(token);
          return true;
        } else {
          return false;
        }
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public getAuth(): UserDto {
    let item: any = localStorage.getItem('authUser');
    if (item) {
      const u = JSON.parse(localStorage.getItem('authUser')).user;
      return this.transfer.jsonToModelUserDTO(u);
    } else {
      return new UserDto();
    }
  }

  public terminateAllSessions(json: any): Observable<boolean> {
    return this.httpClient
      .post(serverUrl + 'auth/clean-auth-session', json, {observe: 'response'})
      .map((response: any) => {
        return response.status === 200;
      });
  }

  public isAuth(): boolean {
    return this.jwtTokenService.getToken() != null;
  }

  public getToken(): String {
    return this.jwtTokenService.getToken();
  }

  public logout(): void {
    localStorage.removeItem('authUser');
    this.jwtTokenService.cleanToken();
  }

  private setAuthUser(user: any): void {
    localStorage.setItem('authUser', JSON.stringify({
      user: user
    }));
  }
}
