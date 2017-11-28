import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {AuthenticationService} from '../authentication.service';
import {Observable} from 'rxjs/Observable';
import {Friend} from '../../model/friend.model';
import {findMyFollowers, findMyProgress, findMyRequests, findOneFriend, friendRest} from '../../common/rest-url';
import {DataTransfer} from '../data-transfer.service';
import {Page} from '../../model/page';
import {friendStatusFollowers, friendStatusProgress, friendStatusRequests} from '../../common/friend-status';


@Injectable()
export class FriendService {

  constructor(private http: Http,
              private authService: AuthenticationService,
              private transfer: DataTransfer) {
  }

  public findOne(first: number, second: number): Observable<Friend> {
    return this.http
      .get(findOneFriend + first + '/' + second, this.authService.getRequestOptionsArgs())
      .map((response: Response) => {
        if (response && response.json()) {
          return this.transfer.jsonToModelFriend(response.json());
        } else {
          return null;
        }
      });
  }

  public findMyProgress(iam: number): Observable<Page<Friend>> {
    return this.http
      .get(findMyProgress + iam, this.authService.getRequestOptionsArgs())
      .map((response: Response) => {
        return this.transfer.responseToPage<Friend>(response);
      });
  }

  public findMyFollowers(iam: number): Observable<Page<Friend>> {
    return this.http
      .get(findMyFollowers + iam, this.authService.getRequestOptionsArgs())
      .map((response: Response) => {
        return this.transfer.responseToPage<Friend>(response);
      });
  }

  public findMyRequests(iam: number): Observable<Page<Friend>> {
    return this.http
      .get(findMyRequests + iam, this.authService.getRequestOptionsArgs())
      .map((response: Response) => {
        return this.transfer.responseToPage<Friend>(response);
      });
  }

  public findFriends(status: string, iam: number): Observable<Page<Friend>> {
    if (status.toLocaleUpperCase() === friendStatusProgress) {
      return this.findMyProgress(iam);
    } else if (status.toLocaleUpperCase() === friendStatusFollowers) {
      return this.findMyFollowers(iam);
    } else {
      return this.findMyRequests(iam);
    }
  }

  actionFriend(status: string, recipient: number): Observable<any> {
    console.log('action friend');
    let action: any = '';

    if (status === 'NOT_FOUND') {
      action = 'SEND_REQUEST_FRIEND';
    } else if (status === 'PROGRESS') {
      action = 'DELETE_FRIEND';
    } else if (status === 'FOLLOWER') {
      action = 'ACCEPT_REQUEST';
    } else if (status === 'REQUEST') {
      action = 'DELETE_REQUEST';
    }

    const a = JSON.stringify({
      actionUserId: this.authService.getAuthUser().id,
      recipientUserId: recipient,
      action: action
    });

    return this.http.post(friendRest + '/action', a, this.authService.getRequestOptionsArgs())
      .map((response: Response) => {
        console.log(response);
        if (response && action !== 'DELETE_REQUEST') {
          return response.json();
        }
      }).catch((error: any) => Observable.throw(error + ' server error'));
  }

}
