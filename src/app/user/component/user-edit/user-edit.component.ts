import {Component, Input, OnInit} from '@angular/core';
import {UserDto} from "../../../dto/user.dto";
import {UserDataService} from "../../../service/data/user-data.service";
import {UserUpdateDto} from "../../../dto/user-update.dto";
import {DataTransfer} from "../../../service/data-transfer.service";


declare var NProgress: any;

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Input()
  currentUserId: number;

  currentUser: UserDto = new UserDto();

  constructor(private userDataService: UserDataService,
              private transfer: DataTransfer) { }

  ngOnInit() {
    this.userDataService
      .findOneLazy(this.currentUserId)
      .subscribe(data => {
        this.currentUser = data;
        NProgress.done();
      });
  }

  public edit(): void {
    NProgress.start();
    let u: UserUpdateDto = this.transfer.userDtoToUserUpdateDto(this.currentUser);
    this.userDataService
      .putUser(u)
      .subscribe(data => {
        this.currentUser = data;
        NProgress.done();
      });
  }

}
