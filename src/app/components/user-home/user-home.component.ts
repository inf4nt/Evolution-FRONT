import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../security/authentication.service';
import {FriendService} from '../../service/rest/friend.service';
import {UserService} from '../../service/rest/user.service';
import {User} from '../../model/user.model';
import {FeedService} from '../../service/rest/feed.service';
import {Feed} from '../../model/feed.model';
import {Friend} from '../../model/friend.model';
import {FriendResultAction} from '../../model/friend-result-action.model';


declare var NProgress: any;

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  currentUser: User = new User();
  friend: Friend = new Friend();
  authUser: User = new User();
  currentUserId: number;
  feedList: Array<Feed> = [];
  tweetText: string = null;
  tempFeed: Feed;
  friendResultAction: FriendResultAction = new FriendResultAction();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
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

      this.userService
        .findOne(id)
        .subscribe(data => {
          if (data) {
            this.currentUser = data;
          } else {
            // maybe user not found
            this.router.navigate(['actionStatus/204']);
          }
        });

      if (this.currentUserId !== this.authUser.id) {
        this.friendService
          .findNextAction2(this.currentUserId)
          .subscribe(data => {
            console.log(data);
            this.friendResultAction = data;
          });
      }

      this.feedService
        .findFeedsForMe(id)
        .subscribe(data => {
          this.feedList = data.content;
          this.feedList.reverse();
          NProgress.done();
        });
    });

  }

  postTweet(): void {
    NProgress.start();
    if (this.tweetText) {
      this.feedService.postFeed(this.tweetText, this.authenticationService.getAuth(), this.currentUser)
        .subscribe(data => {
          this.feedList.reverse();
          this.feedList.push(data);
          this.feedList.reverse();
          NProgress.done();
        });
    } else {
      NProgress.done();
    }
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
    this.friendService
      .actionFriend(this.authUser.id, this.currentUser.id, this.friendResultAction)
      .subscribe(data => {
        this.friendResultAction = data;
        NProgress.done();
      });
  }

}
