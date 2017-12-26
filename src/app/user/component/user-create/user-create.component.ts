import {Component, OnInit} from '@angular/core';
import {UserCreateDto} from "../../../dto/user-create.dto";
import {UserDataService} from "../../../service/data/user-data.service";


declare var NProgress: any;

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: UserCreateDto = new UserCreateDto();
  step: number = 1;
  message: string;
  typePassword: string;

  constructor(private userDataService: UserDataService) {
  }

  ngOnInit() {
    this.typePassword = 'password';
  }

  public exist(): void {
    NProgress.start();
    this.userDataService
      .exist(this.user.username)
      .subscribe(data => {
        if (data) {
          this.message = 'User is already exist';
          this.user.username = '';
          this.step = 1;
        } else {
          this.step = 2;
          this.message = '';
        }
        NProgress.done();
      });
  }

  public save(): void {
    NProgress.start();
    this.userDataService
      .postUser(this.user)
      .subscribe(data => {
        this.step = 1;
        this.message = 'Registration successful';
        this.user = new UserCreateDto();
        NProgress.done();
      });
  }


  public showHidePassword(): void {
    this.typePassword == 'password' ? this.typePassword = 'text' : this.typePassword = 'password';
  }
}
