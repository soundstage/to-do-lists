import { Component, OnInit, ViewChildren, QueryList, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortHeader, SortEvent, compare } from '../directives/sort-header.directive';
import { Item } from '../classes/item';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

let DONE_KEY = 'done';

@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.css']
})
export class PastComponent implements OnInit {
  @ViewChildren(SortHeader) headers: QueryList<SortHeader>;

  doneList: Item[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Inject(LOCAL_STORAGE) private storage: StorageService) {

  }

  ngOnInit() {
    // var tasks = this.route.snapshot.params['tasks'];
    this.getList();
  }

  getList() {
    if (this.storage.get(DONE_KEY) != undefined) {
      this.doneList = this.storage.get(DONE_KEY);
    }
    // this.doneList = JSON.parse(list);
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
      this.doneList = this.doneList;
    } else {
      this.doneList = [...this.doneList].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  goToLists() {
    this.router.navigate(['/lists']);
  }

}
