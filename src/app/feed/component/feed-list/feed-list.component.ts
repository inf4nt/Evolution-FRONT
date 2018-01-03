import {Component, Input, OnInit} from '@angular/core';
import {Feed} from '../../../model/feed.model';
import {User} from "../../../model/user.model";
import {FeedRestService} from "../../../service/rest/feed-rest.service";
import {FeedDto} from "../../../dto/feed.dto";
import {AuthenticationUserDto} from "../../../dto/authentication-user.dto";
import {UserDto} from "../../../dto/user.dto";

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
  private currentUser: UserDto = new UserDto();

  @Input()
  private authUser: AuthenticationUserDto = new AuthenticationUserDto();

  private tempFeed: FeedDto;

  constructor(private feedDataService: FeedRestService) {
  }

  ngOnInit() {
  }

  beforeRemoveFeed(feed: FeedDto): void {
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
        this.tempFeed = new FeedDto();
      });

  }

}
