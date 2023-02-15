import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs';

import { EventsService } from './../../shared/services/events.service';
import { Message } from './../../../shared/interfaces/message';
import { BillService } from './../../shared/services/bill.service';
import { AddEvent } from './../../shared/interfaces/add-event';
import { Category } from './../../shared/interfaces/category';
import { Bill } from '../../shared/interfaces/bill';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  form!: FormGroup;
  @Input() categories: Category[] = [];
  types = [
    { type: 'income', label: 'Income', id: 1 },
    { type: 'outcome', label: 'Outcome', id: 2 }
  ];
  message: Message = {
    type: 'success',
    text: ''
  }

  constructor(
    private fb: FormBuilder,
    private billService: BillService,
    private eventsService: EventsService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      'selectCategory': [1],
      'type': [this.types[1].type, Validators.required],
      'categoryValue': [null, [Validators.required, Validators.min(1)]],
      'definition': [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    const { type, categoryValue, selectCategory, definition } = this.form.value;
    const date = new Date();
    const eventItem: AddEvent = {
      type: type,
      amount: categoryValue,
      category: +selectCategory,
      date: date,
      description: definition
    };

    this.billService.getBill()
      .subscribe((b: Bill) => {
        let value = 0;
        if (type === 'income') {
          value = b.value + categoryValue;
        } else {
          if (b.value < categoryValue) {
            this.message = {
              type: 'danger',
              text: `Insufficient funds! You need ${categoryValue - b.value} UAH more!`
            }
            setTimeout(() => this.message.text = '', 5000);
            return;
          } else {
            value = b.value - categoryValue;
          }
        }

        this.billService.updateBill({value, currency: b.currency})
        .pipe(mergeMap(() => this.eventsService.addEvent(eventItem)))
        .subscribe(() => {
          this.message = {
            type: 'success',
            text: 'The event edded successfuly!'
          }
          setTimeout(() => this.message.text = '', 5000);
        });
  
      })
  };
}