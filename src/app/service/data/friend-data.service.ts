import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  findMyFollowers, findMyProgress, findMyRequests, friendNextAction, friendRest,
  serverUrl
} from '../../common/rest-url';
import {Page} from '../../model/page';
import {Friend} from '../../model/friend.model';
import {Observable} from 'rxjs/Observable';
import {FriendResultAction} from '../../model/friend-result-action.model';
import {FriendAction} from "../../model/friend-action.model";
import {friendStatusFollowers, friendStatusProgress} from "../../common/friend-status";
import {DataTransfer} from "../data-transfer.service";

@Injectable()
export class FriendDataService {

  private friendRest: string = serverUrl + 'friend';

  constructor(private httpClient: HttpClient,
              private transfer: DataTransfer) {
  }

  public findRandomFriendByUser(id: number): Observable<Page<Friend>> {
    return this.httpClient
      .get(this.friendRest + '/find/random/progress/' + id)
      .map(response => {
        return this.transfer.jsonToPage(response);
      });
  }

  public findNextAction(second: number): Observable<FriendResultAction> {
    return this.httpClient
      .get<FriendResultAction>(friendNextAction + '/' + second);
  }

  public actionFriend(friendAction: FriendAction): Observable<FriendResultAction> {
    return this.httpClient
      .post<FriendResultAction>(friendRest + '/action', friendAction);
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

  public findMyProgress(iam: number): Observable<Page<Friend>> {
    return this.httpClient
      .get(findMyProgress + iam)
      .map(response => {
        return this.transfer.jsonToPage(response);
      });
  }

  public findMyFollowers(iam: number): Observable<Page<Friend>> {
    return this.httpClient
      .get(findMyFollowers + iam)
      .map(response => {
        return this.transfer.jsonToPage(response);
      });
  }

  public findMyRequests(iam: number): Observable<Page<Friend>> {
    return this.httpClient
      .get(findMyRequests + iam)
      .map(response => {
        return this.transfer.jsonToPage(response);
      });
  }
}
