import {Component, OnDestroy, OnInit} from '@angular/core';
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

  userid: number;
  url: string = serverUrl + 'message/user/';
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

    this.activatedRoute.params.subscribe(params => {
      this.userid = +params['id'];
    });

    this.http.get(this.url + this.userid + '/repair_dialog', {headers: this.httpHeaders}).subscribe(data => {
      NProgress.done();
      this.authUser = this.authenticationService.getAuthUser();
      this.messageList = data;
      this.messageList.reverse();
    });

    this.http.get(this.server + 'user/' + this.userid, {headers: this.httpHeaders}).subscribe(data => {
      this.secondUser = data;
    });

    this.timer = setInterval( () => {
      this.http.get(this.url + this.userid, {headers: this.httpHeaders}).subscribe(data => {
        this.messageList = data;
        this.messageList.reverse();
      });
      console.log('interval');
    }, 7000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  postMessage(): void {

    if (this.model.newMessage.length !== 0) {

      const message = {
        message: this.model.newMessage,
        sender: this.authenticationService.getAuthUser(),
        dialog: {
          second: {
            id: this.userid
          }
        }
      };

      this.model.newMessage = '';

      this.messageList.push(message);
      if (this.messageList.length >= this.maxListMessageLength) {
        this.messageList.splice(0, 1);
      }

      this.http.post(this.server + 'message', JSON.stringify(message), {headers: this.httpHeaders}).subscribe(data => {
      });

    }
  }

  writeMessageToTemp(message: any): void {
    this.model.tempMessage = message;
  }

  deleteMessage(): void {
    const index = this.messageList.indexOf(this.model.tempMessage);
    this.messageList.splice(index, 1);
    this.http.delete(this.server + 'message/' + this.model.tempMessage.id, {headers: this.httpHeaders}).subscribe(data => {

    });
  }
}
