import {Component, Input, OnInit} from '@angular/core';
import {UserDto} from "../../../dto/user.dto";
import {UserDataService} from "../../../service/data/user-data.service";
import {UserUpdateDto} from "../../../dto/user-update.dto";
import {DataTransfer} from "../../../service/data-transfer.service";
import {AuthenticationService} from "../../../security/authentication.service";
import {NProgressService} from "../../../service/nprogress.service";


declare var NProgress: any;

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  currentUser: UserDto = new UserDto();

  constructor(private userDataService: UserDataService,
              private transfer: DataTransfer,
              private authService: AuthenticationService) { }

  ngOnInit() {
    NProgressService.start();
    this.userDataService
      .findOneLazy(this.authService.getAuth().id)
      .subscribe(data => {
        this.currentUser = data;
        NProgressService.done();
      });
  }

  public edit(): void {
    NProgressService.start();
    let u: UserUpdateDto = this.transfer.userDtoToUserUpdateDto(this.currentUser);
    this.userDataService
      .putUser(u)
      .subscribe(data => {
        this.currentUser = data;
        NProgressService.done();
      });
  }

}
