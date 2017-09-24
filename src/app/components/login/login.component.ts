import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {HttpClient} from "@angular/common/http";
import {serverUrl} from "../../common/const";
declare var NProgress: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  error = '';
  server: string = serverUrl;
  isLoad: Boolean = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.isLoad = false;
    this.authenticationService.logout();
    NProgress.start();
    this.httpClient.get(this.server + 'index').subscribe(data => {
      NProgress.done();
      this.isLoad = true;
    });
  }

  login() {
    NProgress.start();
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(result => {
        console.log(result);
        if (result === true) {
          // login successful
          this.router.navigate(['user-home/' + this.authenticationService.getAuthUser().id]);
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
