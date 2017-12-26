import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../authentication.service';
import {Http} from '@angular/http';
import {serverUrl} from '../../../common/rest-url';
import {AuthenticationRequestDto} from '../../../dto/authentication-request.dto';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

declare var NProgress: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  error: HttpErrorResponse;
  authenticationRequest: AuthenticationRequestDto = new AuthenticationRequestDto();
  isRestLoad = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.isRestLoad = false;
    this.loading = false;
    NProgress.start();
    this.authenticationService.logout();
    this.wakeUpRest();
  }

  wakeUpRest(): void {
    this.httpClient
      .get(serverUrl + 'index')
      .map(res => res)
      .subscribe(data => {
          NProgress.done();
          this.isRestLoad = true;
        },
        (err) => {
          console.log(err);
          NProgress.done();
          this.ngOnInit();
        });
  }

  login() {
    NProgress.start();
    this.loading = true;
    this.authenticationService.login(this.authenticationRequest)
      .subscribe(result => {
        if (result === true) {
          // login successful
          this.router.navigate(['user-home/' + this.authenticationService.getAuth().id]);
        }
        this.loading = false;
        NProgress.done();
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.loading = false;
        this.error = error;
        NProgress.done();
        this.authenticationRequest.password = '';
      });
  }
}
