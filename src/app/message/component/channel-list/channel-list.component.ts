import {Component, Input, OnInit} from '@angular/core';
import {ChannelDto} from "../../../dto/channel.dto";

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent implements OnInit {

  @Input()
  listChannel: Array<ChannelDto> = [];

  constructor() { }

  ngOnInit() {
  }

}
