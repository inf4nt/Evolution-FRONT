import {Component, OnInit} from '@angular/core';
import {Message} from "../../../model/message.model";
import {AuthenticationService} from "../../../security/authentication.service";
import {MessageDataService} from "../../../service/data/message-data.service";
import {UserDto} from "../../../dto/user.dto";
declare var NProgress: any;


@Component({
  selector: 'app-dialog-user-list',
  templateUrl: './dialog-user-list.component.html',
  styleUrls: ['./dialog-user-list.component.css']
})
export class DialogUserListComponent implements OnInit {

  messageListInDialogs: Array<Message> = [];
  authUser: UserDto = new UserDto();

  constructor(private authService: AuthenticationService,
              private messageDataService: MessageDataService) {
  }

  ngOnInit() {
    this.authUser = this.authService.getAuth();
    NProgress.done();
    NProgress.start();

    this.messageDataService
      .findLastMessageForMyDialog(this.authService.getAuth().id)
      .subscribe(data => {
        this.messageListInDialogs = data.content;
        NProgress.done();
      });
  }

}
