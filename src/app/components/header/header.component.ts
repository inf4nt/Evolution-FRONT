/**
 * Created by Infant on 31.08.2017.
 */
import {Component} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  getUserid(): any {
    return this.authService.getAuthUser().id;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
