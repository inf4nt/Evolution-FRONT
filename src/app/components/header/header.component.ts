/**
 * Created by Infant on 31.08.2017.
 */
import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../security/authentication.service';
import {Router} from '@angular/router';
import {User} from "../../model/user.model";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {
  auth: User = new User();
  username: string;

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log('HeaderComponent ' + this.authService.getUsername());
    this.username = this.authService.getUsername();
    this.auth = this.authService.getAuth();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
