import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';

import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Item } from '../classes/item';
import { MaxidService } from '../services/maxid.service';

var LIST_KEY = 'list';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  taskList: Item[] = [];
  task: Item;
  newTask: string;
  showError: boolean = false;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService, 
    private _cdr: ChangeDetectorRef,
    private maxIdService: MaxidService
    ) { }

  ngOnInit() {
    this.task = new Item;
    if (this.storage.get(LIST_KEY) != undefined) {
      this.taskList = this.storage.get(LIST_KEY);
    }
  }

  addNewTask() {
    if (this.storage.get(LIST_KEY) != undefined) {
      var maxId = this.maxIdService.getMaxId(this.taskList, 'id');
      var newId = maxId.id + 1;
      this.task.id = newId;
      this.task.completed = false;
      this.task.userId = 0;
      this.taskList.push(this.task);
      this.storage.set(LIST_KEY, this.taskList);
    } else {
      // Validated entered title
      if (this.task.title == undefined || this.task.title == '') {
        this.showError = true;
        return;
      }
      this.task.id = 0;
      this.task.completed = false;
      this.task.userId = 0;
      let array = [];
      array.push(this.task);
      this.storage.set(LIST_KEY, array);
    }
    console.log(this.storage.get(LIST_KEY));
    this.task = new Item;
    // var jsonString = '{"userId":' + 1 + ',"id":' + newId + ',"title":"' + this.newTask + '", "completed":' + false + '}'
    // this.taskList.push(JSON.parse(jsonString));
    this._cdr.detectChanges();
  }

}
