import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user.model';
import {UserService} from '../../service/rest/user.service';
import {Page} from '../../model/page';
import {userDefaultPageableSize} from '../../common/const';

declare var NProgress: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  pageUser: Page<User> = new Page<User>();

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    NProgress.start();
    this.userService
      .findAllPageable(0, 100)
      .subscribe(data => {
        this.pageUser = data;
        console.log(data.totalElement);
        NProgress.done();
      });
  }

}
