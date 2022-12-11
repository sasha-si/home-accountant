import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoTitleComponent } from './components/logo-title/logo-title.component';



@NgModule({
  declarations: [
    LogoTitleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    LogoTitleComponent
  ]
})
export class SharedModule { }
