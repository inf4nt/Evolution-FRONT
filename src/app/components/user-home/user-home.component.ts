import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../../service/authentication.service';
import {serverUrl} from '../../common/const';

declare var NProgress: any;

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  id: number;
  currentUser: any = {};
  auth: any = {};
  url: string = serverUrl + 'user/';
  server: string = serverUrl;
  isDone = false;
  feedList: any = [];

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.isDone = false;
    this.auth = this.authenticationService.getAuthUser();
    NProgress.start();
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.http.get(this.url + this.id, {headers: this.httpHeaders}).subscribe(data => {
      this.currentUser = data;

    });

    this.http.get(this.server + 'feed/user/' + this.id, {headers: this.httpHeaders}).subscribe(data => {
      this.feedList = data;
      console.log(data);
      this.isDone = true;
      NProgress.done();
    });

  }

  removeFeed(feed: any): void {
    const index = this.feedList.indexOf(feed);
    this.feedList.splice(index, 1);
  }


}
