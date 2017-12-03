import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../security/authentication.service';
import {HttpHeaders} from '@angular/common/http';
import {MessageService} from '../../service/rest/message.service';
import {Message} from '../../model/message.model';
import {User} from '../../model/user.model';

declare var NProgress: any;

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  messageListInDialogs: Array<Message> = [];
  authUser: User;

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
