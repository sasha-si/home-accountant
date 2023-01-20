import { Component, OnInit } from '@angular/core';

import { Category } from './../shared/interfaces/category';

@Component({
  selector: 'app-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.scss']
})
export class RecordPageComponent implements OnInit {

  isLoaded = true;

  constructor() { }

  ngOnInit(): void {
  }

  newCategoryAded(category: Category) {
    //add to array
  };
}
