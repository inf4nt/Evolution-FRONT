import { Component, OnInit } from '@angular/core';
import {NProgressService} from "../../../service/nprogress.service";

@Component({
  selector: 'app-status-403',
  templateUrl: './status-403.component.html',
  styleUrls: ['./status-403.component.css']
})
export class Status403Component implements OnInit {

  constructor() { }

  ngOnInit() {
    NProgressService.doneAfterCloseModal();
  }

}
