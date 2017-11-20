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
      username: this.user.username,
      password: this.user.password,
      state: this.user.state,
      country: this.user.country,
      gender: this.user.gender
    };

    console.log(result);

    this.http.post(this.server + 'user/post', result, this.headers).map(res => res).subscribe((response) => {
      console.log(response);
    });

  }

  public exist(): Boolean {
    return true;
  }

}
