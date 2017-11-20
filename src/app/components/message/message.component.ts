import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {maxListMessageLength, serverUrl} from '../../common/const';

declare var NProgress: any;

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {

  interlocutor: number;
  url: string = serverUrl + 'message/interlocutor/';
  server: string = serverUrl;
  messageList: any = [];
  model: any = {};
  authUser: any = {};
  timer: any;
  maxListMessageLength = maxListMessageLength;
  secondUser: any = {};

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    NProgress.start();
    this.model.tempMessage = {};
    this.authUser = this.authenticationService.getAuthUser();
    this.activatedRoute.params.subscribe(params => {

      this.interlocutor = +params['interlocutor'];

      this.http.get(this.url + this.interlocutor, {headers: this.httpHeaders})
        .map(res => res).subscribe((data: any) => {
          if (data) {
            this.messageList = data.content;
            this.startInterval();
          } else {
            this.messageList = null;
          }
          NProgress.done();
        },
        (err) => {
          console.log(err);
          NProgress.done();
        }
      );

      this.http.get(this.server + 'user/' + this.interlocutor, {headers: this.httpHeaders}).subscribe(data => {
        this.secondUser = data;
      });

    });

  }

  startInterval(): void {
    this.timer = setInterval(() => {

      this.http.get(this.url + this.interlocutor, {headers: this.httpHeaders})
        .map(res => res).subscribe((data: any) => {
          if (data) {
            this.messageList = data.content;
          } else {
            this.messageList = null;
          }
          NProgress.done();
        },
        (err) => {
          console.log(err);
          NProgress.done();
        }
      );
      console.log('interval');
    }, 7000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  postMessage(): void {
    if (this.model.newMessage.length > 0) {
      NProgress.start();
      const message = {
        text: this.model.newMessage,
        senderId: this.authenticationService.getAuthUser().id,
        recipientId: this.interlocutor
      };


      this.model.newMessage = undefined;
      this.http.post(this.server + 'message', JSON.stringify(message), {headers: this.httpHeaders})
        .map(res => res).subscribe((data: any) => {
          if (data) {
            console.log(data);
            this.messageList.push(data);
            if (this.messageList.length >= this.maxListMessageLength) {
              this.messageList.splice(0, 1);
            }
          }

          NProgress.done();
        },
        (err) => {
          console.log(err);
          NProgress.done();
        }
      );


      // this.http.post(this.server + 'message', JSON.stringify(message), {headers: this.httpHeaders}).subscribe(data => {
      //   this.messageList.push(data);
      //   if (this.messageList.length >= this.maxListMessageLength) {
      //     this.messageList.splice(0, 1);
      //   }
      //   NProgress.done();
      // });

    }
  }

  writeMessageToTemp(message: any): void {
    this.model.tempMessage = message;
  }

  deleteMessage(): void {
    const index = this.messageList.indexOf(this.model.tempMessage);
    this.messageList.splice(index, 1);

    this.http
      .delete(this.server + 'message/' + this.model.tempMessage.id, {headers: this.httpHeaders})
      .map(res => res).subscribe((data: any) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      });
  }
}
