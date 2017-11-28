import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {serverUrl} from '../../common/const';
import {FriendService} from '../../service/friend.service';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user.model';
import {FeedService} from "../../service/feed.service";

declare var NProgress: any;

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  id: number;
  currentUser: User;
  auth: any = {};
  url: string = serverUrl + 'user/';
  server: string = serverUrl;
  isDone = false;
  feedList: any = [];
  friendStatus: any = '';
  tweetText: any = null;
  tempFeed: any = null;
  friend: any = {};
  actionUser = 0;

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private friendService: FriendService,
              private userService: UserService,
              private feedService: FeedService) {
  }

  ngOnInit(): void {
    console.log('UserHomeComponent on init');

    this.auth = this.authenticationService.getAuthUser();

    this.activatedRoute.params.subscribe(params => {
      this.feedList = [];
      NProgress.start();
      this.isDone = false;
      this.id = +params['id'];
      this.initData();
    });

  }

  initData(): void {

    if (this.auth.id !== this.id) {

      this.userService
        .findOne(this.id)
        .subscribe(data => {
          this.currentUser = data;
          this.isDone = true;
        });

    }

    this.userService
      .findOne(this.id)
      .subscribe(data => {
        this.currentUser = data;
      });


    this.feedService
      .findFeedsForMe(this.id)
      .subscribe(data => {
        if (data.content) {
          this.feedList = data.content;
          this.feedList.reverse();
        } else {
          this.feedList = [];
        }
        this.isDone = true;
        NProgress.done();
      });


  }

  postTweet(): void {
    if (this.tweetText) {
      NProgress.start();

      const tweet: any = {
        content: this.tweetText,
        senderId: this.auth.id,
        toUserId: this.id
      };

      this.http.post(this.server + 'feed', JSON.stringify(tweet), {headers: this.httpHeaders})
        .map(res => res).subscribe((data: any) => {
          if (data) {
            this.feedList.reverse();
            this.feedList.push(data);
            this.feedList.reverse();
            NProgress.done();
          }
        },
        (err) => {
          console.log(err);
          NProgress.done();
        });

    }
    this.tweetText = null;
  }

  beforeRemoveFeed(feed: any): void {
    this.tempFeed = feed;
  }

  removeFeed(): void {
    if (this.tempFeed) {
      const index = this.feedList.indexOf(this.tempFeed);
      this.feedList.splice(index, 1);

      this.http
        .delete(this.server + 'feed/' + this.tempFeed.id, {headers: this.httpHeaders})
        .subscribe(data => {
        });

      this.tempFeed = null;
    }
  }

  actionFriend(): void {
    NProgress.start();
    this.friendService.actionFriend(this.friendStatus, this.id)
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
