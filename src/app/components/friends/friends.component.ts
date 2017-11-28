import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Friend} from '../../model/friend.model';
import {FriendService} from '../../service/rest/friend.service';


declare var NProgress: any;

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  status: string;
  userId: number;
  listFriend: Array<Friend> = [];
  isDone: boolean;
  constructor(private activatedRoute: ActivatedRoute,
              private friendService: FriendService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.isDone = false;
      this.userId = +params['id'];
      this.status = params['status'].toString();

      NProgress.start();

      this.friendService.findFriends(this.status, this.userId)
        .subscribe(data => {
          this.listFriend = data.content;
          NProgress.done();
          this.isDone = true;
        });

    });

  }

}
