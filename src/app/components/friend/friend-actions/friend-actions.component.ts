import {Component, Input, OnInit} from '@angular/core';
import {FriendResultAction} from "../../../model/friend-result-action.model";
import {FriendService} from "../../../service/rest/friend.service";
import {User} from "../../../model/user.model";

declare var NProgress: any;

@Component({
  selector: 'app-friend-actions',
  templateUrl: './friend-actions.component.html',
  styleUrls: ['./friend-actions.component.css']
})
export class FriendActionsComponent implements OnInit {

  @Input()
  private friendResultAction: FriendResultAction;

  @Input()
  private authUser: User;

  @Input()
  private currentUser: User;

  constructor(private friendService: FriendService) { }

  ngOnInit() {
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
