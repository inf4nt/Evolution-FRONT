import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {serverUrl} from '../../common/const';
import {Http} from '@angular/http';
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
      .get(this.server + 'index')
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
