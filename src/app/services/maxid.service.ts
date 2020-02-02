import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaxidService {

  constructor() { }

  getMaxId(array, prop) {
    var object;
    if (array.length == 0)
      return 0;
    for (var index = 0; index < array.length; index++) {
      if (object == null || parseInt(array[index][prop]) > parseInt(object[prop]))
        object = array[index];
    }
    return object;
  }
}
