import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(events: any, searchValue: string, searchField: string): any {
    if(events.length === 0 || !searchValue) {
      return events;
    }

    return events.filter((item: any) => {
      const itemCopy = Object.assign({}, item);
      if(!isNaN(itemCopy[searchField])) {
        itemCopy[searchField] += '';
      }

      if(searchField === 'category') {
        itemCopy[searchField] = itemCopy['categoryName'];
      }

      return itemCopy[searchField].toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
    });
  }
}