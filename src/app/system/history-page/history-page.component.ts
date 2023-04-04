import { ChartData } from './../shared/interfaces/chart-data';
import { combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

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
  filteredEvents: AddEvent[] = [];
  chartData: ChartData = { labels: [], data: [] };
  filteredChartData: ChartData = { labels: [], data: [] };
  isFilterVisible = false;

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
          this.setOriginalData();
          this.calculateChartData();
          this.isLoaded = true;
        }
      });
  }

  private setOriginalData() {
    this.filteredEvents = [...this.events];
    this.filteredChartData = { labels: [], data: [] };
  };

  calculateChartData() {
    this.categories.forEach((category) => {
      const catEvent = this.filteredEvents.filter(e => e.category === category.id && e.type === 'outcome');
      this.filteredChartData.labels.push(category.name);
      this.filteredChartData.data.push(catEvent.reduce((total, e) => {
        total += e.amount;
        return total;
      }, 0));
    });
  };

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  };

  openFilter() {
    this.toggleFilterVisibility(true);
  };

  closeFilter() {
    this.toggleFilterVisibility(false);
    this.setOriginalData();
    this.calculateChartData();
  };

  applyFilter(filterData: any) {
    this.toggleFilterVisibility(false);
    this.setOriginalData();

    const startPeriod = moment().startOf('d').add(1, 'd').subtract(1, filterData.period);
    const endPeriod = moment().endOf('d');

    this.filteredEvents = this.filteredEvents
      .filter((e) => {
        return filterData.types.includes(e.type);
      }).filter((e) => {
        return filterData.categories.includes(e.category.toString());
      }).filter((e) => {
        const momentDate = moment(e.date, '');
        return momentDate.isBetween(startPeriod, endPeriod);
      });

    this.calculateChartData();
  };
}
