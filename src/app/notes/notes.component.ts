import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ActivatedRoute } from '@angular/router';

import { Note } from '../classes/note';
import { MaxidService } from '../services/maxid.service';

let NOTE_KEY = 'note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  targetId: number;
  note: Note;
  showError: boolean = false;
  noteList: Note[] = [];

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private route: ActivatedRoute,
    private maxIdService: MaxidService
  ) { }

  ngOnInit() {
    this.note = new Note;
    this.targetId = parseInt(this.route.snapshot.params['id']);
    if (this.storage.get(NOTE_KEY) != undefined) {
      this.noteList = this.storage.get(NOTE_KEY);
    }
  }

  saveNote() {
    // this.storage.remove(NOTE_KEY);
    // return;
    if (this.storage.get(NOTE_KEY) != undefined) {
      // Validated entered note
      if (this.note.text == undefined || this.note.text == '') {
        this.showError = true;
        return;
      }
      let maxId = this.maxIdService.getMaxId(this.noteList, 'id');
      let newId = maxId.id + 1;
      this.note.id = newId;
      this.note.targetItem = this.targetId;
      this.noteList.push(this.note);
      this.storage.set(NOTE_KEY, this.noteList);
    } else {
      // Validated entered note
      if (this.note.text == undefined || this.note.text == '') {
        this.showError = true;
        return;
      }
      this.note.id = 0;
      this.note.targetItem = this.targetId;
      let array = [];
      array.push(this.note);
      this.storage.set(NOTE_KEY, array);
    }
    console.log(this.storage.get(NOTE_KEY));
    this.note = new Note;
  }

}
