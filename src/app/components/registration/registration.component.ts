import {Component, OnInit} from '@angular/core';
import {UserForSaveDto} from '../../dto/user-for-save.dto';
import {UserService} from '../../service/rest/user.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: UserForSaveDto = new UserForSaveDto();

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  public registration(): void {
    this.userService
      .postUser(this.user)
      .subscribe(data => {
        if (data === 1) {
          confirm('Registration successful');
        } else if (data === 3) {
          confirm('Registration failed, user is already exist');
        } else if (data === 4) {
          confirm('Registration failed. Server error');
        }
      });

  }

  public exist(): Boolean {
    return true;
  }

}
