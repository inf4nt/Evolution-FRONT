import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from "../../../model/message.model";
import {AuthenticationService} from "../../../security/authentication.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../model/user.model";
import {TechnicalService} from "../../../service/technical.service";
import {MessageRestService} from "../../../service/rest/message-rest.service";
import {UserRestService} from "../../../service/rest/user-rest.service";
import {UserDto} from "../../../dto/user.dto";
import {AuthenticationUserDto} from "../../../dto/authentication-user.dto";
import {MessageDto} from "../../../dto/message.dto";

declare var NProgress: any;

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.css']
})
export class DialogMessageComponent implements OnInit, OnDestroy {

  messageList: Array<MessageDto> = [];
  interlocutorUser: UserDto = new UserDto();
  authUser: AuthenticationUserDto = new AuthenticationUserDto();
  tempMessage: MessageDto = new MessageDto();
  selectedMessage: MessageDto = new MessageDto();
  initialStateSelectedMessage: MessageDto = new MessageDto();
  isAction: boolean = false;
  private timer: any;

  constructor(private messageDataService: MessageRestService,
              private userDataService: UserRestService,
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
              .findMessageByInterlocutorPage(interlocutor)
              .subscribe(data => {
                if (data && data.content) {
                  if (data.content.length > 0) {
                    this.messageList = data.content;
                    this.startInterval(interlocutor);
                  }
                }
                NProgress.done();
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
        .findMessageByInterlocutorPage(interlocutor)
        .subscribe(data => {
          if (data) {
            this.messageList = data.content;
          }
        })
      console.log('interval');
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  public selectMessage(message: MessageDto): void {
    if (message.sender.id === this.authUser.id) {
      this.initialStateSelectedMessage = message;
      this.selectedMessage = this.techService.cloneMessage(message);
      this.isAction = true;
    } else {
      this.isAction = false;
    }
  }

  public writeMessageToTemp(message: MessageDto): void {
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
    if (this.selectedMessage && this.selectedMessage.message && this.selectedMessage.message.length > 0) {
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
