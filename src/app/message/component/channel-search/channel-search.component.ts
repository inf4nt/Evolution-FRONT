import {Component, OnInit} from '@angular/core';
import {ChannelRestService} from "../../../service/rest/channel-rest.service";
import {ChannelDto} from "../../../dto/channel.dto";
import {ChannelComponent} from "../channel/channel.component";
import {TechnicalService} from "../../../service/technical.service";
import {NProgressService} from "../../../service/nprogress.service";

@Component({
  selector: 'app-channel-search',
  templateUrl: './channel-search.component.html',
  styleUrls: ['./channel-search.component.css']
})
export class ChannelSearchComponent implements OnInit {

  listChannel: Array<ChannelDto> = [];

  constructor(private channelRest: ChannelRestService,
              public channelComponent: ChannelComponent,
              public techService: TechnicalService) {
  }

  ngOnInit() {
    NProgressService.start();
    this.channelRest
      .findAll()
      .subscribe(data => {
        if (data) {
          this.listChannel = data;
        }
        NProgressService.done();
      });
  }

  public join(channelId: number): void {
    NProgressService.start();
    this.channelRest
      .joinToChannel(channelId)
      .subscribe(data => {
        if (data) {
          this.channelComponent.listChannel.push(data);
        }
        NProgressService.done();
      });
  }

  public out(channelId: number): void {
    NProgressService.start();
    this.channelRest
      .outFromChannel(channelId)
      .subscribe(data => {
        if (data) {
          let index = this.techService.findIndexChannelInListById(channelId, this.channelComponent.listChannel);
          if (index !== -1) {
            this.channelComponent.listChannel.splice(index, 1);
          }
        }
        NProgressService.done();
      });
  }
}
