import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationUserDto} from "../../../dto/authentication-user.dto";
import {MessageChannelDto} from "../../../dto/message-channel.dto";
import {ChannelRestService} from "../../../service/rest/channel-rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NProgressService} from "../../../service/nprogress.service";
import {MessageChannelSaveDto} from "../../../dto/message-channel-save.dto";
import {AuthenticationService} from "../../../security/authentication.service";
import {ChannelComponent} from "../channel/channel.component";
import {TechnicalService} from "../../../service/technical.service";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/takeUntil';


@Component({
  selector: 'app-channel-message',
  templateUrl: './channel-message.component.html',
  styleUrls: ['./channel-message.component.css']
})
export class ChannelMessageComponent implements OnInit, OnDestroy {

  listMessage: Array<MessageChannelDto> = [];
  authUser: AuthenticationUserDto = new AuthenticationUserDto();
  selectedMessage: MessageChannelDto = new MessageChannelDto();
  isAction = false;
  isLoad = false;
  messagePost: MessageChannelSaveDto = new MessageChannelSaveDto();
  channelId: number;
  channelName: string;
  private timer: any;
  tempMessage: MessageChannelDto = new MessageChannelDto();
  countUserFromChannel: number;
  private ngUnsubscribe: Subject<Array<MessageChannelDto>> = new Subject();

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
      this.authUser = this.authService.getAuth();
      this.channelId = +params['id'];
      this.channelName = params['name'].toString();

      this.channelRest
        .findMessageByChannel(this.channelId)
        .subscribe(data => {
          if (data) {
            this.listMessage = data;
            this.startInterval(this.channelId);
          }
        });

      this.channelRest
        .countUserByChannel(this.channelId)
        .subscribe(data => {
          data ? this.countUserFromChannel = data : this.countUserFromChannel = 0;
        });

    });
  }

  ngOnDestroy(): void {
    this.clean();
  }

  public startInterval(channelId: number): void {
    this.timer = setInterval(() => {
      this.channelRest
        .findMessageByChannel(channelId)
        .takeUntil(this.ngUnsubscribe)
        .subscribe(data => {
          if (data) {
            this.listMessage = data;
          }
        });
      console.log('interval_' + channelId);
    }, 5000);
  }

  public postMessage(): void {
    if (this.messagePost && this.messagePost.text.length > 0) {
      NProgressService.start();
      this.messagePost.channelId = this.channelId;
      this.messagePost.senderId = this.authUser.id;
      this.clean();
      this.channelRest
        .postMessageChannel(this.messagePost)
        .subscribe(data => {
          if (data) {
            this.listMessage.push(data);
          }
          NProgressService.done();
          this.messagePost = new MessageChannelSaveDto();
          this.startInterval(this.channelId);
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
        NProgressService.doneAfterCloseModal();
      });
  }

  public writeTempMessage(temp: MessageChannelDto): void {
    this.tempMessage = temp;
  }

  public deleteMessageFromChannel(): void {
    this.clean();
    this.channelRest
      .deleteMessageFromChannel(this.tempMessage.id)
      .subscribe(data => {
        this.startInterval(this.channelId);
      });
    let index = this.listMessage.indexOf(this.tempMessage);
    if (index !== -1) {
      this.listMessage.splice(index, 1);
    }

    // NProgressService.start();
    // this.channelRest
    //   .deleteMessageFromChannel(this.tempMessage.id)
    //   .subscribe(data => {
    //     if (data) {
    //       let index = this.listMessage.indexOf(this.tempMessage);
    //       if (index !== -1) {
    //         this.listMessage.splice(index, 1);
    //       }
    //     }
    //     NProgressService.doneAfterCloseModal();
    //   });
  }

  private clean(): void {
    clearInterval(this.timer);
    window.clearInterval(this.timer);
    this.unsubscribe();
  }

  private unsubscribe(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
