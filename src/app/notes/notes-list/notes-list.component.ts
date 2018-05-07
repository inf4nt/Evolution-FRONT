import { Component, OnInit } from '@angular/core';
import {NotesRestService} from "../../service/rest/notes-rest.service";
import {NotesDto} from "../../dto/notes.dto";

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  listNoes: Array<NotesDto> = [];

  constructor(private notesRest: NotesRestService) { }

  ngOnInit() {
    this.notesRest
      .findAllNotes()
      .subscribe(data => {
        if (data) {
          this.listNoes = data;
          console.log(data);
        }
      });
  }

}
