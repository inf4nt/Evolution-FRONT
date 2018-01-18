import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../security/authentication.service';
import {Friend} from '../../../model/friend.model';
import {FriendResultAction} from '../../../model/friend-result-action.model';
import {Page} from '../../../model/page';
import {UserRestService} from '../../../service/rest/user-rest.service';
import {FeedRestService} from '../../../service/rest/feed-rest.service';
import {FriendRestService} from '../../../service/rest/friend-rest.service';
import {FeedDto} from "../../../dto/feed.dto";
import {UserDto} from "../../../dto/user.dto";
import {NProgressService} from "../../../service/nprogress.service";
import {AuthenticationUserDto} from "../../../dto/authentication-user.dto";


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {



  currentUser: UserDto = new UserDto();
  friend: Friend = new Friend();
  authUser: AuthenticationUserDto = new AuthenticationUserDto();
  currentUserId: number;
  feedList: Array<FeedDto> = [];
  pageFriends: Page<Friend> = new Page<Friend>();
  isLoading: boolean = false;

  friendResultAction: FriendResultAction = new FriendResultAction();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private userDataService: UserRestService,
              private feedDataService: FeedRestService,
              private friendDataService: FriendRestService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {

    this.authUser = this.authenticationService.getAuth();

    this.activatedRoute.params.subscribe(params => {
      NProgressService.done();
      this.refresh();
      this.isLoading = true;
      let id: number = +params['id'];
      this.currentUserId = id;

      NProgressService.start();

      this.userDataService
        .findOne(id)
        .subscribe(data => {
          if (data) {
            this.currentUser = data;

            this.feedDataService
              .findFeedsForMe(id)
              .subscribe(data => {
                if (data) {
                  this.feedList = data.content;
                  this.feedList.reverse();
                }
              });

            this.friendDataService
              .findRandomFriendByUser(id)
              .subscribe(data => {
                if (data) {
                  this.pageFriends = data;
                }
              });

            if (this.authUser.id !== data.id) {
              this.friendDataService
                .findNextAction(id)
                .subscribe(data => {
                  this.friendResultAction = data;
                })
            }
          } else {
            this.router.navigate(['/status-204']);
          }
          NProgressService.done();
          this.isLoading = false;
        })
    });

  }

  private refresh(): void {
    this.isLoading = false;
    this.currentUser = new UserDto();
    this.friend = new Friend();
    this.currentUserId = 0;
    this.feedList = [];
    this.pageFriends = new Page<Friend>();
  }

}
