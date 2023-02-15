import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Category } from '../../shared/interfaces/category';
import { CategoriesService } from '../../shared/services/categories.service';
import { Message } from 'src/app/shared/interfaces/message';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  form!: FormGroup;
  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();
  currentCategory!: Category;
  message!: Message;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      'eSelectCategory': [1],
      'eCategoryName': [this.categories[0].name, [Validators.required, Validators.minLength(3)]],
      'eCategoryValue': [this.categories[0].capacity, [Validators.required, Validators.min(1)]]
    });
    this.message = {
      type: 'success',
      text: ''
    }
  }

  onCategoryChange = () => {
    this.currentCategory = this.categories.find(c => {
      return c.id === +this.form.value.eSelectCategory;
    })!;

    this.form.patchValue({
      eCategoryName: this.currentCategory.name,
      eCategoryValue: this.currentCategory.capacity
    });
  };

  onSubmit() {
    const { eSelectCategory, eCategoryName, eCategoryValue } = this.form.value;
    const category = {
      name: eCategoryName,
      capacity: eCategoryValue
    };

    this.categoriesService.editCategogy(eSelectCategory, category)
      .subscribe((c: Category) => {
        this.onCategoryEdit.emit(c);
        this.message.text = 'The category edited successfuly!';
        setTimeout(() => this.message.text = '', 5000);
      });
  };
}
