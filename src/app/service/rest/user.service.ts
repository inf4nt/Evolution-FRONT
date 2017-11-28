import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {User} from '../../model/user.model';
import {AuthenticationService} from '../authentication.service';
import {DataTransfer} from '../data-transfer.service';
import {Observable} from 'rxjs/Observable';
import {findAllUser, findOneUser, userRest} from '../../common/rest-url';
import {Page} from '../../model/page';
import {UserForSaveDto} from '../../dto/user-for-save.dto';

@Injectable()
export class UserService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http,
              private authService: AuthenticationService,
              private transfer: DataTransfer) {
  }

  public findOne(id: number): Observable<User> {
    return this.http
      .get(findOneUser + id, this.authService.getRequestOptionsArgs())
      .map((response: Response) => {
        return this.transfer.responseToModelUser(response);
      })
      .catch((error: any) => Observable.throw(error.json().error));
  }

  public findAll(): Observable<Page<User>> {
    return this.http
      .get(findAllUser, this.authService.getRequestOptionsArgs())
      .map((response: Response) => {
        return this.transfer.responseToPage<User>(response);
      });
  }

  public postUser(user: UserForSaveDto): Observable<number> {
    return this.http.post(userRest + '/post', user.values, this.headers)
      .map((response: Response) => {
        if (response.status === 201) {
          return 1;
        }
      })
      .catch((error: any) => {
        if (error.status === 417) {
          return Observable.of(3);
        } else if (error.status === 500) {
          return Observable.of(4);
        }

      });
  }

}
