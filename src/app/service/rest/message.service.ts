import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Message} from '../../model/message.model';
import {AuthenticationService} from '../../security/authentication.service';
import {messageRest} from '../../common/rest-url';
import {DataTransfer} from '../data-transfer.service';
import {Http, Response} from '@angular/http';
import {Page} from '../../model/page';

@Injectable()
export class MessageService {

  constructor(private http: Http, private authService: AuthenticationService, private transfer: DataTransfer) {
  }

  public findOne(id: number): Observable<Message> {
    return this.http
      .get(messageRest + '/' + id, this.authService.getRequestOptionsArgs())
      .map((response: Response) => {
        return this.transfer.responseToModelMessage(response);
      });
  }

  public findMessageByInterlocutor(interlocutor: number): Observable<Page<Message>> {
    return this.http
      .get(messageRest + '/interlocutor/' + interlocutor, this.authService.getRequestOptionsArgs())
      .map((response: Response) => {
        return this.transfer.responseToPage<Message>(response);
      });
  }

  public postMessage(text: string, sender: number, recipient: number): Observable<Message> {
    const message = JSON.stringify({
      text: text,
      senderId: sender,
      recipientId: recipient
    });
    return this.http
      .post(messageRest, message, this.authService.getRequestOptionsArgs())
      .map((response: Response) => {
        if (response.status === 201) {
          return this.transfer.responseToModelMessage(response);
        }
      });
  }

  public deleteMessage(id: number): Observable<boolean> {
    return this.http
      .delete(messageRest + '/' + id, this.authService.getRequestOptionsArgs())
      .map((response: Response) => {
        if (response.status === 204) {
          return true;
        } else {
          return false;
        }
      });
  }

  public findLastMessageForMyDialog(iam: number): Observable<Page<Message>> {
    return this.http
      .get(messageRest + '/last-message-dialog/user/' + iam, this.authService.getRequestOptionsArgs())
      .map((response: Response) => {
        return this.transfer.responseToPage<Message>(response);
      });
  }


}
