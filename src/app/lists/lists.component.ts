import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

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
    }
  ]`
  defaultList = null;
  addTaskVisible = false;
  newTask = null;
  deletedTaskList = null;

  constructor() { }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.defaultList = JSON.parse(this.sampleList);
  }

  showPrompt(){
    this.addTaskVisible = !this.addTaskVisible;
  }

  hidePrompt():void {
    this.addTaskVisible = false;
  }

  addNewTask(){
    var maxId = this.getMax(this.defaultList, 'id');
    var id = maxId.id + 1;
    var jsonString = '{"userid":'+ 1 +',"id":' + id + ',"title":"' + this.newTask +'", "completed":'+ false +'}'
    this.defaultList.push(JSON.parse(jsonString));
  }

  deleteTask(){

  }

  editTask(){

  }

  getMax(arr, prop){
    var max;
    for(var index = 0; index<this.defaultList.length; index++){
      if (max == null || parseInt(arr[index][prop]) > parseInt(max[prop]))
            max = arr[index];
    }
    return max;
  }

  deleteTaskById(id){
    var target;
    for(var index = 0; index<this.defaultList.length; index++){
      if (target == null || parseInt(this.defaultList[index].id) == id){
        this.deletedTaskList.push(target);
        this.defaultList.pop()
      }
    }
    
  }

}
