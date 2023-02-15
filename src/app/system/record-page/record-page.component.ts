import { Component, OnInit } from '@angular/core';

import { CategoriesService } from './../shared/services/categories.service';
import { Category } from './../shared/interfaces/category';

@Component({
  selector: 'app-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.scss']
})
export class RecordPageComponent implements OnInit {

  isLoaded = false;
  categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService
  ) { }

  getData() {
    this.categoriesService.getAllCategories()
      .subscribe({
        next: value => {
          this.categories = value;
          this.isLoaded = true;
        }
      });
  };

  ngOnInit(): void {
    this.getData();
  }

  newCategoryAdded() {
    this.getData();
  };

  onCategoryEdited(category: Category) {
    const index = this.categories.findIndex((c) => c.id === category.id)
    this.categories[index] = category ;
  };
}
