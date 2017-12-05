import {Component, Input, OnInit, Output} from '@angular/core';
import {Feed} from "../../../model/feed.model";
import {FeedForSave} from "../../../model/feed-for-save.model";
import {AuthenticationService} from "../../../security/authentication.service";
import {User} from "../../../model/user.model";
import {FeedService} from "../../../service/rest/feed.service";

declare var NProgress: any;

@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrls: ['./feed-post.component.css']
})
export class FeedPostComponent implements OnInit {

  feedPosted: FeedForSave = new FeedForSave();

  @Input()
  private currentUser: User = new User();

  @Input()
  private sender: User = new User();

  @Input()
  private feedList: Array<Feed> = [];

  constructor(private authService: AuthenticationService,
              private feedService: FeedService) {
  }

  ngOnInit() {
  }

  public postTweet(): void {
    NProgress.start();
    if (this.feedPosted.content && this.feedPosted.content.length > 0) {
      this.feedPosted
        .senderId = this.authService.getAuth().id;

      this.feedPosted
        .toUserId = this.currentUser.id;
      this.feedService
        .postFeed2(this.feedPosted)
        .subscribe(data => {
          this.feedList.reverse();
          this.feedList.push(data);
          this.feedList.reverse();
          NProgress.done();
        });

    } else {
      NProgress.done();
    }

    this.feedPosted = new FeedForSave();
  }
}
