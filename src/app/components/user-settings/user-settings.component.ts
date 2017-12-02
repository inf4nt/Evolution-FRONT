import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/rest/user.service';
import {AuthenticationService} from '../../service/authentication.service';
import {UserFull} from '../../model/user-full.model';

declare var NProgress: any;

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  currentUser: UserFull = new UserFull();
  isDone = false;

  constructor(private userService: UserService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    NProgress.start();
    this.userService
      .findOneLazy(this.authService.getAuth().id)
      .subscribe(data => {
        this.currentUser = data;
        this.isDone = true;
        NProgress.done();
      });
  }

}
