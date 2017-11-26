import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {AuthenticationService} from './authentication.service';
import {DataTransfer} from './data-transfer.service';
import {Observable} from 'rxjs/Observable';
import {Feed} from '../model/feed.model';
import {findFeedsForMe} from '../common/rest-url';

@Injectable()
export class FeedService {

  constructor(private http: Http,
              private authService: AuthenticationService,
              private transfer: DataTransfer) {
  }

  findFeedsForMe(iam: number): Observable<Array<Feed>> {
    return this.http
      .get(findFeedsForMe + iam, {headers: this.authService.getHeaders()})
      .map((response: Response) => {
        console.log(response);
        const list: Array<Feed> = [];
        if (response && response.json()) {
          const content = response.json().content;
          for (const a of content ) {
            list.push(this.transfer.jsonToModelFeed(a));
          }
        }
        return list;
      });
  }

  postFeed(feed: Feed): Feed {
    return null;
  }

  updateFeed(feed: Feed): Feed {
    return null;
  }

}
