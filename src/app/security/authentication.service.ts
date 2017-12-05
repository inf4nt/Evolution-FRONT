/**
 * Created by Infant on 15.08.2017.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptionsArgs} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {DataTransfer} from '../service/data-transfer.service';
import {User} from '../model/user.model';
import {serverUrl} from '../common/rest-url';

@Injectable()
export class AuthenticationService {

  private authUrl = serverUrl + 'auth';

  private headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});

  constructor(private http: Http,
              private transfer: DataTransfer) {
  }

  public login(username: string, password: string): Observable<boolean> {
    return this.http.post(this.authUrl, JSON.stringify({
      username: username,
      password: password
    }), {headers: this.headers})
      .map((response: Response) => {
        const token = response.json() && response.json().token;
        if (token) {
          localStorage.setItem('currentUser', JSON.stringify({
            username: username,
            user: response.json().user,
            token: token
          }));

          return true;
        } else {
          return false;
        }
      }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getHeaders(): Headers {
    return new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    });
  }

  public getRequestOptionsArgs(): RequestOptionsArgs {
    return {headers: this.getHeaders()};
  }

  public getAuth(): User {
    return this.transfer.jsonToModelUser(JSON.parse(localStorage.getItem('currentUser')).user);
  }

  public isAuth(): boolean {
    return this.getToken() != null;
  }

  public getToken(): String {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser && currentUser.token;
    return token ? token : null;
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
  }

  public getUsername(): string {
    if (this.isAuth()) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      return currentUser.username;
    }
  }

}
