/**
 * Created by Infant on 31.08.2017.
 */
import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../security/authentication.service';
import {Router} from '@angular/router';
import {User} from "../../model/user.model";
import {UserDto} from "../../dto/user.dto";
import {AuthenticationUserDto} from "../../dto/authentication-user.dto";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  auth: AuthenticationUserDto = new AuthenticationUserDto();
  username: string;

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.auth = this.authService.getAuth();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
