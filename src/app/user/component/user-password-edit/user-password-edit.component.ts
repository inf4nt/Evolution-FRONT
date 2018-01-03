import {Component, OnInit} from '@angular/core';
import {UserSetPassword} from "../../../dto/user-set-password";
import {UserRestService} from "../../../service/rest/user-rest.service";
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

  constructor(private userDataService: UserRestService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    NProgressService.done();
  }

  public setPassword(): void {
    if (this.user.oldPassword.length === 0 || this.user.newPassword.length === 0 || this.confirmPassword.length === 0 || this.user.newPassword != this.confirmPassword) {
      return;
    }

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
