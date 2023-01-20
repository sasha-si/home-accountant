import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

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

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      'categoryName': [null, [Validators.required, Validators.minLength(3)]],
      'categoryValue': [null, [Validators.required, Validators.min(1)]]
    }); 
  }
  
  onSubmit() {
    const {categoryName, categoryValue} = this.form.value;
    const category = {
      name: categoryName,
      capacity: categoryValue
    };
    
    this.categoriesService.createNewCategory(category)
    .subscribe(() => {
      this.form.reset();
      this.onCategoryAdd.emit(category);
    })
  };
}


// onSubmit() {
//   const { registrationEmail, registrationPassword, registrationName } = this.form.value;
//   const user = {
//     email: registrationEmail,
//     password: registrationPassword,
//     name: registrationName
//   };

//   this.usersService.createNewUser(user)
//     .subscribe((user) => {
//       this.authService.logIn();
//       window.localStorage.setItem('user', JSON.stringify(user));
//       this.router.navigate(['system/bill']);
//     });
// };