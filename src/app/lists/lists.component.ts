import { Component, OnInit, ViewChildren, QueryList, ChangeDetectorRef, Inject } from '@angular/core';

import { SortHeader, SortEvent, compare } from '../directives/sort-header.directive';
import { Item } from '../classes/item';

import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Note } from '../classes/note';

let LIST_KEY = 'list';
let DONE_KEY = 'done';
let NOTE_KEY = 'note';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  @ViewChildren(SortHeader) headers: QueryList<SortHeader>;

  sampleList: Item[] = [
    {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false,
      "note": ''
    },
    {
      "userId": 1,
      "id": 2,
      "title": "quis ut nam facilis et officia qui",
      "completed": false,
      "note": ''
    },
    {
      "userId": 2,
      "id": 3,
      "title": "test",
      "completed": false,
      "note": ''
    }
  ];
  taskList: Item[] = [];
  addTaskVisible = false;
  newTask = null;
  searchText = '';
  notesList: Note[] = [];

  constructor(private _cdr: ChangeDetectorRef,
    private router: Router,
    private httpClient: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService) { }

  ngOnInit() {
    this.getList();
    this.getNotes();
    this.mergeNoteTask();
    console.log(this.taskList);
  }

  getList() {
    if (this.storage.get(LIST_KEY) == undefined) {
      this.taskList = this.sampleList;
    } else {
      this.taskList = this.storage.get(LIST_KEY);
    }
  }

  getNotes() {
    if (this.storage.get(NOTE_KEY) != undefined) {
      this.notesList = this.storage.get(NOTE_KEY);
    }
  }

  mergeNoteTask() {
    console.log(this.notesList);
    if (this.notesList.length > 0) {
      for (let noteCount = 0; noteCount < this.notesList.length; noteCount++) {
        for (let taskCount = 0; taskCount < this.taskList.length; taskCount++) {
          if (this.notesList[noteCount].targetItem == this.taskList[taskCount].id) {
            if (this.taskList[taskCount].note == undefined) {
              this.taskList[taskCount].note = '';
            }
            this.taskList[taskCount].note += this.notesList[noteCount].text + "\n";
            taskCount = 0;
            break;
          }
        }
      }
    }
  }

  showPrompt() {
    this.addTaskVisible = !this.addTaskVisible;
  }

  hidePrompt(): void {
    this.addTaskVisible = false;
  }

  deleteTaskById(id) {
    var target;
    for (var index = 0; index < this.taskList.length; index++) {
      if (this.taskList[index].id == id) {
        target = this.taskList[index];
        this.updateDoneList(target);
        this.taskList.splice(index, 1);
        this.storage.set(LIST_KEY, this.taskList);
      }
    }
  }

  markAsDoneById(id) {
    for (var index = 0; index < this.taskList.length; index++) {
      if (this.taskList[index].id == id) {
        this.taskList[index].completed = !this.taskList[index].completed;
      }
    }
  }

  updateDoneList(item) {
    if (this.storage.get(DONE_KEY) != undefined) {
      let doneList = this.storage.get(DONE_KEY);
      doneList.push(item);
      this.storage.set(DONE_KEY, doneList);
    } else {
      let array = [];
      array.push(item);
      this.storage.set(DONE_KEY, array);
    }
  }

  colSort({ column, direction }: SortEvent) {
    // Reset headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction === '') {
      this.taskList = this.taskList;
    } else {
      this.taskList = [...this.taskList].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  viewDeleted() {
    this.router.navigate(['/past']);
  }

}
