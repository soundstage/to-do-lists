import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  newTaskForm = new FormGroup({
    taskName: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required)
  });
  showMessage: boolean = false;

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
    this.showMessage = true;
    if (this.storage.get(LIST_KEY) != undefined) {
      var maxId = this.maxIdService.getMaxId(this.taskList, 'id');
      var newId = maxId.id + 1;
      this.task.title = this.newTaskForm.get('taskName').value;
      this.task.dueDate = this.newTaskForm.get('dueDate').value;
      this.task.priority = this.newTaskForm.get('priority').value;
      this.task.id = newId;
      this.task.completed = false;
      this.task.userId = 0;
      this.taskList.push(this.task);
      this.storage.set(LIST_KEY, this.taskList);
    } else {
      this.task.title = this.newTaskForm.get('taskName').value;
      this.task.dueDate = this.newTaskForm.get('dueDate').value;
      this.task.priority = this.newTaskForm.get('priority').value;
      this.task.id = 0;
      this.task.completed = false;
      this.task.userId = 0;
      let array = [];
      array.push(this.task);
      this.storage.set(LIST_KEY, array);
    }
    console.log(this.storage.get(LIST_KEY));
    this.task = new Item;
    this.newTaskForm.reset();
    setTimeout(() => {
      this.showMessage = false;
    }, 2000);
    // var jsonString = '{"userId":' + 1 + ',"id":' + newId + ',"title":"' + this.newTask + '", "completed":' + false + '}'
    // this.taskList.push(JSON.parse(jsonString));
    this._cdr.detectChanges();
  }

}
