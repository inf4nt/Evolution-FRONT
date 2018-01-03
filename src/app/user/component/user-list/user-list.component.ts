import {Component, OnInit} from '@angular/core';
import {Page} from "../../../model/page";
import {User} from "../../../model/user.model";
import {userDefaultPageableSize} from "../../../common/const";
import {UserRestService} from "../../../service/rest/user-rest.service";
import {UserDto} from "../../../dto/user.dto";


declare var NProgress: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  listUser: Array<UserDto> = [];

  constructor(private userDataService: UserRestService) {
  }

  ngOnInit() {
    NProgress.done();
    NProgress.start();
    this.userDataService
      .findAllList()
      .subscribe(data => {
        this.listUser = data;
        NProgress.done();
      });

  }

}
