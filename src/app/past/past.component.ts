import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortHeader, SortEvent, compare } from '../directives/sort-header.directive';

@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.css']
})
export class PastComponent implements OnInit {
  @ViewChildren(SortHeader) headers: QueryList<SortHeader>;

  defaultList = null;

  constructor(private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    var tasks = this.route.snapshot.params['tasks'];
    this.getList(tasks);
  }

  getList(list) {
    this.defaultList = JSON.parse(list);
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

  goToLists(){
    this.router.navigate(['/lists']);
  }

}
