import { Component, OnInit } from '@angular/core';
import {UserRestService} from "../../../service/rest/user-rest.service";
import {UserDto} from "../../../dto/user.dto";
import {ActivatedRoute} from "@angular/router";
import {ChannelRestService} from "../../../service/rest/channel-rest.service";
import {NProgressService} from "../../../service/nprogress.service";

@Component({
  selector: 'app-channel-add-user',
  templateUrl: './channel-add-user.component.html',
  styleUrls: ['./channel-add-user.component.css']
})
export class ChannelAddUserComponent implements OnInit {

  listUser: Array<UserDto> = [];
  listUserChannel: Array<UserDto> = [];
  channelName: string;
  channelId: number;
  listResult: Array<UserDto> = [];

  constructor(private userRest: UserRestService,
              private channelRest: ChannelRestService,
              private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      NProgressService.start();
      this.channelName = params['channelName'].toString();
      this.channelId = +params['channelId'];

      Promise
        .all([
          this.userRest
            .findAllList()
            .toPromise(),
          this.channelRest
            .findUserByChannelId(this.channelId)
            .toPromise()
        ])
        .then(res => {
          res[0] ? this.listUser = res[0] : [];
          res[1] ? this.listUserChannel = res[1] : [];
          NProgressService.done();


          this.listUser.filter(function () {

          })

          // this.listUser.findIndex(function (element: UserDto, index, array) {
          //   console.log(element);
          //   console.log(index);
          //   console.log(array);
          //   return false;
          // });



        });


    });
  }

  public search(firstName: string, lastName: string, nickname: string): void {

  }

}
