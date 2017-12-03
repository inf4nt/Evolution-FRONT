import {Component, OnInit} from '@angular/core';
import {UserForSaveDto} from '../../dto/user-for-save.dto';
import {UserService} from '../../service/rest/user.service';

declare var NProgress: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: UserForSaveDto = new UserForSaveDto();
  registrationMessage: string;
  step2 = false;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  public registration(): void {
    NProgress.start();
    this.userService
      .postUser(this.user)
      .subscribe(data => {
        if (data === 1) {
          this.registrationMessage = 'Registration successful';
          this.user = new UserForSaveDto();
        } else if (data === 3) {
          this.registrationMessage = 'Registration failed, user is already exist';
          this.user = new UserForSaveDto();
        } else if (data === 4) {
          this.registrationMessage = 'Registration failed. Server error';
        }
        NProgress.done();
      });
  }


  public exist(): void {
    NProgress.start();
    if (this.user.username) {
      this.userService
        .exist(this.user.username)
        .subscribe(data => {
          this.step2 = !data;
          if (data) {
            this.registrationMessage = 'User is already exist';
          } else {
            this.registrationMessage = '';
          }
          NProgress.done();
        });
    }
  }


}
