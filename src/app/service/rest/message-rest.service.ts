import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "../../security/authentication.service";
import {Observable} from "rxjs/Observable";
import {Message} from "../../model/message.model";
import {messageRest, serverUrl} from "../../common/rest-url";
import {MessageForSave} from "../../model/message-for-save.model";
import {Page} from "../../model/page";
import {MessageForUpdate} from "../../model/message-for-update.model";
import {DataTransfer} from "../data-transfer.service";
import {MessageDto} from "../../dto/message.dto";

@Injectable()
export class MessageRestService {

  constructor(private httpClient: HttpClient,
              private transfer: DataTransfer) {
  }

  public findOne(id: number): Observable<Message> {
    return this.httpClient
      .get<Message>(messageRest + '/' + id)
      .map(response => {
        return response;
      })
  }

  public findMessageByDialog(id: number): Observable<Array<MessageDto>> {
    return this.httpClient
      .get<Array<MessageDto>>(serverUrl + 'dialog/' + id + '/message');
  }

  public postMessage(message: MessageForSave): Observable<Message> {
    return this.httpClient
      .post<Message>(messageRest, message.values, {observe: 'response'})
      .map(response => {
        if (response.status === 201) {
          return response.body;
        }
      });
  }

  public deleteMessage(id: number): Observable<boolean> {
    return this.httpClient
      .delete(messageRest + '/' + id, {observe: 'response'})
      .map(response => {
        if (response.status === 204) {
          return true;
        } else {
          return false;
        }
      })
  }


  public findLastMessageForMyDialogPage(iam: number): Observable<Page<MessageDto>> {
    return this.httpClient
      .get<Page<MessageDto>>(messageRest + '/last-message-dialog/user/' + iam + '/page');
  }

  public findLastMessageForMyDialogList(iam: number): Observable<Array<MessageDto>> {
    return this.httpClient
      .get<Array<MessageDto>>(messageRest + '/last-message-dialog/user/' + iam);
  }

  public put(message: MessageForUpdate): Observable<MessageDto> {
    return this.httpClient
      .put<MessageDto>(messageRest, message);
  }

  public findMessageByInterlocutorPage(interlocutor: number): Observable<Page<MessageDto>> {
    const url = messageRest + '/interlocutor/' + interlocutor + '/page';
    return this.httpClient
      .get<Page<MessageDto>>(url);
  }

  public findMessageByInterlocutor(interlocutor: number): Observable<Array<MessageDto>> {
    return this.httpClient
      .get<Array<MessageDto>>(messageRest + '/interlocutor/' + interlocutor);
  }
}
