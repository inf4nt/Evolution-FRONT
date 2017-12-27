import {Component, Input, OnInit} from '@angular/core';
import {Feed} from '../../../model/feed.model';
import {User} from "../../../model/user.model";
import {FeedDataService} from "../../../service/data/feed-data.service";
import {FeedDto} from "../../../dto/feed.dto";

declare var NProgress: any;

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit {

  @Input()
  feedList: Array<FeedDto> = [];

  @Input()
  private currentUser: User = new User();

  @Input()
  private authUser: User = new User();

  private tempFeed: Feed;

  constructor(private feedDataService: FeedDataService) {
  }

  ngOnInit() {
  }

  beforeRemoveFeed(feed: Feed): void {
    this.tempFeed = feed;
  }

  public removeFeed(): void {
    NProgress.start();

    this.feedDataService
      .delete(this.tempFeed.id)
      .subscribe(data => {
        if (data) {
          const index = this.feedList.indexOf(this.tempFeed);
          this.feedList.splice(index, 1);
        }
        NProgress.doneAfterCloseModal();
        this.tempFeed = new Feed();
      });

  }

}
