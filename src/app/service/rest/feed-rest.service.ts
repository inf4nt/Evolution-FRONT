import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {feedRest, findFeedsForMe, serverUrl} from '../../common/rest-url';
import {Page} from '../../model/page';
import {Feed} from '../../model/feed.model';
import {Observable} from 'rxjs/Observable';
import {FeedForSave} from '../../model/feed-for-save.model';
import {DataTransfer} from "../data-transfer.service";
import {FeedDto} from "../../dto/feed.dto";

@Injectable()
export class FeedRestService {

  constructor(private httpClient: HttpClient,
              private transfer: DataTransfer) {
  }

  public findFeedsForMe(iam: number): Observable<Page<FeedDto>> {
    return this.httpClient
      .get(findFeedsForMe + iam)
      .map(response => {
        return this.transfer.jsonToPage(response);
      });
  }

  public postFeed(feed: FeedForSave): Observable<Feed> {
    if (feed && feed.content) {
      return this.httpClient
        .post<Feed>(feedRest, feed.values);
    }
  }

  public delete(id: number): Observable<boolean> {
    return this.httpClient
      .delete(feedRest + '/' + id, {observe: 'response'})
      .map(response => {
        if (response.status === 204) {
          return true;
        } else {
          return false;
        }
      });
  }

}
