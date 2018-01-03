import {Component, OnInit} from '@angular/core';
import {Message} from "../../../model/message.model";
import {AuthenticationService} from "../../../security/authentication.service";
import {MessageRestService} from "../../../service/rest/message-rest.service";
import {UserDto} from "../../../dto/user.dto";
import {AuthenticationUserDto} from "../../../dto/authentication-user.dto";
import {MessageDto} from "../../../dto/message.dto";
declare var NProgress: any;


@Component({
  selector: 'app-dialog-user-list',
  templateUrl: './dialog-user-list.component.html',
  styleUrls: ['./dialog-user-list.component.css']
})
export class DialogUserListComponent implements OnInit {

  messageListInDialogs: Array<MessageDto> = [];
  authUser: AuthenticationUserDto = new AuthenticationUserDto();

  constructor(private authService: AuthenticationService,
              private messageDataService: MessageRestService) {
  }

  ngOnInit() {
    this.authUser = this.authService.getAuth();
    NProgress.done();
    NProgress.start();

    this.messageDataService
      .findLastMessageForMyDialogPage(this.authService.getAuth().id)
      .subscribe(data => {
        this.messageListInDialogs = data.content;
        NProgress.done();
      });
  }

}
