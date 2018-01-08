import { Component, OnInit } from '@angular/core';
import {UserRestService} from "../../../service/rest/user-rest.service";
import {UserDto} from "../../../dto/user.dto";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-channel-add-user',
  templateUrl: './channel-add-user.component.html',
  styleUrls: ['./channel-add-user.component.css']
})
export class ChannelAddUserComponent implements OnInit {

  listSelected: Array<UserDto> = [];
  listUser: Array<UserDto> = [];
  channelName: string;
  channelId: number;

  constructor(private userRest: UserRestService,
              private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.channelName = params['channelName'].toString();
      this.channelId = +params['channelId'];
    });
  }

  public search(firstName: string, lastName: string, nickname: string): void {

  }

}
