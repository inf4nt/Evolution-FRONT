import {Component, OnDestroy, OnInit} from '@angular/core';
import {DialogRestService} from "../../../service/rest/dialog-rest.service";
import {MessageDto} from "../../../dto/message.dto";
import {ActivatedRoute} from "@angular/router";
import {NProgressService} from "../../../service/nprogress.service";
import {UserDto} from "../../../dto/user.dto";
import {UserRestService} from "../../../service/rest/user-rest.service";
import {AuthenticationUserDto} from "../../../dto/authentication-user.dto";
import {AuthenticationService} from "../../../security/authentication.service";
import {MessageRestService} from "../../../service/rest/message-rest.service";
import {TechnicalService} from "../../../service/technical.service";
import {MessageForSave} from "../../../model/message-for-save.model";
import {maxListMessageLength} from "../../../common/const";

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.css']
})
export class MessageInDialogComponent implements OnInit, OnDestroy {

  listMessage: Array<MessageDto> = [];
  interlocutorUser: UserDto = new UserDto();
  authUser: AuthenticationUserDto = new AuthenticationUserDto();
  tempMessage: MessageDto = new MessageDto();
  selectedMessage: MessageDto = new MessageDto();
  initialStateSelectedMessage: MessageDto = new MessageDto();
  isAction: boolean = false;
  isLoad = false;
  messagePost: MessageForSave = new MessageForSave();
  private timer: any;
  private dialogId: number;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthenticationService,
              private userRestService: UserRestService,
              private techService: TechnicalService,
              private messageRestService: MessageRestService,
              private dialogRestService: DialogRestService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      clearInterval(this.timer);
      NProgressService.start();
      console.log('ngOnInit');
      this.isLoad = true;
      NProgressService.start();
      this.dialogId = +params['dialogId'];
      let userId: number = +params['userId'];
      this.authUser = this.authService.getAuth();
      this.listMessage = [];
      Promise.all([

        this.userRestService
          .findOne(userId)
          .toPromise(),

        this.dialogRestService
          .findMessageByDialogId(this.dialogId)
          .toPromise(),

      ]).then(result => {
        this.interlocutorUser = result[0];
        this.listMessage = result[1];
        if (this.listMessage && this.listMessage.length > 0) {
          this.startInterval(this.dialogId);
        }
        this.isLoad = false;
        NProgressService.done();
      });
    });
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
      NProgressService.start();
      this.messageRestService
        .deleteMessage(this.tempMessage.id)
        .subscribe(data => {
          if (data) {
            const index = this.listMessage.indexOf(this.tempMessage);
            this.listMessage.splice(index, 1);
          }
          NProgressService.doneAfterCloseModal();
          this.isAction = false;
        });
    }
  }

  public edit(): void {
    if (this.selectedMessage && this.selectedMessage.message && this.selectedMessage.message.length > 0) {
      NProgressService.start();
      this.messageRestService
        .put(this.techService.messageToMessageForUpdate(this.selectedMessage))
        .subscribe(data => {
          this.techService.updateListMessage(this.listMessage, data);
          NProgressService.done();
          this.isAction = false;
        });
    } else {
      this.isAction = false;
    }
  }

  public cancel(): void {
    this.isAction = false;
  }

  public startInterval(dialogId: number): void {
    this.timer = setInterval(() => {
      this.dialogRestService
        .findMessageByDialogId(dialogId)
        .toPromise()
        .then((data : any) => {
          if (data) {
            this.listMessage = data;
          }
        });
      console.log('interval_' + dialogId);
    }, 5000);
  }

  public postMessage(): void {
    if (this.messagePost.text.length > 0) {
      NProgressService.start();
      this.messagePost
        .senderId = this.authUser.id;
      this.messagePost
        .recipientId = this.interlocutorUser.id;

      this.messageRestService
        .postMessage(this.messagePost)
        .subscribe(data => {
          if (data) {
            this.listMessage.push(data);
            if (this.listMessage.length >= maxListMessageLength) {
              this.listMessage.splice(0, 1);
            }
          }
          NProgressService.done();
        });

    }
    this.messagePost = new MessageForSave();
  }

}
