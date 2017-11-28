import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {FriendService} from '../../service/rest/friend.service';
import {UserService} from '../../service/rest/user.service';
import {User} from '../../model/user.model';
import {FeedService} from '../../service/rest/feed.service';
import {Feed} from '../../model/feed.model';

declare var NProgress: any;

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  currentUser: User = new User();
  authUser: User = new User();
  currentUserId: number;
  isDone = false;
  feedList: Array<Feed> = [];
  friendStatus: any = '';
  tweetText: string = null;
  tempFeed: Feed;
  friend: any = {};
  actionUser = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private friendService: FriendService,
              private userService: UserService,
              private feedService: FeedService) {
  }

  ngOnInit(): void {

    this.authUser = this.authenticationService.getAuth();

    this.activatedRoute.params.subscribe(params => {
      const id = +params['id'];
      this.currentUserId = id;

      NProgress.start();
      this.isDone = false;

      this.userService
        .findOne(id)
        .subscribe(data => {
          this.currentUser = data;
        });

      this.feedService
        .findFeedsForMe(id)
        .subscribe(data => {
          this.feedList = data.content;
          this.feedList.reverse();
          this.isDone = true;
          NProgress.done();
        });

    });

  }

  postTweet(): void {
    NProgress.start();
    this.feedService.postFeed(this.tweetText, this.authenticationService.getAuth(), this.currentUser)
      .subscribe(data => {
        this.feedList.reverse();
        this.feedList.push(data);
        this.feedList.reverse();
        NProgress.done();
      });
    this.tweetText = null;
  }

  beforeRemoveFeed(feed: Feed): void {
    this.tempFeed = feed;
  }

  removeFeed(): void {
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

  actionFriend(): void {
    NProgress.start();
    this.friendService.actionFriend(this.friendStatus, this.currentUser.id)
      .subscribe(data => {
        if (data) {
          this.friendStatus = data.status;
          this.actionUser = data.actionUser.id;
        } else {
          this.friendStatus = 'NOT_FOUND';
          this.actionUser = 0;
        }
        NProgress.done();
      });

  }

}
