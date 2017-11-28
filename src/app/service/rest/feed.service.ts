import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {AuthenticationService} from '../authentication.service';
import {DataTransfer} from '../data-transfer.service';
import {Observable} from 'rxjs/Observable';
import {Feed} from '../../model/feed.model';
import {feedRest, findFeedsForMe} from '../../common/rest-url';
import {Page} from '../../model/page';
import {User} from '../../model/user.model';

@Injectable()
export class FeedService {

  constructor(private http: Http,
              private authService: AuthenticationService,
              private transfer: DataTransfer) {
  }

  public findFeedsForMe(iam: number): Observable<Page<Feed>> {
    return this.http
      .get(findFeedsForMe + iam, this.authService.getRequestOptionsArgs())
      .map((response: Response) => {
        return this.transfer.responseToPage<Feed>(response);
      });
  }


  public postFeed(content: string, sender: User, recipient: User): Observable<Feed> {
    if (content && sender && recipient) {
      const tweet: any = JSON.stringify({
        content: content,
        senderId: sender.id,
        toUserId: recipient.id
      });

      return this.http.post(feedRest, tweet, this.authService.getRequestOptionsArgs())
        .map((response: Response) => {
          return this.transfer.responseToModelFeed(response);
        });
    }
  }

  public updateFeed(feed: Feed): Observable<Feed> {
    return null;
  }

  public deleteFeed(id: number): Observable<boolean> {
    return this.http.delete(feedRest + '/' + id, this.authService.getRequestOptionsArgs())
      .map((response: Response) => {
        if (response.status === 204) {
          return true;
        } else {
          return false;
        }
      });
  }

}
