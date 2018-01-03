import {Component, Input, OnInit} from '@angular/core';
import {FriendResultAction} from "../../../model/friend-result-action.model";
import {User} from "../../../model/user.model";
import {FriendRestService} from "../../../service/rest/friend-rest.service";
import {FriendAction} from "../../../model/friend-action.model";
import {UserDto} from "../../../dto/user.dto";

declare var NProgress: any;

@Component({
  selector: 'app-friend-actions',
  templateUrl: './friend-actions.component.html',
  styleUrls: ['./friend-actions.component.css']
})
export class FriendActionsComponent implements OnInit {

  @Input()
  friendResultAction: FriendResultAction;

  @Input()
  private authUser: UserDto;

  @Input()
  private currentUser: UserDto;

  constructor(private friendDataService: FriendRestService) { }

  ngOnInit() {
  }

  actionFriend(): void {
    NProgress.start();
    this.friendDataService
      .actionFriend(new FriendAction(this.authUser.id, this.currentUser.id, this.friendResultAction.nextAction))
      .subscribe(data => {
        if (data) {
          this.friendResultAction = data;
        }
        NProgress.done();
      })
  }
}
