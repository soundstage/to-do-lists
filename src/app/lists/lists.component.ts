import { Component, OnInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';

import { SortHeader, SortEvent, compare } from '../directives/sort-header.directive';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  @ViewChildren(SortHeader) headers: QueryList<SortHeader>;

  sampleList = `[
    {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
    },
    {
      "userId": 1,
      "id": 2,
      "title": "quis ut nam facilis et officia qui",
      "completed": false
    },
    {
      "userId": 2,
      "id": 3,
      "title": "test",
      "completed": false
    }
  ]`;
  defaultList = null;
  addTaskVisible = false;
  newTask = null;
  deletedTaskList = [];
  searchText = '';

  constructor(private _cdr: ChangeDetectorRef, private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    // var data = this.httpClient.get('https://jsonplaceholder.typicode.com/bipintek/demo-api/todos');
    this.httpClient.get('https://jsonplaceholder.typicode.com/bipintek/demo-api/todos')
      .subscribe(
        (data) => {
          if (data != []) {
            this.defaultList = data;
          } else {
            this.defaultList = JSON.parse(this.sampleList);
          }
        });
  }

  showPrompt() {
    this.addTaskVisible = !this.addTaskVisible;
  }

  hidePrompt(): void {
    this.addTaskVisible = false;
  }

  addNewTask() {
    this.searchText = null;
    var maxId = this.getObject(this.defaultList, 'id');
    var newId = maxId.id + 1;
    var jsonString = '{"userId":' + 1 + ',"id":' + newId + ',"title":"' + this.newTask + '", "completed":' + false + '}'
    this.defaultList.push(JSON.parse(jsonString));
    this.searchText = '';
    this._cdr.detectChanges();
  }

  getObject(array, prop) {
    var object;
    for (var index = 0; index < this.defaultList.length; index++) {
      if (object == null || parseInt(array[index][prop]) > parseInt(object[prop]))
        object = array[index];
    }
    return object;
  }

  deleteTaskById(id) {
    var target;
    for (var index = 0; index < this.defaultList.length; index++) {
      if (parseInt(this.defaultList[index].id) == id) {
        target = this.defaultList[index];
        this.deletedTaskList.push(target);
        this.defaultList.splice(index, 1);
      }
    }
  }

  markAsDoneById(id) {
    for (var index = 0; index < this.defaultList.length; index++) {
      if (parseInt(this.defaultList[index].id) == id) {
        this.defaultList[index].completed = !this.defaultList[index].completed;
      }
    }
  }

  colSort({ column, direction }: SortEvent) {

    // Reset headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // 
    if (direction === '') {
      this.defaultList = this.defaultList;
    } else {
      this.defaultList = [...this.defaultList].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  viewDeleted() {
    this.router.navigate(['/past', JSON.stringify(this.deletedTaskList)]);
  }

}
