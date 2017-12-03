import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {AuthenticationService} from '../../security/authentication.service';
import {Observable} from 'rxjs/Observable';
import {Friend} from '../../model/friend.model';
import {
  findMyFollowers, findMyProgress, findMyRequests, findOneFriend, friendNextAction,
  friendRest
} from '../../common/rest-url';
import {DataTransfer} from '../data-transfer.service';
import {Page} from '../../model/page';
import {friendStatusFollowers, friendStatusProgress, friendStatusRequests} from '../../common/friend-status';
import {FriendResultAction} from '../../model/friend-result-action.model';


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

  public findNextAction(first: number, second: number): Observable<FriendResultAction> {
    return this.http
      .get(friendNextAction + first + '/' + second, this.authService.getRequestOptionsArgs())
      .map((response: Response) => {
        return this.transfer.responseToModelFriendResultAction(response);
      }).catch((error: any) => Observable.throw(error + ' server error'));
  }

  public findNextAction2(second: number): Observable<FriendResultAction> {
    return this.http
      .get(friendNextAction + '/' + second, this.authService.getRequestOptionsArgs())
      .map((response: Response) => {
        return this.transfer.responseToModelFriendResultAction(response);
      }).catch((error: any) => Observable.throw(error + ' server error'));
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

  actionFriend(actionUser: number, recipientUser: number, friend: FriendResultAction): Observable<FriendResultAction> {
    const a = {
      actionUserId: actionUser,
      recipientUserId: recipientUser,
      action: friend.nextAction
    };

    return this.http.post(friendRest + '/action', a, this.authService.getRequestOptionsArgs())
      .map((response: Response) => {
        console.log(response);
        return this.transfer.responseToModelFriendResultAction(response);
      }).catch((error: any) => Observable.throw(error + ' server error'));
  }

}
