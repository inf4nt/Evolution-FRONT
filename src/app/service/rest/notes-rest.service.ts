import {Injectable} from "@angular/core";
import {NotesDto} from "../../dto/notes.dto";
import {HttpClient} from "@angular/common/http";
import {notesRestUrl} from "../../common/rest-url";
import {Observable} from "rxjs/Observable";

@Injectable()
export class NotesRestService {

  constructor(private http: HttpClient) {
  }

  public findAllNotes(): Observable<Array<NotesDto>> {
    return this.http
      .get<Array<NotesDto>>(notesRestUrl);
  }

}
