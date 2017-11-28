import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {User} from '../model/user.model';
import {serverUrl} from '../common/const';
import {AuthenticationService} from './authentication.service';
import {DataTransfer} from './data-transfer.service';
import {Observable} from 'rxjs/Observable';
import {findAllUser, findOneUser} from '../common/rest-url';
import {Page} from '../model/page';

@Injectable()
export class UserService {

  constructor(private http: Http,
              private authService: AuthenticationService,
              private transfer: DataTransfer) {
  }

  findOne(id: number): Observable<User> {
    return this.http
      .get(findOneUser + id, this.authService.getRequestOptionsArgs())
      .map((response: Response) => {
        return this.transfer.responseToModelUser(response);
      })
      .catch((error: any) => Observable.throw(error.json().error));
  }

  findAll(): Observable<Page<User>> {
    return this.http
      .get(findAllUser, this.authService.getRequestOptionsArgs())
      .map((response: Response) => {
        const page: Page<User> = new Page<User>();
        if (response && response.json()) {
          page.content = response.json().content;
          page.totalElement = response.json().totalElement;
          page.totalPages = response.json().totalPages;
        }
        return page;
      });
  }

}
