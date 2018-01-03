import {Component, OnInit} from '@angular/core';
import {UserForSaveDto} from '../../../model/user-for-save.dto';
import {UserRestService} from "../../../service/rest/user-rest.service";

declare var NProgress: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
