import { combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { AddEvent } from './../shared/interfaces/add-event';
import { Category } from './../shared/interfaces/category';
import { Bill } from './../shared/interfaces/bill';
import { EventsService } from './../shared/services/events.service';
import { CategoriesService } from './../shared/services/categories.service';
import { BillService } from './../shared/services/bill.service';

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit {

  isLoaded = false;
  bill!: Bill;
  categories: Category[] = [];
  events: AddEvent[] = [];

  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.billService.getBill(),
      this.categoriesService.getAllCategories(),
      this.eventsService.getEvents()
    ])
      .subscribe({
        next: value => {
          this.bill = value[0];
          this.categories = value[1];
          this.events = value[2];

          this.isLoaded = true;
        }
      });
  };

  getCategoryCost(category: Category) {
    return this.events.filter(e => e.category === category.id && e.type === 'outcome').reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  };

  getColor(category: Category) {
    const percent = this.getCategoryCost(category) / category.capacity;
    return percent <= 0.6 ? 'success' : percent >= 1 ? 'danger' : 'warning'
  };
}
