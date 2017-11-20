import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../service/authentication.service';
import {ActivatedRoute} from '@angular/router';
import {serverUrl} from '../../common/const';
import {HttpHeaders} from '@angular/common/http';

declare var NProgress: any;

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  message: any = [];
  url: string = serverUrl + 'message/last-message-dialog/user/' + this.authenticationService.getAuthUser().id;
  authUser: any = {};

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    NProgress.start();


    this.http.get(this.url, {headers: this.httpHeaders})
      .map(res => res).subscribe((data: any) => {
        if (data) {
          this.message = data.content;
          this.authUser = this.authenticationService.getAuthUser();
          console.log(this.authUser);
        } else {
          this.message = null;
        }
        NProgress.done();
      },
      (err) => {
        console.log(err);
        NProgress.done();
      }
    );

  }
}
