import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {serverUrl} from '../common/const';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs/Observable';
import {Friend} from '../model/friend.model';
import {findMyFollowers, findMyProgress, findMyRequests, findOneFriend} from '../common/rest-url';
import {DataTransfer} from './data-transfer.service';


@Injectable()
export class FriendService {

  private url: string = serverUrl + 'friend';


  constructor(private http: Http,
              private authService: AuthenticationService,
              private transfer: DataTransfer) {
  }


  findOne(first: number, second: number): Observable<Friend> {
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

  findMyProgress(iam: number): Observable<Array<Friend>> {
    return this.http
      .get(findMyProgress + iam, this.authService.getRequestOptionsArgs())
      .map((response: Response) => {
        if (response && response.json()) {
          const list: Array<Friend> = [];
          const content = response.json().content;
          for (const a of content) {
            list.push(this.transfer.jsonToModelFriend(a));
          }
          return list;
        }
      });
  }

  findMyFollowers(iam: number): Observable<Array<Friend>> {
    return this.http
      .get(findMyFollowers + iam, this.authService.getRequestOptionsArgs())
      .map((response: Response) => {
        if (response && response.json()) {
          const list: Array<Friend> = [];
          const content = response.json().content;
          for (const a of content) {
            list.push(this.transfer.jsonToModelFriend(a));
          }
          return list;
        }
      });
  }

  findMyRequests(iam: number): Observable<Array<Friend>> {
    return this.http
      .get(findMyRequests + iam, this.authService.getRequestOptionsArgs())
      .map((response: Response) => {
        if (response && response.json()) {
          const list: Array<Friend> = [];
          const content = response.json().content;
          for (const a of content) {
            list.push(this.transfer.jsonToModelFriend(a));
          }
          return list;
        }
      });
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

    return this.http.post(this.url + '/action', a, this.authService.getRequestOptionsArgs())
      .map((response: Response) => {
        console.log(response);
        if (response && action !== 'DELETE_REQUEST') {
          return response.json();
        }
      }).catch((error: any) => Observable.throw(error + ' server error'));
  }

}
