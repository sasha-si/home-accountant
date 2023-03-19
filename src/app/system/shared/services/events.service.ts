import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AddEvent } from './../interfaces/add-event';
import baseURL from 'src/app/shared/services/base-url';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  addEvent(eventItem: AddEvent): Observable<AddEvent> {
    return this.http.post<AddEvent>(`${baseURL}events`, eventItem);
  };

  getEvents(): Observable<AddEvent[]> {
    return this.http.get<AddEvent[]>(`${baseURL}events`);
  };
  
  getEvent(id: string): Observable<AddEvent> {
    return this.http.get<AddEvent>(`${baseURL}events/${id}`);
  };
}
