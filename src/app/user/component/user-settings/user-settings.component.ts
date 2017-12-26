import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../security/authentication.service';


declare var NProgress: any;

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  currentUserId: number;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
    NProgress.start();
    this.currentUserId = this.authService.getAuth().id;
  }
}
