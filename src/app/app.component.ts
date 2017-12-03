import {Component} from '@angular/core';
import {AuthenticationService} from './security/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  isAuth(): boolean {
    return this.authService.getToken() !== null;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }

}
