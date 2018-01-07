import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../security/authentication.service";
import {ChannelRestService} from "../../../service/rest/channel-rest.service";
import {NProgressService} from "../../../service/nprogress.service";
import {ChannelSaveDto} from "../../../dto/channel-save.dto";
import {ChannelComponent} from "../channel/channel.component";

@Component({
  selector: 'app-channel-create',
  templateUrl: './channel-create.component.html',
  styleUrls: ['./channel-create.component.css']
})
export class ChannelCreateComponent implements OnInit {

  channelPost: ChannelSaveDto = new ChannelSaveDto();
  isSuccess = false;

  constructor(private authService: AuthenticationService,
              private channelComponent: ChannelComponent,
              private channelRest: ChannelRestService) {
  }

  ngOnInit() {
  }

  public createNewChannel(): void {
    if (this.channelPost && this.channelPost.channelName.length > 0) {
      NProgressService.start();
      this.channelPost.whoCreateId = this.authService.getAuth().id;
      this.channelRest
        .postChannel(this.channelPost)
        .subscribe(data => {
          if (data) {
            this.isSuccess = true;
            this.channelComponent.listChannel.push(data);
          }
          NProgressService.done();
          this.channelPost = new ChannelSaveDto();
        });
    }
  }

}
