import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {Http} from '@angular/http';
import {serverUrl} from '../../common/rest-url';
import {AuthenticationRequest} from '../../model/authentication-request.model';

declare var NProgress: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  error = '';
  authenticationRequest: AuthenticationRequest = new AuthenticationRequest();
  isRestLoad = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private http: Http) {
  }

  ngOnInit() {
    this.isRestLoad = false;
    NProgress.start();
    this.authenticationService.logout();
    this.wakeUpRest();
  }

  wakeUpRest(): void {
    this.http
      .get(serverUrl + 'index')
      .map(res => res).subscribe((data) => {
        console.log(data);
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
    this.authenticationService.login(this.authenticationRequest.username, this.authenticationRequest.password)
      .subscribe(result => {
        console.log(result);
        if (result === true) {
          // login successful
          this.router.navigate(['user-home/' + this.authenticationService.getAuth().id]);
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      }, error => {
        NProgress.done();
        this.loading = false;
        this.error = error;
      });
  }
}
