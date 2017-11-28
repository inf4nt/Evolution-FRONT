import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {AuthenticationService} from './authentication.service';
import {DataTransfer} from './data-transfer.service';
import {Observable} from 'rxjs/Observable';
import {Feed} from '../model/feed.model';
import {feed, findFeedsForMe} from '../common/rest-url';
import {Page} from '../model/page';

@Injectable()
export class FeedService {

  constructor(private http: Http,
              private authService: AuthenticationService,
              private transfer: DataTransfer) {
  }

  public findFeedsForMe(iam: number): Observable<Page<Feed>> {
    return this.http
      .get(findFeedsForMe + iam, {headers: this.authService.getHeaders()})
      .map((response: Response) => {
        return this.transfer.responseToPage<Feed>(response);
      });
  }


  public postFeed(feed: Feed): Feed {
    return null;
  }

  public  updateFeed(feed: Feed): Feed {
    return null;
  }

  public deleteFeed(id: number): Observable<boolean> {
    return this.http.delete(feed + '/' + id)
      .map((response: Response) => {
        if (response.status === 204) {
          return true;
        } else {
          return false;
        }
      });
  }

}
