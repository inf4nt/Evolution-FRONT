import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FriendService} from "../../../service/rest/friend.service";
import {UserService} from "../../../service/rest/user.service";
import {User} from "../../../model/user.model";
import {Friend} from "../../../model/friend.model";

declare var NProgress: any;


@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  userId: number;
  status: string;
  currentUser: User = new User();
  listFriend: Array<Friend> = [];

  constructor(private activatedRoute: ActivatedRoute,
              private friendService: FriendService,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      NProgress.start();
      this.userId = +params['id'];
      this.status = params['status'].toString();

      this.userService
        .findOne(this.userId)
        .subscribe(data => {
          if (data) {
            this.currentUser = data;
          } else {
            this.router.navigate(['actionStatus/204']);
          }
        });

      this.friendService.findFriends(this.status, this.userId)
        .subscribe(data => {
          this.listFriend = data.content;
          NProgress.done();
        });


    });
  }

}
