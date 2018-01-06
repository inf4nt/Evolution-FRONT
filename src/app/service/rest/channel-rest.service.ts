import {Injectable} from "@angular/core";
import {ChannelDto} from "../../dto/channel.dto";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {serverUrl} from "../../common/rest-url";
import {MessageChannelDto} from "../../dto/message-channel.dto";

@Injectable()
export class ChannelRestService {

  constructor(private httpClient: HttpClient){}

  public findChannelForUser(userId: number): Observable<Array<ChannelDto>> {
    return this
      .httpClient
      .get<Array<ChannelDto>>(serverUrl + 'channel/for-user/' + userId);
  }

  public findChannelForUserList(userId: number): Observable<Array<ChannelDto>> {
    return this
      .httpClient
      .get<Array<ChannelDto>>(serverUrl + 'channel/for-user/' + userId + '/list');
  }

  public findChannelForUserPage(userId: number): Observable<Array<ChannelDto>> {
    return this
      .httpClient
      .get<Array<ChannelDto>>(serverUrl + 'channel/for-user/' + userId + '/page');
  }

  public findMessageByChannel(channelId: number): Observable<Array<MessageChannelDto>> {
    return this.
      httpClient
      .get<Array<MessageChannelDto>>(serverUrl + 'channel/' + channelId + '/message');
  }
}
