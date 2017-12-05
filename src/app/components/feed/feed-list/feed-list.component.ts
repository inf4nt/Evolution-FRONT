import {Component, Input, OnInit} from '@angular/core';
import {Feed} from '../../../model/feed.model';
import {User} from "../../../model/user.model";
import {FeedService} from "../../../service/rest/feed.service";
import {AuthenticationService} from "../../../security/authentication.service";

declare var NProgress: any;

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit {

  @Input()
  private feedList: Array<Feed> = [];

  @Input()
  private currentUser: User = new User();

  @Input()
  private authUser: User = new User();

  private tempFeed: Feed;

  constructor(private feedService: FeedService) {
  }

  ngOnInit() {
  }

  beforeRemoveFeed(feed: Feed): void {
    this.tempFeed = feed;
  }

  public removeFeed(): void {
    NProgress.start();
    this.feedService.deleteFeed(this.tempFeed.id)
      .subscribe(data => {
        if (data) {
          const index = this.feedList.indexOf(this.tempFeed);
          this.feedList.splice(index, 1);
        }
        NProgress.doneAfterCloseModal();
        this.tempFeed = null;
      });
  }

}
