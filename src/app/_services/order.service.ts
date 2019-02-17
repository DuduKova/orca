import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Order} from "../_models";

@Injectable({providedIn: 'root'})
export class OrderService {
  private orderSubject: BehaviorSubject<Order[]>;
  public order: Observable<Order[]>;

  constructor(private http: HttpClient) {
    this.orderSubject = new BehaviorSubject<Order[]>(JSON.parse(localStorage.getItem('order')));
    this.order = this.orderSubject.asObservable();
  }

  public get orderValue(): Order[] {
    return this.orderSubject.value;
  }

  addOrder(order) {
    console.log('inside order');
    return this.http.post<Order[]>('http://localhost:3000/orders/add', order)
      .pipe(map(order => {
        localStorage.setItem('order', JSON.stringify(order));
        this.orderSubject.next(order);
        return order;
      }));
  }
}

