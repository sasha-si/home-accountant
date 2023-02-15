import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Message } from './../../../shared/interfaces/message';
import { CategoriesService } from './../../shared/services/categories.service';
import { Category } from './../../shared/interfaces/category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  form!: FormGroup;
  @Output() onCategoryAdd = new EventEmitter<Category>();
  message!: Message;


  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      'categoryName': [null, [Validators.required, Validators.minLength(3)]],
      'categoryValue': [null, [Validators.required, Validators.min(1)]]
    });

    this.message = {
      type: 'success',
      text: ''
    }
  }
  
  onSubmit() {
    const {categoryName, categoryValue} = this.form.value;
    const category = {
      name: categoryName,
      capacity: categoryValue
    };
    
    this.categoriesService.createNewCategory(category)
    .subscribe(() => {
      this.onCategoryAdd.emit(category);
      this.message.text = 'The category was added successfuly!';
      setTimeout(() => this.message.text = '', 5000);

    })
  };
}