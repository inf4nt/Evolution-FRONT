import { Component, OnInit } from '@angular/core';
import {NProgressService} from "../../../service/nprogress.service";

@Component({
  selector: 'app-status-500',
  templateUrl: './status-500.component.html',
  styleUrls: ['./status-500.component.css']
})
export class Status500Component implements OnInit {

  constructor() { }

  ngOnInit() {
    NProgressService.doneAfterCloseModal();
  }

}
