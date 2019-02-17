import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {Cart, CartItem} from "../_models";

@Injectable({ providedIn: 'root' })
export class CartService {
  private currentCartSubject: BehaviorSubject<Cart>;
  public currentCart: Observable<Cart>;

  private openCartSubject: BehaviorSubject<boolean>;
  public openCart: Observable<boolean>;

  private totalPriceSubject: BehaviorSubject<number>;
  public totalPrice: Observable<number>;

  constructor(private http: HttpClient) {
    this.currentCartSubject = new BehaviorSubject<Cart>(JSON.parse(localStorage.getItem('currentCart')));
    this.currentCart = this.currentCartSubject.asObservable();
    this.openCartSubject = new BehaviorSubject<boolean>(false);
    this.openCart = this.openCartSubject.asObservable();

    this.totalPriceSubject = new BehaviorSubject<number>(null);
    this.totalPrice = this.totalPriceSubject.asObservable();
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

  cartToggle(toggle) {
    this.openCartSubject.next(toggle);
  }

  create(id: string) {
    return this.http.post<Cart>(`http://localhost:3000/carts/add`, {"id": id})
      .subscribe(cart => this.currentCartSubject.next(cart));
  }

  addItem(item: CartItem) {
    return this.http.post<Cart>(`http://localhost:3000/carts/${this.currentCartValue._id}/cartitems/add`, item)
      .subscribe(cart => {
        this.currentCartSubject.next(cart);
        this.getTotalPrice(cart.items);
      });
  };

  deleteItem(pid: string) {
    return this.http.delete<Cart>(`http://localhost:3000/carts/${this.currentCartValue._id}/cartitems/remove/${pid}`)
      .subscribe(cart => {
        this.currentCartSubject.next(cart);
        this.getTotalPrice(cart.items);
      })
  };

  getTotalPrice(items) {
    let total = 0;
    for(let i = 0; i < items.length; i++){
      total += items[i].totalPrice;
    }
    this.totalPriceSubject.next(total);
  }
}

