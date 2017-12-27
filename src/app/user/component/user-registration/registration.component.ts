import {Component, OnInit} from '@angular/core';
import {UserForSaveDto} from '../../../model/user-for-save.dto';
import {UserDataService} from "../../../service/data/user-data.service";

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
