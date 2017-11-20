import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {serverUrl} from '../../common/const';

declare var NProgress: any;

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit, OnDestroy {

  id: number;
  currentUser: any = {};
  auth: any = {};
  url: string = serverUrl + 'user/';
  server: string = serverUrl;
  isDone = false;
  feedList: any = [];
  friendStatus: any = '';


  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    console.log('UserHomeComponent on init');

    this.auth = this.authenticationService.getAuthUser();

    this.activatedRoute.params.subscribe(params => {
      NProgress.start();
      this.isDone = false;
      this.id = +params['id'];
      this.initData();
    });

  }

  initData(): void {

    if (this.id !== this.auth.id) {
      this.http.get(this.server + 'friend/status/' + this.auth.id + '/' + this.id, {headers: this.httpHeaders})
        .map(res => res).subscribe((data: any) => {
          this.friendStatus = data.status;
          console.log(data);
        },
        (err) => {
          console.log(err);
        });
    }

    // this.http.get(this.server + 'feed/user/' + this.id, {headers: this.httpHeaders}).subscribe(data => {
    //   this.feedList = data;
    // });


    this.http.get(this.url + this.id, {headers: this.httpHeaders}).subscribe(data => {
      this.currentUser = data;
      NProgress.done();
      this.isDone = true;
    });

  }

  actionFriend(): void {
    // setInterval(() => {
      NProgress.start();
      const action = this.getActionByStatus(this.friendStatus);
      this.friendStatus = this.getFriendStatus(action);
      this.http.post(this.server + 'friend/action/user/' + this.id + '/' + action, null, {headers: this.httpHeaders}).subscribe((data: any) => {
      });
      NProgress.done();
    // }, 200);
  }

  getActionByStatus(status: string): string {
    if (status === 'NOT_FOUND') {
      return 'REQUEST_FRIEND';
    } else if (status === 'PROGRESS') {
      return 'DELETE_FRIEND';
    } else if (status === 'FOLLOWER') {
      return 'ACCEPT_REQUEST';
    } else if (status === 'REQUEST') {
      return 'DELETE_REQUEST';
    }
  }

  getFriendStatus(action: string): string {
    if (action === 'REQUEST_FRIEND') {
      return 'REQUEST';
    } else if (action === 'DELETE_FRIEND') {
      return 'FOLLOWER';
    } else if (action === 'ACCEPT_REQUEST') {
      return 'PROGRESS';
    } else if (action === 'DELETE_REQUEST') {
      return 'NOT_FOUND';
    }
  }


  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

  removeFeed(feed: any): void {
    const index = this.feedList.indexOf(feed);
    this.feedList.splice(index, 1);
  }

}
