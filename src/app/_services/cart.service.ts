import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {Cart} from "../_models";

@Injectable({ providedIn: 'root' })
export class CartService {
  private currentCartSubject: BehaviorSubject<Cart>;
  public currentCart: Observable<Cart>;

  constructor(private http: HttpClient) {
    this.currentCartSubject = new BehaviorSubject<Cart>(JSON.parse(localStorage.getItem('currentCart')));
    this.currentCart = this.currentCartSubject.asObservable();
  }

  public get currentCartValue(): Cart {
    return this.currentCartSubject.value;
  }

  getOne(id: string) {
    return this.http.get<Cart>(`http://localhost:3000/carts/${id}`)
      .pipe(map(cart => {
        localStorage.setItem('currentCart', JSON.stringify(cart));
        this.currentCartSubject.next(cart);
        return cart;
      }));
  }

  create(id: string) {
    return this.http.post<Observable<Cart>>(`http://localhost:3000/carts/add`, {"id": id}).subscribe(cart => this.currentCart = cart);
  }
}
