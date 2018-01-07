import {Component, Input, OnInit} from '@angular/core';
import {ChannelDto} from "../../../dto/channel.dto";

@Component({
  selector: 'app-direct-channel',
  templateUrl: './direct-channel.component.html',
  styleUrls: ['./direct-channel.component.css']
})
export class DirectChannelComponent implements OnInit {

  @Input()
  listChannel: Array<ChannelDto> = [];

  constructor() { }

  ngOnInit() {
  }

}
