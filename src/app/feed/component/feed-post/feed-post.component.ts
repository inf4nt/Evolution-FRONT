import {Component, Input, OnInit, Output} from '@angular/core';
import {Feed} from "../../../model/feed.model";
import {FeedForSave} from "../../../model/feed-for-save.model";
import {AuthenticationService} from "../../../security/authentication.service";
import {User} from "../../../model/user.model";
import {FeedDataService} from "../../../service/data/feed-data.service";
import {UserDto} from "../../../dto/user.dto";

declare var NProgress: any;

@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrls: ['./feed-post.component.css']
})
export class FeedPostComponent implements OnInit {

  feedPosted: FeedForSave = new FeedForSave();

  @Input()
  private currentUser: UserDto = new UserDto();

  @Input()
  private sender: UserDto = new UserDto();

  @Input()
  private feedList: Array<Feed> = [];

  constructor(private authService: AuthenticationService,
              private feedDataService: FeedDataService) {
  }

  ngOnInit() {
  }

  public postTweet(): void {


    if (this.feedPosted.content && this.feedPosted.content.length > 0) {
      this.feedPosted.senderId = this.authService.getAuth().id;
      this.feedPosted.toUserId = this.currentUser.id;
      NProgress.start();
      this.feedDataService
        .postFeed(this.feedPosted)
        .subscribe(data => {
          if (data) {
            this.feedList.reverse();
            this.feedList.push(data);
            this.feedList.reverse();
          }
          NProgress.done();
        })
    }

    this.feedPosted = new FeedForSave();
  }
}
