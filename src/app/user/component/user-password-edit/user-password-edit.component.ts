import {Component, OnInit} from '@angular/core';
import {UserSetPassword} from "../../../dto/user-set-password";
import {UserDataService} from "../../../service/data/user-data.service";
import {AuthenticationService} from "../../../security/authentication.service";
import {NProgressService} from "../../../service/nprogress.service";

@Component({
  selector: 'app-user-password-edit',
  templateUrl: './user-password-edit.component.html',
  styleUrls: ['./user-password-edit.component.css']
})
export class UserPasswordEditComponent implements OnInit {

  user: UserSetPassword = new UserSetPassword();

  message: string;

  confirmPassword: string;

  constructor(private userDataService: UserDataService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    NProgressService.done();
  }

  public setPassword(): void {
    this.user.id = this.authService.getAuth().id;
    NProgressService.start();
    this.userDataService
      .setPassword(this.user)
      .subscribe(data => {
        if (data) {
          // password was changed
          this.message = 'Password was changed';
        } else {
          this.message = 'Password change fail'
        }
        this.user = new UserSetPassword();
        this.confirmPassword = null;
        NProgressService.done();
      });
  }

}
