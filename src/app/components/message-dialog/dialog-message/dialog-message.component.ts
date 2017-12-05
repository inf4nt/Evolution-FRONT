import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from "../../../model/message.model";
import {MessageService} from "../../../service/rest/message.service";
import {AuthenticationService} from "../../../security/authentication.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../model/user.model";
import {UserService} from "../../../service/rest/user.service";

declare var NProgress: any;

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.css']
})
export class DialogMessageComponent implements OnInit, OnDestroy {

  messageList: Array<Message> = [];
  interlocutorUser: User = new User();
  authUser: User = new User();
  tempMessage: Message = new Message();
  private timer: any;

  constructor(private messageService: MessageService,
              private authService: AuthenticationService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {

    this.authUser = this.authService.getAuth();
    this.activatedRoute.params.subscribe(params => {
      NProgress.start();

      let interlocutor: number = +params['interlocutor'];

      this.userService
        .findOne(interlocutor)
        .subscribe(data => {
          this.interlocutorUser = data;
          NProgress.done();
        });

      this.messageService
        .findMessageByInterlocutor(interlocutor)
        .subscribe(data => {
          this.messageList = data.content;
        });

      this.startInterval(interlocutor);

    });

  }

  startInterval(interlocutor): void {
    this.timer = setInterval(() => {
      if (this.messageList.length > 0) {
        this.messageService
          .findMessageByInterlocutor(interlocutor)
          .subscribe(data => {
            this.messageList = data.content;
          });
      }
      console.log('interval');
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  public writeMessageToTemp(message: Message): void {
    this.tempMessage = message;
  }

  public deleteMessage(): void {
    if (this.tempMessage) {
      NProgress.start();
      this.messageService
        .deleteMessage(this.tempMessage.id)
        .subscribe(data => {
          if (data) {
            const index = this.messageList.indexOf(this.tempMessage);
            this.messageList.splice(index, 1);
          }
          NProgress.doneAfterCloseModal();
        });
    }
  }

}
