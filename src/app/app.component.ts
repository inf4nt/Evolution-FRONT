import {Component} from '@angular/core';
import {AuthenticationService} from './security/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthenticationService) {
  }

  isAuth(): boolean {
    return this.authService.getToken() !== null;
  }
}
