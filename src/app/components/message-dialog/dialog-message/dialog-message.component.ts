import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from "../../../model/message.model";
import {AuthenticationService} from "../../../security/authentication.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../model/user.model";
import {TechnicalService} from "../../../service/technical.service";
import {MessageDataService} from "../../../service/data/message-data.service";
import {UserDataService} from "../../../service/data/user-data.service";
import {UserDto} from "../../../dto/user.dto";

declare var NProgress: any;

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.css']
})
export class DialogMessageComponent implements OnInit, OnDestroy {

  messageList: Array<Message> = [];
  interlocutorUser: UserDto = new UserDto();
  authUser: UserDto = new UserDto();
  tempMessage: Message = new Message();
  selectedMessage: Message = new Message();
  initialStateSelectedMessage: Message = new Message();
  isAction: boolean = false;
  private timer: any;

  constructor(private messageDataService: MessageDataService,
              private userDataService: UserDataService,
              private authService: AuthenticationService,
              private activatedRoute: ActivatedRoute,
              private techService: TechnicalService) {
  }

  ngOnInit() {

    this.authUser = this.authService.getAuth();
    this.activatedRoute.params.subscribe(params => {
      NProgress.start();

      let interlocutor: number = +params['interlocutor'];

      this.userDataService
        .findOne(interlocutor)
        .subscribe(data => {
          if (data) {
            this.interlocutorUser = data;
            this.messageDataService
              .findMessageByInterlocutor(interlocutor)
              .subscribe(data => {
                this.messageList = data.content;
                NProgress.done();
                if (data.content.length > 0) {
                  this.startInterval(interlocutor);
                }
              })
          } else {
            NProgress.done();
          }
        })

    });

  }

  startInterval(interlocutor): void {
    this.timer = setInterval(() => {
      this.messageDataService
        .findMessageByInterlocutor(interlocutor)
        .subscribe(data => {
          this.messageList = data.content;
        })
      console.log('interval');
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  public selectMessage(message: Message): void {
    if (message.sender.id === this.authUser.id) {
      this.initialStateSelectedMessage = message;
      this.selectedMessage = this.techService.cloneMessage(message);
      this.isAction = true;
    } else {
      this.isAction = false;
    }
  }

  public writeMessageToTemp(message: Message): void {
    this.tempMessage = message;
  }

  public deleteMessage(): void {
    if (this.tempMessage) {
      NProgress.start();
      this.messageDataService
        .deleteMessage(this.tempMessage.id)
        .subscribe(data => {
          if (data) {
            const index = this.messageList.indexOf(this.tempMessage);
            this.messageList.splice(index, 1);
          }
          NProgress.doneAfterCloseModal();
          this.isAction = false;
        });
    }
  }

  public edit(): void {
    if (this.selectedMessage && this.selectedMessage.content && this.selectedMessage.content.length > 0) {
      NProgress.start();
      this.messageDataService
        .put(this.techService.messageToMessageForUpdate(this.selectedMessage))
        .subscribe(data => {
          this.techService.updateListMessage(this.messageList, data);
          NProgress.done();
          this.isAction = false;
        });
    } else {
      this.isAction = false;
    }
  }

  public cancel(): void {
    this.isAction = false;
  }

}
