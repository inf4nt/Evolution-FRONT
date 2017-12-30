import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../security/authentication.service";
import {Router} from "@angular/router";
import {NProgressService} from "../../../service/nprogress.service";

@Component({
  selector: 'app-user-security',
  templateUrl: './user-security.component.html',
  styleUrls: ['./user-security.component.css']
})
export class UserSecurityComponent implements OnInit {

  message: string;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    NProgressService.doneAfterCloseModal();
  }

  public terminateSessions(): void {
    NProgressService.start();
    let json = {
      username: this.authService.getAuth().username
    };


    this.authService
      .terminateAllSessions(json)
      .subscribe(data => {
        if (data) {
          NProgressService.doneAfterCloseModal();
          this.router.navigate(['/']);
        } else {
          NProgressService.done();
          this.message = 'Error try again';
        }
      });
  }
}
