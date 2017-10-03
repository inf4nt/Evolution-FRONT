import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {serverUrl} from '../../common/const';

declare var NProgress: any;

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  status = {};
  userId = {};
  server: string = serverUrl;
  listFriend: any = [];
  authUser: any = {};

  constructor(private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute,
              private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.authUser = this.authenticationService.getAuthUser();

    this.activatedRoute.params.subscribe(params => {
      NProgress.start();
      this.status = params['status'].toString();
      this.userId = +params['id'];

      this.httpClient.get(this.server + 'friend/user/' + this.userId + '/' + this.status).subscribe(data => {
        if (data) {
          this.listFriend = data;
        }

        NProgress.done();
      });


    });

  }

}
