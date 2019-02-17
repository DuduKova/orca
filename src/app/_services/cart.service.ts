import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {Cart, CartItem} from "../_models";

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
    return this.http.post<BehaviorSubject<Cart>>(`http://localhost:3000/carts/add`, {"id": id})
    // @ts-ignore
      .subscribe(cart => this.currentCartSubject.next(cart));
  }

  addItem(item: CartItem) {
    return this.http.post<BehaviorSubject<Cart>>(`http://localhost:3000/carts/${this.currentCartValue._id}/cartitems/add`, item)
    // @ts-ignore
      .subscribe(cart => this.currentCartSubject.next(cart));
  };

  deleteItem(pid: string) {
    return this.http.delete<BehaviorSubject<Cart>>(`http://localhost:3000/carts/${this.currentCartValue._id}/cartitems/remove/${pid}`)
    // @ts-ignore
      .subscribe(cart => this.currentCartSubject.next(cart));
  };
}

