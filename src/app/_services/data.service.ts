import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private citiesSubject = new BehaviorSubject(['Tel Aviv','Afula','Haifa','Jerusalem','Lod','Ramat Gan','Beersheba','Nazareth Illit','Holon']);
  cities = this.citiesSubject.asObservable();

  constructor() { }

  changeCities(cities) {
    this.citiesSubject.next(cities);
  }
}
