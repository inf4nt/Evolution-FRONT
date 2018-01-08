import {Component, Input, OnInit} from '@angular/core';
import {DialogDto} from "../../../dto/dialog.dto";

@Component({
  selector: 'app-direct-message',
  templateUrl: './direct-message.component.html',
  styleUrls: ['./direct-message.component.css']
})
export class DirectMessageComponent implements OnInit {

  @Input()
  listDialog: Array<DialogDto> = [];

  constructor() { }

  ngOnInit() {
  }

}
