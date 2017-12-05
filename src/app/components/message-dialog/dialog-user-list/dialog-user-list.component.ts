import {Component, OnInit} from '@angular/core';
import {Message} from "../../../model/message.model";
import {User} from "../../../model/user.model";
import {MessageService} from "../../../service/rest/message.service";
import {AuthenticationService} from "../../../security/authentication.service";
declare var NProgress: any;


@Component({
  selector: 'app-dialog-user-list',
  templateUrl: './dialog-user-list.component.html',
  styleUrls: ['./dialog-user-list.component.css']
})
export class DialogUserListComponent implements OnInit {

  messageListInDialogs: Array<Message> = [];
  authUser: User = new User();

  constructor(private authService: AuthenticationService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.authUser = this.authService.getAuth();
    NProgress.start();

    this.messageService.findLastMessageForMyDialog(this.authService.getAuth().id)
      .subscribe(data => {
        this.messageListInDialogs = data.content;
        NProgress.done();
      });
  }

}
