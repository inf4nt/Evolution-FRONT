import {Component, Input, OnInit} from '@angular/core';
import {DialogDto} from "../../../dto/dialog.dto";

@Component({
  selector: 'app-direct-message-list',
  templateUrl: './direct-message-list.component.html',
  styleUrls: ['./direct-message-list.component.css']
})
export class DirectMessageUserListComponent implements OnInit {

  @Input()
  listDialog: Array<DialogDto> = [];

  constructor() { }

  ngOnInit() {
  }

}
