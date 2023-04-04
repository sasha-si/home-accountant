import { concatMap, mergeMap, combineLatest } from 'rxjs';
import { CategoriesService } from './../../shared/services/categories.service';
import { Category } from './../../shared/interfaces/category';
import { AddEvent } from './../../shared/interfaces/add-event';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { EventsService } from './../../shared/services/events.service';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit {

  isLoaded = false;
  eventData!: AddEvent;
  category!: Category;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.eventsService.getEvent(params['id'])
      .subscribe((eventData: AddEvent) => {
        this.eventData = eventData;
        this.categoriesService.getCategogy(this.eventData.category)
        .subscribe((category: Category) => {
          this.category = category;

          this.isLoaded = true;
        })
      })
    }) 
  }
}
