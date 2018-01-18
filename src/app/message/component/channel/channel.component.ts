import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../security/authentication.service";
import {DialogRestService} from "../../../service/rest/dialog-rest.service";
import {DialogDto} from "../../../dto/dialog.dto";
import {ChannelRestService} from "../../../service/rest/channel-rest.service";
import {ChannelDto} from "../../../dto/channel.dto";

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  listDialog: Array<DialogDto> = [];

  listChannel: Array<ChannelDto> = [];

  constructor(private authService: AuthenticationService,
              private channelRest: ChannelRestService,
              private dialogRestService: DialogRestService) { }

  ngOnInit() {
    this.dialogRestService
      .findDialogsByUser(this.authService.getAuth().id)
      .subscribe(data => {
        if (data) {
          this.listDialog = data;
        }
      });
    this.channelRest
      .findChannelForUser(this.authService.getAuth().id)
      .subscribe(data => {
        if (data) {
          this.listChannel = data;
        }
      });
  }

}
