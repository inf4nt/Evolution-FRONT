import {Injectable} from "@angular/core";
import {ChannelDto} from "../../dto/channel.dto";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {channelRestUrl, serverUrl} from "../../common/rest-url";
import {MessageChannelDto} from "../../dto/message-channel.dto";
import {MessageChannelSaveDto} from "../../dto/message-channel-save.dto";

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

  public postMessageChannel(message: MessageChannelSaveDto): Observable<MessageChannelDto> {
    return this.httpClient
      .post<MessageChannelDto>(channelRestUrl + '/message', message, {observe: 'response'})
      .map(response => {
        if (response.status === 201) {
          return response.body;
        }
      });
  }

}
