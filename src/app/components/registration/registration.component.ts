import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {serverUrl} from '../../common/const';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: any = {};
  userAdditionalData: any = {};
  server: string = serverUrl;

  headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});

  constructor(private http: Http) {
  }

  ngOnInit() {
  }

  public registration(): void {
    const result: any = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      nickname: this.user.nickname,

      userAdditionalData: {
        username: this.userAdditionalData.username,
        password: this.userAdditionalData.password,
        state: this.userAdditionalData.state,
        country: this.userAdditionalData.country,
        gender: this.userAdditionalData.gender
      }
    };

    console.log(result);

    this.http.post(this.server + '/user', result, this.headers).map(res => res).subscribe((response) => {
      console.log(response);
    });

  }

  public exist(): Boolean {
    return true;
  }

}
