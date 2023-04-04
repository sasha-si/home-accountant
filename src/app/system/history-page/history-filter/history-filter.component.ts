import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Category } from './../../shared/interfaces/category';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();
  @Input() categories: Category[] = [];

  selectedPeriod = 'd';
  selectedTypes: string[] = [];
  selectedCategories: string[] = [];

  timePeriods = [//                                                            moment.js
    {type: 'd', label: 'Day'},
    {type: 'w', label: 'Week'},
    {type: 'M', label: 'Month'}
  ];

  types = [
    {type: 'income', label: 'Income'},
    {type: 'outcome', label: 'Outcome'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  closeFilter() {
    this.selectedPeriod = 'd';
    this.selectedTypes = [];
    this.selectedCategories = [];  
    this.onFilterCancel.emit();
  };

  // private calculateInputParams(field: string, checked: boolean, value: string) {
  //   if(checked) {
  //     this[field as any].indexOf(value) === -1 ? this[field].push(value) : null;
  //   } else {
  //     this[field] = this[field].filter(i => i !== value);
  //   }
  // };

  // handleChangeType({checked, value}: any) {
  //   this.calculateInputParams('selectedTypes', checked, value);
  // };

  // handleChangeCAtegory({checked, value}: any) {
  //   this.calculateInputParams('selectedCategories', checked, value);
  // };
  
  handleChangeType({checked, value}: any) {
    if(checked) {
      this.selectedTypes.indexOf(value) === -1 ? this.selectedTypes.push(value) : null;
    } else {
      this.selectedTypes = this.selectedTypes.filter(i => i !== value);
    }
};

  handleChangeCAtegory({checked, value}: any) {
    if(checked) {
      this.selectedCategories.indexOf(value) === -1 ? this.selectedCategories.push(value) : null;
    } else {
      this.selectedCategories = this.selectedCategories.filter(i => i !== value);
    }
  };

  applyFilter() {
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  };
}
