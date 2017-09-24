import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {serverUrl} from '../../common/const';
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

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private http: HttpClient) {
  }

  ngOnInit() {
    NProgress.done();
    this.authenticationService.logout();
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
