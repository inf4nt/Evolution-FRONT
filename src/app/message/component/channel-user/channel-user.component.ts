import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChannelRestService} from "../../../service/rest/channel-rest.service";
import {UserDto} from "../../../dto/user.dto";
import {NProgressService} from "../../../service/nprogress.service";

@Component({
  selector: 'app-channel-user',
  templateUrl: './channel-user.component.html',
  styleUrls: ['./channel-user.component.css']
})
export class ChannelUserComponent implements OnInit {

  listUserChannel: Array<UserDto> =[];
  channelId: number;
  channelName: string;

  constructor(private activatedRoute: ActivatedRoute,
              private channelRest: ChannelRestService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      NProgressService.start();
      this.channelId = +params['channelId'];
      this.channelName = params['channelName'];
      this.channelRest
        .findUserByChannelId(this.channelId)
        .subscribe(data => {
          data ? this.listUserChannel = data : [];
          NProgressService.done();
        });
    });
  }

}
