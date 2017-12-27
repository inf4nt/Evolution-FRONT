import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "../../security/authentication.service";
import {Observable} from "rxjs/Observable";
import {Message} from "../../model/message.model";
import {messageRest} from "../../common/rest-url";
import {MessageForSave} from "../../model/message-for-save.model";
import {Page} from "../../model/page";
import {MessageForUpdate} from "../../model/message-for-update.model";
import {DataTransfer} from "../data-transfer.service";

@Injectable()
export class MessageDataService {

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


  public findLastMessageForMyDialog(iam: number): Observable<Page<Message>> {
    return this.httpClient
      .get(messageRest + '/last-message-dialog/user/' + iam)
      .map(response => {
        return this.transfer.jsonToPage(response);
      });
  }

  public put(message: MessageForUpdate): Observable<Message> {
    return this.httpClient
      .put<Message>(messageRest, message.values)
      .map(response => {
        return response;
      });
  }

  public findMessageByInterlocutor(interlocutor: number): Observable<Page<Message>> {
    return this.httpClient
      .get(messageRest + '/interlocutor/' + interlocutor)
      .map(response => {
        return this.transfer.jsonToPage(response);
      });
  }
}
