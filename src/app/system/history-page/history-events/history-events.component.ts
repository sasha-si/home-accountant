import { Component, Input, OnInit } from '@angular/core';

import { Category } from '../../shared/interfaces/category';
import { AddEvent } from './../../shared/interfaces/add-event';

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events: AddEvent[] = [];
  isShown = false;
  searchValue = '';
  searchPlaceholder = 'Amount';
  searchField = 'amount';

  constructor() { }

  ngOnInit(): void {
  }

  onDropdownOpened() {
    this.isShown = !this.isShown;
  };

  changeCriteria(field: string) {
    const namesMap: any = {
      amount: 'Amount',
      date: 'Date',
      category: 'Category',
      type: 'Type'
    };
    this.searchPlaceholder = namesMap[field];
  };

  getCategoryName(category: number) {
    return this.categories.find(c => c.id === category)?.name
  };
}
