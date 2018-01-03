import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../../security/authentication.service";
import {Observable} from "rxjs/Observable";
import {DialogDto} from "../../dto/dialog.dto";
import {dialogByUser, messageByDialogId} from "../../common/rest-url";
import {MessageDto} from "../../dto/message.dto";

@Injectable()
export class DialogRestService {

  constructor(private httpClient: HttpClient,
              private authService: AuthenticationService) {
  }

  public findDialogsByUser(userId: number): Observable<Array<DialogDto>> {
    return this.httpClient
      .get<Array<DialogDto>>(dialogByUser + userId);
  }

  public findMessageByDialogId(dialogId: number): Observable<Array<MessageDto>> {
    return this.httpClient
      .get<Array<MessageDto>>(messageByDialogId + dialogId + '/message');
  }
}
