import {Component, OnDestroy, OnInit} from '@angular/core';
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
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';



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
  interlocutor: number;
  private ngUnsubscribe: Subject<Array<MessageDto>> = new Subject();

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthenticationService,
              private userRestService: UserRestService,
              private techService: TechnicalService,
              private messageRestService: MessageRestService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      NProgressService.done();
      clearInterval(this.timer);
      console.log('ngOnInit');
      this.interlocutor = +params['userId'];
      this.authUser = this.authService.getAuth();
      this.listMessage = [];

      this.userRestService
        .findOne(this.interlocutor)
        .subscribe(data => {
          if (data) {
            this.interlocutorUser = data;
          }
        });

      this.messageRestService
        .findMessageByInterlocutor(this.interlocutor)
        .subscribe(data => {
          if (data) {
            this.listMessage = data;
            this.startInterval(this.interlocutor);
          }
        });

    });
  }

  ngOnDestroy(): void {
    this.clean();
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
      this.clean();
      this.messageRestService
        .deleteMessage(this.tempMessage.id)
        .subscribe(data => {
          this.startInterval(this.interlocutor);
        });
      NProgressService.doneAfterCloseModal();
      const index = this.listMessage.indexOf(this.tempMessage);
      this.listMessage.splice(index, 1);
      this.isAction = false;
      this.tempMessage = new MessageDto();
    }
  }

  public edit(): void {
    if (this.selectedMessage && this.selectedMessage.message && this.selectedMessage.message.length > 0) {
      this.clean();
      this.messageRestService
        .put(this.techService.messageToMessageForUpdate(this.selectedMessage))
        .subscribe(data => {
          this.startInterval(this.interlocutor);
        });
      this.isAction = false;
      this.techService.updateListMessage(this.listMessage, this.selectedMessage);
    } else {
      this.isAction = false;
    }
  }

  public startInterval(interlocutor: number): void {
    this.timer = setInterval(() => {
      this.messageRestService
        .findMessageByInterlocutor(interlocutor)
        .takeUntil(this.ngUnsubscribe)
        .subscribe(data => {
          if (data) {
            this.listMessage = data;
          }
        })
      console.log('interval_' + this.interlocutor);
    }, 5000);
  }

  public postMessage(): void {
    if (this.messagePost.text.length > 0) {
      this.clean();
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
          this.startInterval(this.interlocutor);
        });

    }
    this.messagePost = new MessageForSave();
  }

  public cancel(): void {
    this.isAction = false;
  }

  public clean(): void {
    clearInterval(this.timer);
    window.clearInterval(this.timer);
    this.unsubscribe();
  }

  private unsubscribe(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
