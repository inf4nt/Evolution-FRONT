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
  url: string = serverUrl + 'message/last_from_my_dialog';
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
    this.http.get(this.url, {headers: this.httpHeaders}).subscribe(data => {
      NProgress.done();
      this.message = data;
      console.log(this.message);
      this.authUser = this.authenticationService.getAuthUser();
    });
  }
}
