import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {maxListMessageLength, serverUrl} from '../../common/const';
import {MessageService} from '../../service/message.service';
import {Message} from '../../model/message.model';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user.model';

declare var NProgress: any;

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {

  interlocutor: number;
  server: string = serverUrl;
  messageList: Array<Message> = [];
  model: any = {};
  authUser: User = new User();
  timer: any;
  maxListMessageLength = maxListMessageLength;
  interlocutorUser: User = new User();


  constructor(private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private messageService: MessageService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    NProgress.start();
    this.model.tempMessage = {};

    this.authUser = this.authenticationService.getAuth();

    this.activatedRoute.params.subscribe(params => {

      this.interlocutor = +params['interlocutor'];

      this.userService
        .findOne(this.interlocutor)
        .subscribe(data => {
          this.interlocutorUser = data;
          NProgress.done();
        });

      this.messageService
        .findMessageByInterlocutor(this.interlocutor)
        .subscribe(data => {
          this.messageList = data.content;
        });

      this.startInterval();

    });

  }

  startInterval(): void {
    this.timer = setInterval(() => {

      this.messageService
        .findMessageByInterlocutor(this.interlocutor)
        .subscribe(data => {
          this.messageList = data.content;
        });

      console.log('interval');
    }, 7000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  postMessage(): void {

    if (this.model.newMessage.length > 0) {
      NProgress.start();
      this.messageService
        .postMessage(this.model.newMessage, this.authenticationService.getAuth().id, this.interlocutor)
        .subscribe(data => {
          this.messageList.push(data);
          if (this.messageList.length >= this.maxListMessageLength) {
            this.messageList.splice(0, 1);
          }
          NProgress.done();
        });

      this.model.newMessage = null;
    }

  }

  writeMessageToTemp(message: any): void {
    this.model.tempMessage = message;
  }

  deleteMessage(): void {
    NProgress.start();
    this.messageService
      .deleteMessage(this.model.tempMessage.id)
      .subscribe(data => {
        if (data) {
          const index = this.messageList.indexOf(this.model.tempMessage);
          this.messageList.splice(index, 1);
        }
        NProgress.doneAfterCloseModal();
      });

  }
}
