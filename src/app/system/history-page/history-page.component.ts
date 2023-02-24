import { ChartData } from './../shared/interfaces/chart-data';
import { combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { EventsService } from './../shared/services/events.service';
import { CategoriesService } from './../shared/services/categories.service';
import { AddEvent } from './../shared/interfaces/add-event';
import { Category } from './../shared/interfaces/category';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {

  isLoaded = false;
  categories: Category[] = [];
  events: AddEvent[] = [];
  chartData: ChartData = {
    labels: [],
    data: []
  };

  constructor(
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.categoriesService.getAllCategories(),
      this.eventsService.getEvents()
    ])
      .subscribe({
        next: value => {
          this.categories = value[0];
          this.events = value[1];

          this.calculateChartData();

          this.isLoaded = true;
        }
      });
  }

  calculateChartData() {
    this.categories.forEach((category) => {
      const catEvent = this.events.filter(e => e.category === category.id && e.type === 'outcome');
      this.chartData.labels.push(category.name);
      this.chartData.data.push(catEvent.reduce((total, e) => {
        total += e.amount;
        return total;
      }, 0));
    });
  };
}
