import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Friend} from '../../model/friend.model';
import {FriendService} from '../../service/rest/friend.service';
import {UserService} from '../../service/rest/user.service';
import {User} from '../../model/user.model';


declare var NProgress: any;

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  userId: number;
  status: string;
  listFriend: Array<Friend> = [];
  isDone: boolean;
  currentUser: User = new User();


  constructor(private activatedRoute: ActivatedRoute,
              private friendService: FriendService,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.isDone = false;
      this.userId = +params['id'];
      this.status = params['status'].toString();

      NProgress.start();

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
          this.isDone = true;
        });

    });

  }

}
