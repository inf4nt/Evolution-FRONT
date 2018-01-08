import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserDto} from "../../../dto/user.dto";
import {MessageDto} from "../../../dto/message.dto";
import {AuthenticationUserDto} from "../../../dto/authentication-user.dto";
import {MessageChannelDto} from "../../../dto/message-channel.dto";
import {ChannelRestService} from "../../../service/rest/channel-rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NProgressService} from "../../../service/nprogress.service";
import {MessageChannelSaveDto} from "../../../dto/message-channel-save.dto";
import {AuthenticationService} from "../../../security/authentication.service";
import {ChannelDto} from "../../../dto/channel.dto";
import {ChannelComponent} from "../channel/channel.component";
import {TechnicalService} from "../../../service/technical.service";

@Component({
  selector: 'app-channel-message',
  templateUrl: './channel-message.component.html',
  styleUrls: ['./channel-message.component.css']
})
export class ChannelMessageComponent implements OnInit, OnDestroy {

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
              private router: Router,
              private techService: TechnicalService,
              private authService: AuthenticationService,
              private channelComponent: ChannelComponent,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      clearInterval(this.timer);
      this.listMessage = [];
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
            this.intervalMessage();
          }
          NProgressService.done();
          this.isLoad = false;
        });
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  public intervalMessage(): void {
    this.timer = setInterval(() => {
      this.channelRest
        .findMessageByChannel(this.channelId)
        .subscribe(data => {
          if (data) {
            this.listMessage = data;
          }
        });
      console.log('interval_' + this.channelId);
    }, 5000);
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

  public deleteChannel(): void {
    NProgressService.start();
    this.channelRest
      .deleteChannel(this.channelId)
      .subscribe(data => {
        if (data) {
          NProgressService.done();
          let index = this.techService.findIndexChannelInListById(this.channelId, this.channelComponent.listChannel);
          this.channelComponent.listChannel.splice(index, 1);
          this.router.navigate(['channel']);
        }
      });
  }

  public out(): void {
    NProgressService.start();
    this.channelRest
      .outFromChannel(this.channelId)
      .subscribe(data => {
        if (data) {
          let index = this.techService.findIndexChannelInListById(this.channelId, this.channelComponent.listChannel);
          if (index !== -1) {
            this.channelComponent.listChannel.splice(index, 1);
          }
          this.router.navigate(['channel']);
        }
        NProgressService.done();
      });
  }

}
