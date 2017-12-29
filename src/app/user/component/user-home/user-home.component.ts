import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../security/authentication.service';
import {Friend} from '../../../model/friend.model';
import {FriendResultAction} from '../../../model/friend-result-action.model';
import {Page} from '../../../model/page';
import {UserDataService} from '../../../service/data/user-data.service';
import {FeedDataService} from '../../../service/data/feed-data.service';
import {FriendDataService} from '../../../service/data/friend-data.service';
import {FeedDto} from "../../../dto/feed.dto";
import {UserDto} from "../../../dto/user.dto";
import {NProgressService} from "../../../service/nprogress.service";


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {



  currentUser: UserDto = new UserDto();
  friend: Friend = new Friend();
  authUser: UserDto = new UserDto();
  currentUserId: number;
  feedList: Array<FeedDto> = [];
  pageFriends: Page<Friend> = new Page<Friend>();
  isLoading: boolean = false;

  friendResultAction: FriendResultAction = new FriendResultAction();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private userDataService: UserDataService,
              private feedDataService: FeedDataService,
              private friendDataService: FriendDataService,
              private authenticationService: AuthenticationService,) {
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
        .toPromise()
        .then(res => {
          if (res) {

            Promise.all([

              this.feedDataService
                .findFeedsForMe(id)
                .toPromise(),

              this.friendDataService
                .findRandomFriendByUser(id)
                .toPromise(),

              this.authUser.id !== id
                ? this.friendDataService.findNextAction(id).toPromise()
                : null,

            ]).then(results => {
              this.feedList = results[0].content;
              this.feedList.reverse();

              this.pageFriends = results[1];

              if (this.authUser.id !== id) {
                this.friendResultAction = results[2];
              }

              this.currentUser = res;
              NProgressService.done();
              this.isLoading = false;
            });

          } else {
            this.router.navigate(['/status-204']);
            NProgressService.done();
            this.isLoading = false;
          }
        });

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
