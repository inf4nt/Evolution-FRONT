import {Component, OnInit} from '@angular/core';
import {UserDto} from "../../../dto/user.dto";
import {MessageForSave} from "../../../model/message-for-save.model";
import {MessageDto} from "../../../dto/message.dto";
import {AuthenticationUserDto} from "../../../dto/authentication-user.dto";
import {MessageChannelDto} from "../../../dto/message-channel.dto";
import {ChannelRestService} from "../../../service/rest/channel-rest.service";
import {ActivatedRoute} from "@angular/router";
import {NProgressService} from "../../../service/nprogress.service";
import {MessageChannelSaveDto} from "../../../dto/message-channel-save.dto";
import {AuthenticationService} from "../../../security/authentication.service";

@Component({
  selector: 'app-channel-message-list',
  templateUrl: './channel-message-list.component.html',
  styleUrls: ['./channel-message-list.component.css']
})
export class ChannelMessageListComponent implements OnInit {

  listMessage: Array<MessageChannelDto> = [];
  interlocutorUser: UserDto = new UserDto();
  authUser: AuthenticationUserDto = new AuthenticationUserDto();
  tempMessage: MessageDto = new MessageDto();
  selectedMessage: MessageChannelDto = new MessageChannelDto();
  initialStateSelectedMessage: MessageChannelDto = new MessageChannelDto();
  isAction: boolean = false;
  isLoad = false;
  messagePost: MessageChannelSaveDto = new MessageChannelSaveDto();
  private timer: any;
  channelId: number;
  channelName: string;


  constructor(private channelRest: ChannelRestService,
              private authService: AuthenticationService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      NProgressService.start();
      this.isLoad = true;
      this.authUser = this.authService.getAuth();
      this.channelId = +params['id'];
      this.channelName = params['name'].toString();
      this.channelRest
        .findMessageByChannel(this.channelId)
        .subscribe(data => {
          if (data) {
            this.listMessage = data;
          }
          NProgressService.done();
          this.isLoad = false;
        });
    });
  }

  public postMessage(): void {
    if (this.messagePost && this.messagePost.text.length > 0) {
      NProgressService.start();
      this.messagePost.channelId = this.channelId;
      this.messagePost.senderId = this.authUser.id;
      console.log(this.messagePost);
      this.channelRest
        .postMessageChannel(this.messagePost)
        .subscribe(data => {
          if (data) {
            this.listMessage.push(data);
          }
          NProgressService.done();
          this.messagePost = new MessageChannelSaveDto();
        });
    }
  }

}
