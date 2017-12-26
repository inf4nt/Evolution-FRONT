import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Friend} from "../../../model/friend.model";
import {UserDataService} from "../../../service/data/user-data.service";
import {FriendDataService} from "../../../service/data/friend-data.service";
import {UserDto} from "../../../dto/user.dto";

declare var NProgress: any;


@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  userId: number;
  status: string;
  currentUser: UserDto = new UserDto();
  listFriend: Array<Friend> = [];
  load: boolean = false;


  constructor(private activatedRoute: ActivatedRoute,
              private userDataService: UserDataService,
              private router: Router,
              private friendDataService: FriendDataService,) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      NProgress.done();
      this.listFriend = [];
      this.load = false;
      NProgress.start();
      this.userId = +params['id'];
      this.status = params['status'].toString();

      this.userDataService
        .findOne(this.userId)
        .subscribe(data => {
          if (data) {
            this.currentUser = data;
             this.friendDataService
               .findFriends(this.status, this.userId)
               .subscribe(data => {
                 this.listFriend = data.content;
                 NProgress.done();
                 this.load = true;
               })
          } else {
            NProgress.done();
            this.load = true;
          }
        });

    });
  }

}
